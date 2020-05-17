const mongoose = require('./db.js')

const GoodsListSchema = mongoose.Schema({
  'stock_quantity': Number
})
module.exports = mongoose.model('GoodsList', GoodsListSchema, 'goods-list')
