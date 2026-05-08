import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    const { width, height } = this.cameras.main;

    // Loading bar
    const barW = width * 0.6;
    const barH = 30;
    const barX = (width - barW) / 2;
    const barY = height / 2;

    const bg = this.add.rectangle(width / 2, barY, barW, barH, 0x16213e);
    bg.setStrokeStyle(2, 0xFFD93D);
    const fill = this.add.rectangle(barX + 2, barY, 0, barH - 4, 0xFFD93D);
    fill.setOrigin(0, 0.5);

    const loadingText = this.add.text(width / 2, barY - 40, 'Carregando...', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      color: '#FFD93D',
    }).setOrigin(0.5);

    this.load.on('progress', (value) => {
      fill.width = (barW - 4) * value;
    });

    this.load.on('complete', () => {
      loadingText.setText('Pronto!');
    });

    // Generate placeholder textures
    this.createPlaceholderAssets();
  }

  createPlaceholderAssets() {
    // Card back texture
    const cardBack = this.make.graphics({ add: false });
    cardBack.fillStyle(0x16213e);
    cardBack.fillRoundedRect(0, 0, 120, 160, 12);
    cardBack.lineStyle(3, 0xFFD93D);
    cardBack.strokeRoundedRect(0, 0, 120, 160, 12);
    cardBack.fillStyle(0xFFD93D);
    cardBack.fillText('?', 50, 60);
    cardBack.generateTexture('card_back', 120, 160);

    // Animal card textures with colored rectangles
    const animals = [
      { id: 'gato', color: 0xFF6B6B, letter: 'G' },
      { id: 'cachorro', color: 0xC0926F, letter: 'C' },
      { id: 'coelho', color: 0xF8C8DC, letter: 'Co' },
      { id: 'urso', color: 0x8B4513, letter: 'U' },
      { id: 'panda', color: 0x666666, letter: 'P' },
      { id: 'leao', color: 0xFFA500, letter: 'L' },
      { id: 'elefante', color: 0x808080, letter: 'E' },
      { id: 'macaco', color: 0xD2691E, letter: 'M' },
      { id: 'pinguim', color: 0x2C3E50, letter: 'Pi' },
      { id: 'sapo', color: 0x27AE60, letter: 'S' },
      { id: 'coruja', color: 0x795548, letter: 'Cr' },
      { id: 'raposa', color: 0xFF5722, letter: 'R' },
    ];

    animals.forEach(({ id, color }) => {
      const g = this.make.graphics({ add: false });
      g.fillStyle(0xFFFFFF);
      g.fillRoundedRect(0, 0, 120, 160, 12);
      g.fillStyle(color);
      g.fillRoundedRect(10, 10, 100, 140, 8);
      g.generateTexture(`animal_${id}`, 120, 160);
    });

    // Star texture
    const star = this.make.graphics({ add: false });
    star.fillStyle(0xFFD93D);
    star.fillCircle(16, 16, 16);
    star.generateTexture('star', 32, 32);

    // Particle texture
    const particle = this.make.graphics({ add: false });
    particle.fillStyle(0xFFFFFF);
    particle.fillCircle(4, 4, 4);
    particle.generateTexture('particle', 8, 8);

    // Button texture
    const btn = this.make.graphics({ add: false });
    btn.fillStyle(0x4ECDC4);
    btn.fillRoundedRect(0, 0, 200, 60, 15);
    btn.generateTexture('button', 200, 60);
  }

  create() {
    this.scene.start('MenuScene');
  }
}
