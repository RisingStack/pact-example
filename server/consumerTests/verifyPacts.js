'use strict'

const pact = require('@pact-foundation/pact-node')
require('./testProductsService')

const opts = {
  providerBaseUrl: 'http://localhost:3001', // where your service will be running during the test, either staging or localhost on CI
  providerStatesSetupUrl: 'http://localhost:3001/test/setup', // the url to call to set up states
  pactUrls: ['http://localhost:8080/pacts/provider/ProductService/consumer/Client/latest'], // the pacts to test against
  publishVerificationResult: true,
  providerVersion: '1.0.0'
}

pact.verifyPacts(opts).then(() => {
  console.log('success')
  process.exit(0)
}).catch((error) => {
  console.log('failed', error)
  process.exit(1)
})
