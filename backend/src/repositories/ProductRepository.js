class ProductRepository {
  constructor(db) {
    this.db = db;
  }

  create(product) {
    const stmt = this.db.prepare('INSERT INTO products (id, name, price, stockQty, unit, commission) VALUES (?, ?, ?, ?, ?, ?)');
    const info = stmt.run(product.id,product.name, product.price, product.stockQty, product.unit, product.commission);
    return info.lastInsertRowid;
  }

  findAll() {
    return this.db.prepare('SELECT * FROM products').all();
  }

  findById(id) {
    return this.db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  }

  update(product) {
    const stmt = this.db.prepare('UPDATE products SET name = ?, price = ?, stockQty = ?, unit = ? , commission = ? WHERE id = ?');
    return stmt.run(product.name, product.price, product.stockQty, product.unit, product.commission, product.id);
  }

  delete(id) {
    return this.db.prepare('DELETE FROM products WHERE id = ?').run(id);
  }
}

module.exports = ProductRepository;
