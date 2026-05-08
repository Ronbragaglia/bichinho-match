import { gameConfig } from './config/gameConfig.js';

const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});
