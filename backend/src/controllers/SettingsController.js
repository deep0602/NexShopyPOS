class SettingsController {
  constructor(settingsService) {
    this.settingsService = settingsService;
  }

  getAll = (req, res) => {
    const settings = this.settingsService.getAllSettings();
    res.json(settings);
  };

  getByKey = (req, res) => {
    const setting = this.settingsService.getSetting(req.params.key);
    if (setting) {
      res.json(setting);
    } else {
      res.status(404).json({ error: 'Setting not found' });
    }
  };

  set = (req, res) => {
    const { key, value } = req.body;
    const result = this.settingsService.setSetting(key, value);
    res.status(201).json({ success: true });
  };
}

module.exports = SettingsController;
