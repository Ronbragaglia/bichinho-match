const STORAGE_KEY = 'bichinho_match_progress';

export class StorageManager {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { levels: {} };
    } catch {
      return { levels: {} };
    }
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  getLevelProgress(levelId) {
    return this.data.levels[levelId] || { completed: false, stars: 0, bestScore: 0 };
  }

  saveLevelProgress(levelId, progress) {
    const existing = this.getLevelProgress(levelId);
    this.data.levels[levelId] = {
      completed: progress.completed || existing.completed,
      stars: Math.max(progress.stars || 0, existing.stars),
      bestScore: Math.max(progress.bestScore || 0, existing.bestScore),
    };
    this.save();
  }

  resetAll() {
    this.data = { levels: {} };
    this.save();
  }
}
