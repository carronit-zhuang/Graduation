<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class='subtitle'>
      <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
    </p>
  <hr>

  <!-- 缩略图区域 -->
<div class="thumbs">
    <vue-preview :slides="list" class="imgPrev"></vue-preview>
</div>

  <!-- 图片内容区域 -->
    <div class="content">{{photoinfo.content}}</div>

  <!-- 放置一个现场的评论子组件 -->
  <cmt-box :id='id'></cmt-box>
    <div class="space"></div>
    <recommend-box></recommend-box>
    <div class="space"></div>
  </div>
</template>

<script>
// 1.导入评论的子组件
import comment from '../subcomponents/comment.vue'
import recommend from '../subcomponents/recommend_photo.vue'
export default {
  data () {
    return {
      id: this.$route.params.id, // 从路由获取到图片ID
      photoinfo: {}, // 图片详情
      list: [] // 缩略图的数组
    }
  },
  created () {
    this.getThumbs()
    this.getPhotoInfo()
    window.scrollTo(0, 0)
  },
  methods: {
    getPhotoInfo () {
      // 获取图片的详情信息
      this.$axios.get('api/getimageInfo/' + this.id).then(result => {
          this.photoinfo = result.data[0].message[0]
      })
    },
    getThumbs () {
      // 获取缩略图的数据
      this.$axios.get('api/getthumbnail/' + this.id).then(result => {
          // 循环数组中的每个图片数据，补全图片的宽和高
          let tempArr = []
          tempArr = result.data[0].message
          tempArr.forEach(item => { 
            item.w = 600
            item.h = 400
            item.msrc = item.src
          })
        // 再把完整的数据保存到slide中
        this.list = tempArr
      })
    }
  },
  components: { // 2.注册子组件
    'cmt-box': comment,
    'recommend-box': recommend
  }
}
</script>

<style lang="scss" scoped>
  .photoinfo-container{
    padding: 3px;
    .space{
      margin-bottom: 20px;
    }
    h3 {
      color: rgb(172, 38, 120);
      font-size: 15px;
      text-align: center;
      margin: 15px 0;
    }
    .subtitle {
      display: flex;
      justify-content: space-around;
      font-size: 13px;
    }
    .content {
      font-size: 13px;
      line-height: 35px;
      padding: 10px;
      text-indent: 2em;
    }
    .thumbs { //要修改关于缩略图的样式，去自定义global.css改
      img {
        margin: 10px;
        height: 100px;
        box-shadow: 0 0 8px #999;
      }
    }
  }
</style>
