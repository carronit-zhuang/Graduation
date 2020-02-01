const mongoose = require('./db.js')

const NewlistSchema = mongoose.Schema({
})
module.exports = mongoose.model('Newlist', NewlistSchema, 'newlists')