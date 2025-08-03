class PaymentRepository {
  constructor(db) {
    this.db = db;
  }

  create(payment) {
    const stmt = this.db.prepare('INSERT INTO payments (type, refId, amount, date, remarks) VALUES (?, ?, ?, ?, ?)');
    const info = stmt.run(payment.type, payment.refId, payment.amount, payment.date, payment.remarks);
    return info.lastInsertRowid;
  }

  findAll() {
    return this.db.prepare('SELECT * FROM payments').all();
  }

  findById(id) {
    return this.db.prepare('SELECT * FROM payments WHERE id = ?').get(id);
  }

  update(payment) {
    const stmt = this.db.prepare('UPDATE payments SET type = ?, refId = ?, amount = ?, date = ?, remarks = ? WHERE id = ?');
    return stmt.run(payment.type, payment.refId, payment.amount, payment.date, payment.remarks, payment.id);
  }

  delete(id) {
    return this.db.prepare('DELETE FROM payments WHERE id = ?').run(id);
  }
}

module.exports = PaymentRepository;
