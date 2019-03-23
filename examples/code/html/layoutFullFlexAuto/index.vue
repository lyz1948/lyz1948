<template lang="pug">
  .snippet-wrap
    .top-title
      h2 全屏+flex+自适应布局
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
  name: 'layoutFullFlexAuto'
}
</script>

<style scoped>
#wrapper{display: flex; flex-direction: column; height: 500px; overflow: hidden; margin: 20px auto;text-align: center; font-size: 30px; color: #fff}
#header{background-color: #F360C4;}
#footer{background-color: #232530;}
#main{flex: 1; display: flex;}
#main .left{background-color: #3CE8E6;}
#main .right{flex: 1; overflow-y: auto; color: #999}
#main .right-inner{min-height: 1000px;}
</style>
