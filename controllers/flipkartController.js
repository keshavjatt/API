const axios = require('axios');
const cheerio = require('cheerio');
const Product = require('../models/product');

const BASE_URL = 'https://www.flipkart.com';
const MOBILE_URL = `${BASE_URL}/mobiles`;

async function fetchMobileProducts() {
  try {
    const response = await axios.get(MOBILE_URL);
    const $ = cheerio.load(response.data);

    const products = [];

    $('._1AtVbE').each((index, element) => {
      const title = $(element).find('a').attr('title');
      const price = $(element).find('div._30jeq3').text().trim();
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

module.exports = { fetchMobileProducts };
