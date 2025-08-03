class SalePersonRepository {
    constructor(db) {
      this.db = db;
    }
  
    create(salePerson) {
      const stmt = this.db.prepare('INSERT INTO sale_persons (name, commission) VALUES (?, ?)');
      const info = stmt.run(salePerson.name, salePerson.commission);
      return info.lastInsertRowid;
    }
  
    findAll() {
      return this.db.prepare('SELECT * FROM sale_persons').all();
    }
  
    findById(id) {
      return this.db.prepare('SELECT * FROM sale_persons WHERE id = ?').get(id);
    }
  
    update(salePerson) {
      const stmt = this.db.prepare('UPDATE sale_persons SET name = ?, commission = ? WHERE id = ?');
      return stmt.run(salePerson.name, salePerson.commission, salePerson.id);
    }
  
    delete(id) {
      return this.db.prepare('DELETE FROM sale_persons WHERE id = ?').run(id);
    }
  }
  
  module.exports = SalePersonRepository;
  