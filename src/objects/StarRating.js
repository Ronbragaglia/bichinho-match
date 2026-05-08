export class StarRating {
  constructor(scene, x, y, starCount) {
    this.scene = scene;
    this.stars = [];

    const size = 48;
    const gap = 15;
    const totalWidth = 3 * size + 2 * gap;
    const startX = x - totalWidth / 2 + size / 2;

    for (let i = 0; i < 3; i++) {
      const sx = startX + i * (size + gap);
      const filled = i < starCount;
      const star = scene.add.text(sx, y, '★', {
        fontSize: `${size}px`,
        color: filled ? '#FFD93D' : '#555555',
      }).setOrigin(0.5).setScale(0);

      scene.tweens.add({
        targets: star,
        scale: 1,
        duration: 400,
        delay: 300 + i * 200,
        ease: 'Back.easeOut',
      });

      if (filled) {
        scene.tweens.add({
          targets: star,
          rotation: 0.1,
          duration: 500,
          delay: 700 + i * 200,
          yoyo: true,
          repeat: 1,
          ease: 'Sine.easeInOut',
        });
      }

      this.stars.push(star);
    }
  }
}
