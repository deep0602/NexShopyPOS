class PaymentService {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  addPayment(payment) {
    return this.paymentRepository.create(payment);
  }

  getAllPayments() {
    return this.paymentRepository.findAll();
  }

  getPaymentById(id) {
    return this.paymentRepository.findById(id);
  }

  updatePayment(payment) {
    return this.paymentRepository.update(payment);
  }

  deletePayment(id) {
    return this.paymentRepository.delete(id);
  }
}

module.exports = PaymentService;
