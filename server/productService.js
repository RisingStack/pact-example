'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./controller')

const app = express()

app.use(bodyParser.json())
app.get('/', (req, res) => res.send('pact example server'))

app.get('/products', controller.get)
app.post('/products', controller.create)
app.get('/products/:id', controller.findById)
app.put('/products/:id', controller.updateById)
app.delete('/products/:id', controller.removeById)

module.exports = app
