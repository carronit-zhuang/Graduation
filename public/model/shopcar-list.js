const mongoose = require('./db.js')

const ShopCarListSchema = mongoose.Schema({
})
module.exports = mongoose.model('ShopCarList', ShopCarListSchema, 'shopcar-list')
