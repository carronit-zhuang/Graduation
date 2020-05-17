<template>
  <div>
    <!-- 顶部的滑动条区域 -->
    <!-- 只有MUI的组件才可以用tap的方法代替click修复手机点击无反应的bug，普通div不能tap -->
<div id="slider" class="mui-slider">
  <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
    <div class="mui-scroll">
      <a :class="['mui-control-item' ,item.id ==0?'mui-active':'']" v-for="item in cates" :key="item.img_url" @click="getPhotoListByCateId(item.id)">
        {{item.title}}
      </a>
    </div>
  </div>
</div>
    <!-- 图片列表区域 -->
    <ul class='photo-list'>
  <router-link v-for="item in list" :key='item.img_url' :to="'/home/photoinfo/'+item.id" tag="li">
    <img v-lazy="item.img_url">
    <div class="info">
      <h1 class="info-title">{{item.title}}</h1>
      <div class="info-body">{{item.zhaiyao}}</div>
    </div>
  </router-link>
</ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cates: [], // 所有分类的数组
      list: [] // 图片列表的数组
    }
  },
  created () {
    this.getAllCategory()
    this.getPhotoListByCateId(0) // 默认一进来就展示全部的图片资料
    window.scrollTo(0, 0)
  },
  mounted () { // 当组件中的DOM结构被渲染好后并放到页面中，才执行这个钩子函数
    // 如果要操作元素了，最早也要在mounted里面才开始，这时的DOM才是最新的
    // 2.初始化scroll控件
    this.mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  },
  methods: {
    getAllCategory () {
      // 获取所有图片的分类
       this.$axios.get('api/getimgcategory').then(result => {
          this.cates = result.data[0].message
        
      })
    },
    getPhotoListByCateId (cateId) {
      // 根据分类id获取图片列表
      this.$axios.get('api/getimages/' + cateId).then(result => {
          this.list = result.data
        
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  * {
    touch-action: pan-y;  //这里必须放pan-y，否则是pan-x的话，手机端查看时无法上下滑动！！！
  }
  .photo-list {
    list-style: none;
    padding: 10px;
    margin: 0;
    padding-bottom: 0;
    li {
        text-align: center;
        background-color: #ccc;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img {
          width: 100%;
        }
        img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .info{
        color: white;
        
        position: absolute;
        bottom: 0;
        max-height: 84px;
        background-color: rgba(0, 0, 0, 0.4);
        width: 100%;
        .info-title{
          font-size: 14px;
          text-align: center;
        }
        .info-body{
          font-size: 13px;
          text-align: left;
        }
      }
    }
  }

</style>
