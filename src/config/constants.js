export const ANIMALS = [
  { id: 'gato', name: 'Gato', emoji: '🐱', color: 0xFF6B6B },
  { id: 'cachorro', name: 'Cachorro', emoji: '🐶', color: 0xC0926F },
  { id: 'coelho', name: 'Coelho', emoji: '🐰', color: 0xF8C8DC },
  { id: 'urso', name: 'Urso', emoji: '🐻', color: 0x8B4513 },
  { id: 'panda', name: 'Panda', emoji: '🐼', color: 0x333333 },
  { id: 'leao', name: 'Leao', emoji: '🦁', color: 0xFFA500 },
  { id: 'elefante', name: 'Elefante', emoji: '🐘', color: 0x808080 },
  { id: 'macaco', name: 'Macaco', emoji: '🐵', color: 0xD2691E },
  { id: 'pinguim', name: 'Pinguim', emoji: '🐧', color: 0x2C3E50 },
  { id: 'sapo', name: 'Sapo', emoji: '🐸', color: 0x27AE60 },
  { id: 'coruja', name: 'Coruja', emoji: '🦉', color: 0x795548 },
  { id: 'raposa', name: 'Raposa', emoji: '🦊', color: 0xFF5722 },
];

export const COLORS = {
  background: 0x1a1a2e,
  cardBack: 0x16213e,
  cardFront: 0xFFFFFF,
  accent: 0xFFD93D,
  success: 0x27AE60,
  error: 0xE74C3C,
  text: 0xFFFFFF,
  textDark: 0x1a1a2e,
  starFilled: 0xFFD93D,
  starEmpty: 0x555555,
  locked: 0x444444,
  button: 0x4ECDC4,
  buttonHover: 0x45B7AA,
};

export const SCORING = {
  matchPoints: 100,
  comboMultiplier: 1.5,
  timeBonusPerSecond: 5,
  threeStarThreshold: 0.8,
  twoStarThreshold: 0.5,
};

export const TIMING = {
  flipDuration: 200,
  mismatchDelay: 800,
  matchDelay: 300,
  comboResetDelay: 2000,
};

export const CARD_SIZE = {
  width: 120,
  height: 160,
  gap: 15,
  cornerRadius: 12,
};
