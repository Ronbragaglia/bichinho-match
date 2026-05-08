import { SCORING } from '../config/constants.js';

export class ScoreManager {
  constructor() {
    this.score = 0;
    this.combo = 0;
  }

  addPoints(points) {
    this.score += points;
    return this.score;
  }

  getScore() {
    return this.score;
  }

  calculateStars(score, maxScore) {
    const ratio = score / maxScore;
    if (ratio >= SCORING.threeStarThreshold) return 3;
    if (ratio >= SCORING.twoStarThreshold) return 2;
    return 1;
  }

  reset() {
    this.score = 0;
    this.combo = 0;
  }
}
