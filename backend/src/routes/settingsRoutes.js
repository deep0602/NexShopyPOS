const express = require('express');
const router = express.Router();

module.exports = (settingsController) => {
  router.get('/', settingsController.getAll);
  router.get('/:key', settingsController.getByKey);
  router.post('/', settingsController.set);
  return router;
};
