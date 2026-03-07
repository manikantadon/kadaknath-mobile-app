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

// High-quality Sound Assets (Standard UI sounds)
const SOUNDS = {
  tap: 'https://cdn.pixabay.com/audio/2022/03/15/audio_78390a36da.mp3',
  success: 'https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3',
  error: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c1f9672bba.mp3',
  pop: 'https://cdn.pixabay.com/audio/2022/03/10/audio_5e29f0d362.mp3',
};

class HapticService {
  private static instance: HapticService;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private isUnlocked: boolean = false;

  private constructor() {
    // Setup unlock listener for mobile browser autoplay policies
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.unlockAudio();
        window.removeEventListener('click', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock);
      window.addEventListener('touchstart', unlock);
    }
  }

  static getInstance() {
    if (!HapticService.instance) {
      HapticService.instance = new HapticService();
    }
    return HapticService.instance;
  }

  private async unlockAudio() {
    if (this.isUnlocked) return;
    
    // Create and play silent buffers to unlock audio context
    for (const url of Object.values(SOUNDS)) {
      try {
        const audio = new Audio(url);
        audio.volume = 0;
        await audio.play().catch(() => {});
        this.audioCache.set(url, audio);
      } catch (e) {
        console.warn('Initial unlock failed for:', url);
      }
    }
    this.isUnlocked = true;
    console.log('Audio feedback system unlocked');
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
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // If it failed, try unlocking again
          if (!this.isUnlocked) this.unlockAudio();
          console.debug('Playback blocked by browser policy');
        });
      }
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
    this.playSound(SOUNDS.tap, 0.1);
  }

  mediumTap() {
    this.vibrate(PATTERNS.medium);
    this.playSound(SOUNDS.tap, 0.2);
  }

  success() {
    this.vibrate(PATTERNS.success);
    this.playSound(SOUNDS.success, 0.4);
  }

  error() {
    this.vibrate(PATTERNS.error);
    this.playSound(SOUNDS.error, 0.4);
  }

  impact() {
    this.vibrate(PATTERNS.heavy);
    this.playSound(SOUNDS.pop, 0.3);
  }
}

export const haptics = HapticService.getInstance();
