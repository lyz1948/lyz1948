<template lang="pug">
  .snippet-wrap
    .top-title
      h2 居中布局

    h3 水平居中
    .row.clearfix
      .wrap
        p inline-block+text-align
        .parent1.box
          .item1
      .wrap
        p margin: 0 auto;
        .parent2.box
          .item2
      .wrap
        p position: absolute;
        .parent3.box
          .item3
      .wrap
        p flex+justify-content
        .parent4.box
          .item4
      .wrap
        p flex+margin
        .parent5.box
          .item5
    h3 垂直居中
    .row.clearfix
      .wrap
        p table-cell + vertical-align
        .vertical1.box
          .item1
      .wrap
        p position: absolute;
        .vertical2.box
          .item2
      .wrap
        p flex+align-item
        .vertical3.box
          .item

    h3 水平垂直居中
    .row
      .wrap
        p inline-block+table-cell
        .mid1.box
          .item
      .wrap
        p position
        .mid2.box
          .item
      .wrap
        p flex
        .mid3.box
          .item
</template>

<script>
export default {
  name: 'LayoutCenter'
}
</script>

<style scoped>
.row {margin-bottom: 20px}
.wrap{float: left; margin-right: 20px;}
.wrap p{background-color: #4CAF50; color: #fff; text-align: center; margin: 0; padding: 10px 0;}
.box{width: 200px; height: 200px; margin-bottom: 10px; background-color: #FFC107;}
.box > div{width: 100px; height: 100px; background-color: #00BCD4;}

/* -------------------------水平居中------------------------- */
/* 方案1 */
.parent1{text-align: center;}
.item1{display: inline-block;}

/* 方案2 */
.item2{display: table; margin: 0 auto;}

/* 方案3 */
.parent3{position: relative;}
.item3{position: absolute; left: 50%; transform: translateX(-50%);}

/* 方案4 */
.parent4{display: flex; justify-content: center;}

/* 方案5 */
.parent5{display: flex;}
.item5{margin: 0 auto;}

/* -------------------------垂直居中------------------------- */
/* 方案1 */
.vertical1{display: table-cell; vertical-align: middle;}

/* 方案2 */
.vertical2{position: relative;}
.vertical2 .item2{position: absolute; top: 50%; transform: translateY(-50%);}

/* 方案3 */
.vertical3{display: flex; align-items: center;}

/* -------------------------水平垂直居中------------------------- */
/* 方案1 */
.mid1{text-align: center; display: table-cell; vertical-align: middle;}
.mid1 .item{display: inline-block;}

/* 方案2 */
.mid2{position: relative;}
.mid2 .item{position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);}

/* 方案3 */
.mid3{display: flex; justify-content: center; align-items: center;}
</style>
