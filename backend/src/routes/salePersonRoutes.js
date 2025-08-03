const express = require('express');
const router = express.Router();

module.exports = (salePersonController) => {
  router.get('/', salePersonController.getAll);
  router.get('/:id', salePersonController.getById);
  router.post('/', salePersonController.create);
  router.put('/:id', salePersonController.update);
  router.delete('/:id', salePersonController.delete);
  return router;
};
