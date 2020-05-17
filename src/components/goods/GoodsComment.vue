<template>
  <div class="cmtbox">
    <cmtbox :id="$route.params.id"></cmtbox>
  </div>
</template>

<script>
import cmtbox from '../subcomponents/comment.vue'
export default {
  date(){

  },
  created(){
    window.scrollTo(0, 0)
  },
  components: {
    cmtbox
  }
}
</script>

<style lang="scss" scoped>
.cmtbox {
  padding: 7px;
  h3 {
    text-align: center;
    margin: 20px
  }
}

</style>
