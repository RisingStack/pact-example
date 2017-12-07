'use strict'
const like = require('pact').Matchers.somethingLike

const ONE_PRODUCT_BODY = [ { name: 'Foo' } ]

const REGISTRATION_REQUEST_BODY = {
  name: 'Bar',
  img: 'https://webshop.com/img/cheap-shoe.png',
  price: 2,
  stock: 3
}

const REGISTRATION_RESPONSE_BODY = {
  id: like(1),
  name: 'Bar',
  img: 'https://webshop.com/img/cheap-shoe.png',
  price: 2,
  stock: 3
}

module.exports = {
  getProductList: {
    state: 'it has one product',
    uponReceiving: 'a request to retrieve product list',
    withRequest: {
      method: 'GET',
      path: '/products'
    },
    willRespondWith: {
      status: 200,
      body: ONE_PRODUCT_BODY
    }
  },
  registerProduct: {
    state: 'it has one product',
    uponReceiving: 'a request to create a new product',
    withRequest: {
      method: 'POST',
      path: '/products',
      body: REGISTRATION_REQUEST_BODY,
      headers: {
        'Content-Type': 'application/json'
      }
    },
    willRespondWith: {
      status: 201,
      body: REGISTRATION_RESPONSE_BODY
    }
  }
}
