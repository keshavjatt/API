const axios = require('axios');
const cheerio = require('cheerio');
const Product = require('../models/product');

const BASE_URL = 'https://www.flipkart.com';
const MOBILE_URL = `${BASE_URL}/search?q=mobile`;

async function fetchMobileProducts() {
  try {
    const response = await axios.get(MOBILE_URL);
    const $ = cheerio.load(response.data);

    const products = [];

    $('._1AtVbE').each((index, element) => {
      const title = $(element).find('._4rR01T').text().trim();
      let price = {}
       price.Actualprice = $(element).find('div._27UcVY').text().trim();
       price.discountPrice = $(element).find('div._1_WHN1').text().trim();
       price.discountPercentage = $(element).find('div._3Ay6Sb').text().trim();
      const url = BASE_URL + $(element).find('a').attr('href');
      if (title || price || url) {
        products.push(new Product(title, price, url));
      }
    });
    return products;
  } catch (error) {
    throw error;
  }
}

async function flipkart (req, res) {
  try {
    const products = await fetchMobileProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}


module.exports = { fetchMobileProducts, flipkart };
