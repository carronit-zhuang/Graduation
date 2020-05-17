<template>
  <div class="hello">
    <h1>个人信息修改</h1>
        <form>
          <div class="box">
            <div class="content">
              <label for="username">昵称 :</label><input id="username" type="text" class="mui-input-clear mui-input" v-model="username" placeholder="请输入您修改后的用户名昵称" disabled>
            </div>
            <li>{{userErr}}</li>
          </div>
          
          <div class="box">
            <div class="content">
            <label for="email">邮箱 :</label><input id="email" type="email" v-model="email" placeholder="请输入您修改后的邮箱地址">
            </div>
            <li>{{emailErr}}</li>
          </div>
        
          <div class="box">
            <div class="content">
            <label for="tel">手机 :</label><input id="tel" type="tel" v-model="phone" placeholder="请输入您修改后的电话号码" maxlength="11">
            </div>
            <li>{{phoneErr}}</li>
          </div>
            <mt-button type="danger" size='large' @click="handleSubmit">提交修改</mt-button>
      </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
            username: '',
            email: '',
            phone: '',

    }
  },
  methods: {
     handleSubmit() {  
            if (this.$vuerify.check()) { // 手动触发校验所有数据
               this.$axios.put('api/account/modify',
                { username: this.username, email: this.email, phone: this.phone}
                ).then(result => {
                  if(result.data.userExist){
                    mui.toast('信息修改成功');
                    this.$axios.get('api/account/straight?username='+this.username).then(result=>{
                      const username = result.data[0].username
                      const password = result.data[0].password
                      const phone = result.data[0].phone
                      const email = result.data[0].email
                      localStorage.setItem("Login_data", JSON.stringify({
                        username: username,
                        password: password,
                        email: email,
                        phone: phone
                       }))
                      this.$router.push('/member')
                  })
                  }else {
                    mui.alert('用户不存在！');
                  }
                })
            } else {
                mui.alert('修改失败，请按正确格式修改信息！');
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
  created(){
     this.getPerson('username')
     this.getPerson('email')
     this.getPerson('phone')
     window.scrollTo(0, 0)
  },
  mounted(){

  },
  computed: {
     errors() {
            console.log(this.$vuerify.$errors);
            return this.$vuerify.$errors // 错误信息会在 $vuerify.$errors 内体现
        },
     userErr() {
            return this.$vuerify.$errors.username
        },
      emailErr() {
             return this.$vuerify.$errors.email
        }, 
      phoneErr() {
             return this.$vuerify.$errors.phone
        },
  },
   vuerify: {
        username: {
            test: /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$/,  // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
            message: '昵称需要4-16位：中文，字母，数字，下划线，减号'
        },
        email:{ 
          test: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '请您输入正确的邮箱地址' 
          }
        ,
        phone: 'phone' // 使用全局自定义规则
    },
}
</script>

<style lang="scss" scoped>

h1 {
    text-align: center;
    font-size: 20px;
    color: #b13610;
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
.box {
  position: relative;
  margin-bottom: 15px;
}
.content {
   display: flex;
   position: relative;
}
label {
    font-weight: 700;
    color: #b11038;
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
  margin-top: 102px;
  border: 1px solid rgb(180, 72, 122);
  padding: 10px;
  background: rgb(132, 176, 187);
  border-radius: 3px;
}
</style>
