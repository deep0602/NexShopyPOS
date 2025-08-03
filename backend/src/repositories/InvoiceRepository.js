class InvoiceRepository {
  constructor(db) {
    this.db = db;
  }

  create(invoice) {
    const stmt = this.db.prepare('INSERT INTO invoices (invoiceNumber, customerId, date, total, discount, paid, due,salePersonId) VALUES (?, ?, ?, ?, ?, ?, ?,?)');
    const info = stmt.run(invoice.invoiceNumber, invoice.customerId, invoice.date, invoice.total, invoice.discount, invoice.paid, invoice.due,invoice.salePersonId);
    return info.lastInsertRowid;
  }

  findAll() {
    return this.db.prepare('SELECT * FROM invoices').all();
  }

  findById(id) {
    return this.db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);
  }

  getBySalePersonId(salePersonId,startDate,endDate) {
    return this.db.prepare('SELECT * FROM invoices WHERE salePersonId = ? AND date BETWEEN ? AND ?').all(salePersonId,startDate,endDate);
  }

  update(invoice) {
      const stmt = this.db.prepare('UPDATE invoices SET invoiceNumber = ?, customerId = ?, date = ?, total = ?, discount = ?, paid = ?, due = ?,salePersonId = ? WHERE id = ?');
    return stmt.run(invoice.invoiceNumber, invoice.customerId, invoice.date, invoice.total, invoice.discount, invoice.paid, invoice.due,invoice.salePersonId, invoice.id);
  }

  delete(id) {
    return this.db.prepare('DELETE FROM invoices WHERE id = ?').run(id);
  }
}

module.exports = InvoiceRepository;
