const mongoose = require('./db.js')

const SwiperSchema = mongoose.Schema({
})
module.exports = mongoose.model('Swiper', SwiperSchema, 'swiper')
