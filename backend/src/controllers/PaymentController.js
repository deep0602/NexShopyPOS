class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  getAll = (req, res) => {
    const payments = this.paymentService.getAllPayments();
    res.json(payments);
  };

  getById = (req, res) => {
    const payment = this.paymentService.getPaymentById(Number(req.params.id));
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  };

  create = (req, res) => {
    const { type, refId, amount, date, remarks } = req.body;
    const id = this.paymentService.addPayment({ type, refId, amount, date, remarks });
    res.status(201).json({ id });
  };

  update = (req, res) => {
    const { id, type, refId, amount, date, remarks } = req.body;
    const result = this.paymentService.updatePayment({ id, type, refId, amount, date, remarks });
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  };

  delete = (req, res) => {
    const { id } = req.params;
    const result = this.paymentService.deletePayment(Number(id));
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  };
}

module.exports = PaymentController;
