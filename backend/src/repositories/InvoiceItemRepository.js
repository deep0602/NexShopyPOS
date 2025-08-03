
const InvoiceItem = require('../models/InvoiceItem'); 
class InvoiceItemRepository {
    constructor(db) {
        this.db = db;
      }
  getAll() {
    const rows = this.db.prepare('SELECT * FROM invoice_items').all();
    return rows.map(row => new InvoiceItem(row.id, row.invoiceId, row.productId, row.quantity, row.price, row.discount, row.salePersonId));
  }

  getByInvoiceId(invoiceId) {
    const rows = this.db.prepare('SELECT * FROM invoice_items WHERE invoiceId = ?').all(invoiceId);
    return rows.map(row => new InvoiceItem(row.id, row.invoiceId, row.productId, row.quantity, row.price, row.discount, row.salePersonId));
  }

  getBySalePersonId(salePersonId,startDate,endDate) {
    const rows = this.db.prepare('SELECT * FROM invoice_items WHERE salePersonId = ? AND date BETWEEN ? AND ?').all(salePersonId,startDate,endDate);
    return rows.map(row => new InvoiceItem(row.id, row.invoiceId, row.productId, row.quantity, row.price, row.discount, row.salePersonId));
  }

  getById(id) {
    const row = this.db.prepare('SELECT * FROM invoice_items WHERE id = ?').get(id);
    if (!row) return null;
    return new InvoiceItem(row.id, row.invoiceId, row.productId, row.quantity, row.price, row.discount, row.salePersonId);
  }

  create(item) {
    const stmt = this.db.prepare('INSERT INTO invoice_items (invoiceId, productId, quantity, price, discount, salePersonId) VALUES (?, ?, ?, ?, ?, ?)');
    const info = stmt.run(item.invoiceId, item.productId, item.quantity, item.price, item.discount, item.salePersonId);
    return this.getById(info.lastInsertRowid);
  }

  delete(id) {
    return this.db.prepare('DELETE FROM invoice_items WHERE id = ?').run(id);
  }
}

module.exports = InvoiceItemRepository; 