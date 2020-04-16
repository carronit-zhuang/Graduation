import VueRouter from 'vue-router'

// 导入对应的路由组件
import Homecontainer from './components/tabbar/HomeContainer.vue'
import Membercontainer from './components/tabbar/MemberContainer.vue'
import Shopcarcontainer from './components/tabbar/ShopcarContainer.vue'
import Searchcontainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
import Game from './components/games/Game.vue'
import Register from './components/login/register.vue'
import Forget from './components/login/forget.vue'
import Login from './components/login/login.vue'
import Reset from './components/login/reset.vue'
import PersonInfo from './components/member/personInfo.vue'
// import AddressSelect from './components/order/addressSelect.vue'
import Order from './components/order/order.vue'
import OrderList from './components/order/orderList.vue'
import OrderListDetail from './components/order/orderListDetail.vue'
import LeaveMessage from './components/tabbar/LeaveMessage.vue'


// 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由的匹配规则
    { path: '/home', component: Homecontainer },
    { path: '/member', component: Membercontainer },
    { path: '/member/personinfo', component: PersonInfo },
    // { path: '/member', component: Register },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/forget', component: Forget },
    { path: '/reset', component: Reset },
    // { path: '/addressSelect', component: AddressSelect },
    { path: '/order', component: Order },
    { path: '/orderlist', component: OrderList },
    { path: '/orderlist/detail/:orderNum', component: OrderListDetail },
    { path: '/leavemessage', component: LeaveMessage },

    { path: '/shopcar', component: Shopcarcontainer },
    { path: '/search', component: Searchcontainer },
    { path: '/', redirect: '/home' },
    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/photolist', component: PhotoList },
    { path: '/home/photoinfo/:id', component: PhotoInfo },
    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
    { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' },
    { path: '/home/goodscomment/:id', component: GoodsComment },
    { path: '/home/game', component: Game }
  ],
  
  linkActiveClass: 'mui-active' // 替换默认的路由高亮的类，原类名叫做 router-link-active
})
router.beforeEach((to,from,next)=>{
  if(JSON.parse(localStorage.getItem('Login_data')) || to.path == '/login' || to.path == '/forget' || to.path == '/register' || to.path == '/reset'){
    next();
  }else{
    // console.log(JSON.parse(localStorage.getItem('Login_data')))
    mui.alert('您还没有登录，请先登录!');

    next('/login');
  }
})
// 把自己创建好的路由对象暴露出去，使其得以挂载到VM实例上面
//这里写全局路由守卫
export default router
