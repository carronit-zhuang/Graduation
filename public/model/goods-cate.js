const mongoose = require('./db.js')

const GoodsCateSchema = mongoose.Schema({
  "message": Array
})
module.exports = mongoose.model('GoodsCate', GoodsCateSchema, 'goods-cate')
