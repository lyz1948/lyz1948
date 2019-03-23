<template lang="pug">
  .snippet-demo
    .top-title
       h2 双飞翼布局
    .row
      .wrap.clearfix
        .main
          .inner.bd-5.fct main inner
        .left.bd-5.fct left
        .right.bd-5.fct right
</template>

<script>
export default {
  name: 'layoutDoubleFly'
}
</script>

<style scoped>
.main, .left, .right{float: left; font-size: 30px;}
.main {width: 100%;}
.main .inner {margin: 0 160px 0 140px; height: 240px;}
.left {margin-left: -100%; width: 120px; height: 240px;}
.right {margin-left: -140px; width: 140px; height: 240px;}
</style>
