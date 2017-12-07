'use strict'

const products = require('./model/products')

function get (req, res) {
  res.json(products.getAll())
}

function create (req, res) {
  const product = req.body
  const savedProduct = products.create(product)

  res.statusCode = 201
  res.json(savedProduct)
}

function findById (req, res) {
  const productId = req.params.id

  res.json(products.getById(productId))
}

function updateById (req, res) {
  const productId = req.params.id
  const product = req.params.product

  products.updateById(productId, product)

  res.json(product)
}

function removeById (req, res) {
  const productId = req.params.id

  products.removeById(productId)

  res.statusCode = 204
  res.end()
}

module.exports = {
  get,
  create,
  findById,
  updateById,
  removeById
}
