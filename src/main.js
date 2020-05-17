// 入口文件
import Vue from 'vue'
//导入路由的包
import VueRouter from 'vue-router'
import axios  from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000'
import Vuerify from 'vuerify'

Vue.use(Vuerify, {
  phone: {
    test: /^1[3456789]\d{9}$/,
    message: '请您输入正确的手机号码！'
  }})/*, 添加自定义规则，默认提供了 email, required, url 等规则 */

// 注册vuex状态管理器
import Vuex from 'vuex'
// 1.3 引入自己的router.js路由模块
import router from './router.js'
// 安装图片的预览插件
import VuePreview from 'vue-preview'
// 导入格式化时间的moment插件
import moment from 'moment'
import 'lib-flexible'
// 引入app组件
import App from './App.vue'

//在按需导入懒加载的时候，会导致懒加载图标丢失，此时只能全部导入
// import {Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui';
import MintUi from 'mint-ui'

// 导入MUI的样式
import './lib/mui/css/mui.css'
// import './lib/mui/css/mui.min.css'

import './lib/mui/css/icons-extra.css'
import '../public/global.css'
import 'mint-ui/lib/style.css'

import './lib/mui/css/app.css'
import './lib/mui/css/mui.picker.css'
import './lib/mui/css/mui.poppicker.css'


// 注册组件
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import mui from './lib/mui/js/mui.js'
// import '../public/model/index'
Vue.use(Vuex)
Vue.prototype.mui = mui
// 每次刚进入网站，肯定会调用main.js，在刚调用的时候，先从本的存储中把购物车的数据读出来，放到Store中
let {cart} = JSON.parse(localStorage.getItem('Login_data') || '[]')
if(cart){
  if(!Array.isArray(cart)){
    cart = Array.isArray( JSON.parse(cart) )?JSON.parse(cart) :JSON.parse(JSON.parse(cart) )
  }
}else{
  cart = []
}
// var cart = JSON.parse(localStorage.getItem('Login_data')).cart
var store = new Vuex.Store({
  state: {// this.$store.state.***
    'cart': cart, 
    // 将购物车中的商品的数据，用一个数组存储起来
    // {id:商品的id , count:要购买的数量,price: 商品的单价, selected: false}
    'order': [],
    'resetUserName':''
  },
  mutations: {// this.$store.commit('方法的名称'，'按需传递唯一的参数')
    addToCart (state, goodsinfo) {
      // 点击加入购物车时，把商品的信息保存到store中的cart上
      // 分析：
      // 1.如果购物车中，之前早就有这个对应的商品了，那么只需要更新数量
      // 2.如果没有，则直接把商品的数据push到cart中即可
      // 假设在购物车中，没有找到对应的商品
      var flag = false
      state.cart.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      // 如果最终循环检查完毕，没有发现相同的商品，那么得到的flag就还是false，则把商品的数据对象直接push到购物车中
      if (!flag) {
        state.cart.push(goodsinfo)
      }
      // 每当更新了cart之后，要记得把cart数组存储到本地的loaclStorage中
      // localStorage.setItem('cart', JSON.stringify(state.cart))
      let tempObj = JSON.parse(localStorage.getItem('Login_data'))
      tempObj.cart = state.cart
      localStorage.setItem('Login_data', JSON.stringify(tempObj))
    },
    updateGoodsInfo (state, goodsinfo) {
      // 修改Vuex里购物车中商品的数量
      state.cart.find(item => {
        if (item.id === goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量，就把最新的的数量保存到本地存储中
      let tempObj = JSON.parse(localStorage.getItem('Login_data'))
      tempObj.cart = state.cart
      localStorage.setItem('Login_data', JSON.stringify(tempObj))
    },
    removeData (state, id) {
      // 根据传过来的id删除store中那条数据
      state.cart.find((item, index) => {
        if (item.id === id) {
          state.cart.splice(index, 1)
          return true
        }
      })
      // 将删除完毕后的最新数据重新写到本地存储中
      // console.log(JSON.stringify(state.cart))
      let tempObj = JSON.parse(localStorage.getItem('Login_data'))
      tempObj.cart = state.cart
      localStorage.setItem('Login_data', JSON.stringify(tempObj))
    },
    updateGoodsSelected (state, info) {
      state.cart.find(item => {
        if (item.id === info.id) {
          item.selected = info.selected
          return true
        }
      })
      // 更改了selected属性之后，再把更新后的开关状态保存到本地存储中去
      let tempObj = JSON.parse(localStorage.getItem('Login_data'))
      tempObj.cart = state.cart
      localStorage.setItem('Login_data', JSON.stringify(tempObj))
    },
    updateCart(state, array){
      return state.cart = array
    },
    clearAll(state){
      state.cart = []
    },
    assignStateOrder(state,obj){
      if(!obj){
        return state.order = state.cart.filter(item=>item.selected == true)
      }
      state.order = []
      return state.order.push(obj)
    },
    assignResetUserName(state, name){
      return state.resetUserName = name
    }

  },
  getters: { // this.$store.getters.***
    // 相当于计算属性，也相当于filters，做了一层包装
    getAllCount (state) {
      var c = 0
      state.cart.forEach(item => {
        if(item.selected){
          c += item.count
        }
      })
      return c
    },
    getGoodsCount (state) {
      var o = {}
      state.cart.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected (state) {
      let o = {}
      state.cart.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getAllCountAndTotalPrice (state) {
      let o = {
        count: 0,
        totalPrice: 0
      }
      state.cart.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.totalPrice += item.count * item.price
        }
      })
      return o
    },
    getOrderByNowPrice (state) {
      return state.order[0].count * state.order[0].price
    }
  }

})
// 1.2 安装路由
Vue.use(VueRouter)
Vue.use(VuePreview)
// 定义全局的一个过滤器
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:MM:SS') {
  return moment(dataStr, moment.ISO_8601).format(pattern)
})
//全局配置请求的根路径
// Vue.http.options.root = 'http://www.liulongbin.top:3005'
// Vue.http.options.root = 'http://192.168.1.105:3005'
// Vue.http.options.root = '/zjj'

// Vue.http.options.root = `http://${ip}:3000`


// 全局设置post时候的表单数据格式
// Vue.http.options.emulateJSON = true
Vue.use(MintUi)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
