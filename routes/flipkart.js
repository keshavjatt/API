const express = require('express');
const router = express.Router();
const flipkartController = require('../controllers/flipkartController');

router.get('/mobile', flipkartController.flipkart);

module.exports = router;
