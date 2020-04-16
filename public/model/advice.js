const mongoose = require('./db.js')

const AdviceSchema = mongoose.Schema({
  "content":String,
  "account": String,
})
module.exports = mongoose.model('Advice', AdviceSchema, 'advice')
