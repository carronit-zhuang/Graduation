<template>
  <div class="recommend">
    <ul class="mui-table-view mui-table-view-chevron">
      	<li class="mui-table-view-cell mui-media" style="padding-left: 140px;background-color:rgb(63, 161, 168)">
            <div>更多推荐内容</div>
				</li>
				<li class="mui-table-view-cell mui-media">
					<router-link class="mui-navigate-right" to="/home/newslist">
						<div class="mui-media-body">
							<span class="mui-icon mui-icon-extra mui-icon-extra-dictionary"> </span> 新闻资讯
							<p class='mui-ellipsis'>让你看的，才是头条。</p>
						</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media">
					<router-link class="mui-navigate-right" to="/home/goodslist">
						<div class="mui-media-body"><span class="mui-icon-extra mui-icon-extra-gift"></span> 逛一逛
							<p class='mui-ellipsis'>给 Ta 精心准备一份礼物是也件非常幸福的事。</p>
						</div>
					</router-link>
				</li>
        <li class="mui-table-view-cell mui-media">
					<router-link class="mui-navigate-right" to="/home/game">
						<div class="mui-media-body"><span class="mui-icon-extra mui-icon-extra-grech"></span> 休闲游戏
							<p class='mui-ellipsis'>不如让你的大脑放放松，来场游戏吧！</p>
						</div>
					</router-link>
				</li>
        <li class="mui-table-view-cell mui-media">
					<router-link class="mui-navigate-right" to="/search">
						<div class="mui-media-body"><span class="mui-icon-extra mui-icon-extra-holiday"></span> 天气预报
							<p class='mui-ellipsis'>安全生产有保障，息息相关是气象。</p>
						</div>
					</router-link>
				</li>
			</ul>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
