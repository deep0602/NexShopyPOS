class InvoiceItem {
  constructor(id, invoiceId, productId, quantity, price, discount, salePersonId) {
    this.id = id;
    this.invoiceId = invoiceId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.discount = discount;
    this.salePersonId = salePersonId;
  }
}

module.exports = InvoiceItem; 