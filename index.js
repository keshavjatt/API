const express = require('express');
const flipkartRoute = require('./routes/flipkart');

const app = express();
const PORT = 5000;

app.use('/fetch/flipkart', flipkartRoute);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Fetch and log products
  const flipkartController = require('./controllers/flipkartController');
  try {
    const products = await flipkartController.fetchMobileProducts();
    console.log('Fetched products:', products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});
