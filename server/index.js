'use strict'

const app = require('./productService')
const port = process.env.PORT || 3001


app.listen(port, (err) => {
  if (err) {
    throw err
  }
  console.log('SERVER: ProductService listening at', port)
})
