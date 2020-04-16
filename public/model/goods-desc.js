const mongoose = require('./db.js')

const GoodsDescSchema = mongoose.Schema({
})
module.exports = mongoose.model('GoodsDesc', GoodsDescSchema, 'goods-desc')
