const mongoose = require('./db.js')

const OrderCateSchema = mongoose.Schema({
  "message": Array
})
module.exports = mongoose.model('OrderCate', OrderCateSchema, 'order-cate')
