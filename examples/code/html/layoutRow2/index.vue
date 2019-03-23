<template lang="pug">
  .snippet-wrap
    .top-title
      h2 两列布局+定宽+自适应

    //- 2列布局-定宽+自适应 float+ margin-left
    .layer-1
      .layer
        h3 2列布局-定宽+自适应 float+ margin-left
        .wrap.clearfix
          .left.fct.bd-5 定宽
          .main.fct.bd-5 自适应

    //- 2列布局-定宽+自适应 float+overflow
    .layer-2
      .layer
        h3 2列布局-定宽+自适应 float + overflow
        .wrap.clearfix
          .left.fct.bd-5 定宽
          .main.fct.bd-5 自适应
    //- 2列布局-定宽+自适应 position+float+margin-left
    .layer-3
      .layer.clearfix
        h3 2列布局-定宽+自适应 position+float+margin-left
        .wrap
          .left.fct.bd-5 定宽
          .main
            .inner.fct.bd-5 自适应

    //- 2列布局-定宽+自适应 position+float+margin-left
    .layer-4
      .layer.clearfix
        h3 2列布局-定宽+自适应 display: table; table-layout: fixed;
        .wrap
          .left.bd-5
            .inner.fct 定宽
          .main
            .inner.fct.bd-5 自适应

    //- 2列布局-定宽+自适应 display: fixed;
    .layer-5
      .layer.clearfix
        h3 2列布局-定宽+自适应 display: fixed;
        .wrap
          .left.fct.bd-5 定宽
          .main
            .inner.fct.bd-5 自适应

    //- 2列布局-定宽+自适应 display: fixed;
    .layer-6
      .layer.clearfix
        h3 2列布局-定宽+自适应 display: fixed;
        .wrap
          .right.fct.bd-5 定宽
          .main.fct.bd-5 自适应

    //- 2列布局-不定宽+自适应 display: table;
    .layer-7
      .layer.clearfix
        h3 2列布局-不定宽+自适应 display: table;
        .wrap
          .left.bd-5
            .inner.fct 不定宽,内层元素决定宽度
          .main.bd-5
            .inner.fct 自适应

      //- 2列布局-等高
      .layer-8
        .layer
          h3 2列布局-等高
          .wrap
            .left.bd-5 定宽-高自适应
            .main
              .inner.bd-5
                p right
                p right
                p right
                p right
                p right

      .layer-9
        h3 2列布局- 菜单+列表
        .wrap.clearfix
          .side.bd-5.ct.f-fl 定宽
          .main
            .inner
              .grid
                .grid-4.ct
                  div.bd-5 item 1
                .grid-4.ct
                  div.bd-5 item 2
                .grid-4.ct
                  div.bd-5 item 3
                .grid-4.ct
                  div.bd-5 item 4
</template>

<script>
export default {
  name: 'layoutRow2'
}
</script>

<style scoped>
.layer .left,.layer .main,.layer .right{height:240px;box-sizing:border-box}
.wrap .column .inner{background-color:#fff}
.layer .left{width:120px}
.layer .right{width:140px}
.layer-0 .main,.layer-1 .left{float:left}

.layer-1 .main{margin-left:220px}
.layer-1 .left{float:left;width:200px}
.layer-2 .main{overflow:hidden}
.layer-2 .left{float:left;width:200px;margin-right:20px}

.layer-3 .main{width:100%;float:right;margin-left:-200px}
.layer-3 .main .inner{margin-left:220px;height:240px}
.layer-3 .left{float:left;position:relative;width:200px}

.layer-4 .wrap{display:table;table-layout:fixed;width:100%}
.layer-4 .main{display:table-cell}
.layer-4 .main .inner{margin-left:20px;height:100%}
.layer-4 .left{display:table-cell;width:200px;margin-right:20px}
.layer-4 .left .inner{height:100%}

.layer-5 .wrap{display:flex}
.layer-5 .main{flex:1}
.layer-5 .main .inner{margin-left:20px;height:100%}
.layer-5 .left{flex:0 0 200px}

.layer-6 .main{width:100%}
.layer-6 .right{float:right;margin-left:-200px}

.layer-7 .wrap{display:table}
.layer-7 .left,.layer-7 .main{display:table-cell}
.layer-7 .left .inner,.layer-7 .main .inner{height:100%}
.layer-7 .left{width:.1%}
.layer-7 .left .inner{width:200px}

/* 2列等高布局 table */
.layer-8 .wrap {display: table; width: 100%; table-layout: fixed;}
.layer-8 .wrap .main,
.layer-8 .wrap .left{display: table-cell;  height: auto; }
.layer-8 .wrap .left{width: 200px; padding-right: 20px;}
.layer-8 .wrap .main .inner{margin-left: 20px;}

/* 2列等高布局 菜单 列表 */
.layer-9 .wrap {width: 100%}
.layer-9 .side {position: relative; float: left; width: 200px; height: 200px; background: #40c4ff;}
.layer-9 .main {width: 100%; float: right; margin-left: -200px;}
.layer-9 .main > .inner {margin-left: 220px;}

.grid > div,
.grid-row > div{float: left; box-sizing: border-box; padding-left: 20px;}
.grid-4{float: left; box-sizing: border-box; padding-left: 20px; height: 200px;}
.grid-4{width: 25%;}

.title{width: 100%; height: 30px; line-height: 30px; background-color: #009688; color: #FFC107;  text-align: center;}
.parent{width: 100%; background-color: #ddd;}
.left p,.center p,.right p{padding: 10px 0;}
.left p,.center p{background-color: #4CAF50;}
.right{background-color: #00BCD4;}
/* ------------------定宽+自适应------------------ */
/* 方案1 */
.wrap1 .left{width: 100px; float: left;}
.wrap1 .right{margin-left: 120px;}

/* 方案2 */
.wrap2 .right-fix{width: 100%; float: right; margin-left: -100px;}
.wrap2 .left{width: 100px; float: left; position: relative;}
.wrap2 .right{margin-left: 120px;}

/* 方案3 */
.wrap3 .left{width: 100px; margin-right: 20px; float: left;}
.wrap3 .right{overflow: hidden;}

/* 方案4 */
.wrap4 .parent{width: 100%; display: table; table-layout: fixed;}
.wrap4 .left, .wrap4 .right{display: table-cell;}
.wrap4 .left{width: 100px; padding-right: 20px;}
.wrap4 .right{height: 40px;}

/* 方案5 */
.wrap5 .parent{display: flex;}
.wrap5 .left{width: 100px; padding-right: 20px;}
.wrap5 .right{flex: 1;}
</style>
