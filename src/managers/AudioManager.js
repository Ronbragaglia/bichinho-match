export class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.muted = localStorage.getItem('bichinho_muted') === 'true';
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('bichinho_muted', this.muted.toString());

    if (this.scene.sound) {
      this.scene.sound.mute = this.muted;
    }
  }

  play(key, config = {}) {
    if (!this.muted && this.scene.cache.audio.exists(key)) {
      this.scene.sound.play(key, config);
    }
  }
}
