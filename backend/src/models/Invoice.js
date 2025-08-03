class Invoice {
  constructor(id, invoiceNumber, customerId, date, total, discount, paid, due, salePersonId) {
    this.id = id;
    this.invoiceNumber = invoiceNumber;
    this.customerId = customerId;
    this.date = date;
    this.total = total;
    this.discount = discount;
    this.paid = paid;
    this.due = due;
    this.salePersonId = salePersonId;
  }
}

module.exports = Invoice;
