<template>
  <div>
       <button id='showCityPicker3' class="mui-btn mui-btn-block" type='button'>点击选择查询地区</button>
    <div id='father'>
        <div id='cityResult3' class="ui-alert">
          <div class="province">{{province}}</div>
          <div class="city">{{city}}</div>
          <div class="district">{{district}}</div>
          </div><br>
         <button v-show="showB" type="button" class="mui-btn mui-btn-danger" data-loading-text = "冷却中" data-loading-icon-position="left" id='tapForQuery'>
		               查询
		     </button>
    </div>
       <div class="weatherForm" v-show='showTable'>
   <table  class="weatherForm-table1">
          <thead>
            <tr>
                <th colspan="2">昨天日期</th>
                <th colspan="2">天气现象</th>
                <th>风向</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                    <td rowspan="2" class="bg">{{yesWeather.date}}</td>
                    <td class="bg">白天</td>
                    <td>{{yesWeather.type}}</td>
                    <td class="high">{{yesWeather.high}}</td>
                    <td>{{yesWeather.fx}}</td>
                </tr>
                <tr>
                    <td class="bg">夜间</td>
                    <td>{{yesWeather.type}}</td>
                    <td class="low">{{yesWeather.low}}</td>
                    <td>{{yesWeather.fx}}</td>
                </tr>
            </tbody>
        </table>
  <table>
            <thead>
                <tr>
                    <th colspan="2">今后日期</th>
                    <th colspan="2">天气现象</th>
                    <th>风向</th>
                </tr>
            </thead>
            <tbody v-for="item in weatherList" :key='item.index'>
                <tr>
                    <td rowspan="2" class="bg">{{item.date}}</td>
                    <td class="bg">白天</td>
                    <td>{{item.type}}</td>
                    <td class="high">{{item.high}}</td>
                    <td>{{item.fengxiang}}</td>
                </tr>
                <tr>
                    <td class="bg">夜间</td>
                    <td>{{item.type}}</td>
                    <td class="low">{{item.low}}</td>
                    <td>{{item.fengxiang}}</td>
                </tr>
                <tr><td colspan="7" class="space"></td></tr>
                <tr><td colspan="7" class="space"></td></tr>
                <tr><td colspan="7" class="space"></td></tr>
                <tr><td colspan="7" class="space"></td></tr>
            </tbody>
        </table>     
</div>
  <!-- 摘要信息 -->
  <div class="mui-card" v-show='showTable'>
  <div class="mui-card-content">
    <div class="mui-card-content-inner">
      温馨提示：{{tip}}
    </div>
  </div>
</div>   
    <!-- 推荐内容 -->
    <recommend-box v-show='showTable'></recommend-box>
  </div>
</template>


<script>

import '../../lib/mui/js/mui.js'
import '../../lib/mui/js/mui.picker.min.js'
import {cityData3}from '../../lib/mui/js/city.data-3.js'
import recommend from '../subcomponents/recommend_search.vue'

export default {
    data() {
      return {
        province: '',
        city: '',
        district: '',
        weatherList: [],
        yesWeather: {},
        tip: '',
        showB: false,
        showTable: false
      }
  },
  components: {
  // 2.用来注册子组件的节点
  'recommend-box': recommend
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
              self.province = (_getParam(items[0], 'text')) 
              self.city = (_getParam(items[1], 'text')) 
              self.district = (_getParam(items[2], 'text')) 
              // cityResult3.innerText = "" + _getParam(items[0], 'text') + " " + _getParam(items[1], 'text') + " " + _getParam(items[2], 'text');
							//返回 false 可以阻止选择框的关闭
              //return false;
              self.showB = true
              
            });
					}, false);
				});
      })(mui, document);
      //给查询按钮添加事件
     var self = this
     var tapForQueryDiv = document.getElementById('tapForQuery')
     tapForQueryDiv.addEventListener('tap', async function(event){
       self.showTable = false
       self.tip = ''
       self.weatherList = []
       self.yesWeather = {}
       self.getWeather().then(data=>{
         if(self.weatherList.length > 0 ){
          self.showTable = true
           mui.toast('查询成功')
        }else{
          self.showTable = false
          mui.toast('查询失败')
          }

       })
     })
      //loading按钮的行为js
      mui(document.body).on('tap', '.mui-btn-danger', function(e) {
          mui(this).button('loading');
          setTimeout(function() {
              mui(this).button('reset');
          }.bind(this), 1000);
      });
  },
  methods: {
    getWeather(){
              //  console.log(this.district)
       return new Promise((resolve, reject)=>{
         this.$axios.get(`http://wthrcdn.etouch.cn/weather_mini?city=${this.district}`).then(result =>{
         this.weatherList = (result.data).data.forecast
         this.yesWeather = (result.data).data.yesterday
         this.tip = (result.data).data.ganmao
         resolve(111)
          }).catch((err)=>{
            self.showTable = false
            mui.toast('接口访问失败,请重试！')
          })
       })
    }
  }
}
</script>




<style lang="scss" scoped>
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
    .ui-alert {
            width:280px;
            display: flex;
            justify-content: space-around;
            padding: 20px 10px;
            font-size: 16px;
          }
  }
  .weatherForm {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    .weatherForm-table1{
      margin-top: 40px;
      margin-bottom: 40px;
    }
    body{
            background: #ebeff7;
        }
        /*清除表格默认样式*/
        table{
            border-collapse: collapse;
            width: 640px;
            margin: 0 auto;
            
        }
        th,td{
            padding: 0;
            border: 1px solid #99b0da;
            text-align: center;
        }
        th{
            font: 14px/30px "微软雅黑";
            background: #dbe3fa;
        }
        td{
            font: 12px/28px "微软雅黑";
            background: #fff;
        }
        .bg{
            background: #f4f7fc;
        }
        img{
            vertical-align: middle;
        }
        .high{
            color: #e54600;
        }
        .low{
            color: #7171d1;
        }
        .space{
            height: 4px;
            border: none;
            background: #ebeff7;
        }
  }
  .mui-card {
    border: 1px solid #da3a25;;
  }
			
  #tapForQuery{
    height: 60.8px;
    text-align: center;
    font-size: 18px;
  }
</style>
