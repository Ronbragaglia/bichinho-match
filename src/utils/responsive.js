export function getScaleFactor(game) {
  const { width, height } = game.scale.gameSize;
  const baseWidth = 720;
  const baseHeight = 1280;
  return Math.min(width / baseWidth, height / baseHeight);
}

export function centerX(game) {
  return game.scale.gameSize.width / 2;
}

export function centerY(game) {
  return game.scale.gameSize.height / 2;
}
