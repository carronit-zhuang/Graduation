const mongoose = require('./db.js')

const PhotoInfoSchema = mongoose.Schema({
})
module.exports = mongoose.model('PhotoInfo', PhotoInfoSchema, 'photo-info')
