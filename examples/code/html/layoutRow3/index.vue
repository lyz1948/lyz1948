<template lang="pug">
  .snippet-wrap
    .top-title
      h2 3列布局-定宽+自适应
    .layer-8.row
      .wrap.clearfix
        .left.fct.bd-5 left
        .center.fct.bd-5 center
        .right.fct.bd-5 right
</template>

<script>
export default {
  name: 'layoutRow3'
}
</script>

<style scoped>
.layer-8 .wrap .left,
.layer-8 .wrap .right,
.layer-8 .wrap .center {width: 200px; height: 240px; background-color: #fff;}
.layer-8 .wrap .left, .layer-8 .center {float: left; margin-right: 20px;}
.layer-8 .wrap .left {width: 200px;}
.layer-8 .wrap .right {overflow: hidden; width: auto;}

.title{width: 100%; height: 30px; line-height: 30px; background-color: #009688; color: #FFC107;  text-align: center;}
.parent{width: 100%; background-color: #ddd;}
.left p,.center p,.right p{padding: 10px 0;}
.left p,.center p{background-color: #4CAF50;}
.right{background-color: #00BCD4;}

</style>
