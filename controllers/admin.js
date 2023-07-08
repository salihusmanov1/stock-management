const Product = require('../models/product');
const Warehouse = require('../models/warehouse');
const Category = require('../models/category');
const category = require('../models/category');
const SubCategory = require('../models/sub_category');
const Item = require('../models/item');
const Inventory = require('../models/inventory');
const Customer = require('../models/customer');
const Supplier = require('../models/supplier');
const Currency = require('../models/currency');




exports.getIndex = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/dashboard', {
    pageTitle: 'Dashboard',
    path: '/admin/dashboard',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getCategory = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  Category.find()
    .then(categories => {
      // console.log(category);
      res.render('admin/category', {
        i: 0,
        cates: categories,
        pageTitle: 'Category',
        path: '/admin/category',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postAddCategory = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const category = new Category({
    name: name,
    description: description,
    userId: req.user
  });
  category
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Category');
      res.redirect('/admin/category');
      // next();
    })
    .catch(err => {
      console.log(err);
    });
};




exports.postAddSubCategory = (req, res, next) => {
  const id = req.body.category_id;
  const name = req.body.name;
  const description = req.body.description;
  const subcategory = new SubCategory({
    name: name,
    description: description,
    categoryId: id,
    userId: req.user
  });
  subcategory
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Sub Category');
      res.redirect('/admin/category');
      // next();
    })
    .catch(err => {
      console.log(err);
    });
};




exports.getWarehouses = (req, res, next) => {
  Warehouse.find()
    .then(warehouses => {
      console.log(warehouses);
      res.render('admin/warehouse', {
        houses: warehouses,
        pageTitle: 'Warehouse',
        path: '/admin/warehouse',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.getAddWarehouse = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/add-warehouse', {
    pageTitle: 'Add Warehouse',
    path: '/admin/add-warehouse',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postAddWarehouse = (req, res, next) => {
  const name = req.body.name;
  const street = req.body.street;
  const city = req.body.city;
  const country = req.body.country;
  const zipcode = req.body.zipcode;
  const phone = req.body.phone;
  const warehouse = new Warehouse({
    name: name,
    street: street,
    city: city,
    country: country,
    zipcode: zipcode,
    phone: phone,
    userId: req.user
  });
  warehouse.save().then(result => {
    // console.log(result);
    console.log('Created Warehouse');
    res.redirect('/admin/warehouse');
  })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditWarehouse = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.putEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};


exports.getCompanyProfile = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/company_profile', {
    pageTitle: 'Company Profile',
    path: '/admin/company_profile',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getCurrency = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  Currency.find()
    .then(currency => {
      res.render('admin/currency', {
        i: 0,
        curren: currency,
        pageTitle: 'Currency',
        path: '/admin/currency',
        editing: false,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postAddCurrency = (req, res, next) => {
  const name = req.body.name;
  const symbol = req.body.symbol;
  const currency = new Currency({
    name: name,
    symbol: symbol,
    userId: req.user
  });
  currency
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Currency');
      res.redirect('/admin/currency');
    })
    .catch(err => {
      console.log(err);
    });
};


exports.getCustomers = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/customers', {
    pageTitle: 'Customers',
    path: '/admin/customers',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getCustomersJson = (req, res, next) => {
  Customer.find()
    .then(customer => {
      console.log(customer);

      // Sending items as JSON response
      res.status(200).json(customer);
    })
    .catch(err => console.log(err));
};
exports.getSupplierJson = (req, res, next) => {
  Supplier.find()
    .then(suppliers => {
      console.log(suppliers);

      // Sending items as JSON response
      res.status(200).json(suppliers);
    })
    .catch(err => console.log(err));
};
exports.postAddCustomer = (req, res, next) => {
  const name = req.body.name;
  const country = req.body.country;
  const email = req.body.email;
  const phone = req.body.phone;
  const customer = new Customer({
    name: name,
    country: country,
    email: email,
    phone: phone
  });
  customer
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Customer');
      res.redirect('/admin/customers');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getItems = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/items', {
    pageTitle: 'Items',
    path: '/admin/items',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};
exports.getAddItems = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  Promise.all([Warehouse.find(), SubCategory.find()])
    .then(([warehouses, subcategories]) => {
      res.render('admin/add-item', {
        houses: warehouses,
        sub: subcategories,
        pageTitle: 'New Item',
        path: '/admin/add-item',
        editing: false,
        isAuthenticated: req.session.isLoggedIn
      });
    })
};

exports.getItemsJson = (req, res, next) => {
  Item.find()
    .then(items => {
      console.log(items);

      // Sending items as JSON response
      res.status(200).json(items);
    })
    .catch(err => console.log(err));
};

exports.postAddItems = (req, res, next) => {
  const name = req.body.name;
  const unit = req.body.unit;
  const subCategory = req.body.subCategory;
  const brandName = req.body.brandName;
  const manufacturer = req.body.manufacturer;
  const warehouse = req.body.warehouse;
  const upc = req.body.upc;
  const sellingPrice = req.body.sellingPrice;
  const costPrice = req.body.costPrice;
  const description = req.body.description;
  const item = new Item({
    name: name,
    unit: unit,
    subCategory: subCategory,
    brandName: brandName,
    manufacturer: manufacturer,
    warehouse: warehouse,
    upc: upc,
    sellingPrice: sellingPrice,
    costPrice: costPrice,
    description: description,
    userId: req.user
  });
  item.save()
    .then(itemResult => {
      console.log('Created item');

      const inventoryItem = new Inventory({
        items: [
          {
            item: itemResult._id,
            quantity: 10 // Assign the retrieved quantity to the quantity field of the inventory item
          }
        ]
      });

      inventoryItem.save()
        .then(inventoryResult => {
          console.log('Added item to inventory');
          res.redirect('/admin/items');
        })
        .catch(err => {
          console.log('Error adding item to inventory:', err);
          res.status(500).send('Error adding item to inventory');
        });
    })
    .catch(err => {
      console.log('Error creating item:', err);
      res.status(500).send('Error creating item');
    });
};

exports.getItemInfo = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/item-info', {
    pageTitle: 'Item Information',
    path: '/admin/item-info',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getOrder = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/order', {
    pageTitle: 'Order',
    path: '/admin/order',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getAddOrder = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/add-order', {
    pageTitle: 'Add Order',
    path: '/admin/add-order',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};


exports.getProductReturn = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/product_return', {
    pageTitle: 'Product Return',
    path: '/admin/product_return',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};


exports.getPurchaseOrder = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/purchase_order', {
    pageTitle: 'Purchase Order',
    path: '/admin/purchase_order',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};


exports.getAddPurchase = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/add-purchase', {
    pageTitle: 'Add Purchase',
    path: '/admin/add-purchase',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getQuantity = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/quantity', {
    pageTitle: 'Quantity',
    path: '/admin/quantity',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};


exports.getSalesInvocie = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/sales_invoice', {
    pageTitle: 'Sales Inovice',
    path: '/admin/sales_invoice',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};


exports.getSalesReturn = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/sales_return', {
    pageTitle: 'Sales Return',
    path: '/admin/sales_return',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};


