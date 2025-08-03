const express = require('express');
const router = express.Router();

module.exports = (purchaseController) => {
  router.get('/', purchaseController.getAll);
  router.get('/:id', purchaseController.getById);
  router.post('/', purchaseController.create);
  router.put('/', purchaseController.update);
  router.delete('/:id', purchaseController.delete);
  return router;
};
