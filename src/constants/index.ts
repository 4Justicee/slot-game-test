// Game constants and configuration
export const GAME_CONSTANTS = {
    // Asset paths
    ASSETS: {
        IMAGES_PATH: 'assets/images/',
        SPINES_PATH: 'assets/spines/',
        SOUNDS_PATH: 'assets/sounds/',
    },
    
    // Symbol textures
    SYMBOL_TEXTURES: [
        'symbol1.png',
        'symbol2.png',
        'symbol3.png',
        'symbol4.png',
        'symbol5.png',
    ] as const,
    
    // Image assets
    IMAGES: [
        'symbol1.png',
        'symbol2.png',
        'symbol3.png',
        'symbol4.png',
        'symbol5.png',
        'background.png',
        'button_spin.png',
        'button_spin_disabled.png',
    ] as const,
    
    // Spine animations
    SPINES: [
        'big-boom-h.json',
        'base-feature-frame.json'
    ] as const,
    
    // Sound files
    SOUNDS: [
        'Reel spin.webm',
        'win.webm',
        'Spin button.webm',
    ] as const,
    
    // Animation settings
    ANIMATION: {
        SPIN_SPEED: 50,
        SLOWDOWN_RATE: 0.95,
        REEL_STOP_DELAY: 200,
        REEL_STOP_TIMEOUT: 400,
        WIN_CHECK_DELAY: 500,
    },
    
    // UI settings
    UI: {
        BUTTON_SCALE_HOVER: 1.05,
        BUTTON_SCALE_NORMAL: 1.0,
        BUTTON_WIDTH: 150,
        BUTTON_HEIGHT: 80,
        BUTTON_Y_OFFSET: 50,
    },
    
    // Win probability
    WIN_PROBABILITY: 0.3,
    DESIGN_WIDTH : 1280,
    DESIGN_HEIGHT : 800,
    // Default slot machine configuration
    DEFAULT_SLOT_MACHINE_CONFIG: {
        reelCount: 4,
        symbolsPerReel: 6,
        symbolSize: 150,
        reelHeight: 150,
        reelSpacing: 10,
    },
} as const;

// Type-safe access to constants
export type SymbolTexture = typeof GAME_CONSTANTS.SYMBOL_TEXTURES[number];
export type ImageAsset = typeof GAME_CONSTANTS.IMAGES[number];
export type SpineAsset = typeof GAME_CONSTANTS.SPINES[number];
export type SoundAsset = typeof GAME_CONSTANTS.SOUNDS[number];
