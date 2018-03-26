'use strict'
const { somethingLike: like, eachLike, term } = require('pact').Matchers

const ONE_PRODUCT_BODY = [ { name: 'Foo' } ]
const PRICE_FILTERED_PRODUCT_BODY = {
  name: 'Foo',
  img: 'http://foo-url.com',
  price: 2
}

const PRICE_FILTERED_PRODUCT_QUERY = {
  'min-price': '2',
  'max-price': '5',
}

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
  getFilteredProductList: {
    state: 'it has multiple products with different prices',
    uponReceiving: 'a request to retrieve product list filtered by price',
    withRequest: {
      method: 'GET',
      path: '/products',
      query: PRICE_FILTERED_PRODUCT_QUERY
    },
    willRespondWith: {
      status: 200,
      body: eachLike(PRICE_FILTERED_PRODUCT_BODY)
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
