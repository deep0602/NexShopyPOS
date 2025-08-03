const express = require('express');
const router = express.Router();

module.exports = (invoiceController) => {
  router.get('/', invoiceController.getAll);
  router.get('/:id', invoiceController.getById);
  router.post('/', invoiceController.create);
  router.put('/', invoiceController.update);
  router.delete('/:id', invoiceController.delete);
  router.get('/sale_person/:salePersonId/startDate/:startDate/endDate/:endDate', invoiceController.getBySalePersonId);
  return router;
};
