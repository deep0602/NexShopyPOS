class InvoiceItemController {
  constructor(invoiceItemService) {
    this.invoiceItemService = invoiceItemService;
  }

  getAll = (req, res) => {
    const invoiceItems = this.invoiceItemService.getAllInvoiceItems();
    res.json(invoiceItems);
  };

  getById = (req, res) => {
    const invoiceItem = this.invoiceItemService.getByInvoiceId(Number(req.params.id));
    if (invoiceItem) {
      res.json(invoiceItem);
    } else {
      res.status(404).json({ error: 'Invoice item not found' });
    }
  };

  getBySalePersonId = (req, res) => {
    const salePersonId = req.params.salePersonId;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const invoiceItems = this.invoiceItemService.getBySalePersonId(salePersonId, startDate, endDate);
    res.json(invoiceItems);
  };
  create = (req, res) => {
    const { invoiceId, productId, quantity, price, discount, salePersonId } = req.body;
    const id = this.invoiceItemService.addInvoiceItem({ invoiceId, productId, quantity, price, discount, salePersonId });
    res.status(201).json({ id });
  };

  update = (req, res) => {
    const { id, invoiceId, productId, quantity, price, discount, salePersonId } = req.body;
    const result = this.invoiceItemService.updateInvoiceItem({ id, invoiceId, productId, quantity, price, discount, salePersonId });
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Invoice item not found' });
    }
  };

  delete = (req, res) => {
    const { id } = req.params;
    const result = this.invoiceItemService.deleteInvoiceItem(Number(id));
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Invoice item not found' });
    }
  };
}

module.exports = InvoiceItemController;
