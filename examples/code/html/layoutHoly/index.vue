<template lang="pug">
  .snippet-wrap
    .top-title
      h2 圣杯布局
    .row
      .wrap.clearfix
        .main.bd-5.fct main
        .left.bd-5.fct left
        .right.bd-5.fct right
</template>

<script>
export default {
  name: 'layoutHoly'
}
</script>

<style scoped>
.main, .left, .right{position: relative; float: left; height: 300px; font-size: 30px}
.wrap {padding: 0 160px 0 140px;}
.main {width: 100%;}
.left {margin-left: -100%; left: -140px; width: 120px;}
.right {margin-left: -140px; right: -160px; width: 140px;}
</style>
