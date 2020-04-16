const mongoose = require('./db.js')

const PhotoListSchema = mongoose.Schema({
})
module.exports = mongoose.model('PhotoList', PhotoListSchema, 'photo-list')
