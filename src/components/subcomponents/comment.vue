<template>
  <div class='cmt-container'>

   <h3>发表评论</h3>
   <textarea placeholder="请输入要评论的内容(最多120字)" maxlength="120" v-model="msg"></textarea>

   <mt-button type='primary' size='large' @click='postComment'>发表评论</mt-button>
   <div class="cmt-list">
     <div class="cmt-item" v-for="(item,i) in comments" :key='item._id'>
       <div class="cmt-title">
         <span>第{{i+1}}楼&nbsp;&nbsp; 用户： {{item.message.user_name}}&nbsp;&nbsp;</span> <span>发表时间:{{item.message.add_time | dateFormat}}</span>
       </div>
       <div class="cmt-body">
         {{item.message.content === 'undefined' ? '此用户很懒，什么都没留下':item.message.content}}
       </div>
     </div>
   </div>
   <mt-button type='danger' size='large' plain @click='getMore'>加载更多</mt-button>

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      pageIndex: 1, // 默认展示第一页的数据
      comments: [], // 获取到的评论数据
      msg: '' // 评论输入的内容
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    getComments () { // 获取评论的数据
      this.$http.get('api/getcomments/' + this.id + '/' + this.pageIndex).then(result => {
          // this.comments = result.body.message;
          let message = []
          message = (JSON.parse(result.bodyText))
          // this.comments = this.comments.concat(result.body.message)
          this.comments = this.comments.concat(message)

      })
    },
    getMore () { // 获取更多
      this.pageIndex++
      this.getComments()
    },
    postComment () { // 发表评论
      // 校验提交的内容是否为空
      if (this.msg.trim().length === 0) {
        return Toast('评论内容不能为空！')
      }
      // post的三个参数：
      // 1.请求的url地址
      // 2.提交给服务器的数据对象 {content: this.msg}
      // 3.定义提交的时候，表单中数据的格式 {emulateJSON: true}   这个应该全局配置，比较方便
      this.$http
        .post('api/postcomment/' + this.$route.params.id, { content: this.msg.trim()}).then(function (result) {
          // 1.拼接出一个评论对象

          // var cmt = { user_name: '匿名用户', add_time: Date.now(), content: this.msg.trim() }
          // // 2.将拼接出的评论放到数组的第一项
          // this.comments.unshift(cmt)
          this.msg = ''
          this.getComments()
      })
    }

  },
  props: ['id']
}
</script>

<style lang="scss" scoped>
  .cmt-container{
    h3 {
      font-size: 18px;
    }
    textarea {
      font-size: 14px;
      height: 85px;
      margin: 0;
    }
    .cmt-list{
      margin: 5px 0;
      .cmt-item{
        font-size: 13px;
        .cmt-title{
          display: flex;
          padding:0 10px;
          justify-content:space-between;
          line-height: 30px;
          background-color: darkseagreen;
        }
        .cmt-body{
          line-height: 35px;
          text-indent: 2em;
        }
      }
    }

  }
</style>
