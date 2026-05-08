import Phaser from 'phaser';
import { LEVELS } from '../config/levels.js';
import { COLORS } from '../config/constants.js';
import { StorageManager } from '../managers/StorageManager.js';

export class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelSelectScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    const storage = new StorageManager();

    this.add.rectangle(width / 2, height / 2, width, height, COLORS.background);

    // Title
    this.add.text(width / 2, 60, 'Escolha o Nivel', {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: '36px',
      color: '#FFD93D',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // Back button
    const backBtn = this.add.text(50, 60, '←', {
      fontSize: '36px',
      color: '#FFFFFF',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => this.scene.start('MenuScene'));

    // Level grid (2 columns, 4 rows)
    const cols = 2;
    const btnWidth = 250;
    const btnHeight = 130;
    const gapX = 30;
    const gapY = 20;
    const startX = width / 2 - (btnWidth + gapX / 2);
    const startY = 140;

    LEVELS.forEach((level, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = startX + col * (btnWidth + gapX) + btnWidth / 2;
      const y = startY + row * (btnHeight + gapY) + btnHeight / 2;

      const progress = storage.getLevelProgress(level.id);
      const isUnlocked = level.id === 1 || storage.getLevelProgress(level.id - 1).completed;

      const container = this.add.container(x, y);

      // Card background
      const bg = this.add.rectangle(0, 0, btnWidth, btnHeight, isUnlocked ? 0x16213e : COLORS.locked, 1);
      bg.setStrokeStyle(2, isUnlocked ? COLORS.accent : 0x333333);
      container.add(bg);

      if (isUnlocked) {
        bg.setInteractive({ useHandCursor: true });

        // Level number
        container.add(this.add.text(0, -25, `Nivel ${level.id}`, {
          fontFamily: 'Arial Black, Arial, sans-serif',
          fontSize: '24px',
          color: '#FFFFFF',
        }).setOrigin(0.5));

        // Grid info
        container.add(this.add.text(0, 5, `${level.cols}x${level.rows}`, {
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          color: '#AAA',
        }).setOrigin(0.5));

        // Stars
        const starY = 30;
        for (let s = 0; s < 3; s++) {
          const filled = s < (progress.stars || 0);
          container.add(this.add.text(-20 + s * 20, starY, '★', {
            fontSize: '18px',
            color: filled ? '#FFD93D' : '#555',
          }).setOrigin(0.5));
        }

        bg.on('pointerover', () => {
          this.tweens.add({ targets: container, scaleX: 1.05, scaleY: 1.05, duration: 100 });
        });
        bg.on('pointerout', () => {
          this.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 100 });
        });
        bg.on('pointerdown', () => {
          this.scene.start('GameScene', { levelId: level.id });
        });
      } else {
        // Locked
        container.add(this.add.text(0, -10, '🔒', { fontSize: '36px' }).setOrigin(0.5));
        container.add(this.add.text(0, 25, `Nivel ${level.id}`, {
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          color: '#666',
        }).setOrigin(0.5));
      }
    });
  }
}
