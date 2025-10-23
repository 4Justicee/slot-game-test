import { sound } from '../utils/sound';

// Mock Howler
jest.mock('howler', () => ({
  Howl: jest.fn().mockImplementation(() => ({
    play: jest.fn(),
    stop: jest.fn(),
    volume: jest.fn(),
  })),
}));

describe('Sound Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sound.add', () => {
    it('should add a sound without throwing errors', () => {
      expect(() => {
        sound.add('test-sound', 'test-url');
      }).not.toThrow();
    });
  });

  describe('sound.play', () => {
    it('should play a sound without throwing errors', () => {
      expect(() => {
        sound.play('test-sound');
      }).not.toThrow();
    });
  });

  describe('sound.stop', () => {
    it('should stop a sound without throwing errors', () => {
      expect(() => {
        sound.stop('test-sound');
      }).not.toThrow();
    });
  });

  describe('sound.setVolume', () => {
    it('should set volume without throwing errors', () => {
      expect(() => {
        sound.setVolume('test-sound', 0.5);
      }).not.toThrow();
    });
  });
});

