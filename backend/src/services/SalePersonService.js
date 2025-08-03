class SalePersonService {
    constructor(salePersonRepository) {
      this.salePersonRepository = salePersonRepository;
    }
  
    addSalePerson(salePerson) {
      return this.salePersonRepository.create(salePerson);
    }
  
    getAllSalePersons() {
      return this.salePersonRepository.findAll();
    }
  
    getSalePersonById(id) {
      return this.salePersonRepository.findById(id);
    }
  
    updateSalePerson(salePerson) {
      return this.salePersonRepository.update(salePerson);
    }
  
    deleteSalePerson(id) {
      return this.salePersonRepository.delete(id);
    }
  }
  
  module.exports = SalePersonService;
  