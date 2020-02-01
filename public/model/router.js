const express = require('express');
const service = require('./service.js');
const router = express.Router();

// 获取新闻资讯
router.get('/api/getnewslist',service.getNewlist);
// 添加图书信息时提交数据
// router.post('/books/book',service.addBook);
// 编辑图书时根据id来查询相应信息
// router.get('/books/book/:id',service.getBookById);
// 提交编辑的数据
// router.put('/books/book',service.editBook);
// 删除图书的信息
// router.delete('/books/book/:id',service.deleteBook);

module.exports = router;