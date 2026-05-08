import Phaser from 'phaser';
import { COLORS } from '../config/constants.js';
import { AudioManager } from '../managers/AudioManager.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    // Background gradient effect
    this.add.rectangle(width / 2, height / 2, width, height, COLORS.background);

    // Title
    const title = this.add.text(width / 2, height * 0.25, 'Bichinho\nMatch', {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: '72px',
      color: '#FFD93D',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(0.5);

    // Bounce animation on title
    this.tweens.add({
      targets: title,
      y: title.y - 15,
      duration: 1500,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

    // Subtitle
    this.add.text(width / 2, height * 0.4, 'Jogo da Memoria', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '28px',
      color: '#FFFFFF',
    }).setOrigin(0.5);

    // Decorative emojis
    const emojis = ['🐱', '🐶', '🐰', '🐻', '🐼', '🦁'];
    emojis.forEach((emoji, i) => {
      const angle = (i / emojis.length) * Math.PI * 2;
      const radius = 100;
      const ex = width / 2 + Math.cos(angle) * radius;
      const ey = height * 0.55 + Math.sin(angle) * radius * 0.5;
      const emojiText = this.add.text(ex, ey, emoji, { fontSize: '40px' }).setOrigin(0.5);
      this.tweens.add({
        targets: emojiText,
        y: ey - 10,
        duration: 1000 + i * 200,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
      });
    });

    // Play button
    const playBtn = this.add.container(width / 2, height * 0.75);
    const btnBg = this.add.rectangle(0, 0, 220, 65, COLORS.button, 1).setInteractive({ useHandCursor: true });
    btnBg.setStrokeStyle(3, 0xFFFFFF);
    const btnText = this.add.text(0, 0, 'JOGAR', {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: '32px',
      color: '#FFFFFF',
    }).setOrigin(0.5);
    playBtn.add([btnBg, btnText]);

    btnBg.on('pointerover', () => {
      this.tweens.add({ targets: playBtn, scaleX: 1.05, scaleY: 1.05, duration: 100 });
    });
    btnBg.on('pointerout', () => {
      this.tweens.add({ targets: playBtn, scaleX: 1, scaleY: 1, duration: 100 });
    });
    btnBg.on('pointerdown', () => {
      this.scene.start('LevelSelectScene');
    });

    // Sound toggle
    this.audioManager = new AudioManager(this);
    const soundBtn = this.add.text(width - 50, 40, this.audioManager.isMuted() ? '🔇' : '🔊', {
      fontSize: '36px',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    soundBtn.on('pointerdown', () => {
      this.audioManager.toggleMute();
      soundBtn.setText(this.audioManager.isMuted() ? '🔇' : '🔊');
    });

    // Version
    this.add.text(width / 2, height - 30, 'v1.0.0', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#555555',
    }).setOrigin(0.5);
  }
}
