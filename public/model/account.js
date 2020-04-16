const mongoose = require('./db.js')

const AccountSchema = mongoose.Schema({
  "username":String,
  "password": String,
  "email":String,
  "phone":String,
  "cart": String,
})
module.exports = mongoose.model('Account', AccountSchema, 'account')
