const express = require('express');
const router = express.Router();

module.exports = (customerController) => {
  router.get('/', customerController.getAll);
  router.get('/:id', customerController.getById);
  router.post('/', customerController.create);
  router.put('/:id', customerController.update);
  router.delete('/:id', customerController.delete);
  return router;
};
