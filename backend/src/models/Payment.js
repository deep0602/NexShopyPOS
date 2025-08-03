class Payment {
  constructor(id, type, refId, amount, date, remarks) {
    this.id = id;
    this.type = type; // 'customer' or 'supplier'
    this.refId = refId; // customerId or supplierId
    this.amount = amount;
    this.date = date;
    this.remarks = remarks;
  }
}

module.exports = Payment;
