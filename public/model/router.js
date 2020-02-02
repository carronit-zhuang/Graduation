const express = require('express');
const service = require('./service.js');
const router = express.Router();

// 获取新闻资讯
router.get('/api/getnewslist',service.getNewlist);

// 获取新闻详情
router.get('/api/getnew/:id' ,service.getNewsInfo);
// 获取评论详情
router.get('/api/getcomments/:id/:pageindex',service.getComments);
// 发表评论
router.post('/api/postcomment/:id',service.addComments);

// router.post('/books/book',service.addBook);
// 编辑图书时根据id来查询相应信息
// router.get('/books/book/:id',service.getBookById);
// 提交编辑的数据
// router.put('/books/book',service.editBook);
// 删除图书的信息
// router.delete('/books/book/:id',service.deleteBook);

module.exports = router;