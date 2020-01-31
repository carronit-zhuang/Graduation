const mongoose = require('./db.js')

const NewlistSchema = mongoose.Schema({
  message: Array
})
module.exports = mongoose.model('Newlist', NewlistSchema, 'newlists')