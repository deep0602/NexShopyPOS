class ExpenseService {
  constructor(expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  addExpense(expense) {
    return this.expenseRepository.create(expense);
  }

  getAllExpenses() {
    return this.expenseRepository.findAll();
  }

  getExpenseById(id) {
    return this.expenseRepository.findById(id);
  }

  updateExpense(expense) {
    return this.expenseRepository.update(expense);
  }

  deleteExpense(id) {
    return this.expenseRepository.delete(id);
  }
}

module.exports = ExpenseService;
