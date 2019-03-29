<template lang="pug">
  .snippet-wrap.clearfix
    .wrap
      .main
        .inner.bd-5.fct main inner
      .left.bd-5.fct left
      .right.bd-5.fct right
</template>

<style scoped>
.clearfix {clear: both;}
.clearfix:before, .clearfix:after {content: ''; display: block; clear: both;}
.snippet-wrap {margin: 20px 0;}
.main, .left, .right{float: left; text-align: center; line-height: 240px; font-size: 30px;}
.main {width: 100%;}
.main .inner {margin: 0 160px 0 140px; height: 240px;}
.left {margin-left: -100%; width: 120px; height: 240px;}
.right {margin-left: -140px; width: 140px; height: 240px;}
.bd-5 { border: 5px solid #ddd; box-sizing: border-box; border-radius: 4px;}
</style>
