<template>
  <div>
    <div id="feedback" class="mui-page feedback hello">
	<div class="mui-page-content">
		<p>问题和意见</p>
		<div class="row mui-input-row">
			<textarea v-model="content" id='question' class="mui-input-clear question" placeholder="请详细描述您的问题和意见..."></textarea>
		</div>
		<p>QQ/微信</p>
		<div class="mui-input-row">
			<input id='contact' v-model="account" type="text" class="mui-input-clear  contact" placeholder="(选填,方便我们联系你 )" />
		</div>
    <br>
		 <button type="button" class="mui-btn mui-btn-success mui-btn-block" @click="postMsg">提交</button>
	</div>
</div>
  </div>
</template>


<script>
export default {
  data(){
    return {
      content: '',
      account: '',
      username:''
    }
  },
  created(){
    this.getPerson('username')
  },
  methods: {
    postMsg(){
      if(this.content){
          this.$axios.post('api/advice',{content:this.content,account:this.account}).then(result=>{
          mui.toast('提交成功，感谢 '+this.username+' 的建议！')
          this.account =''
          this.content =''
          this.$router.go(-1)
        })
      }else{
        mui.alert('问题反馈不能为空！')
      }
      
    },
    getPerson(data){
      const person = JSON.parse(localStorage.getItem('Login_data'))
      return this[data] = this.getPersonProp(person, data)
    },
    getPersonProp(obj,prop){
      return obj[prop]
    },
  }
}
</script>
<style lang="scss" scoped>
  textarea {
    height: 100px;
  }
  .feedback p {
    padding: 10px 15px 0;
  }
  button {
    padding: 5px;
  }
  .hello {
  margin-top: 6%;
  margin-top: 102px;
  /* border: 1px solid rgb(180, 72, 122); */
  padding: 10px;
  background: rgb(132, 176, 187);
  border-radius: 3px;
  background-image: url('../../../public/images/message.jpg');
}
p {
  color: honeydew;
}
</style>
