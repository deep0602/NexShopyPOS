class InvoiceItemService {
  constructor(invoiceItemRepository) {
    this.invoiceItemRepository = invoiceItemRepository;
  }

  addInvoiceItem(invoiceItem) {
    return this.invoiceItemRepository.create(invoiceItem);
  }

  getAllInvoiceItems() {
    return this.invoiceItemRepository.getAll();
  }

  getInvoiceItemById(id) {
    return this.invoiceItemRepository.getById(id);
  }

  getBySalePersonId(salePersonId,startDate,endDate) {
    return this.invoiceItemRepository.getBySalePersonId(salePersonId,startDate,endDate);
  }
  getByInvoiceId(id)
  {
    return this.invoiceItemRepository.getByInvoiceId(id);
  }

  updateInvoiceItem(invoiceItem) {
    return this.invoiceItemRepository.update(invoiceItem);
  }

  deleteInvoiceItem(id) {
    return this.invoiceItemRepository.delete(id);
  }
}

module.exports = InvoiceItemService;
