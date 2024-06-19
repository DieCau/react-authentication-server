const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;

const express = require('express');
const authController = require('../controllers/authController');

const routers = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;