'use strict'

/* eslint-disable prefer-arrow-callback */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const provider = require('./mockServer/provider')
const client = require('./client')
const interactions = require('./mockServer/interactions')

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

  after(function () {
    this.timeout(10000) // it takes time to stop the mock server and gather the contracts
    provider.finalize()
  })

  it('should get product list from server', async function () {
    provider.addInteraction(interactions.getProductList)

    const consoleSpy = sandbox.spy(console, 'log')
    await client.getProducts()
    expect(consoleSpy).to.have.been.calledWith('CLIENT: Current products are: Foo')
    provider.verify()
  })
})
