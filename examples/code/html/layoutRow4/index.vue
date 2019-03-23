<template lang="pug">
  .snippet-wrap
    .top-title
      h2 多列布局+不定宽+自适应

    //- 4列布局-均分 百分百
    .layer-11.row
      .layer
        h3 4列布局-均分 百分比
        .wrap.f-clr
          .column
            .inner.fct.bd-5 column 1
          .column
            .inner.fct.bd-5 column 2
          .column
            .inner.fct.bd-5 column 3
          .column
            .inner.fct.bd-5 column 4

      //- 4列布局-均分 table
      .layer-12.row
        .layer
          h3 4列布局-均分 table
          .wrap.f-clr
            .wrap-in
              .column
                .inner.fct.bd-5 column 1
              .column
                .inner.fct.bd-5 column 2
              .column
                .inner.fct.bd-5 column 3
              .column
                .inner.fct.bd-5 column 4
      //- 4列布局-均分 flex
      .layer-13.row
        .layer
          h3 4列布局-均分 flex
          .wrap.f-clr
            .column
              .inner.fct.bd-5 column 1
            .column
              .inner.fct.bd-5 column 2
            .column
              .inner.fct.bd-5 column 3
            .column
              .inner.fct.bd-5 column 4

      .layer-14
        .layer
          h2 5列浮动布局
          .wrap
            .grid.f-clr.tac
              .grid-5
                div.bd-5 grid inner
              .grid-5
                div.bd-5 grid inner
              .grid-5
                div.bd-5 grid inner
              .grid-5
                div.bd-5 grid inner
              .grid-5
                div.bd-5 grid inner

</template>

<script>
export default {
  name: 'layoutRow4'
}
</script>

<style scoped>
/* 4列均分布局 百分比 */
.layer-11 .wrap {margin-left: -20px;}
.layer-11 .wrap .column{float: left; width: 25%; padding-left: 20px; box-sizing: border-box;}
.layer-11 .wrap .column .inner{height: 200px;}

/* 4列均分布局 table */
.layer-12 .wrap {margin-left: -20px;}
.layer-12 .wrap .wrap-in{display: table; table-layout: fixed; width: 100%;}
.layer-12 .wrap .column{float: left; width: 25%; padding-left: 20px; box-sizing: border-box;}
.layer-12 .wrap .column .inner{height: 200px;}

/* 4列均分布局 flex */
.layer-13 .wrap {display: flex;}
.layer-13 .wrap .column{flex: 1;}
.layer-13 .wrap .column .inner{height: 200px; padding-left: 20px; box-sizing: border-box;}

.layer-14 .grid{margin-left: -20px;}
.layer-14 .grid-5 > div {line-height: 200px;}

.grid, .grid-col{clear: both; margin-left: -20px;}
.grid:before,
.grid:after,
.grid-col:before,
.grid-col:after{content: ''; display: block; clear: both; visibility: hidden; height: 1px;}
.grid > div,
.grid-col > div{float: left; box-sizing: border-box; padding-left: 20px; height: 200px; }
.grid > div > div{width: 100%; height: 200px;}
.grid-1{width: 100%;}
.grid-2{width: 50%;}
.grid-3{width: 33.33333%;}
.grid-4{width: 25%;}
.grid-5{width: 20%;}
</style>
