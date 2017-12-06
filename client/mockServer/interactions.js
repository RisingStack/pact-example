'use strict'

const ONE_PRODUCT_BODY = [{ name: 'Foo' }]

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
  }
}
