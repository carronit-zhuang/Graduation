const mongoose = require('./db.js')

const ThumbnailSchema = mongoose.Schema({
})
module.exports = mongoose.model('Thumbnail', ThumbnailSchema, 'thumbnail')
