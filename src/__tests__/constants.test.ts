import { GAME_CONSTANTS } from '../constants';

describe('Game Constants', () => {
  describe('GAME_CONSTANTS', () => {
    it('should have correct asset paths', () => {
      expect(GAME_CONSTANTS.ASSETS.IMAGES_PATH).toBe('assets/images/');
      expect(GAME_CONSTANTS.ASSETS.SPINES_PATH).toBe('assets/spines/');
      expect(GAME_CONSTANTS.ASSETS.SOUNDS_PATH).toBe('assets/sounds/');
    });

    it('should have correct symbol textures', () => {
      expect(GAME_CONSTANTS.SYMBOL_TEXTURES).toHaveLength(5);
      expect(GAME_CONSTANTS.SYMBOL_TEXTURES).toContain('symbol1.png');
      expect(GAME_CONSTANTS.SYMBOL_TEXTURES).toContain('symbol2.png');
      expect(GAME_CONSTANTS.SYMBOL_TEXTURES).toContain('symbol3.png');
      expect(GAME_CONSTANTS.SYMBOL_TEXTURES).toContain('symbol4.png');
      expect(GAME_CONSTANTS.SYMBOL_TEXTURES).toContain('symbol5.png');
    });

    it('should have correct animation settings', () => {
      expect(GAME_CONSTANTS.ANIMATION.SPIN_SPEED).toBe(50);
      expect(GAME_CONSTANTS.ANIMATION.SLOWDOWN_RATE).toBe(0.95);
      expect(GAME_CONSTANTS.ANIMATION.REEL_STOP_DELAY).toBe(200);
      expect(GAME_CONSTANTS.ANIMATION.REEL_STOP_TIMEOUT).toBe(400);
      expect(GAME_CONSTANTS.ANIMATION.WIN_CHECK_DELAY).toBe(500);
    });

    it('should have correct UI settings', () => {
      expect(GAME_CONSTANTS.UI.BUTTON_SCALE_HOVER).toBe(1.05);
      expect(GAME_CONSTANTS.UI.BUTTON_SCALE_NORMAL).toBe(1.0);
      expect(GAME_CONSTANTS.UI.BUTTON_WIDTH).toBe(150);
      expect(GAME_CONSTANTS.UI.BUTTON_HEIGHT).toBe(80);
      expect(GAME_CONSTANTS.UI.BUTTON_Y_OFFSET).toBe(50);
    });

    it('should have correct win probability', () => {
      expect(GAME_CONSTANTS.WIN_PROBABILITY).toBe(0.3);
    });

    it('should have correct slot machine configuration', () => {
      expect(GAME_CONSTANTS.DEFAULT_SLOT_MACHINE_CONFIG.reelCount).toBe(4);
      expect(GAME_CONSTANTS.DEFAULT_SLOT_MACHINE_CONFIG.symbolsPerReel).toBe(6);
      expect(GAME_CONSTANTS.DEFAULT_SLOT_MACHINE_CONFIG.symbolSize).toBe(150);
      expect(GAME_CONSTANTS.DEFAULT_SLOT_MACHINE_CONFIG.reelHeight).toBe(150);
      expect(GAME_CONSTANTS.DEFAULT_SLOT_MACHINE_CONFIG.reelSpacing).toBe(10);
    });
  });
});

