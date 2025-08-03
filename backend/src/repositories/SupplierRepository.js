class SupplierRepository {
  constructor(db) {
    this.db = db;
  }

  create(supplier) {
    const stmt = this.db.prepare('INSERT INTO suppliers (name, phone, email, address) VALUES (?, ?, ?, ?)');
    const info = stmt.run(supplier.name, supplier.phone, supplier.email, supplier.address);
    return info.lastInsertRowid;
  }

  findAll() {
    return this.db.prepare('SELECT * FROM suppliers').all();
  }

  findById(id) {
    return this.db.prepare('SELECT * FROM suppliers WHERE id = ?').get(id);
  }

  update(supplier) {
    const stmt = this.db.prepare('UPDATE suppliers SET name = ?, phone = ?, email = ?, address = ? WHERE id = ?');
    return stmt.run(supplier.name, supplier.phone, supplier.email, supplier.address, supplier.id);
  }

  delete(id) {
    return this.db.prepare('DELETE FROM suppliers WHERE id = ?').run(id);
  }
}

module.exports = SupplierRepository;
