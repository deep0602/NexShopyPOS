class InvoiceService {
  constructor(invoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  addInvoice(invoice) {
    return this.invoiceRepository.create(invoice);
  }

  getAllInvoices() {
    return this.invoiceRepository.findAll();
  }

  getInvoiceById(id) {
    return this.invoiceRepository.findById(id);
  }

  getBySalePersonId(salePersonId,startDate,endDate) {
    return this.invoiceRepository.getBySalePersonId(salePersonId,startDate,endDate);
  }

  updateInvoice(invoice) {
    return this.invoiceRepository.update(invoice);
  }

  deleteInvoice(id) {
    return this.invoiceRepository.delete(id);
  }
}

module.exports = InvoiceService;
