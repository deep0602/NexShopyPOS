const express = require('express');
const router = express.Router();

module.exports = (expenseController) => {
  router.get('/', expenseController.getAll);
  router.get('/:id', expenseController.getById);
  router.post('/', expenseController.create);
  router.put('/', expenseController.update);
  router.delete('/:id', expenseController.delete);
  return router;
};
