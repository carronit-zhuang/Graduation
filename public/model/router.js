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
//获取图片分享的分类信息
router.get('/api/getimgcategory' ,service.getImgCategory);
//获取图片列表预览信息
router.get('/api/getimages/:cateId' ,service.getImgList);
//获取图片列表详情
router.get('/api/getimageInfo/:id' ,service.getPhotoInfo);
//获取缩略图信息
router.get('/api/getthumbnail/:id' ,service.getThumbnail);
//获取商品列表预览信息
// router.get('/api/getgoods/:pageindex' ,service.getGoodsList);
//获取商品详情的信息
router.get('/api/goods/getinfo/:id' ,service.getGoodsInfo);
//获取轮播图信息
router.get('/api/getswiper/:id' ,service.getSwiper);
//获取商品图文介绍信息desc
router.get('/api/goods/getdesc/:id' ,service.getGoodsDesc);
//获取商品评论页面的信息
router.get('/api/home/goodscomment/:id/:pageindex' ,service.getComments);
//获取商品列表的分类信息
router.get('/api/getgoodscategory' ,service.getGoodsCategory);
//获取相应分类商品的信息
router.get('/api/getgoodswithcate/:cate/:pageindex' ,service.getGoodsListWithCate);
//修改相应商品的数量信息
router.put('/api/modifyQuantity/:id' ,service.modifyQuantity);
//获取购物车列表的信息
router.get('/api/goods/getshopcarlist/:id' ,service.getShopCarList);
//提交用户账号注册的信息
router.post('/api/account/register' ,service.accountRegister);
//查找用户账号信息,同是进行账户是否存在的判断
router.get('/api/account' ,service.getAccount);
//直接获取用户的账号信息
router.get('/api/account/straight' ,service.getAccountStraight);
//验证用户账号信息
router.get('/api/account/verify' ,service.accountVerify);
//重设用户密码
router.put('/api/account/reset',service.accountReset);
//修改用户信息
router.put('/api/account/modify',service.accountModify);
//提交用户订单信息
router.post('/api/orderlist' ,service.createOrderList);
//获取用户所有订单信息
router.get('/api/orderlist' ,service.getOrderList);
//获取用户某条订单的详情信息
router.get('/api/orderlist/detail/:orderNum' ,service.getOrderListDetail);
//修改订单是否付款
router.put('/api/orderlist/detail/:orderNum' ,service.updateOrderListPayment);
//获取商品列表的分类信息
router.get('/api/getordercategory' ,service.getOrderCategory);
//获取相应分类商品的信息
// router.get('/api/getgoodswithcate/:cate/:pageindex' ,service.getGoodsListWithCate);
//提交相应反馈信息
router.post('/api/advice' ,service.createAdvice);

// router.post('/books/book',service.addBook);
// 编辑图书时根据id来查询相应信息
// router.get('/books/book/:id',service.getBookById);
// 提交编辑的数据
// router.put('/books/book',service.editBook);
// 删除图书的信息
// router.delete('/books/book/:id',service.deleteBook);

module.exports = router;
