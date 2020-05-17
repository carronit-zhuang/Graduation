const Newlist = require('./newlist.js')
const Newsinfo = require('./newsinfo.js')
const Comments = require('./comments.js')
const PhotoCate = require('./photo-cate.js')
const PhotoList = require('./photo-list.js')
const PhotoInfo = require('./photo-info.js')
const Thumbnail = require('./thumbnail.js')
const GoodsList = require('./goods-list.js')
const Swiper = require('./swiper.js')
const GoodsDesc = require('./goods-desc.js')
const GoodsCate = require('./goods-cate.js')
const ShopCarList = require('./shopcar-list.js')
const Account = require('./account.js')
const OrderList = require('./order-list.js')
const OrderCate = require('./order-cate.js')
const Advice = require('./advice.js')

//获取新闻列表信息
exports.getNewlist = (req,res) => {
  Newlist.find({},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

//获取新闻详情
exports.getNewsInfo = (req,res) => {
  let id = req.params.id
  Newsinfo.find({"id": id},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

//获取评论
exports.getComments= (req,res) => {
  let pageindex = req.params.pageindex
  let id = req.params.id
  if(id<=12){  //新闻资讯页面获取评论数据
    let temp = "news"+id
    Comments.find({'id':temp},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      res.json(docs)
    }).sort({"sort":-1}).skip((pageindex-1)*5).limit(5)
  }else if(id<=26){  //图片详情页面获取评论数据
    let temp = "photo"+id
    Comments.find({'id':temp},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      res.json(docs)
    }).sort({"sort":-1}).skip((pageindex-1)*5).limit(5)
  }else if(id<=60){  //商品详情页面获取评论数据
    let temp = "goods"+id
    Comments.find({'id':temp},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      res.json(docs)
    }).sort({"sort":-1}).skip((pageindex-1)*5).limit(5)
  }
}

//新增评论
exports.addComments= (req,res) => {
  let id = req.params.id
  let temp = handleTemp(id,12,26,60)
  let content = req.body.content
  let user_name = req.body.user_name
  let i
  getCount(temp)
  async function getCount(temp){  //先拿到已存在的数据数量
    await Comments.countDocuments({'id':temp},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
       i = docs
    })
    //新增数据
    const comment = new Comments({
      "id": temp,
      "sort":i,
      "message":{"user_name":user_name,"content":content,"add_time":new Date().toISOString() }
    })
    comment.save()
    res.json(i)
  }

  function handleTemp(id,newsCount,photosCount,goodsCount){
    if(id<=newsCount){
      return "news"+id
    }else if(id<=photosCount){
      return "photo"+id
    }else if(id<=goodsCount){
      return "goods"+id
    }
  }
  //   //先拿到已存在的数据数量
  // if(id<=12){   //新闻资讯页面发表评论数据(新增)
  //   let temp = "news"+id
  //   async function getCount(){
  //     await Comments.countDocuments({'id':temp},(err,docs)=>{
  //       if(err){
  //         console.log(err)
  //         return
  //       }
  //        i = docs
  //     })
  //   //新增数据
  //   const comment = new Comments({
  //     "id":"news"+id,
  //     "sort":i,
  //     "message":{"user_name":user_name,"content":content,"add_time":new Date().toISOString() }
  //   })
  //   comment.save()
  //   res.json(i)
  //   }
  //   getCount()
  // }else if(id<=26){  //图片详情页面发表评论数据(新增)
  //   let temp = "photo"+id
  //   async function getCount(){
  //     await Comments.countDocuments({'id':temp},(err,docs)=>{
  //       if(err){
  //         console.log(err)
  //         return
  //       }
  //        i = docs
  //     })
  //   //新增数据
  //   const comment = new Comments({
  //     "id":"photo"+id,
  //     "sort":i,
  //     "message":{"user_name":user_name,"content":content,"add_time":new Date().toISOString() }
  //   })
  //   comment.save()
  //   res.json(i)
  //   }
  //   getCount()
  // }else if(id<=60){  //商品详情页面发表评论数据(新增)
  //   let temp = "goods"+id
  //   async function getCount(){
  //     await Comments.countDocuments({'id':temp},(err,docs)=>{
  //       if(err){
  //         console.log(err)
  //         return
  //       }
  //        i = docs
  //     })
  //   //新增数据
  //   const comment = new Comments({
  //     "id":"goods"+id,
  //     "sort":i,
  //     "message":{"user_name":user_name,"content":content,"add_time":new Date().toISOString() }
  //   })
  //   comment.save()
  //   res.json(i)
  //   }
  //   getCount()
  // }
}

 //获取图片的分类信息
exports.getImgCategory = (req,res) => { 
  PhotoCate.find({},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

  //获取图片列表
exports.getImgList = (req,res) => {
  let cate = req.params.cateId
  if(cate == 0 ){
    PhotoList.find({},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      res.json(docs)
    })
  }else{
    PhotoList.find({"cate":cate},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      res.json(docs)
    })
  }
}

  //获取图片详情
