'use strict'
const _ = require('lodash')

const data = new Map
// example record { id: 1, name: 'Cheap shoe', img: 'https://webshop.com/img/cheap-shoe.png', price: 10, stock: 4 }

function getAll () {
  return [...data.values()]
}

function getByPrice ({ minPrice = 0, maxPrice = Infinity }) {
  const products = [...data.values()]
  const productList = _.filter(products, (product) => product.price >= minPrice && product.price < maxPrice)
  console.log(products)
  return productList
}

function create (product) {
  const id = Math.max(...data.keys(), 0) + 1
  data.set(id, Object.assign(product, { id }))
  return data.get(id)
}

function getById (id) {
  return data.get(id)
}

function updateById (id, product) {
  data.set(id, product)
  return product
}

function removeById (id) {
  data.delete(id)
}

function _flush () {
  data.clear()
}

module.exports = {
  getAll,
  getByPrice,
  create,
  getById,
  updateById,
  removeById,
  _flush
}

