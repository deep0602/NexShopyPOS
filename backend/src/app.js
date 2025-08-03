const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database/db');
const ProductRepository = require('./repositories/ProductRepository');
const ProductService = require('./services/ProductService');
const ProductController = require('./controllers/ProductController');
const productRoutes = require('./routes/productRoutes');

const CustomerRepository = require('./repositories/CustomerRepository');
const CustomerService = require('./services/CustomerService');
const CustomerController = require('./controllers/CustomerController');
const customerRoutes = require('./routes/customerRoutes');

const SupplierRepository = require('./repositories/SupplierRepository');
const SupplierService = require('./services/SupplierService');
const SupplierController = require('./controllers/SupplierController');
const supplierRoutes = require('./routes/supplierRoutes');

const InvoiceRepository = require('./repositories/InvoiceRepository');
const InvoiceService = require('./services/InvoiceService');
const InvoiceController = require('./controllers/InvoiceController');
const invoiceRoutes = require('./routes/invoiceRoutes');

const InvoiceItemRepository = require('./repositories/InvoiceItemRepository');
const InvoiceItemService = require('./services/InvoiceItemService');
const InvoiceItemController = require('./controllers/InvoiceItemController');
const invoiceItemRoutes = require('./routes/invoiceItemRoutes');


const PurchaseRepository = require('./repositories/PurchaseRepository');
const PurchaseService = require('./services/PurchaseService');
const PurchaseController = require('./controllers/PurchaseController');
const purchaseRoutes = require('./routes/purchaseRoutes');

const PaymentRepository = require('./repositories/PaymentRepository');
const PaymentService = require('./services/PaymentService');
const PaymentController = require('./controllers/PaymentController');
const paymentRoutes = require('./routes/paymentRoutes');

const ExpenseRepository = require('./repositories/ExpenseRepository');
const ExpenseService = require('./services/ExpenseService');
const ExpenseController = require('./controllers/ExpenseController');
const expenseRoutes = require('./routes/expenseRoutes');

const SettingsRepository = require('./repositories/SettingsRepository');
const SettingsService = require('./services/SettingsService');
const SettingsController = require('./controllers/SettingsController');
const settingsRoutes = require('./routes/settingsRoutes');

const SalePersonRepository = require('./repositories/SalePersonRepository');
const SalePersonService = require('./services/SalePersonService');
const SalePersonController = require('./controllers/SalePersonController');
const salePersonRoutes = require('./routes/salePersonRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Dependency injection
const productRepository = new ProductRepository(db);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const customerRepository = new CustomerRepository(db);
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

const supplierRepository = new SupplierRepository(db);
const supplierService = new SupplierService(supplierRepository);
const supplierController = new SupplierController(supplierService);

const invoiceRepository = new InvoiceRepository(db);
const invoiceService = new InvoiceService(invoiceRepository);
const invoiceController = new InvoiceController(invoiceService);

const invoiceItemRepository = new InvoiceItemRepository(db);
const invoiceItemService = new InvoiceItemService(invoiceItemRepository);
const invoiceItemController = new InvoiceItemController(invoiceItemService);

const purchaseRepository = new PurchaseRepository(db);
const purchaseService = new PurchaseService(purchaseRepository);
const purchaseController = new PurchaseController(purchaseService);

const paymentRepository = new PaymentRepository(db);
const paymentService = new PaymentService(paymentRepository);
const paymentController = new PaymentController(paymentService);

const expenseRepository = new ExpenseRepository(db);
const expenseService = new ExpenseService(expenseRepository);
const expenseController = new ExpenseController(expenseService);

const settingsRepository = new SettingsRepository(db);
const settingsService = new SettingsService(settingsRepository);
const settingsController = new SettingsController(settingsService);

const salePersonRepository = new SalePersonRepository(db);
const salePersonService = new SalePersonService(salePersonRepository);
const salePersonController = new SalePersonController(salePersonService);

app.use('/api/products', productRoutes(productController));
app.use('/api/customers', customerRoutes(customerController));
app.use('/api/suppliers', supplierRoutes(supplierController));
app.use('/api/invoices', invoiceRoutes(invoiceController));
app.use('/api/invoice_items', invoiceItemRoutes(invoiceItemController));
app.use('/api/purchases', purchaseRoutes(purchaseController));
app.use('/api/payments', paymentRoutes(paymentController));
app.use('/api/expenses', expenseRoutes(expenseController));
app.use('/api/settings', settingsRoutes(settingsController));
app.use('/api/sale_persons', salePersonRoutes(salePersonController));


module.exports = app;
