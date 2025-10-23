// Game configuration types
export interface GameConfig {
    width: number;
    height: number;
    backgroundColor: number;
    resolution: number;
    autoDensity: boolean;
}

// Reel configuration types
export interface ReelConfig {
    symbolCount: number;
    symbolSize: number;
    spinSpeed: number;
    slowdownRate: number;
}

// Slot machine configuration types
export interface SlotMachineConfig {
    reelCount: number;
    symbolsPerReel: number;
    symbolSize: number;
    reelHeight: number;
    reelSpacing: number;
}

// Asset types
export interface AssetBundle {
    name: string;
    srcs: string;
}

export interface SpineData {
    spineData: unknown;
}

// Sound types
export interface SoundConfig {
    volume: number;
    preload: boolean;
}

// Animation types
export interface AnimationState {
    isPlaying: boolean;
    currentAnimation: string;
    loop: boolean;
}

// Event types
export interface GameEvent {
    type: string;
    data?: unknown;
}

// UI types
export interface ButtonState {
    isEnabled: boolean;
    isHovered: boolean;
    scale: number;
}

// Constants
export const SYMBOL_TEXTURES: readonly string[] = [
    'symbol1.png',
    'symbol2.png',
    'symbol3.png',
    'symbol4.png',
    'symbol5.png',
] as const;

export const DEFAULT_CONFIG: GameConfig = {
    width: 1280,
    height: 800,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
};

export const DEFAULT_REEL_CONFIG: ReelConfig = {
    symbolCount: 6,
    symbolSize: 150,
    spinSpeed: 50,
    slowdownRate: 0.95,
};

export const DEFAULT_SLOT_MACHINE_CONFIG: SlotMachineConfig = {
    reelCount: 4,
    symbolsPerReel: 6,
    symbolSize: 150,
    reelHeight: 150,
    reelSpacing: 10,
};
