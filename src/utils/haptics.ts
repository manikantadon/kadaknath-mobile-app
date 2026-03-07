/**
 * Haptics and Sound Feedback Utility
 * Adds a "Native" feel to the web application
 */

// Vibration patterns (milliseconds)
const PATTERNS = {
  light: 10,
  medium: 30,
  heavy: 60,
  success: [10, 50, 10],
  error: [50, 100, 50, 100],
};

// Sound Assets (Lightweight base64 or public URLs)
const SOUNDS = {
  tap: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  error: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
  pop: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3',
};

class HapticService {
  private static instance: HapticService;
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  private constructor() {}

  static getInstance() {
    if (!HapticService.instance) {
      HapticService.instance = new HapticService();
    }
    return HapticService.instance;
  }

  private playSound(url: string, volume = 0.4) {
    try {
      let audio = this.audioCache.get(url);
      if (!audio) {
        audio = new Audio(url);
        this.audioCache.set(url, audio);
      }
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play().catch(() => {
        // Autoplay policy might block this if no user interaction yet
      });
    } catch (e) {
      console.warn('Sound playback failed', e);
    }
  }

  private vibrate(pattern: number | number[]) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }

  // Public methods
  lightTap() {
    this.vibrate(PATTERNS.light);
    this.playSound(SOUNDS.tap, 0.2);
  }

  mediumTap() {
    this.vibrate(PATTERNS.medium);
    this.playSound(SOUNDS.tap, 0.3);
  }

  success() {
    this.vibrate(PATTERNS.success);
    this.playSound(SOUNDS.success, 0.5);
  }

  error() {
    this.vibrate(PATTERNS.error);
    this.playSound(SOUNDS.error, 0.5);
  }

  impact() {
    this.vibrate(PATTERNS.heavy);
    this.playSound(SOUNDS.pop, 0.4);
  }
}

export const haptics = HapticService.getInstance();
