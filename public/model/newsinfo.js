const mongoose = require('./db.js')

const NewsinfoSchema = mongoose.Schema({
})
module.exports = mongoose.model('Newsinfo', NewsinfoSchema, 'newsinfo')