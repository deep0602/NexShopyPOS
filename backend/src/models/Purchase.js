class Purchase {
  constructor(id, supplierId, date, total, paid, due) {
    this.id = id;
    this.supplierId = supplierId;
    this.date = date;
    this.total = total;
    this.paid = paid;
    this.due = due;
  }
}

module.exports = Purchase;
