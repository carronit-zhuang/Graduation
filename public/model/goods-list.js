const mongoose = require('./db.js')

const GoodsListSchema = mongoose.Schema({
})
module.exports = mongoose.model('GoodsList', GoodsListSchema, 'goods-list')
