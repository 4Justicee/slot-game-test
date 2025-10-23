import * as PIXI from 'pixi.js';
import { sound } from './sound';
import { type SpineData } from '../types';
import { GAME_CONSTANTS } from '../constants';

// Asset paths
const IMAGES_PATH = GAME_CONSTANTS.ASSETS.IMAGES_PATH;
const SPINES_PATH = GAME_CONSTANTS.ASSETS.SPINES_PATH;
const SOUNDS_PATH = GAME_CONSTANTS.ASSETS.SOUNDS_PATH;

// Asset lists
const IMAGES = GAME_CONSTANTS.IMAGES;
const SPINES = GAME_CONSTANTS.SPINES;
const SOUNDS = GAME_CONSTANTS.SOUNDS;

const textureCache: Record<string, PIXI.Texture> = {};
const spineCache: Record<string, SpineData> = {};

export class AssetLoader {
    constructor() {
        PIXI.Assets.init({ basePath: '' });
    }

    public async loadAssets(): Promise<void> {
        try {
            PIXI.Assets.addBundle('images', IMAGES.map(image => ({
                name: image,
                srcs: IMAGES_PATH + image
            })));

            PIXI.Assets.addBundle('spines', SPINES.map(spine => ({
                name: spine,
                srcs: SPINES_PATH + spine
            })));

            const imageAssets = await PIXI.Assets.loadBundle('images');
            console.log('Images loaded successfully');

            for (const [key, texture] of Object.entries(imageAssets)) {
                textureCache[key] = texture as PIXI.Texture;
            }

            try {
                const spineAssets = await PIXI.Assets.loadBundle('spines');
                console.log('Spine animations loaded successfully');

                for (const [key, spine] of Object.entries(spineAssets)) {
                    spineCache[key] = spine as SpineData;
                }
            } catch (error) {
                console.error('Error loading spine animations:', error);
            }

            await this.loadSounds();
            console.log('Assets loaded successfully');
        } catch (error) {
            console.error('Error loading assets:', error);
            throw error;
        }
    }

    private async loadSounds(): Promise<void> {
        try {
            SOUNDS.forEach(soundFile => {
                sound.add(soundFile.split('.')[0], SOUNDS_PATH + soundFile);
            });
        } catch (error) {
            console.error('Error loading sounds:', error);
            throw error;
        }
    }

    public static getTexture(name: string): PIXI.Texture {
        return textureCache[name];
    }

    public static getSpine(name: string): SpineData | undefined {
        return spineCache[name];
    }
}
