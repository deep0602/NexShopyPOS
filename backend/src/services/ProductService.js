class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  addProduct(product) {
    return this.productRepository.create(product);
  }

  getAllProducts() {
    return this.productRepository.findAll();
  }

  getProductById(id) {
    return this.productRepository.findById(id);
  }

  updateProduct(product) {
    return this.productRepository.update(product);
  }

  deleteProduct(id) {
    return this.productRepository.delete(id);
  }
}

module.exports = ProductService;
