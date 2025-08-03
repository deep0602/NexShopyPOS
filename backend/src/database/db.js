const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../../pos.db');
const db = new Database(dbPath);

db.prepare(`CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY ,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  stockQty INTEGER NOT NULL,
  unit TEXT,
  commission REAL NOT NULL
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoiceNumber TEXT NOT NULL,
  customerId INTEGER,
  salePersonId INTEGER,
  date TEXT NOT NULL,
  total REAL NOT NULL,
  discount REAL DEFAULT 0,
  paid REAL DEFAULT 0,
  due REAL DEFAULT 0,
  FOREIGN KEY(customerId) REFERENCES customers(id),
  FOREIGN KEY(salePersonId) REFERENCES sale_persons(id)

)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS invoice_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoiceId INTEGER NOT NULL,
  productId TEXT NOT NULL,
  salePersonId INTEGER,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  discount REAL DEFAULT 0,
  FOREIGN KEY(invoiceId) REFERENCES invoices(id),
  FOREIGN KEY(productId) REFERENCES products(id),
  FOREIGN KEY(salePersonId) REFERENCES sale_persons(id)
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplierId INTEGER,
  date TEXT NOT NULL,
  total REAL NOT NULL,
  paid REAL DEFAULT 0,
  due REAL DEFAULT 0,
  FOREIGN KEY(supplierId) REFERENCES suppliers(id)
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS purchase_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  purchaseId INTEGER NOT NULL,
  productId INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  FOREIGN KEY(purchaseId) REFERENCES purchases(id),
  FOREIGN KEY(productId) REFERENCES products(id)
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL, -- 'customer' or 'supplier'
  refId INTEGER NOT NULL, -- customerId or supplierId
  amount REAL NOT NULL,
  date TEXT NOT NULL,
  remarks TEXT
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount REAL NOT NULL,
  date TEXT NOT NULL,
  remarks TEXT
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS sale_persons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  commission REAL NOT NULL
)`).run();

module.exports = db;
