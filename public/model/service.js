const Newlist = require('./newlist.js')
const Newsinfo = require('./newsinfo.js')
const Comments = require('./comments.js')
const Cmtnew = require('./cmt-new.js')

exports.getNewlist = (req,res) => {
  Newlist.find({},(err,docs)=>{
    if(err){
      console.log(err)
      return
    }
    res.json(docs)
  })
}

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

exports.getComments= (req,res) => {
  let pageindex = req.params.pageindex
  let id = req.params.id
  //新闻资讯页面获取评论数据
  if(id<=12){
    let temp = "news"+id
    Comments.find({id:temp},(err,docs)=>{
      if(err){
        console.log(err)
        return
      }
      res.json(docs)
    }).sort({"sort":-1}).skip((pageindex-1)*5).limit(5)
  }
}

exports.addComments= (req,res) => {
  let id = req.params.id
  let temp = "news"+id
  let content = req.body.content
  let i 
  // console.log(content)
    //新闻资讯页面发表评论数据(新增)
    //先拿到已存在的数据数量
  if(id<=12){
    async function getCount(){
      await Comments.countDocuments({id:temp},(err,docs)=>{
        if(err){
          console.log(err)
          return
        }
         i = docs
      })

    //新增数据
    // console.log(i)
    const comment = new Comments({
      "id":"news"+id,
      "sort":i,
      "message":{"user_name":"匿名用户","content":content,"add_time":new Date().toISOString() }
    })
    comment.save()
    res.json(i)
    }
    getCount()
  }
}
