<template>
  <div>
    <h1>完善收件人信息</h1>

        <div class="box">
        <div class="content">
          <label for="username">姓名 :</label><input id="username" type="text" class="mui-input-clear mui-input" v-model="username" placeholder="请输入收件人姓名！">
        </div>
        <li>{{userErr}}</li>
      </div>

    <div class="box">
      <div class="content">
      <label for="tel">手机号码:</label><input id="tel" type="tel" v-model="phone" placeholder="请输入收件人电话号码！" maxlength="11">
      </div>
      <li>{{phoneErr}}</li>
    </div>

    <div class="box">
      <div class="content">
          <label for="postCode">邮编 :</label><input id="postCode" v-model="postCode" type="text" placeholder="请输入收件人所在地邮编代码！" >
        </div>
      <li>{{postCodeErr}}</li>
    </div>
      
    <div class="box">
        <div class="content">
         <label for="showCityPicker3">收货省市:</label><input id='showCityPicker3' class="mui-btn mui-btn-block" type='button'>
      </div>
    </div>
      
    <div class="box">
      <div class="content detailAddress">
          <label for="address">详细地址:</label><input id="address" v-model="address" type="text" placeholder="请输入详细地址（不含省市）" >
      <li>{{addressErr}}</li>
        </div>
    </div>

    <div>
      <p class="bottomBar">
        <span class="allCount"> 合计：</span> <span class="red"> ￥{{$store.getters.getAllCountAndTotalPrice.totalPrice}}</span>
    
        <button type="button" class="mui-btn mui-btn mui-btn-warning" @tap="order">提交订单</button>
      </p>
    </div>
   
      
    <div id='father' v-show="showCity">
        <div id='cityResult3' class="ui-alert">
          <div class="province">{{province}}</div>
          <div class="city">{{city}}</div>
          <div class="district">{{district}}</div>
          </div><br>
    </div>

  </div>
</template>


<script>

import {cityData3}from '../../lib/mui/js/city.data-3.js'

export default {
    data() {
      return {
        province: '',
        city: '',
        district: '',
        showCity: false,
        username: '',
        phone: '',
        postCode: '',
        info: '',
        address: ''
      }
  },
  components: {
  },
  created(){
    this.getPerson('username')
    this.getPerson('phone')
  },
  computed: {
    errors() {
        console.log(this.$vuerify.$errors);
        return this.$vuerify.$errors // 错误信息会在 $vuerify.$errors 内体现
    },
    userErr() {
      return this.$vuerify.$errors.username
    },
    phoneErr() {
      return this.$vuerify.$errors.phone
    },
    postCodeErr() {
      return this.$vuerify.$errors.postCode
    },
    addressErr() {
    return this.$vuerify.$errors.address
  },
},
  vuerify: {
      username: {
          test: /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$/,  // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
          message: '姓名需要4-16位：中文，字母，数字，下划线，减号'
      },
      postCode: {
        test:/^[1-9]\d{5}$/,
        message: '邮编格式错误，请重新输入。'
      },
      phone: 'phone', // 使用全局自定义规则
      address: {
      test:  /(.*?)[市区弄号楼路道]/,
      message: '地址应包含“路/楼/号/道”等关键字。'
    },
  },
  mounted(){
        //省市区三级联动
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
					//					//级联示例
					var cityPicker3 = new $.PopPicker({
						layer: 3
					});
					cityPicker3.setData(cityData3);
          var showCityPickerButton = doc.getElementById('showCityPicker3');
					var cityResult3 = doc.getElementById('cityResult3');
					showCityPickerButton.addEventListener('tap', function(event) {
						cityPicker3.show(function(items) {
              self.showCity = true
              self.province = (_getParam(items[0], 'text')) 
              self.city = (_getParam(items[1], 'text')) 
              self.district = (_getParam(items[2], 'text')) 
            });
					}, false);
				});
      })(mui, document);
     var self = this
  },
  methods: {
    orderNum () {
      const now = new Date()
      const year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      let hour = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      const yyyyMMddHHmmss = `${year}${month}${day}${hour}${minutes}${seconds}`;
      return yyyyMMddHHmmss + '_' + Math.random().toString(36).substr(2, 9);
    },
    getPerson(data){
      const person = JSON.parse(localStorage.getItem('Login_data'))
      return this[data] = this.getPersonProp(person, data)
    },
    getPersonProp(obj,prop){
      return obj[prop]
    },
    order(){
      const btnArray = ['取消', '确认'];
      const self = this
      if(this.$vuerify.check()){
        const specificAddress = this.province+this.city+this.district+this.address
        const orderNum = this.orderNum()
        const order = JSON.stringify(self.$store.state.order)
        mui.confirm('是否现在结算该订单？', this.username +' 您好', btnArray, function(e) {
          if (e.index == 1) {
            self.$http.post('api/orderlist',{username:self.username,phone:self.phone,postCode:self.postCode,specificAddress:specificAddress,orderNum:orderNum,paid: true,order:order}).then(result=>{
                  self.$router.push('/orderlist')
            })
          } else {
            self.$http.post('api/orderlist',{username:self.username,phone:self.phone,postCode:self.postCode,specificAddress:specificAddress,orderNum:orderNum,paid: false,order:order}).then(result=>{
                self.$router.push('/orderlist')
           })
          }
        })
      }else{
        mui.alert('请确认收获信息是否填写正确！')
      }
    }
  }
}
</script>




<style lang="scss" scoped>
.buttonBox {
  text-align: right ;
}
span {
  font-size: 16px;
  width: 30%;
  text-align: center;
  margin-top: 10px;
}
.mui-btn {
  font-size: 16px;
  padding: 8px;
  margin: 3px;
}
  h5.mui-content-padded {
    margin-left: 3px;
    margin-top: 20px !important;
  }
  h5.mui-content-padded:first-child {
    margin-top: 12px !important;
  }
  #father{
    display: flex;
    justify-content: space-around;
    align-content: center;
    position: absolute;
    left: 23%;
    align-content: center;
    top: 38%;
    .ui-alert {
            width:200px;
            display: flex;
            justify-content: space-around;
            padding: 20px 10px;
            font-size: 16px;
          }
  }
h1 {
  text-align: center;
  color: #323233;
  font-size: 16px;
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
    padding-top: 11px;
}
input {
  margin-right: 10px;
  border: 1px solid rebeccapurple !important;
  border-radius: 3px !important;
}
.detailAddress {
  margin-top: 15px;
}
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
input {
  margin-right: 10px;
  border: 1px solid rebeccapurple !important;
  border-radius: 3px !important;
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
  margin-left: 34%;
}
</style>
