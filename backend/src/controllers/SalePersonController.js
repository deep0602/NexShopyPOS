class SalePersonController {
    constructor(salePersonService) {
      this.salePersonService = salePersonService;
    }
  
    getAll = (req, res) => {
      const salePersons = this.salePersonService.getAllSalePersons();
      res.json(salePersons);
    };
  
    getById = (req, res) => {
      const salePerson = this.salePersonService.getSalePersonById(Number(req.params.id));
      if (salePerson) {
        res.json(salePerson);
      } else {
        res.status(404).json({ error: 'Sale person not found' });
      }
    };
  
    create = (req, res) => {
      const { name, commission } = req.body;
      const id = this.salePersonService.addSalePerson({ name, commission });
      res.status(201).json({ id });
    };
  
    update = (req, res) => {
      const { id, name, commission } = req.body;
      const result = this.salePersonService.updateSalePerson({ id, name, commission });
      if (result.changes > 0) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: 'Sale person not found' });
      }
    };
  
    delete = (req, res) => {
      const { id } = req.params;
      const result = this.salePersonService.deleteSalePerson(Number(id));
      if (result.changes > 0) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: 'Sale person not found' });
      }
    };
  }
  
  module.exports = SalePersonController;
  