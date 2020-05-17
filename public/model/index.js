// 实现后台restful接口
const express = require('express');
const app = express();
const router = require('./router.js');
const bodyParser = require('body-parser');
app.all('*', function (req, res, next) {
  //设置请求头
  //允许所有来源访问
  res.header('Access-Control-Allow-Origin', '*')
  //用于判断request来自ajax还是传统请求
  res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
  //允许访问的方式
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  //修改程序信息与版本
  res.header('X-Powered-By', ' 3.2.1')
  //内容类型：如果是post请求必须指定这个属性
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "X-Requested-With")
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8")
//   next()
// });
// 处理post提交的表单格式
app.use(bodyParser.urlencoded({ extended:false}));
 // 处理json格式的参数
app.use(bodyParser.json());
app.use(router);
app.listen(3000,()=>{
    console.log('running...'); 
})
