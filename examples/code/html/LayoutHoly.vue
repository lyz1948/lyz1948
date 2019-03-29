<template lang="pug">
  .snippet-wrap
    .wrap.clearfix
      .main.bd-5.fct main
      .left.bd-5.fct left
      .right.bd-5.fct right
</template>

<style scoped>
.clearfix {clear: both;}
.clearfix:before, .clearfix:after { content: ''; display: block; clear: both;}
.snippet-wrap {margin: 20px 0;}
.main, .left, .right{position: relative; float: left; height: 300px; line-height: 300px; text-align: center; font-size: 30px}
.wrap {padding: 0 160px 0 140px;}
.main {width: 100%;}
.left {margin-left: -100%; left: -140px; width: 120px;}
.right {margin-left: -140px; right: -160px; width: 140px;}
.bd-5 { border: 5px solid #ddd; box-sizing: border-box; border-radius: 4px;}
</style>

