import Phaser from 'phaser';
import { LEVELS } from '../config/levels.js';
import { ANIMALS, COLORS, SCORING, TIMING, CARD_SIZE } from '../config/constants.js';
import { Card } from '../objects/Card.js';
import { ParticleManager } from '../objects/ParticleManager.js';
import { ScoreManager } from '../managers/ScoreManager.js';
import { StorageManager } from '../managers/StorageManager.js';
import { shuffle } from '../utils/shuffle.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {
    this.levelId = data.levelId || 1;
    this.level = LEVELS.find(l => l.id === this.levelId);
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.combo = 0;
    this.isProcessing = false;
    this.isPreview = true;
    this.timeRemaining = this.level.timeLimit;
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.rectangle(width / 2, height / 2, width, height, COLORS.background);
    this.scoreManager = new ScoreManager();
    this.storageManager = new StorageManager();
    this.particleManager = new ParticleManager(this);

    // HUD
    this.createHUD();

    // Create card grid
    this.createCards();

    // Preview phase: show all cards face up, then flip them
    this.time.delayedCall(this.level.previewTime, () => {
      this.isPreview = false;
      this.cards.forEach(card => {
        if (!card.isMatched) {
          card.flipToBack();
        }
      });
      this.startTimer();
    });
  }

  createHUD() {
    const { width } = this.cameras.main;

    // Back button
    const backBtn = this.add.text(40, 30, '←', {
      fontSize: '32px',
      color: '#FFFFFF',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => this.scene.start('LevelSelectScene'));

    // Level title
    this.add.text(width / 2, 30, `Nivel ${this.levelId}`, {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: '24px',
      color: '#FFD93D',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);

    // Score
    this.scoreText = this.add.text(width - 20, 15, 'Pontos: 0', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#FFFFFF',
    }).setOrigin(1, 0);

    // Moves
    this.movesText = this.add.text(width - 20, 40, 'Jogadas: 0', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#AAA',
    }).setOrigin(1, 0);

    // Timer
    this.timerText = this.add.text(width / 2, 65, `⏱ ${this.timeRemaining}s`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      color: '#FFFFFF',
    }).setOrigin(0.5);

    // Combo
    this.comboText = this.add.text(width / 2, 95, '', {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: '22px',
      color: '#FF6B6B',
      stroke: '#000',
      strokeThickness: 2,
    }).setOrigin(0.5);
  }

  createCards() {
    const { width, height } = this.cameras.main;
    const { cols, rows, pairs } = this.level;

    // Select random animals for this level
    const selectedAnimals = shuffle([...ANIMALS]).slice(0, pairs);

    // Create pairs
    let cardData = [];
    selectedAnimals.forEach(animal => {
      cardData.push({ ...animal });
      cardData.push({ ...animal });
    });
    cardData = shuffle(cardData);

    // Calculate card dimensions to fit screen
    const availableWidth = width - 60;
    const availableHeight = height - 140;
    const cardW = Math.min(CARD_SIZE.width, (availableWidth - (cols - 1) * CARD_SIZE.gap) / cols);
    const cardH = Math.min(CARD_SIZE.height, (availableHeight - (rows - 1) * CARD_SIZE.gap) / rows);
    const totalW = cols * cardW + (cols - 1) * CARD_SIZE.gap;
    const totalH = rows * cardH + (rows - 1) * CARD_SIZE.gap;
    const offsetX = (width - totalW) / 2 + cardW / 2;
    const offsetY = (height - totalH) / 2 + cardH / 2 + 30;

    cardData.forEach((animal, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = offsetX + col * (cardW + CARD_SIZE.gap);
      const y = offsetY + row * (cardH + CARD_SIZE.gap);

      const card = new Card(this, x, y, cardW, cardH, animal);
      card.on('pointerdown', () => this.onCardClick(card));
      this.cards.push(card);
    });

    // Show all cards during preview
    this.cards.forEach(card => card.showFront());
  }

  startTimer() {
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeRemaining--;
        this.timerText.setText(`⏱ ${this.timeRemaining}s`);

        if (this.timeRemaining <= 10) {
          this.timerText.setColor('#FF6B6B');
        }

        if (this.timeRemaining <= 0) {
          this.timerEvent.remove();
          this.gameOver(false);
        }
      },
      loop: true,
    });
  }

  onCardClick(card) {
    if (this.isPreview || this.isProcessing) return;
    if (card.isFlipped || card.isMatched) return;

    card.flipToFront();
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.isProcessing = true;
      this.moves++;
      this.movesText.setText(`Jogadas: ${this.moves}`);

      const [card1, card2] = this.flippedCards;

      if (card1.animal.id === card2.animal.id) {
        // Match!
        this.time.delayedCall(TIMING.matchDelay, () => {
          this.onMatch(card1, card2);
        });
      } else {
        // Mismatch
        this.time.delayedCall(TIMING.mismatchDelay, () => {
          this.onMismatch(card1, card2);
        });
      }
    }
  }

  onMatch(card1, card2) {
    card1.setMatched();
    card2.setMatched();
    this.matchedPairs++;
    this.combo++;

    // Score calculation
    const comboBonus = this.combo > 1 ? Math.pow(SCORING.comboMultiplier, this.combo - 1) : 1;
    const points = Math.round(SCORING.matchPoints * comboBonus);
    this.scoreManager.addPoints(points);
    this.scoreText.setText(`Pontos: ${this.scoreManager.getScore()}`);

    // Combo text
    if (this.combo > 1) {
      this.comboText.setText(`Combo x${this.combo}!`);
      this.tweens.add({
        targets: this.comboText,
        scaleX: 1.3,
        scaleY: 1.3,
        duration: 200,
        yoyo: true,
      });
    }

    // Particles
    this.particleManager.matchBurst(card1.x, card1.y);
    this.particleManager.matchBurst(card2.x, card2.y);

    // Match animation
    [card1, card2].forEach(card => {
      this.tweens.add({
        targets: card,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 150,
        yoyo: true,
        ease: 'Back.easeOut',
      });
    });

    this.flippedCards = [];
    this.isProcessing = false;

    // Check win condition
    if (this.matchedPairs >= this.level.pairs) {
      this.time.delayedCall(500, () => this.gameOver(true));
    }
  }

  onMismatch(card1, card2) {
    this.combo = 0;
    this.comboText.setText('');

    // Shake animation
    [card1, card2].forEach(card => {
      this.tweens.add({
        targets: card,
        x: card.x + 5,
        duration: 50,
        yoyo: true,
        repeat: 3,
        onComplete: () => {
          card.flipToBack();
        },
      });
    });

    this.time.delayedCall(300, () => {
      this.flippedCards = [];
      this.isProcessing = false;
    });
  }

  gameOver(won) {
    if (this.timerEvent) this.timerEvent.remove();

    if (won) {
      const timeBonus = this.timeRemaining * SCORING.timeBonusPerSecond;
      this.scoreManager.addPoints(timeBonus);

      const finalScore = this.scoreManager.getScore();
      const maxScore = this.level.pairs * SCORING.matchPoints * 2 + this.level.timeLimit * SCORING.timeBonusPerSecond;
      const ratio = finalScore / maxScore;

      let stars = 1;
      if (ratio >= SCORING.threeStarThreshold) stars = 3;
      else if (ratio >= SCORING.twoStarThreshold) stars = 2;

      this.storageManager.saveLevelProgress(this.levelId, {
        completed: true,
        stars: Math.max(stars, this.storageManager.getLevelProgress(this.levelId).stars || 0),
        bestScore: Math.max(finalScore, this.storageManager.getLevelProgress(this.levelId).bestScore || 0),
      });

      this.scene.start('WinScene', {
        levelId: this.levelId,
        score: finalScore,
        stars,
        moves: this.moves,
        timeRemaining: this.timeRemaining,
      });
    } else {
      // Time's up - restart
      this.scene.restart({ levelId: this.levelId });
    }
  }
}
