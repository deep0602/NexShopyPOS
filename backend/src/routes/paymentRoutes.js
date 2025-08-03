const express = require('express');
const router = express.Router();

module.exports = (paymentController) => {
  router.get('/', paymentController.getAll);
  router.get('/:id', paymentController.getById);
  router.post('/', paymentController.create);
  router.put('/', paymentController.update);
  router.delete('/:id', paymentController.delete);
  return router;
};
