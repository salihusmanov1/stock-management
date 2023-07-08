const express = require('express');

const homeController = require('../controllers/home');
// const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.get('/', homeController.getIndex);

router.get('/features', homeController.getFeatures);

router.get('/pricing', homeController.getPricing);

router.get('/about-us', homeController.getAboutUs);

router.get('/contact-us', homeController.getContactUs);

module.exports = router;