<template>
  <div class="goodsdesc-container">
    <h3>{{info.title}}</h3>
    <hr>
    <div class="abstract" v-html="info.content"></div>
    <div class="content" v-for="item in info.message" :key="item.id">
      <img :src="item.src">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: {} // 获得的图文详情对象
    }
  },
  created () {
    this.getGoodsDesc()
  },
  methods: {
    getGoodsDesc () {
      this.$axios.get('api/goods/getdesc/' + this.$route.params.id).then(result => {
        this.info = result.data[0]
      })
    }
  }
}
</script>

<!--这里处理img太大，设置width:100%也没反应的情况下，把scoped去掉就搞定了-->
<style lang="scss">
  .goodsdesc-container {
    h3 {
      font-size: 16px;
      color: rgb(168, 42, 84);
      text-align: center;
      margin: 15px;
    }
    .abstract {
      padding: 10px;
      line-height: 35px;
      color: #333;
      font-size: 14px;
      text-indent: 2em;
      // padding: 12px 0 22px;
    }
    .content{
      img {
        width: 100%;
        // height: 100%;
      }
    }
  }
</style>
