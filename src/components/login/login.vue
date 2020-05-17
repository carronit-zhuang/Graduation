<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <form>
          <div class="box1">
            <div class="content">
              <label for="username">用户名 :</label><input id="username" type="text" class="mui-input-clear mui-input" v-model="username" placeholder="请输入您的用户名昵称">
            </div>
            <!-- <li>{{userErr}}</li> -->
          </div>
          <div class="box2">
            <div class="content">
              <label for="pwd">密码 :</label><input id="pwd" :type="showPassword" v-model="password" placeholder="请输入您的密码">
               <a @tap.prevent="flagFunc" :class="['eye', flag ? 'active':'']"><span class="mui-icon mui-icon-eye"></span></a>
            </div>
            <!-- <li>{{passErr}}</li> -->
          </div>
          
            <div class="link-area">
              <router-link to="/register"><span id='reg' style="color:blue;">注册账号</span> </router-link>
              <span class="spliter">|</span>
               <router-link to="/forget"><span id='forgetPassword' style="color:red;">忘记密码</span></router-link>
          </div>
            <mt-button type="primary" size='large' @click="handleSubmit">登录</mt-button>
        </form>
      

    </div>
</template>

<script>

export default {
    name: 'hello',
    data() {
        return {
            msg: '欢迎访问，请登录',
            username: '',
            password: '',
            flag: false,
            email: '',
            phone: '',
            cart: ''
        }
    },
    computed: {
        errors() {
            console.log(this.$vuerify.$errors);
            return this.$vuerify.$errors // 错误信息会在 $vuerify.$errors 内体现
        },
        userErr() {
          return this.$vuerify.$errors.username
        },
        passErr() {
          return this.$vuerify.$errors.password
        },
        showPassword(){
          return this.flag ?  'text' : 'password'
        }
    },
    vuerify: {
        username: {
            test: /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$/,  // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
            message: '昵称需要4-16位：中文，字母，数字，下划线，减号均可'
        },
        password: {
            test: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: '最少8个字符：包含至少1个大写字母、小写字母和数字'
          },
    },
    methods: {
       handleSubmit() {
         this.findAccount().then(data=>{
           if (data.userExist) { // 手动触发校验所有数据  用户是否存在
              if(data.correctQuery){  //账户和密码是否对应
                this.$axios.get('api/account/straight?username='+this.username).then(result=>{
                  this.phone = result.data[0].phone
                  this.email = result.data[0].email
                  this.cart = result.data[0].cart
                  this.setLocalStorage(this.cart)
                  mui.toast(this.username +'，欢迎您！');
                  this.$router.push({ path: '/home'})
                })
              }else {
                mui.alert('密码输入错误！');
              }
           } else {
              mui.alert('用户不存在！');
            }
         })
        },
       findAccount() {
         return new Promise((resolve,reject)=>{
            this.$axios.get('api/account?username='+this.username+'&password='+this.password).then(result=>{
              resolve(result.data)
           })
         })
        },
        flagFunc(){
        return this.flag = !this.flag
        },
        setLocalStorage(cart){
          if(!cart){
              localStorage.setItem("Login_data", JSON.stringify({
              username: this.username,
              password: this.password,
              email: this.email,
              phone: this.phone
            }))
          }else{
              localStorage.setItem("Login_data", JSON.stringify({
              username: this.username,
              password: this.password,
              email: this.email,
              phone: this.phone,
              cart: JSON.parse(cart)
            }))
            this.$store.commit('updateCart', Array.isArray( JSON.parse(cart) )?JSON.parse(cart) :JSON.parse(JSON.parse(cart) ))
          }
          
        },
    },
    mounted() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    text-align: center;
    font-size: 20px;
    color: #101bb1 ;
    font-weight: 900;
    margin-bottom: 20px;
}
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    list-style: none;
    text-align: center;
    position: absolute;
    left: 20%;
    top: 78%;
    font-size: 13px;
    color:black;
}

a {
    color: #42b983;
}
.box1,.box2 {
  position: relative;
  margin-bottom: 15px;
}
.box2 {
  margin-bottom: 3px;
}
.content {
   display: flex;
}
label {
    font-weight: 700;
    color: #28aecf;
    width: 27%;
    text-align: center;
    padding-top: 8px;
}
input {
  margin-right: 10px;
  border: 1px solid rebeccapurple !important;
  border-radius: 3px !important;
}
.hello {
    margin-top: 6%;
    margin-top: 150px;
    /* border: 1px solid rgb(130, 71, 138); */
    background: aliceblue;
    padding: 10px;
    border-radius: 3px;
    background-image: url('../../../public/images/login.jpg');
}
.link-area{
  text-align: center;
  margin-bottom: 10px;
}
.eye {
  color: black;
  position: absolute;
  left: 87%;
  top: 13%;
}
.active {
  color:#007aff;
}
html{
  height: 600px !important;
}
</style>
