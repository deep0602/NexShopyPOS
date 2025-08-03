class SupplierController {
  constructor(supplierService) {
    this.supplierService = supplierService;
  }

  getAll = (req, res) => {
    const suppliers = this.supplierService.getAllSuppliers();
    res.json(suppliers);
  };

  getById = (req, res) => {
    const supplier = this.supplierService.getSupplierById(Number(req.params.id));
    if (supplier) {
      res.json(supplier);
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  };

  create = (req, res) => {
    const { name, phone, email, address } = req.body;
    const id = this.supplierService.addSupplier({ name, phone, email, address });
    res.status(201).json({ id });
  };

  update = (req, res) => {
    const { id, name, phone, email, address } = req.body;
    const result = this.supplierService.updateSupplier({ id, name, phone, email, address });
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  };

  delete = (req, res) => {
    const { id } = req.params;
    const result = this.supplierService.deleteSupplier(Number(id));
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  };
}

module.exports = SupplierController;
