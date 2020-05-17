<template>
  <div class="goods-list">
    <!-- 商品的分类 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item' ,item.id ==0?'mui-active':'']" v-for="item in cates" :key="item.img_url" @click="getGoodsListWithoutPage(item.id)">
            {{item.title}}
          </a>
        </div>
      </div>
    </div>

      <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url">
      <h1 class="title">{{item.brief_title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span> 
            <span><a><span class="mui-icon-extra mui-icon-extra-new"></span></a></span>  
            <span class="hot">热卖中</span>
          </span>
          <span>
            <span>剩 </span>
            <span class="span_style">{{item.stock_quantity}}</span> 
            <span> 件</span>
          </span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data () {
    // data是往自己组件内部，挂载一些私人数据的
    return {
      pageindex: 1, // 分页的页数
      goodslist: [], // 存放商品列表的数组
      cates: [], // 所有分类的数组
      cate: 0
    }
  },
  created () {
    // this.getGoodsList()
    this.getAllCategory()
    this.getGoodsListByCateId(0) // 默认一进来就展示全部的图片资料
  },
  methods: {
    getMore () {
      // 加载更多的商品数据
      this.pageindex++
      this.getGoodsListByCateId()
    },
    goDetail (id) {
      this.$router.push({ name: 'goodsinfo', params: { id } })
    },
    getAllCategory () {
      // 获取所有图片的分类
       this.$axios.get('api/getgoodscategory').then(result => {
          this.cates = result.data[0].message
      })
    },
    getGoodsListByCateId (cateId) {
      this.cate = cateId || this.cate
      this.$axios.get('api/getgoodswithcate/' + this.cate + '/' + this.pageindex).then(result => {
        let message = []
        message = result.data
        if(message.length == 0){
          return mui.alert('欢迎使用庄佳杰网站', '商品已加载到最后一页')
          }
         mui.toast('商品加载中，请稍等')
         this.goodslist = this.goodslist.concat(message)
      })
    },
    getGoodsListWithoutPage(cateId){
      this.cate = cateId || this.cate
      this.pageindex = 1
      this.$axios.get('api/getgoodswithcate/' + this.cate + '/' + '1').then(result => {
        mui.toast('商品加载中，请稍等')
        this.goodslist = result.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item{
      width: 49%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      margin: 4px 0;
      padding: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 293px;
      img {
        width: 100%;
      }
      .title{
        font-size: 14px;
        text-align: center;
      }
      .info{
        .price{
          .now{
            color:red;
            font-weight: bold;
            font-size: 16px;
          }
          .old{
            text-decoration: line-through;
            font-size: 12px;
            margin-left: 10px;
          }
        }
        .sell{
          display: flex;
          justify-content: space-between;
          font-size: 13px; 
          .hot {
            font-weight: 700;
            color: rgb(3, 43, 39);
          }
          .span_style {
            font-weight: 700;
            color: rgb(85, 9, 92);
          }
        }
      }
    }
  }
</style>
