class CustomerService {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  addCustomer(customer) {
    return this.customerRepository.create(customer);
  }

  getAllCustomers() {
    return this.customerRepository.findAll();
  }

  getCustomerById(id) {
    return this.customerRepository.findById(id);
  }

  updateCustomer(customer) {
    return this.customerRepository.update(customer);
  }

  deleteCustomer(id) {
    return this.customerRepository.delete(id);
  }
}

module.exports = CustomerService;
