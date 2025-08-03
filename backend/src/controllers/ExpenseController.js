class ExpenseController {
  constructor(expenseService) {
    this.expenseService = expenseService;
  }

  getAll = (req, res) => {
    const expenses = this.expenseService.getAllExpenses();
    res.json(expenses);
  };

  getById = (req, res) => {
    const expense = this.expenseService.getExpenseById(Number(req.params.id));
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  };

  create = (req, res) => {
    const { amount, date, remarks } = req.body;
    const id = this.expenseService.addExpense({ amount, date, remarks });
    res.status(201).json({ id });
  };

  update = (req, res) => {
    const { id, amount, date, remarks } = req.body;
    const result = this.expenseService.updateExpense({ id, amount, date, remarks });
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  };

  delete = (req, res) => {
    const { id } = req.params;
    const result = this.expenseService.deleteExpense(Number(id));
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  };
}

module.exports = ExpenseController;
