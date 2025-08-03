class InvoiceController {
  constructor(invoiceService) {
    this.invoiceService = invoiceService;
  }

  getAll = (req, res) => {
    const invoices = this.invoiceService.getAllInvoices();
    res.json(invoices);
  };

  getById = (req, res) => {
    const invoice = this.invoiceService.getInvoiceById(Number(req.params.id));
    if (invoice) {
      res.json(invoice);
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  };

  getBySalePersonId = (req, res) => {
    const salePersonId = req.params.salePersonId;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const invoices = this.invoiceService.getBySalePersonId(salePersonId, startDate, endDate);
    res.json(invoices);
  };
  create = (req, res) => {
    const { invoiceNumber, customerId, date, total, discount, paid, due,salePersonId } = req.body;
    const id = this.invoiceService.addInvoice({ invoiceNumber, customerId, date, total, discount, paid, due,salePersonId });
    res.status(201).json({ id });
  };

  update = (req, res) => {
    const { id, invoiceNumber, customerId, date, total, discount, paid, due,salePersonId } = req.body;
    const result = this.invoiceService.updateInvoice({ id, invoiceNumber, customerId, date, total, discount, paid, due,salePersonId });
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  };

  delete = (req, res) => {
    const { id } = req.params;
    const result = this.invoiceService.deleteInvoice(Number(id));
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  };
}

module.exports = InvoiceController;
