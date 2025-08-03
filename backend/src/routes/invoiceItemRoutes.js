const express = require('express');
const router = express.Router();


module.exports = (invoiceItemController) => {
  router.get('/', invoiceItemController.getAll);
  router.get('/:id', invoiceItemController.getById);
  router.post('/', invoiceItemController.create);
  router.put('/', invoiceItemController.update);
  router.delete('/:id', invoiceItemController.delete);
  router.get('/sale_person/:salePersonId/startDate/:startDate/endDate/:endDate', invoiceItemController.getBySalePersonId);
  return router;
};