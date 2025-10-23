import * as PIXI from 'pixi.js';
import 'pixi-spine';
import { Reel } from './Reel';
import { sound } from '../utils/sound';
import { AssetLoader } from '../utils/AssetLoader';
import { Spine } from 'pixi-spine';
import { GAME_CONSTANTS } from '../constants';

const REEL_COUNT = GAME_CONSTANTS.DEFAULT_SLOT_MACHINE_CONFIG.reelCount;
const SYMBOLS_PER_REEL = GAME_CONSTANTS.DEFAULT_SLOT_MACHINE_CONFIG.symbolsPerReel;
const SYMBOL_SIZE = GAME_CONSTANTS.DEFAULT_SLOT_MACHINE_CONFIG.symbolSize;
const REEL_HEIGHT = GAME_CONSTANTS.DEFAULT_SLOT_MACHINE_CONFIG.reelHeight;
const REEL_SPACING = GAME_CONSTANTS.DEFAULT_SLOT_MACHINE_CONFIG.reelSpacing;
const DESIGN_WIDTH = GAME_CONSTANTS.DESIGN_WIDTH;
const DESIGN_HEIGHT = GAME_CONSTANTS.DESIGN_HEIGHT;

export class SlotMachine {
    public container: PIXI.Container;
    private reels: Reel[];
    private app: PIXI.Application;
    private isSpinning: boolean = false;
    private spinButton: PIXI.Sprite | null = null;
    private frameSpine: Spine | null = null;
    private winAnimation: Spine | null = null;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.container = new PIXI.Container();
        this.reels = [];
        
        // Center the slot machine
        this.container.x = DESIGN_WIDTH / 2 - ((SYMBOL_SIZE * SYMBOLS_PER_REEL) / 2);
        this.container.y = DESIGN_HEIGHT / 2 - ((REEL_HEIGHT * REEL_COUNT + REEL_SPACING * (REEL_COUNT - 1)) / 2);
        this.createBackground();

        this.createReels();

        this.initSpineAnimations();
    }

    private createBackground(): void {
        try {
            const background = new PIXI.Graphics();
            background.beginFill(0x000000, 0.5);
            background.drawRect(
                -20,
                -20,
                SYMBOL_SIZE * SYMBOLS_PER_REEL + 40, // Width now based on symbols per reel
                REEL_HEIGHT * REEL_COUNT + REEL_SPACING * (REEL_COUNT - 1) + 40 // Height based on reel count
            );
            background.endFill();
            this.container.addChild(background);
        } catch (error) {
            console.error('Error creating background:', error);
        }
    }

    private createReels(): void {
        for (let i = 0; i < REEL_COUNT; i++) {
            const reel = new Reel(SYMBOLS_PER_REEL, SYMBOL_SIZE);
            reel.container.y = i * (REEL_HEIGHT + REEL_SPACING);
            this.container.addChild(reel.container);
            this.reels.push(reel);
        }
    }

    public update(): void {
        // Update each reel
        for (const reel of this.reels) {
            reel.update();
        }
    }

    public spin(): void {
        if (this.isSpinning) return;

        this.isSpinning = true;

        // Play spin sound
        sound.play('Reel spin');

        // Disable spin button
        if (this.spinButton) {
            this.spinButton.texture = AssetLoader.getTexture('button_spin_disabled.png');
            this.spinButton.interactive = false;
        }

        for (let i = 0; i < this.reels.length; i++) {
            setTimeout(() => {
                this.reels[i].startSpin();
            }, i * GAME_CONSTANTS.ANIMATION.REEL_STOP_DELAY);
        }

        // Stop all reels after a delay
        setTimeout(() => {
            this.stopSpin();
        }, GAME_CONSTANTS.ANIMATION.WIN_CHECK_DELAY + (this.reels.length - 1) * GAME_CONSTANTS.ANIMATION.REEL_STOP_DELAY);

    }

    private stopSpin(): void {
        for (let i = 0; i < this.reels.length; i++) {
            setTimeout(() => {
                this.reels[i].stopSpin();

                // If this is the last reel, check for wins and enable spin button
                if (i === this.reels.length - 1) {
                    setTimeout(() => {
                        this.checkWin();
                        this.isSpinning = false;
                        sound.stop('Reel spin');
                        
                        if (this.spinButton) {
                            this.spinButton.texture = AssetLoader.getTexture('button_spin.png');
                            this.spinButton.interactive = true;
                        }
                    }, GAME_CONSTANTS.ANIMATION.WIN_CHECK_DELAY);
                }
            }, i * GAME_CONSTANTS.ANIMATION.REEL_STOP_TIMEOUT);
        }
    }

    private checkWin(): void {
        // Simple win check - just for demonstration
        const randomWin = Math.random() < GAME_CONSTANTS.WIN_PROBABILITY;

        if (randomWin) {
            sound.play('win');
            console.log('Winner!');

            if (this.winAnimation) {
                // Try to play an available animation on the win spine
                const state = this.winAnimation.state;
                let animationName = 'animation';

                if (!state.hasAnimation(animationName)) {
                    // Fallback to the first available animation if the default name doesn't exist
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const animations = (state.data as any)?.skeletonData?.animations as Array<{ name: string }> | undefined;
                    if (animations && animations.length > 0) {
                        animationName = animations[0].name;
                    } else {
                        console.warn('No animations found on win spine.');
                        return;
                    }
                }

                this.winAnimation.visible = true;
                const trackEntry = state.setAnimation(0, animationName, false);

                // Hide animation after it completes
                if (trackEntry) {
                    trackEntry.listener = {
                        complete: () => {
                            this.winAnimation!.visible = false;
                        }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any;
                }
            }
        }
    }

    public setSpinButton(button: PIXI.Sprite): void {
        this.spinButton = button;
    }

    private initSpineAnimations(): void {
        try {
            const frameSpineData = AssetLoader.getSpine('base-feature-frame.json');
            if (frameSpineData) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.frameSpine = new Spine(frameSpineData.spineData as any);

                this.frameSpine.y = (REEL_HEIGHT * REEL_COUNT + REEL_SPACING * (REEL_COUNT - 1)) / 2;
                this.frameSpine.x = (SYMBOL_SIZE * SYMBOLS_PER_REEL) / 2;

                if (this.frameSpine.state.hasAnimation('idle')) {
                    this.frameSpine.state.setAnimation(0, 'idle', true);
                }

                this.container.addChild(this.frameSpine);
            }

            const winSpineData = AssetLoader.getSpine('big-boom-h.json');
            if (winSpineData) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.winAnimation = new Spine(winSpineData.spineData as any);

                this.winAnimation.x = (REEL_HEIGHT * REEL_COUNT + REEL_SPACING * (REEL_COUNT - 1)) / 2;
                this.winAnimation.y = (SYMBOL_SIZE * SYMBOLS_PER_REEL) / 2;

                this.winAnimation.visible = false;

                this.container.addChild(this.winAnimation);
            }
        } catch (error) {
            console.error('Error initializing spine animations:', error);
        }
    }
}
