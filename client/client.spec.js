'use strict'

/* eslint-disable prefer-arrow-callback */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const provider = require('./expectation/provider')
const client = require('./client')
const interactions = require('./expectation/interactions')
const _ = require('lodash')

const expect = chai.expect
chai.use(sinonChai)

describe('product handling', () => {
  const sandbox = sinon.createSandbox()

  before(async function () {
    this.timeout(10000) // it takes time to start the mock server
    await provider.setup()
  })

  afterEach(() => {
    sandbox.restore()
  })

  after(async function () {
    this.timeout(10000) // it takes time to stop the mock server and gather the contracts
    await provider.finalize()
  })

  describe('#getAllProducts', () => {
    it('should get product list from server', async function () {
      await provider.addInteraction(interactions.getProductList)

      const consoleSpy = sandbox.spy(console, 'log')
      await client.getAllProducts()
      expect(consoleSpy).to.have.been.calledWith('CLIENT: Current products are: Foo')
      await provider.verify()
    })
  })

  describe('#getProducts', () => {
    it('should return product list based on query', async function () {
      await provider.addInteraction(interactions.getFilteredProductList)
      const productList = await client.getProducts({
        'min-price': '2',
        'max-price': '5',
      })

      expect(productList).to.eql([ { name: 'Foo', img: 'http://foo-url.com', price: 2 } ])

      await provider.verify()
    })
  })

  describe('#registerProduct', () => {
    it('should send product registration request', async function () {
      await provider.addInteraction(interactions.registerProduct)

      const product = {
        name: 'Bar',
        img: 'https://webshop.com/img/cheap-shoe.png',
        price: 2,
        stock: 3
      }

      const response = await client.registerProduct(product)

      expect(response).to.be.eql(Object.assign(product, { id: 1 }))

      await provider.verify()
    })
  })
})
