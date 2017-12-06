'use strict'

const path = require('path')
const pact = require('pact')

const provider = pact({
  consumer: 'Client', // current service at hand, it makes it easier to know who would be broken by the change in the provider when we test the contract.
  provider: 'ProductService', // required, so we know who will need to verify the pact
  port: 1234, // where the mock service should be listening
  log: path.resolve(__dirname, '../../logs', 'mockserver-integration.log'), // path to the file where logs should be stored
  logLevel: 'ERROR', // one of 'TRACE', 'DEBUG', 'INFO', 'ERROR', 'FATAL' OR 'WARN'
  dir: path.resolve(__dirname, '../../pacts'), // path to the files where the pact should be saved
  spec: 2 // the pact specification we are using
})

module.exports = provider
