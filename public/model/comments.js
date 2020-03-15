const mongoose = require('./db.js')

const CommnetsSchema = mongoose.Schema({
  "id":String,
  "sort": Number,
  "message":Object
})
module.exports = mongoose.model('Comments', CommnetsSchema, 'comments')
