'use strict'

const app = require('../productService')
const products = require('../model/products')

const port = process.env.PORT || 3001

app.post('/test/setup', (req, res) => {
  const state = req.body.state
  switch (state) {
    case 'it has one product':
      products._flush()
      products.create({ name: 'Foo', img: 'https://webshop.com/img/foo.png', price: 1, stock: 1})
      break
    case 'it has multiple products with different prices':
      products._flush()
      products.create({ name: 'Foo', img: 'https://webshop.com/img/foo.png', price: 1, stock: 1})
      products.create({ name: 'Bar', img: 'https://webshop.com/img/bar.png', price: 2, stock: 3})
      products.create({ name: 'Baz', img: 'https://webshop.com/img/baz.png', price: 3, stock: 5})
      products.create({ name: 'Thing', img: 'https://webshop.com/img/thing.png', price: 6, stock: 2})
      break
    default:
      break
  }
  res.end()
})


app.listen(port, (err) => {
  if (err) {
    throw err
  }
  console.log('SERVER: ProductService listening at', port)
})
