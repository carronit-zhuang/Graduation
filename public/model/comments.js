const mongoose = require('./db.js')

const CommnetsSchema = mongoose.Schema({
  "id":String,
  "message":Object,
  "sort":Number
})
module.exports = mongoose.model('Comments', CommnetsSchema, 'comments')