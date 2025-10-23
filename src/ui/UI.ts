import * as PIXI from 'pixi.js';
import { SlotMachine } from '../slots/SlotMachine';
import { AssetLoader } from '../utils/AssetLoader';
import { sound } from '../utils/sound';
import { GAME_CONSTANTS } from '../constants';

export class UI {
    public container: PIXI.Container;
    private app: PIXI.Application;
    private slotMachine: SlotMachine;
    private spinButton!: PIXI.Sprite;

    constructor(app: PIXI.Application, slotMachine: SlotMachine) {
        this.app = app;
        this.slotMachine = slotMachine;
        this.container = new PIXI.Container();

        this.createSpinButton();
    }

    private createSpinButton(): void {
        try {
            this.spinButton = new PIXI.Sprite(AssetLoader.getTexture('button_spin.png'));

            this.spinButton.anchor.set(0.5);
            this.spinButton.x = GAME_CONSTANTS.DESIGN_WIDTH / 2;
            this.spinButton.y = GAME_CONSTANTS.DESIGN_HEIGHT - GAME_CONSTANTS.UI.BUTTON_Y_OFFSET;
            this.spinButton.width = GAME_CONSTANTS.UI.BUTTON_WIDTH;
            this.spinButton.height = GAME_CONSTANTS.UI.BUTTON_HEIGHT;

            this.spinButton.interactive = true;
            this.spinButton.cursor = 'pointer';

            this.spinButton.on('pointerdown', this.onSpinButtonClick.bind(this));
            this.spinButton.on('pointerover', this.onButtonOver.bind(this));
            this.spinButton.on('pointerout', this.onButtonOut.bind(this));

            this.container.addChild(this.spinButton);

            this.slotMachine.setSpinButton(this.spinButton);
        } catch (error) {
            console.error('Error creating spin button:', error);
        }
    }

    private onSpinButtonClick(): void {
        sound.play('Spin button');

        this.slotMachine.spin();
    }

    private onButtonOver(event: PIXI.FederatedPointerEvent): void {
        (event.currentTarget as PIXI.Sprite).scale.set(GAME_CONSTANTS.UI.BUTTON_SCALE_HOVER);
    }

    private onButtonOut(event: PIXI.FederatedPointerEvent): void {
        (event.currentTarget as PIXI.Sprite).scale.set(GAME_CONSTANTS.UI.BUTTON_SCALE_NORMAL);
    }
}
