<template>
  <div class='cmt-container'>

   <h3>发表评论</h3>
   <textarea placeholder="请输入要评论的内容(最多120字)" maxlength="120" v-model="msg"></textarea>

   <mt-button type='primary' size='large' @click='postComment'>发表评论</mt-button>
   <div class="cmt-list">
     <div class="cmt-item" v-for="(item, i) in comments" :key='item.index'>
       		<div class="mui-card">
				<div class="mui-card-header">
           <span>第</span> 
           <span class="order">{{i+1}}</span>
           <span>楼 ：</span>
           <span class="author"> {{item.message.user_name}}&nbsp;&nbsp;</span>
           <div>
             <span class="release">发表时间:</span>
             <span class="time">{{item.message.add_time | dateFormat}}</span>
           </div>
        </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						 {{item.message.content === 'undefined' ? '此用户很懒，什么都没留下':item.message.content}}
					</div>
				</div>
			</div>
     </div>
   </div>
   <mt-button type='danger' size='large' plain @click='getMore'>点击展开更多评论</mt-button>

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      pageIndex: 1, // 默认展示第一页的数据
      comments: [], // 获取到的评论数据
      msg: '', // 评论输入的内容
      username: ''
    }
  },
  created () {
    this.getPerson('username')
    this.getComments()
  },
  methods: {
    getPerson(data){
      const person = JSON.parse(localStorage.getItem('Login_data'))
      return this[data] = this.getPersonProp(person, data)
    },
    getPersonProp(obj,prop){
      return obj[prop]
    },
    getComments () { // 获取评论的数据
      this.$axios.get('api/getcomments/' + this.id + '/' + this.pageIndex).then(result => {
          let message = []
          message = result.data
          if(message.length == 0){
            return mui.alert('欢迎使用庄佳杰网站', '评论已加载到最后一页')
          }
          mui.toast('加载中，请稍等。')
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
        return mui.toast('评论内容不能为空！')
      }
      // post的三个参数：
      // 1.请求的url地址
      // 2.提交给服务器的数据对象 {content: this.msg}
      // 3.定义提交的时候，表单中数据的格式 {emulateJSON: true}   这个应该全局配置，比较方便
      this.$axios
        .post('api/postcomment/' + this.$route.params.id, { content: this.msg.trim(),user_name:this.username}).then(result => {
          if(!result.data.sort){
           return mui.toast('系统繁忙，请重试！')
          }
          this.msg = ''
          this.pageIndex = 1
          this.$axios.get('api/getcomments/' + this.id + '/' + this.pageIndex).then(result => {
          let message = []
          message = result.data
          this.comments = message
          })
          mui.toast('发表成功')
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
  .mui-card{
    border:1px solid goldenrod;
    .mui-card-header{
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      border-bottom:1px solid rgb(209, 136, 41);
      .order{
        color: rgb(155, 27, 180);
      }
      .author{
        color: rgb(204, 62, 27);
        margin-left: -15px;
      }
      .release{
        margin-right: 3px;
      }
      .time{
        color: rgb(63, 161, 168);
      }
    }
    .mui-card-content{
      color: grey;
    }
  }
}
</style>
