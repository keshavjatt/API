const express = require('express');
const router = express.Router();
const flipkartController = require('../controllers/flipkartController');

router.get('/mobile', async (req, res) => {
  try {
    const products = await flipkartController.fetchMobileProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
