const mongoose = require('./db.js')

const OrderListSchema = mongoose.Schema({
  "username":String,
  "phone":String,
  "postCode":String,
  "orderNum":String,
  "specificAddress":String,
  "paid": Boolean,
  "order": String
})
module.exports = mongoose.model('OrderList', OrderListSchema, 'order-list')
