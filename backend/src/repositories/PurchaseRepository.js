class PurchaseRepository {
  constructor(db) {
    this.db = db;
  }

  create(purchase) {
    const stmt = this.db.prepare('INSERT INTO purchases (supplierId, date, total, paid, due) VALUES (?, ?, ?, ?, ?)');
    const info = stmt.run(purchase.supplierId, purchase.date, purchase.total, purchase.paid, purchase.due);
    return info.lastInsertRowid;
  }

  findAll() {
    return this.db.prepare('SELECT * FROM purchases').all();
  }

  findById(id) {
    return this.db.prepare('SELECT * FROM purchases WHERE id = ?').get(id);
  }

  update(purchase) {
    const stmt = this.db.prepare('UPDATE purchases SET supplierId = ?, date = ?, total = ?, paid = ?, due = ? WHERE id = ?');
    return stmt.run(purchase.supplierId, purchase.date, purchase.total, purchase.paid, purchase.due, purchase.id);
  }

  delete(id) {
    return this.db.prepare('DELETE FROM purchases WHERE id = ?').run(id);
  }
}

module.exports = PurchaseRepository;
