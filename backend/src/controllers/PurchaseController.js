class PurchaseController {
  constructor(purchaseService) {
    this.purchaseService = purchaseService;
  }

  getAll = (req, res) => {
    const purchases = this.purchaseService.getAllPurchases();
    res.json(purchases);
  };

  getById = (req, res) => {
    const purchase = this.purchaseService.getPurchaseById(Number(req.params.id));
    if (purchase) {
      res.json(purchase);
    } else {
      res.status(404).json({ error: 'Purchase not found' });
    }
  };

  create = (req, res) => {
    const { supplierId, date, total, paid, due } = req.body;
    const id = this.purchaseService.addPurchase({ supplierId, date, total, paid, due });
    res.status(201).json({ id });
  };

  update = (req, res) => {
    const { id, supplierId, date, total, paid, due } = req.body;
    const result = this.purchaseService.updatePurchase({ id, supplierId, date, total, paid, due });
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Purchase not found' });
    }
  };

  delete = (req, res) => {
    const { id } = req.params;
    const result = this.purchaseService.deletePurchase(Number(id));
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Purchase not found' });
    }
  };
}

module.exports = PurchaseController;
