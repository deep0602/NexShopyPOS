class SettingsRepository {
  constructor(db) {
    this.db = db;
  }

  set(key, value) {
    const stmt = this.db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');
    return stmt.run(key, value);
  }

  get(key) {
    return this.db.prepare('SELECT * FROM settings WHERE key = ?').get(key);
  }

  getAll() {
    return this.db.prepare('SELECT * FROM settings').all();
  }
}

module.exports = SettingsRepository;
