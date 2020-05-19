<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <form>
          <div class="box">
            <div class="content">
              <label for="username">昵称 :</label><input id="username" type="text" class="mui-input-clear mui-input" v-model="username" placeholder="请输入您的用户名昵称">
            </div>
            <li>{{userErr}}</li>
          </div>
          <div class="box">
            <div class="content">
              <label for="pwd">密码 :</label><input id="pwd" :type="showPassword" v-model="password" placeholder="请输入您的密码">
               <a @tap.prevent="flagFunc" :class="['eye', flag ? 'active':'']"><span class="mui-icon mui-icon-eye"></span></a>
            </div>
            <li>{{passErr}}</li>
          </div>
          
          <div class="box">
            <div class="content">
            <label for="repwd">确认密码 :</label><input id="repwd" :type="showPassword" v-model="rePass" placeholder="请二次确认您的密码">
             <a @tap.prevent="flagFunc" :class="['eye', flag ? 'active':'']"><span class="mui-icon mui-icon-eye"></span></a>
            </div>
            <li>{{repassErr}}</li>
          </div>
       
          <div class="box">
            <div class="content">
            <label for="email">邮箱 :</label><input id="email" type="email" v-model="email" placeholder="请输入您的邮箱地址">
            </div>
            <li>{{emailErr}}</li>
          </div>
        
          <div class="box">
            <div class="content">
            <label for="tel">手机 :</label><input id="tel" type="tel" v-model="phone" placeholder="请输入您的电话号码" maxlength="11">
            </div>
            <li>{{phoneErr}}</li>
          </div>
            <mt-button type="danger" size='large' @click="handleSubmit">注册</mt-button>
            <!-- <input type="button" value="提交" @click="handleSubmit"> -->
            <!-- <ul>
                <li v-for="(err, index) in errors" :key="index" v-text="err"></li>
            </ul> -->
        </form>
      

    </div>
</template>

<script>
export default {
    name: 'hello',
    data() {
        return {
            msg: '注册',
            username: '',
            password: '',
            rePass: '',
            email: '',
            phone: '',
            flag: false,

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
        repassErr() {
          return this.$vuerify.$errors.rePass
        },
        emailErr() {
          return this.$vuerify.$errors.email
        }, 
        phoneErr() {
          return this.$vuerify.$errors.phone
        },
        verifyPassword(){
          return this.rePass === this.password
        },
        showPassword(){
          return this.flag ? 'text' : 'password'
        }
    },
    vuerify: {
        username: {
            test: /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$/,  // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
            message: '昵称需要4-16位：中文，字母，数字，下划线，减号'
        },
        password: {
            test: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: '最少8个字符：必须包含大写字母、小写字母和数字'
          },
        rePass: {
            test: function() {
                if (this.verifyPassword) {
                    return true;
                } else {
                    return false;
                }
            },
            message: '两次密码输入不一致'
        },
        email:{ 
          test: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '请您输入正确的邮箱地址' 
          }
        ,
        phone: 'phone' // 使用全局自定义规则
    },
    methods: {
        handleSubmit() {  
            if (this.$vuerify.check()) { // 手动触发校验所有数据
               this.$axios.post('api/account/register',
                { username: this.username, password: this.password, email: this.email, phone: this.phone}
                ).then(result => {
                  console.log(result)
                  if(result.data == 1){
                    this.$router.push({ path: '/login'})
                    mui.toast('注册成功！');
                  }else{
                    mui.alert('用户已存在，请尝试其他昵称！');
                  }
                 })
            } else {
              
                mui.alert('注册失败，请按提示输入正确信息！');
            }
        },
        flagFunc(){
          return this.flag = !this.flag
        }
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
    color: #1893a8;
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
    left: 5%;
    top: 78%;
    font-size: 13px;
    color:lightyellow;
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
    color: #1893a8;
    width: 27%;
    text-align: center;
    padding-top: 8px;
}
input {
  margin-right: 10px;
  border: 1px solid rgb(51, 153, 119) !important;
  border-radius: 3px !important;
}
.hello {
  margin-top: 6%;
  margin-top: 70px;
  /* border: 1px solid rgb(180, 72, 122); */
  padding: 10px;
  background: rgb(132, 176, 187);
  border-radius: 3px;
  background-image: url('../../../public/images/register.jpg');

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
</style>
