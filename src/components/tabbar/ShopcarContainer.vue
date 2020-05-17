<template>
  <div class="shopcar-container">
    <!-- 商品列表区域 -->
   <div class="goods-list">
     <div class="mui-card" v-for="(item,index) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change='selectedChange(item.id,$store.getters.getGoodsSelected[item.id])'></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1> <span>{{item.title}}</span></h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :countInit="$store.getters.getGoodsCount[item.id]" :goodsid='item.id'></numbox>
                <a class="a_style" href="#" @click.prevent="remove(item.id,index)">删除</a>
              </p>
            </div>
					</div>
				</div>
			</div>
    <!-- 商品结算区域 -->
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="content">
              <p>总计（不含运费）  </p>
              <p>已勾选商品<span class="red"> {{$store.getters.getAllCountAndTotalPrice.count}} </span>件，总价<span class="red"> ￥{{$store.getters.getAllCountAndTotalPrice.totalPrice}}</span></p>
            </div>
            <mt-button type='danger' @click="goOrder">去下单</mt-button>
					</div>
				</div>
			</div>
   </div>

  </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
  data () {
    return {
      goodslist: [] // 购物车中所有商品的数据
    }
  },
  created () {
    // this.getGoodsList()
  },
  mounted(){
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      if(this.$store.state.cart.length == 0){
        return
      }
      this.$store.state.cart.forEach(item => {
        this.$axios.get('api/goods/getshopcarlist/' + item.id).then(result => {
          this.goodslist = this.goodslist.concat(result.data)
        })
      })
    },
    remove (id, index) {
      // 点击删除，根据id删除vuex中的商品数据，根据index删除goodslist中的商品数据
      this.goodslist.splice(index, 1)
      this.$store.commit('removeData', id)
    },
    selectedChange (id, val) {
      // 每当点击开关，把最新的开关状态同步到store中去
      // console.log(id,'-------------',val)
      this.$store.commit('updateGoodsSelected', { id, selected: val })
    },
    goOrder(){
      this.$router.push('/order')
      this.$store.commit('assignStateOrder')
    }
  },
  components: {
    numbox
  }
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
      }
      h1{
        font-size: 13px;
        height: 20px;
        width: 270px;
        display: flex;
        justify-content: space-around;
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
        .red{
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
</style>
