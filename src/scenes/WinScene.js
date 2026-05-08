import Phaser from 'phaser';
import { COLORS } from '../config/constants.js';
import { LEVELS } from '../config/levels.js';
import { ParticleManager } from '../objects/ParticleManager.js';
import { StarRating } from '../objects/StarRating.js';

export class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WinScene' });
  }

  init(data) {
    this.levelId = data.levelId;
    this.score = data.score;
    this.stars = data.stars;
    this.moves = data.moves;
    this.timeRemaining = data.timeRemaining;
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.rectangle(width / 2, height / 2, width, height, COLORS.background);

    // Confetti
    const particleManager = new ParticleManager(this);
    particleManager.confetti(width / 2, height * 0.1);

    // Title
    const title = this.add.text(width / 2, height * 0.15, 'Parabens!', {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: '52px',
      color: '#FFD93D',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: title,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Stars
    new StarRating(this, width / 2, height * 0.3, this.stars);

    // Stats
    const statsY = height * 0.45;
    const stats = [
      `Pontuacao: ${this.score}`,
      `Jogadas: ${this.moves}`,
      `Tempo restante: ${this.timeRemaining}s`,
    ];

    stats.forEach((text, i) => {
      this.add.text(width / 2, statsY + i * 35, text, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '22px',
        color: '#FFFFFF',
      }).setOrigin(0.5);
    });

    // Buttons
    const btnY = height * 0.7;

    // Retry button
    this.createButton(width / 2 - 120, btnY, 'Repetir', COLORS.error, () => {
      this.scene.start('GameScene', { levelId: this.levelId });
    });

    // Next level button
    const hasNextLevel = this.levelId < LEVELS.length;
    if (hasNextLevel) {
      this.createButton(width / 2 + 120, btnY, 'Proximo', COLORS.success, () => {
        this.scene.start('GameScene', { levelId: this.levelId + 1 });
      });
    }

    // Back to levels
    this.createButton(width / 2, btnY + 80, 'Niveis', COLORS.button, () => {
      this.scene.start('LevelSelectScene');
    });
  }

  createButton(x, y, label, color, callback) {
    const container = this.add.container(x, y);
    const bg = this.add.rectangle(0, 0, 180, 50, color, 1).setInteractive({ useHandCursor: true });
    bg.setStrokeStyle(2, 0xFFFFFF);
    const text = this.add.text(0, 0, label, {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: '20px',
      color: '#FFFFFF',
    }).setOrigin(0.5);
    container.add([bg, text]);

    bg.on('pointerover', () => {
      this.tweens.add({ targets: container, scaleX: 1.05, scaleY: 1.05, duration: 100 });
    });
    bg.on('pointerout', () => {
      this.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 100 });
    });
    bg.on('pointerdown', callback);

    return container;
  }
}