exports.getStaff = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/staff', {
    pageTitle: 'Staff',
    path: '/admin/staff',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};


exports.getStock = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/stock', {
    pageTitle: 'Stock',
    path: '/admin/stock',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};


exports.getSuppliers = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/suppliers', {
    pageTitle: 'Suppliers',
    path: '/admin/suppliers',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};
exports.postAddSupplier = (req, res, next) => {
  const name = req.body.name;
  const country = req.body.country;
  const email = req.body.email;
  const phone = req.body.phone;
  const supplier = new Supplier({
    name: name,
    country: country,
    email: email,
    phone: phone
  });
  supplier
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Supplier');
      res.redirect('/admin/suppliers');
    })
    .catch(err => {
      console.log(err);
    });
};


exports.getUserPermission = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/user_permission', {
    pageTitle: 'User Permission',
    path: '/admin/user_permission',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};


exports.getUsers = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/users', {
    pageTitle: 'Users',
    path: '/admin/users',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};


exports.getAddProduct = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};



exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.postDeleteWarehouse = (req, res, next) => {
  const warehouseId = req.body.warehouseId;
  Warehouse.findByIdAndRemove(warehouseId)
    .then(() => {
      console.log('DESTROYED Warehouse');
      res.redirect('/admin/warehouse');
    })
    .catch(err => console.log(err));
};

exports.postDeleteCategory = (req, res, next) => {
  const categoryId = req.body.categoryId;
  Category.findByIdAndRemove(categoryId)
    .then(() => {
      console.log('DESTROYED Category');
      res.redirect('/admin/category');
    })
    .catch(err => console.log(err));
};
