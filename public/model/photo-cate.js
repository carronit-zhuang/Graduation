const mongoose = require('./db.js')

const PhotoCateSchema = mongoose.Schema({
  "message": Array
})
module.exports = mongoose.model('PhotoCate', PhotoCateSchema, 'photo-cate')
