<template>
  <div>
    <div class="imgContent">
      <img src="images/user.jpg" class="img">
      <div><span style="color:white;">{{username}}</span></div>
    </div>
    <div class="mui-content">
		    <div class="mui-card">
		        <ul class="mui-table-view">
                  <div class="space">
                    <li class="mui-table-view-cell">
                      <router-link class="mui-navigate-right" to="/member/personinfo">
		                    个人信息
		                  </router-link>
		                </li>
                  </div>

                  <div class="space">
                    <li class="mui-table-view-cell">
		                  <router-link tag="a" to="/orderlist" class="mui-navigate-right">
		                    我的订单
		                  </router-link>
		                </li>
                  </div>

                  <!-- <div class="space">
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right">
                            我的地址
                        </a>
                    </li>
                  </div> -->

                  <div class="space loginOut">
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right" @tap='loginOut'>
                            退出登录
                        </a>
                    </li>
                  </div>
		        </ul>
		    </div>
		  </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      username: ''
    }
  },
  created(){
    this.getPerson('username')
  },
  methods: {
    getPerson(data){
      const person = JSON.parse(localStorage.getItem('Login_data'))
      return this[data] = this.getPersonProp(person, data)
    },
    getPersonProp(obj,prop){
      // console.log(obj,prop)
      return obj[prop]
    },
    loginOut() {
      let tempObj = JSON.parse(localStorage.getItem('Login_data'))
      const { cart,email,username,phone } = tempObj
       this.$http.put('api/account/modify',
        {username: username,email: email,phone:phone, 'cart': JSON.stringify(cart) }).then(data => {
          if(data.body.userExist){
            window.localStorage.removeItem('Login_data')
            this.$store.commit('clearAll')
            mui.toast('账户成功退出！');
            this.$router.push('/login')
          }else {
            mui.alert('退出失败！');
          }
        })
    },
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
.mui-card {
  margin: 0;
}
.mui-content {
  background: red;
}
.imgContent {
  text-align: center;
  background: darkseagreen;
}
.img {
  width: 27%;
  border-radius: 50%;
}
.space {
  margin-bottom: 25px;
  background: moccasin;
}
.mui-navigate-right {
  text-align: center;
}
.loginOut {
  color: rgb(223, 97, 97);
  font-weight: 500;
}
</style>
