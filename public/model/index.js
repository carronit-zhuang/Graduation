// 实现后台restful接口
const express = require('express');
const app = express();
const router = require('./router.js');
const bodyParser = require('body-parser');
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
});
// 处理post提交的表单格式
app.use(bodyParser.urlencoded({ extended:false}));
 // 处理json格式的参数
app.use(bodyParser.json());
app.use(router);

app.listen(3000,()=>{
    console.log('running...'); 
})
