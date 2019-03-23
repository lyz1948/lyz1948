<template lang="pug">
  .snippet-wrap
    .top-title
      h2 等高布局--定宽+自适应

    .row
      h3 等高布局 display:table + table-cell
      .wrap.wrap4
        .parent
          .left
            p left
          .right
            p right
            p right
            p right
            p right

      .row
        h3 等高布局 display: flex
        .wrap.wrap5
          .parent
            .left
              p left
            .right
              p right
              p right
              p right
              p right
              p right
              p right
              p right
              p right

      .row
        h3 等高布局 overflow+margin-bottom+padding-bottom
        .wrap.wrap6
          .parent
            .left
              p left
            .right
              p right
              p right
              p right
              p right
              p right
              p right
</template>

<script>
export default {
  name: 'layoutAverageHeight'
}
</script>

<style scoped>
.title{background-color: #4CAF50; padding: 10px; color: #fff;}
.column{height: 100%;}
.column p{height: 100%; line-height: 100px; text-align: center; font-size: 30px; color: #fff; background-color: #8BC34A;}

.left{background-color: orange;}
.right{background-color: #2196F3;}

/* 方案1 */
.wrap4 .parent{display: table; width: 100%; table-layout: fixed;}
.wrap4 .left,.wrap4 .right{display: table-cell;}
.wrap4 .left{width: 100px; padding-right: 20px;}

/* 方案2 */
.wrap5 .parent{display: flex;}
.wrap5 .left{width: 100px; padding-right: 20px;}
.wrap5 .right{flex: 1;}

/* 方案3 */
.wrap6 .parent{overflow: hidden;}
.wrap6 .left,.wrap6 .right{margin-bottom: -9999px; padding-bottom: 9999px;}
.wrap6 .left{width: 100px; padding-right: 20px; float: left;}
.wrap6 .right{overflow: hidden;}
</style>
