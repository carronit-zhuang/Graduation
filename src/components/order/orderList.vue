<template>
  <div>
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item' ,item.id ==0?'mui-active':'']" v-for="item in cates" :key="item.img_url" @click="getOrderByPayment(item.id)">
            {{item.title}}
          </a>
        </div>
      </div>
    </div>
    <router-link :to="'/orderlist/detail/'+item.orderNum" tag="div" class="order-item" v-for="item in orderList" :key="item.index">
      <div class="row">
        <p class="order-num">订单号：{{item.orderNum}}</p>
        <span :class="[ item.paid ? 'greenTag':'redTag']">{{item.paid ? '已支付' :'待付款'}}</span>
      </div>
    </router-link>
     <div class="space"></div>
    <recommend-box></recommend-box>
    <div class="space"></div>
  </div>
</template>

<script>
import recommend from '../subcomponents/recommend_all.vue'

export default {
  data(){
    return{
      orderList: [],
      cates: ['全部','待付款','已支付'],
    }
  },
  created(){
    this.getAllOrderList()
    this.getAllCategory()
    this.getOrderByPayment(0) // 默认一进来就展示全部的图片资料
  },
  mounted(){

  },
  computed:{
  },
  components: { // 2.注册子组件
  'recommend-box': recommend
  },
  methods: {
    getAllOrderList(){
      const {username} = JSON.parse(localStorage.getItem('Login_data'))
      this.$http.get('api/orderlist?username='+username).then(result=>{
        this.orderList = JSON.parse(result.bodyText)
      })
    },
    getPaidOrderList(){
        const {username} = JSON.parse(localStorage.getItem('Login_data'))
        this.$http.get('api/orderlist?username='+username+'&paid=true' ).then(result=>{
         this.orderList = JSON.parse(result.bodyText)
      })
    },
    getUnPaidOrderList(){
      const {username} = JSON.parse(localStorage.getItem('Login_data'))
        this.$http.get('api/orderlist?username='+username+'&paid=false').then(result=>{
         this.orderList = JSON.parse(result.bodyText)
      })
    },
    getAllCategory () {
      // 获取所有图片的分类
       this.$http.get('api/getordercategory').then(result => {
          this.cates = JSON.parse(result.bodyText)[0].message
      })
    },
    getOrderByPayment (cateId) {
      // 根据分类id获取图片列表
      if(cateId == 0){
        this.getAllOrderList()
      }else if(cateId == 1){
        this.getUnPaidOrderList()
      }else if(cateId == 2){
        this.getPaidOrderList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .space{
    margin-bottom: 20px;
    }
  .order-item {
    border-bottom: 1px solid #ccc;
    height: 75px;
    padding-top: 5px;
    padding: 7px;
    margin-top: 10px;
    background: #fff;
    .order-num {
      color: black;
    }
    .row{
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
    }
    .redTag {
      background-color: rgb(250, 46, 46);
      color: white;
      border-radius: 4px;
      font-size: 13px;
      padding: 3px;
      height: 25px;
      text-align: center;
    }
    .greenTag {
    background-color: rgb(45, 143, 94);
    color: white;
    border-radius: 4px;
    font-size: 13px;
    padding: 3px;
    height: 25px;
    text-align: center;
    }
  }
  .mui-slider-indicator.mui-segmented-control {
    display: flex;
    justify-content: space-around;  
  }

</style>
