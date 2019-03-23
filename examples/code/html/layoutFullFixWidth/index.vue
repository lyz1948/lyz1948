<template lang="pug">
  .snippet-wrap
    .top-title
      h2 全屏布局+定宽-HTML布局
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
  name: 'layoutFullFixWidth'
}
</script>

<style scoped>
#wrapper{height: 500px; overflow: hidden; font-size: 30px; margin: 20px auto;}

#header,#footer{text-align: center; color: #fff;}
#header,#main,#footer{position: absolute; left: 0; right: 0;}

#header{height: 60px; top: 0; background-color: #F360C4;}
#footer{height: 40px; bottom: 0; background-color: #232530;}
#main{top: 60px; bottom: 40px;}

#main .left,#main .right{position: absolute; top: 0; bottom: 0;}
#main .left{width: 200px; left: 0; background-color: #3CE8E6;}
#main .right{left: 200px; right: 0; overflow-y: auto;}
#main .right-inner{min-height: 1000px;}
</style>
