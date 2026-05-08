import Phaser from 'phaser';
import { TIMING, COLORS } from '../config/constants.js';

export class Card extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height, animal) {
    super(scene, x, y);
    scene.add.existing(this);

    this.animal = animal;
    this.cardWidth = width;
    this.cardHeight = height;
    this.isFlipped = false;
    this.isMatched = false;

    // Card back
    this.back = scene.add.rectangle(0, 0, width, height, COLORS.cardBack);
    this.back.setStrokeStyle(2, COLORS.accent);

    // Question mark on back
    this.backLabel = scene.add.text(0, 0, '?', {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: `${Math.min(width, height) * 0.4}px`,
      color: '#FFD93D',
    }).setOrigin(0.5);

    // Card front
    this.front = scene.add.rectangle(0, 0, width, height, COLORS.cardFront);
    this.front.setStrokeStyle(2, animal.color);

    // Animal colored area
    this.animalBg = scene.add.rectangle(0, -height * 0.1, width * 0.8, height * 0.5, animal.color);
    this.animalBg.setAlpha(0.3);

    // Animal name
    this.nameLabel = scene.add.text(0, height * 0.3, animal.name, {
      fontFamily: 'Arial, sans-serif',
      fontSize: `${Math.min(width, height) * 0.15}px`,
      color: '#333',
    }).setOrigin(0.5);

    // Animal initial (placeholder for real art)
    this.animalLabel = scene.add.text(0, -height * 0.1, animal.id.charAt(0).toUpperCase(), {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: `${Math.min(width, height) * 0.35}px`,
      color: Phaser.Display.Color.IntegerToColor(animal.color).rgba,
    }).setOrigin(0.5);

    this.add([this.front, this.animalBg, this.animalLabel, this.nameLabel, this.back, this.backLabel]);

    // Start showing back
    this.front.setVisible(false);
    this.animalBg.setVisible(false);
    this.animalLabel.setVisible(false);
    this.nameLabel.setVisible(false);

    this.setSize(width, height);
    this.setInteractive({ useHandCursor: true });
  }

  showFront() {
    this.isFlipped = true;
    this.back.setVisible(false);
    this.backLabel.setVisible(false);
    this.front.setVisible(true);
    this.animalBg.setVisible(true);
    this.animalLabel.setVisible(true);
    this.nameLabel.setVisible(true);
  }

  showBack() {
    this.isFlipped = false;
    this.back.setVisible(true);
    this.backLabel.setVisible(true);
    this.front.setVisible(false);
    this.animalBg.setVisible(false);
    this.animalLabel.setVisible(false);
    this.nameLabel.setVisible(false);
  }

  flipToFront() {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      duration: TIMING.flipDuration / 2,
      ease: 'Linear',
      onComplete: () => {
        this.showFront();
        this.scene.tweens.add({
          targets: this,
          scaleX: 1,
          duration: TIMING.flipDuration / 2,
          ease: 'Linear',
        });
      },
    });
  }

  flipToBack() {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      duration: TIMING.flipDuration / 2,
      ease: 'Linear',
      onComplete: () => {
        this.showBack();
        this.scene.tweens.add({
          targets: this,
          scaleX: 1,
          duration: TIMING.flipDuration / 2,
          ease: 'Linear',
        });
      },
    });
  }

  setMatched() {
    this.isMatched = true;
    this.disableInteractive();
    this.scene.tweens.add({
      targets: this,
      alpha: 0.7,
      duration: 300,
    });
  }
}
