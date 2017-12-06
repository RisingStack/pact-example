'use strict'

const data = new Map
// example record { id: 1, name: 'Cheap shoe', img: 'https://webshop.com/img/cheap-shoe.png', price: 10, stock: 4 }

function getAll () {
  return [...data.values()]
}

function create (product) {
  const id = Math.max([...data.keys(), 0]) + 1
  data.set(id, Object.assign(product, { id }))
  return product
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

module.exports = {
  getAll,
  create,
  getById,
  updateById,
  removeById
}