exports.getPhotoInfo = (req,res) => {
  let id = req.params.id
  PhotoInfo.find({"id": id},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

  //获取缩略图信息
exports.getThumbnail = (req,res) => {
  let id = req.params.id
  Thumbnail.find({"id": id},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

  //获取商品列表信息
// exports.getGoodsList = (req,res) => {
//   let pageindex = req.params.pageindex
//   GoodsList.find({},(err,docs)=>{
//     if(err){
//       console.log(err)
//       return
//     }
//     res.json(docs)
//   }).skip((pageindex-1)*4).limit(4)
// }

  //获取商品详情信息
exports.getGoodsInfo = (req,res) => {
  let id = req.params.id
  GoodsList.find({"id": id},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

  //获取商品的图文介绍Desc详情信息
exports.getGoodsDesc = (req,res) => {
  let id = req.params.id
  GoodsDesc.find({"id": id},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

  //获取轮播图信息
exports.getSwiper = (req,res) => {
  let id = req.params.id
  Swiper.find({"id": id},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

  //获取商品的分类信息
exports.getGoodsCategory = (req,res) => {
  GoodsCate.find({},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

  //获取图片列表
exports.getGoodsListWithCate = (req,res) => {
  let cate = req.params.cate
  let pageindex = req.params.pageindex
  if(cate == 0 ){
    GoodsList.find({},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      res.json(docs)
    }).skip((pageindex-1)*4).limit(4)
  }else{
    GoodsList.find({"cate":cate},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      res.json(docs)
    }).skip((pageindex-1)*2).limit(2)
  }
}

exports.getShopCarList = (req,res) => {  //获取购物车列表信息
  let id = req.params.id
  ShopCarList.find({'id':id},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

exports.accountRegister = (req,res) => {
     //新增数据
  const body = req.body
  let userExist
  Account.find({'username':body.username},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    userExist = docs.length
    if(!userExist){
      const account = new Account({
        "username": body.username,
        "password": body.password,
        "email": body.email,
        "phone": body.phone
       })
       account.save()
       res.json(1)
    }else{
      res.json(0)
    }
  })
}

exports.getAccount = (req,res) => {  //获取用户的信息，包括判断
  const username = req.query.username
  const password = req.query.password
  let userExist
  let correctQuery
  Account.find({'username':username},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    userExist = docs.length
  })
  Account.find({'username':username,'password':password},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    correctQuery = docs.length
    res.json({userExist, correctQuery })
  })

}

exports.getAccountStraight = (req,res) => {  //直接简单获取用户的信息，不用判断
  const username = req.query.username
  Account.find({'username':username},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

exports.accountVerify = (req,res) => {  //验证用户的信息以继续重设密码
  const username = req.query.username
  let userExist
  let correctQuery
  if(req.query.phone){
    verifyValue = req.query.phone
    Account.find({'username':username, 'phone':verifyValue},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      correctQuery = docs.length
    })
  }else{
    verifyValue = req.query.email
    Account.find({'username':username, 'email':verifyValue},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      correctQuery = docs.length
    })
  }

  Account.find({'username':username},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    userExist = docs.length
    res.json({userExist, correctQuery })
  })
}

  //重设用户密码
exports.accountReset = (req,res) => {
let userExist
const body = req.body
Account.find({'username':body.username},(err,docs)=>{
  if(err){
    console.log(err)
    return
  }
  userExist = docs.length

  Account.updateOne({'username':body.username},{'password': body.password},(err,docs)=>{
    if(err){
      console.log(err)
      return
    } else if(docs.ok){
        res.json({userExist})
      }
    })
  })
}

//修改用户数据
exports.accountModify = (req,res) => {
  let userExist
  const body = req.body
  if(!body.cart){
    Account.find({'username':body.username},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      userExist = docs.length
      
      Account.updateOne({'username':body.username},{'username':body.username,'email': body.email,'phone': body.phone},(err,docs)=>{
        if(err){
          console.log(err)
          return
        } else if(docs.ok){
            res.json({userExist})
          }
        })
      })
  }else {
    Account.find({'username':body.username},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      userExist = docs.length
      
      Account.updateOne({'username':body.username},{'email': body.email,'phone': body.phone,'cart':body.cart},(err,docs)=>{
        if(err){
          console.log(err)
          return
        } else if(docs.ok){
            res.json({userExist})
          }
        })
      })
  }
}

//新增用户订单数据
exports.createOrderList = (req,res) => {
  const body = req.body
  const account = new OrderList({
    "username": body.username,
    "phone": body.phone,
    "postCode": body.postCode,
    "specificAddress": body.specificAddress,
    "orderNum": body.orderNum,
    "ordered": body.ordered,
    "order": body.order
  })
  account.save()
  res.json(1)
}

exports.getOrderList = (req,res) => {  //直接简单获取用户的信息，不用判断
  const query = req.query
  if(typeof query.ordered == 'undefined'){
    OrderList.find({'username':query.username},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      res.json(docs)
    })
  }else{
    OrderList.find({'username':query.username, 'ordered': query.ordered},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      res.json(docs)
    })
  }
}

// 获取某条订单信息的详情
exports.getOrderListDetail = (req,res) => {  //直接简单获取用户的信息，不用判断
  const {orderNum} = req.params
  OrderList.find({'orderNum': orderNum},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

//更新订单的付款与否信息
exports.updateOrderListPayment = (req,res) => {
  const {body} = req
  const {orderNum} = req.params
  OrderList.updateOne({'orderNum':orderNum},{'ordered': body.ordered},(err,docs)=>{
    if(err){
      console.log(err)
      return
    } else{
        res.json(docs.ok)
      }
    })
  }

   //获取订单的分类信息
exports.getOrderCategory = (req,res) => { 
  OrderCate.find({},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

//新增留言反馈
exports.createAdvice = (req,res) => {
  const body = req.body
  const advice = new Advice({
  "account": body.account,
  "content": body.content,
  })
  advice.save()
  res.json(1)
  }

//修改商品的数量信息
exports.modifyQuantity = (req,res) => {
  const {id} = req.params
  const {quantity} = req.body
  let oldQuantity
  GoodsList.find({'id':id},(err,docs)=>{
    if(err){
      return console.log(err)
    }else{
      oldQuantity = docs[0]._doc.stock_quantity
      oldQuantity -= quantity
      GoodsList.updateOne({'id':id},{"stock_quantity": oldQuantity},(err,docs)=>{
        if(err){
          return console.log(err)
        }else{
          res.json(1)
        }
      })
    }
  })
 }

