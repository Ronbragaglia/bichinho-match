export class ParticleManager {
  constructor(scene) {
    this.scene = scene;
  }

  matchBurst(x, y) {
    const colors = [0x27AE60, 0xFFD93D, 0x4ECDC4, 0xFF6B6B];
    colors.forEach(color => {
      for (let i = 0; i < 5; i++) {
        const particle = this.scene.add.circle(x, y, 4, color);
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 50;

        this.scene.tweens.add({
          targets: particle,
          x: x + Math.cos(angle) * distance,
          y: y + Math.sin(angle) * distance,
          alpha: 0,
          scale: 0,
          duration: 500 + Math.random() * 300,
          ease: 'Cubic.easeOut',
          onComplete: () => particle.destroy(),
        });
      }
    });
  }

  confetti() {
    const colors = [0xFF6B6B, 0xFFD93D, 0x4ECDC4, 0x27AE60, 0x9B59B6, 0xFF5722];
    const { width } = this.scene.cameras.main;

    for (let i = 0; i < 60; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 3 + Math.random() * 5;
      const particle = this.scene.add.rectangle(
        Math.random() * width,
        -20 - Math.random() * 100,
        size,
        size * 2,
        color
      );

      this.scene.tweens.add({
        targets: particle,
        y: this.scene.cameras.main.height + 50,
        x: particle.x + (Math.random() - 0.5) * 200,
        rotation: Math.random() * 10,
        duration: 2000 + Math.random() * 2000,
        ease: 'Cubic.easeIn',
        delay: Math.random() * 1000,
        onComplete: () => particle.destroy(),
      });
    }
  }
}
