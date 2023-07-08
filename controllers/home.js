exports.getIndex = (req, res, next) => {
  res.render('home/home', {
    path: '/',
    pageTitle: 'RWInventory',
    isAuthenticated: false
  });
};


exports.getFeatures = (req, res, next) => {
  res.render('home/features', {
    path: '/features',
    pageTitle: 'Features',
    isAuthenticated: false
  });
};

exports.getPricing = (req, res, next) => {
  res.render('home/pricing', {
    path: '/pricing',
    pageTitle: 'Pricing',
    isAuthenticated: false
  });
};

exports.getAboutUs = (req, res, next) => {
  res.render('home/about-us', {
    path: '/about-us',
    pageTitle: 'About Us',
    isAuthenticated: false
  });
};

exports.getContactUs = (req, res, next) => {
  res.render('home/contact-us', {
    path: '/contact-us',
    pageTitle: 'Contact Us',
    isAuthenticated: false
  });
};
