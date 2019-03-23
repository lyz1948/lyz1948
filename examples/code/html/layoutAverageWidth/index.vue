<template lang="pug">
  .snippet-wrap
    .top-title
      h2 等宽--均分布局

    .row
      h3 等分布局 box-sizing:border-box
      .wrap.wrap1
        .parent.clearfix
          .column
            p column
          .column
            p column
          .column
            p column
          .column
            p column

      .row
        h3 等分布局 display: table + width: 100% + margin-left
        .wrap.wrap2
          .parent-fix
            .parent
              .column
                p column
              .column
                p column
              .column
                p column
              .column
                p column

      .row
        h3 等分布局 display: flex + flex + margin-left
        .wrap.wrap3
          .parent
            .column
              p column
            .column
              p column
            .column
              p column
            .column
              p column
</template>
<script>
export default {
  name: 'layoutAverageWidth'
}
</script>

<style scoped>
.title{background-color: #4CAF50; padding: 10px; color: #fff;}
.parent{}
.column{height: 100%;}
.column p{height: 100%; line-height: 100px; text-align: center; font-size: 30px; color: #fff; background-color: #8BC34A;}

/* 方案1 */
.wrap1 .parent{margin-left: -20px;}
.wrap1 .parent .column{float: left; width: 25%; padding-left: 20px; box-sizing:border-box;}

/* 方案2 */
.wrap2 .parent-fix{margin-left: -20px;}
.wrap2 .parent{display: table; width: 100%; table-layout: fixed;}
.wrap2 .column{display: table-cell; padding-left: 20px;}

/* 方案3 */
.wrap3 .parent{display: flex;}
.wrap3 .column{flex: 1;}
.wrap3 .column+ .column{padding-left: 20px;}
</style>
