class CustomerController {
  constructor(customerService) {
    this.customerService = customerService;
  }

  getAll = (req, res) => {
    const customers = this.customerService.getAllCustomers();
    res.json(customers);
  };

  getById = (req, res) => {
    const customer = this.customerService.getCustomerById(Number(req.params.id));
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  };

  create = (req, res) => {
    const { name, phone, email, address } = req.body;
    const id = this.customerService.addCustomer({ name, phone, email, address });
    res.status(201).json({ id });
  };

  update = (req, res) => {
    const { id, name, phone, email, address } = req.body;
    const result = this.customerService.updateCustomer({ id, name, phone, email, address });
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  };

  delete = (req, res) => {
    const { id } = req.params;
    const result = this.customerService.deleteCustomer(Number(id));
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  };
}

module.exports = CustomerController;
