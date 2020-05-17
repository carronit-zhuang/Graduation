<template>
  <div class='newsinfo-container'>
    <!-- 大标题 -->
    <h3 class='title'>{{newsinfo.title}}</h3>
    <!-- 子标题 -->
    <p class='subtitle'>
      <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
    </p>
    <hr>
    <!-- 内容的区域 -->
    <div class="content" v-html='newsinfo.content'> </div>
    <!-- 放置评论子组件的区域 -->
    <comment-box :id ="this.id"></comment-box>
    <div class="space"></div>
    <recommend-box></recommend-box>
    <div class="space"></div>
  </div>
</template>

<script>
// 1.导入评论的子组件
import comment from '../subcomponents/comment.vue'
import recommend from '../subcomponents/recommend_news.vue'

import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      id: this.$route.params.id, // 把路由上的id挂载到data上，方便以后的调用
      newsinfo: {} // 新闻对象
    }
  },
  created () {
    this.getNewsInfo()
    window.scrollTo(0, 0)
  },
  methods: {
    getNewsInfo () { // 获取新闻资讯的详情
      this.$axios.get('api/getnew/' + this.id).then(result => {
          this.newsinfo = result.data[0].message[0]
      })
    }
  },
  components: {
    // 2.用来注册子组件的节点
    'comment-box': comment,
    'recommend-box': recommend
  }
}
</script>

<style lang="scss" scoped>
  .newsinfo-container{
    padding: 0 4px;
    .space{
      margin-bottom: 20px;
    }
    .title{
      color: red;
      font-size: 16px;
      text-align: center;
      margin: 15px 0;
    }
    .subtitle{
      display: flex;
      justify-content: space-around;
      font-size: 13px;
      color: #226aff;
    }

  }
</style>
