class SettingsService {
  constructor(settingsRepository) {
    this.settingsRepository = settingsRepository;
  }

  setSetting(key, value) {
    return this.settingsRepository.set(key, value);
  }

  getSetting(key) {
    return this.settingsRepository.get(key);
  }

  getAllSettings() {
    return this.settingsRepository.getAll();
  }
}

module.exports = SettingsService;
