class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getAll = (req, res) => {
    const products = this.productService.getAllProducts();
    res.json(products);
  };

  getById = (req, res) => {
    const product = this.productService.getProductById(Number(req.params.id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  };

  create = (req, res) => {
    const { id, name, price, stockQty, unit, commission} = req.body;
    const id1 = this.productService.addProduct({ id, name, price, stockQty, unit, commission});
    res.status(201).json({ id1 });
  };

  update = (req, res) => {
    const { id, name, price, stockQty, unit, commission } = req.body;
    const result = this.productService.updateProduct({ id, name, price, stockQty, unit, commission  });
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  };

  delete = (req, res) => {
    const { id } = req.params;
    const result = this.productService.deleteProduct(Number(id));
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  };
}

module.exports = ProductController;
