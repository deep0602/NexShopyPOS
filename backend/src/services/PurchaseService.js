class PurchaseService {
  constructor(purchaseRepository) {
    this.purchaseRepository = purchaseRepository;
  }

  addPurchase(purchase) {
    return this.purchaseRepository.create(purchase);
  }

  getAllPurchases() {
    return this.purchaseRepository.findAll();
  }

  getPurchaseById(id) {
    return this.purchaseRepository.findById(id);
  }

  updatePurchase(purchase) {
    return this.purchaseRepository.update(purchase);
  }

  deletePurchase(id) {
    return this.purchaseRepository.delete(id);
  }
}

module.exports = PurchaseService;
