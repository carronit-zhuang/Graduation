<template>
  <div class="shopcar-container">
    <addressSelect></addressSelect> 
    <!-- 商品列表区域 -->
   <div class="goods-list">
     <div class="mui-card" v-for="(item) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <img :src="item.thumb_path">
            <div class="info">
              <h1> <span class="title">{{item.title}}</span></h1>
                <p class="title_content">
                  <span class="price">￥{{item.sell_price}}</span>
                  <span class="quantity">x {{item.count}}</span>
                </p>
            </div>
					</div>
				</div>
			</div>
   </div>

  </div>
</template>

<script>
import addressSelect from './addressSelect.vue'
export default {
  data () {
    return {
      goodslist: [] ,// 购物车中所有商品的数据
      username: ''
    }
  },
  created () {
    this.getPerson('username')
  },
  mounted(){
    // this.getGoodsList()
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      // 获取到store中所有商品的id,然后拼接成一个用逗号分割开的字符串
      if(this.$store.state.order.length == 0){
        return
      }
      this.$store.state.order.forEach(item => {
        this.$axios.get('api/goods/getshopcarlist/' + item.id).then(result => {
          this.goodslist = this.goodslist.concat(result.data)
          return this.assignCount()
        })
      })
    },
    assignCount(){
      const self = this
      for(var i = 0;i<this.$store.state.order.length;i++ ){
        this.goodslist.map(item=>{
        if(item.id == self.$store.state.order[i]['id']){
          return item.count = self.$store.state.order[i].count 
          }
        })
      }
    },
    getPerson(data){
      const person = JSON.parse(localStorage.getItem('Login_data'))
      return this[data] = this.getPersonProp(person, data)
    },
    getPersonProp(obj,prop){
      return obj[prop]
    },
  },
  components: {
    addressSelect
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
        margin-left:20px;
      }
      h1{
        font-size: 13px;
        height: 20px;
        width: 270px;
        display: flex;
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
</style>
