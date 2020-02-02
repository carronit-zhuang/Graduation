const mongoose = require('./db.js')

const CmtnewSchema = mongoose.Schema({
})
module.exports = mongoose.model('Cmtnew', CmtnewSchema, 'cmt-new')