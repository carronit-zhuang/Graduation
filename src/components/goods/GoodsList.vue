<template>
  <div class="goods-list">
    <!-- 在网页中,有两种跳转方式:
    方式1: 使用a标签的形式叫作 标签跳转
    方式2: 使用window.location.href的形式,叫做 编程式导航,使用JS代码实现 -->

    <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
      <img :src="item.img_url">
      <h1 class="title">{{item.title}}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link> -->
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
    // getGoodsList () {
    //   // 获取商品的数据列表
    //   this.$http.get('api/getgoods/' + this.pageindex).then(result => {
    //       let message = []
    //       message = (JSON.parse(result.bodyText))
    //       if(message.length == 0){
    //         return mui.alert('欢迎使用庄佳杰网站', '商品已加载到最后一页')
    //       }
    //       mui.toast('商品加载中，请稍等')
    //       this.goodslist = this.goodslist.concat(message)
    //       // this.goodslist = this.goodslist.concat(result.body.message)
    //   })
    // },
    getMore () {
      // 加载更多的商品数据
      this.pageindex++
      this.getGoodsListByCateId()
    },
    goDetail (id) {
      // 使用JS的形式进行编程式导航
      // window.location.herf属于BOM DOM操作 VUE不提倡 所以用this.$router.push
      // 注意:一定要区分this.$route和this.$router这两个对象
      // 其中this.$route是路由[参数对象],所有路由中的参数,params,query都属于它
      // 其中this.$router是路由[导航对象],用它可以方便的使用JS代码,实现路由的前进 后退 跳转到新的URL地址等操作
      // 1.最简单的
      // this.$router.push('/home/goodsinfo/'+id)
      // 2.传递对象
      // this.$router.push({path:'/home/goodsinfo/'+id})
      // 3.传递命名的路由,此时注意不能传路径path,否则后面的params会被忽略
      this.$router.push({ name: 'goodsinfo', params: { id } })
      // console.log(this)
    },
    getAllCategory () {
      // 获取所有图片的分类
       this.$http.get('api/getgoodscategory').then(result => {
          this.cates = JSON.parse(result.bodyText)[0].message
      })
    },
    getGoodsListByCateId (cateId) {
      this.cate = cateId || this.cate
      this.$http.get('api/getgoodswithcate/' + this.cate + '/' + this.pageindex).then(result => {
        let message = []
        message = JSON.parse(result.bodyText)
        if(message.length == 0){
          return mui.alert('欢迎使用庄佳杰网站', '商品已加载到最后一页')
          }
         mui.toast('商品加载中，请稍等')
         this.goodslist = this.goodslist.concat(message)
        //  console.log(this.goodslist)
      })
    },
    getGoodsListWithoutPage(cateId){
      this.cate = cateId || this.cate
      this.pageindex = 1
      this.$http.get('api/getgoodswithcate/' + this.cate + '/' + '1').then(result => {
        mui.toast('商品加载中，请稍等')
        this.goodslist = JSON.parse(result.bodyText)
        // console.log(this.goodslist)
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
