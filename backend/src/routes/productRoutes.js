const express = require('express');
const router = express.Router();

module.exports = (productController) => {
  router.get('/', productController.getAll);
  router.get('/:id', productController.getById);
  router.post('/', productController.create);
  router.put('/:id', productController.update);
  router.delete('/:id', productController.delete);
  return router;
};
