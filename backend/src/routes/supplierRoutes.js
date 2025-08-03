const express = require('express');
const router = express.Router();

module.exports = (supplierController) => {
  router.get('/', supplierController.getAll);
  router.get('/:id', supplierController.getById);
  router.post('/', supplierController.create);
  router.put('/', supplierController.update);
  router.delete('/:id', supplierController.delete);
  return router;
};
