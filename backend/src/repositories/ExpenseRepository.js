class ExpenseRepository {
  constructor(db) {
    this.db = db;
  }

  create(expense) {
    const stmt = this.db.prepare('INSERT INTO expenses (amount, date, remarks) VALUES (?, ?, ?)');
    const info = stmt.run(expense.amount, expense.date, expense.remarks);
    return info.lastInsertRowid;
  }

  findAll() {
    return this.db.prepare('SELECT * FROM expenses').all();
  }

  findById(id) {
    return this.db.prepare('SELECT * FROM expenses WHERE id = ?').get(id);
  }

  update(expense) {
    const stmt = this.db.prepare('UPDATE expenses SET amount = ?, date = ?, remarks = ? WHERE id = ?');
    return stmt.run(expense.amount, expense.date, expense.remarks, expense.id);
  }

  delete(id) {
    return this.db.prepare('DELETE FROM expenses WHERE id = ?').run(id);
  }
}

module.exports = ExpenseRepository;
