const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth')

const router = express.Router();


router.get('/dashboard', isAuth, adminController.getIndex);



router.get('/warehouse', isAuth, adminController.getWarehouses);

router.get('/add-warehouse', isAuth, adminController.getAddWarehouse);

router.post('/add-warehouse', isAuth, adminController.postAddWarehouse);

// router.get('/edit-warehouse/:warehousId', isAuth, adminController.getEditWarehouse);
// router.put('/edit-warehouse', isAuth, adminController.putEditWarehouse);
router.post('/delete-warehouse', isAuth, adminController.postDeleteWarehouse);



router.get('/category', isAuth, adminController.getCategory);

router.post('/add-category', isAuth, adminController.postAddCategory);

router.post('/add-sub-category', isAuth, adminController.postAddSubCategory);

router.post('/delete-category', isAuth, adminController.postDeleteCategory);



router.get('/company_profile', isAuth, adminController.getCompanyProfile);

router.get('/currency', isAuth, adminController.getCurrency);

router.post('/add-currency', isAuth, adminController.postAddCurrency);


router.get('/customers', isAuth, adminController.getCustomers);
router.post('/add-customer', isAuth, adminController.postAddCustomer);
router.get('/customer-json', adminController.getCustomersJson);


router.get('/add-purchase', isAuth, adminController.getAddPurchase);



router.get('/items', isAuth, adminController.getItems);
router.get('/add-item', isAuth, adminController.getAddItems);
router.get('/items-json', adminController.getItemsJson);
router.post('/add-item', isAuth, adminController.postAddItems);
router.get('/item-info', isAuth, adminController.getItemInfo);




router.get('/order', isAuth, adminController.getOrder);
router.get('/add-order', isAuth, adminController.getAddOrder);


router.get('/product_return', isAuth, adminController.getProductReturn);

router.get('/purchase_order', isAuth, adminController.getPurchaseOrder);

router.get('/quantity', isAuth, adminController.getQuantity);

router.get('/sales_invoice', isAuth, adminController.getSalesInvocie);

router.get('/sales_return', isAuth, adminController.getSalesReturn);

router.get('/staff', isAuth, adminController.getStaff);

router.get('/stock', isAuth, adminController.getStock);

router.get('/suppliers', isAuth, adminController.getSuppliers);
router.post('/add-supplier', isAuth, adminController.postAddSupplier);
router.get('/supplier-json', adminController.getSupplierJson);



router.get('/user_permission', isAuth, adminController.getUserPermission);

router.get('/users', isAuth, adminController.getUsers);

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.put('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
