class CustomerRepository {
  constructor(db) {
    this.db = db;
  }

  create(customer) {
    const stmt = this.db.prepare('INSERT INTO customers (name, phone, email, address) VALUES (?, ?, ?, ?)');
    const info = stmt.run(customer.name, customer.phone, customer.email, customer.address);
    return info.lastInsertRowid;
  }

  findAll() {
    return this.db.prepare('SELECT * FROM customers').all();
  }

  findById(id) {
    return this.db.prepare('SELECT * FROM customers WHERE id = ?').get(id);
  }

  update(customer) {
    const stmt = this.db.prepare('UPDATE customers SET name = ?, phone = ?, email = ?, address = ? WHERE id = ?');
    return stmt.run(customer.name, customer.phone, customer.email, customer.address, customer.id);
  }

  delete(id) {
    return this.db.prepare('DELETE FROM customers WHERE id = ?').run(id);
  }
}

module.exports = CustomerRepository;
