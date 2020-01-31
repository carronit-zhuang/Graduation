// 连接数据库
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/graduation',{useUnifiedTopology: true, useNewUrlParser: true },err => {
  if(err){
    console.log(err)
    return
  }
  console.log('连接数据库成功')
})

module.exports = mongoose