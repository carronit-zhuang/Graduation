<template>
  <div class="shopcar-container">
  <h2>订单详情</h2>
    <!-- 商品列表区域 -->
   <div>
     <p class="info"><span>收件人姓名：</span><span>{{receiver.username}}</span></p>
     <p class="info"><span>联系电话：</span><span>{{receiver.phone}}</span></p>
     <p class="info"><span>邮编：</span><span>{{receiver.postCode}}</span></p>
     <p class="info"><span>详细收件地址：</span><span>{{receiver.specificAddress}}</span></p>
     <p class="info"><span>订单编号：</span><span>{{orderNum}}</span></p>
   </div>
   <div class="goods-list">
     <div class="mui-card" v-for="(item) in newAddedList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <img :src="item.thumb_path">
            <div class="info">
               <h1> <span class="title">{{item.title}}</span></h1>
                <p class="title_content">
                  <span class="price">￥{{item.price}}</span>
                  <span class="quantity">x {{item.count}}</span>
                </p>
            </div>
					</div>
				</div>
			</div>
			
   </div>
    <div class="space"></div>
    <mt-button size='large' type='primary' @click="goOrder" v-if="showFlag">现在下单</mt-button>
    <div class="space"></div>
    <mt-button size='large' type='danger' @click="goCancel" v-if="showFlag">取消订单</mt-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      receiver: {} ,// 购物车中所有商品的数据
      orderNum: this.$route.params.orderNum,
      goodslist: [],
      newAddedList: []
    }
  },
  created () {
    this.getOrderDetail()
    window.scrollTo(0, 0)

  },
  mounted(){
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail () {
      this.$axios.get('api/orderlist/detail/' + this.orderNum).then(result => {
        this.receiver = result.data[0]
        this.goodslist = JSON.parse(result.data[0].order)
        return this.getNewAddedList()
      })
    },
    getNewAddedList(){
      if(this.goodslist == 0){
        return
      }
      this.goodslist.forEach(item => {
        this.$axios.get('api/goods/getshopcarlist/' + item.id).then(result => {
          this.newAddedList = this.newAddedList.concat(result.data)
          return this.assignProp()
        })
      })
    },
    assignProp(){
      const self = this
      for(var i = 0;i<this.newAddedList.length;i++ ){
        this.goodslist.map(item=>{
        if(item.id == self.newAddedList[i]['id']){
           item.thumb_path = self.newAddedList[i].thumb_path
           return item.title = self.newAddedList[i].title
          }
        })
      }
      this.newAddedList = this.goodslist
    },
    goOrder(){
      const self = this
      this.$axios.put('api/orderlist/detail/'+this.orderNum,{'ordered': true}).then(result=>{
        if(result){
          this.modifyQuantity()
          this.newAddedList.map(item=>self.$store.commit('removeData', item.id))
          this.$router.push('/orderlist')
        }
      })
    },
    goCancel(){
      this.$axios.delete('api/orderlist/detail/'+this.orderNum).then(result=>{
        if(result){
          mui.toast('取消成功！')
          this.$router.push('/orderlist')
        }
      })
    },
    modifyQuantity(){
      const self = this
      this.$axios.get('api/orderlist/detail/'+this.orderNum).then(result=>{
        let arr = JSON.parse(result.data[0].order)
        arr.map(i=>{
          const {id, count} = i
          self.$axios.put('api/modifyQuantity/'+ id,{'quantity':count}).then(result=>{
              //减少商品的数量
               mui.toast(`下单成功,库存已减少`)
          })
        })
      })
    }
  },
  computed: {
    showFlag(){
      return !Boolean(this.receiver.ordered)
    }
  },
}
</script>

<style lang="scss" scoped>
  .shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
      .mui-card-content-inner{
        display: flex;
        align-items: center;
        position: relative;
        justify-content: flex-start !important;
      }
      img{
        width: 60px;
        height: 60px;
        margin-left:20px;
      }
      h1{
        font-size: 13px;
        height: 20px;
        width: 270px;
        display: flex;
         text-align: center;
      }
      .info{
        height: 60px;
        p{
          display: flex;
          margin: 0;
          position: absolute;
          right:20px;
          bottom:15px;
        }
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .price{
          color: red;
          font-weight: bold;
          margin-right: 5px;
          margin-left: 190px;
        }
        .a_style {
          margin-left: 10px;
          color: rgb(182, 82, 36);
        }
      }
      .mui-card-content-inner{
        display: flex;
        justify-content: space-between !important;
        align-items: center;

      }
    }
  }
.title {
  margin-left: 30px;
}
.quantity {
  margin-left: 95px;
}
.title_content {
  display: flex;
  width: 100%;
}
.red{
  color: rgb(233, 43, 43);
  font-weight: bold;
  font-size: 16px;
}
.allCount {
  color: rgb(121, 22, 116);
  font-weight: bold;
}
.bottomBar {
  display: flex;
  align-items: center;
  margin-left: 50%;
}
h2 {
  font-size: 20px;
  color: #b13610;
  font-weight: 900;
  margin-bottom: 20px;
  text-align: center;
}
p.info {
  background: ghostwhite;
  display: flex;
  padding: 2px 10px;
  justify-content: space-between;
}
.title {
  margin-left: 30px;
}
.quantity {
  margin-left: 95px;
}
.title_content {
  display: flex;
  width: 100%;
}
.red{
  color: rgb(233, 43, 43);
  font-weight: bold;
  font-size: 16px;
}
.space{
  margin-bottom: 20px;
}
</style>
