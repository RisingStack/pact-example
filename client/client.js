'use strict'

const request = require('request-promise-native')
const _ = require('lodash')

const PRODUCTS_SERVICE_URL = process.env.PRODUCTS_SERVICE_URL || 'http://localhost:1234'

async function getProducts () {
  const products = await request(`${PRODUCTS_SERVICE_URL}/products`)
    .then(JSON.parse)

  const productsString = _.reduce(products, (logString, product) => `${logString} ${product.name}`, 'CLIENT: Current products are:')

  console.log(productsString)
}

function registerProduct(product) {
  return request.post({
    url: `${PRODUCTS_SERVICE_URL}/products`,
    body: product,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

module.exports = {
  getProducts,
  registerProduct
}
