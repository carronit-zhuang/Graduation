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

            <button id='showProblemPicker' class="mui-btn mui-btn-block" type='button'>请选择验证方式（手机/邮箱）</button>
            <div id='problemResult' class="ui-alert" v-show='showProblem'></div>
            
          <div class="box">
            <div class="content">
              <label for="answer">答案 :</label><input id="answer" type="text" class="mui-input-clear mui-input" v-model="answer" placeholder="请输入密保问题">
            </div>
          </div>
      
            <mt-button type="danger" size='large' @click="handleSubmit">验证</mt-button>
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
            msg: '忘记密码',
            username: '',
            answer: '' ,
            showProblem: false,
            way: ''
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
    },
    vuerify: {
      username: {
        test: /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$/,  // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
        message: '昵称需要4-16位：中文，字母，数字，下划线，减号均可'
      },
    },
    methods: {
        handleSubmit() {
            if (this.$vuerify.check()) {
              this.findAccount().then(data => {
               if (data.userExist) { //用户是否存在
                 if(data.correctQuery){  //账户和密保问题是否对应
                 this.assignResetName(this.username)
                  mui.toast('验证通过，请重设密码');
                  this.$router.push({ path: '/reset'})
                  }else {
                    mui.alert('密保问题验证失败，无法继续！');
                  }
           } else {
              mui.alert('用户不存在！');
            }
                })
            } else {
                mui.alert('验证失败，请按提示输入正确信息！');
            }
        },
        findAccount() {
         let type = ''
         return new Promise((resolve,reject)=>{
           if(this.way == 0 ){
             type = 'phone'
           }else if (this.way == 1 ){
             type = 'email'
           }
            this.$axios.get('api/account/verify?username='+this.username+'&'+ type + '='+ this.answer).then(result=>{
              resolve(result.data)
           })
         })
        },
        assignResetName(name){
        this.$store.commit('assignResetUserName', name)
      }
    },
    mounted() {
     	(function($, doc) {
				$.init();
				$.ready(function() {
					/**
					 * 获取对象属性的值
					 * 主要用于过滤三级联动中，可能出现的最低级的数据不存在的情况，实际开发中需要注意这一点；
					 * @param {Object} obj 对象
					 * @param {String} param 属性名
					 */
					var _getParam = function(obj, param) {
						return obj[param] || '';
					};
					var problemPicker = new $.PopPicker();
					problemPicker.setData([{
						value: 0,
						text: "该账户手机号码是多少？"
					}, {
						value: 1,
						text: "该账户邮箱地址是多少？"
          }]);
         	var showProblemPickerButton = doc.getElementById('showProblemPicker');
					var problemResult = doc.getElementById('problemResult');
					showProblemPickerButton.addEventListener('tap', function(event) {
						problemPicker.show(function(items) {
            problemResult.innerHTML = items[0].text;
            self.way = items[0].value;
            self.showProblem = true
							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);
				});
      })(mui, document);
      var self = this  //要在这里给self赋值vue实例
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    text-align: center;
    font-size: 20px;
    color: #474da5;
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
    left: 7%;
    top: 78%;
    font-size: 13px;
    color:dimgrey;
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
   margin-top: 20px;
}
label {
    font-weight: 700;
    color: #3b2269;
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
  /* border: 1px solid rgb(128, 36, 86); */
  padding: 10px;
  /* background: beige; */
  border-radius: 3px;
  background-image: url('../../../public/images/forget.jpg');

}
#problemResult {
  background: lightpink;
  line-height: 26px;
  height: 30px;
  text-align: center;
  padding: 3px;
}
</style>
