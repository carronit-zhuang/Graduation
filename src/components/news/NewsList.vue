<template>
  <div>
    <ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key='item.id'>
        <router-link :to=" '/home/newsinfo/' + item.id">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'><span>发表时间：{{item.add_time | dateFormat}}</span></p>
						</div>
					</a>
				</router-link>
				</li>
			</ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      newslist: []
    }
  },
  created () {
    this.getNewsList()
  },
  methods: {
    getNewsList () {
      // 获取新闻列表
      this.$axios.get('api/getnewslist').then(result => {
          this.newslist = result.data[0].message
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .mui-table-view {
    h1 {
    color: black;
    font-size:  14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
