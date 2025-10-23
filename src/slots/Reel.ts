import * as PIXI from 'pixi.js';
import { AssetLoader } from '../utils/AssetLoader';
import { SYMBOL_TEXTURES } from '../types';
import { GAME_CONSTANTS } from '../constants';

const SPIN_SPEED = GAME_CONSTANTS.ANIMATION.SPIN_SPEED;
const SLOWDOWN_RATE = GAME_CONSTANTS.ANIMATION.SLOWDOWN_RATE;

export class Reel {
    public container: PIXI.Container;
    private symbols: PIXI.Sprite[];
    private symbolSize: number;
    private symbolCount: number;
    private speed: number = 0;
    private isSpinning: boolean = false;

    constructor(symbolCount: number, symbolSize: number) {
        this.container = new PIXI.Container();
        this.symbols = [];
        this.symbolSize = symbolSize;
        this.symbolCount = symbolCount + 1;

        this.createSymbols();
        this.applyMask();
    }

    private applyMask(): void {
        const mask = new PIXI.Graphics();
        mask.beginFill(0xFFFFFF);
        mask.drawRect(0, 0, (this.symbolCount - 1) * this.symbolSize, this.symbolSize); // Adjust width/height as needed
        mask.endFill();
    
        // Apply mask to the container
        this.container.mask = mask;
        this.container.addChild(mask); // Optional: comment this out if you want the mask itself to be invisible
    }

    private createSymbols(): void {
        // Create symbols for the reel, arranged horizontally
        for (let i = 0; i < this.symbolCount; i++) {
            const symbol = this.createRandomSymbol();
            const positionX = i * this.symbolSize;
            symbol.x = positionX;
            symbol.y = 0;
            symbol.width = this.symbolSize;
            symbol.height = this.symbolSize;
            
            this.symbols.push(symbol);
            this.container.addChild(symbol);
        }
    }

    private createRandomSymbol(): PIXI.Sprite {
        // Get a random symbol texture
        const randomIndex = Math.floor(Math.random() * SYMBOL_TEXTURES.length);
        const textureName = SYMBOL_TEXTURES[randomIndex];
        const texture = AssetLoader.getTexture(textureName);
        
        // Create a sprite with the texture
        return new PIXI.Sprite(texture);
    }

    public update(): void {
        if (!this.isSpinning && this.speed === 0) {
            this.snapToGrid();
            return;
        }

        for (const symbol of this.symbols) {
            symbol.x -= this.speed;
            
            // If symbol moves off screen to the left, wrap it to the right
            if (symbol.x < - this.symbolSize) {
                symbol.x += this.symbolCount * this.symbolSize;
                // Change symbol to a random one when wrapping
                const randomIndex = Math.floor(Math.random() * SYMBOL_TEXTURES.length);
                const textureName = SYMBOL_TEXTURES[randomIndex];
                symbol.texture = AssetLoader.getTexture(textureName);
            }
        }
    
        if (!this.isSpinning && this.speed > 0) {
            this.speed *= SLOWDOWN_RATE;
            if (this.speed < 0.5) {
                this.speed = 0;
                this.snapToGrid();
            }
        }
    }

    private snapToGrid(): void {
        for (const symbol of this.symbols) {
            const relativeX = symbol.x;
            const snappedIndex = Math.round(relativeX / this.symbolSize);
            const targetX = snappedIndex * this.symbolSize;
    
            // Smooth transition (manual interpolation — simple easing)
            symbol.x += (targetX - symbol.x) * 0.12;
    
            // Optional: if close enough, snap exactly
            if (Math.abs(symbol.x - targetX) < 0.5) {
                symbol.x = targetX;
            }
        }    
    }

    public startSpin(): void {
        this.isSpinning = true;
        this.speed = SPIN_SPEED;
    }

    public stopSpin(): void {
        this.isSpinning = false;
        // The reel will gradually slow down in the update method
    }
}
