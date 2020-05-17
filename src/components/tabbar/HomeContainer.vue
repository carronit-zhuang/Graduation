<template>
  <div>
    <!-- 轮播图区域 -->
  <swiper :swiperList="swiperList" :isfull="true"></swiper>

  <!-- 九宫格到六宫格的改造工程 -->
  <ul class="mui-table-view mui-grid-view mui-grid-9">
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
            <img src="../../../public/images/menu6.png">
            <div class="mui-media-body">新闻资讯</div></router-link></li>
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
            <img src="../../../public/images/menu2.png">
            <div class="mui-media-body">图片浏览</div></router-link></li>
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
            <img src="../../../public/images/menu3.png">
            <div class="mui-media-body">商品下单</div></router-link></li>
    <div class="row">
       <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/search">
            <img src="../../../public/images/menu1.png">
            <div class="mui-media-body">天气预报</div></router-link></li>
         <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/game">
            <img src="../../../public/images/menu5.png">
            <div class="mui-media-body">休闲游戏</div></router-link></li>
    </div>
   
  </ul>
  </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      swiperList: []
    }
  },
  created () {
    this.getSwiper()
  },
  methods: {
    getSwiper () {
      // 获取轮播图数据的方法
      this.$axios.get('api/getswiper/0').then(result => {
        this.swiperList = result.data[0].message
      })
    }
  },
  components: {
    swiper
  }
}
</script>

<style lang="scss" scoped>

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  border: none;
  li{
    width: 33.33%;
  }
    img {
      width: 60px;
      height: 60px;
    }
    .mui-media-body {
      font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell.mui-active {
  background: none;
}
.row {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

</style>
