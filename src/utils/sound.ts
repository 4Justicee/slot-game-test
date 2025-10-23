import { Howl } from 'howler';

interface SoundCache {
    [key: string]: Howl;
}

const soundCache: SoundCache = {};

export const sound = {
    add: (alias: string, url: string): void => {
        try {
            const howl = new Howl({
                src: [url],
                volume: 0.7,
                preload: true,
            });
            
            soundCache[alias] = howl;
            console.log(`Sound added: ${alias} from ${url}`);
        } catch (error) {
            console.error(`Error adding sound ${alias}:`, error);
        }
    },
    
    play: (alias: string): void => {
        try {
            const howl = soundCache[alias];
            if (howl) {
                howl.play();
                console.log(`Playing sound: ${alias}`);
            } else {
                console.warn(`Sound not found: ${alias}`);
            }
        } catch (error) {
            console.error(`Error playing sound ${alias}:`, error);
        }
    },
    
    stop: (alias: string): void => {
        try {
            const howl = soundCache[alias];
            if (howl) {
                howl.stop();
                console.log(`Stopped sound: ${alias}`);
            }
        } catch (error) {
            console.error(`Error stopping sound ${alias}:`, error);
        }
    },
    
    setVolume: (alias: string, volume: number): void => {
        try {
            const howl = soundCache[alias];
            if (howl) {
                howl.volume(volume);
            }
        } catch (error) {
            console.error(`Error setting volume for sound ${alias}:`, error);
        }
    }
};
