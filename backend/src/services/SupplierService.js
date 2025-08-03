class SupplierService {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  addSupplier(supplier) {
    return this.supplierRepository.create(supplier);
  }

  getAllSuppliers() {
    return this.supplierRepository.findAll();
  }

  getSupplierById(id) {
    return this.supplierRepository.findById(id);
  }

  updateSupplier(supplier) {
    return this.supplierRepository.update(supplier);
  }

  deleteSupplier(id) {
    return this.supplierRepository.delete(id);
  }
}

module.exports = SupplierService;
