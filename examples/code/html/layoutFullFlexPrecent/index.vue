<template lang="pug">
  .snippet-wrap
    .top-title
      h2 全屏+flex+百分百布局
    #wrapper.pos-r
      #header header
      #main
        .left left
        .right
          .right-inner right
      #footer footer
</template>

<script>
export default {
  name: 'layoutFullFlexPrecent'
}
</script>

<style scoped>
#wrapper{display: flex; flex-direction: column; height: 500px; overflow: hidden; margin: 20px auto; font-size: 30px; text-align: center; color: #fff}
#header{height: 8%; background-color: #F360C4;}
#footer{height: 8%; background-color: #232530;}
#main{flex: 1; display: flex;}
#main .left{width: 18%; background-color: orange;}
#main .right{flex: 1; overflow-y: auto; color: #999}
#main .right-inner{min-height: 1000px;}
</style>
