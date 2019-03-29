<template>
  <div class="snippet-wrap">
    <div class="layer-1">
      <div class="layer">
        <h4>2列布局-定宽+自适应 float+ margin-left</h4>
        <div class="wrap clearfix">
          <div class="left fct bd-5">定宽</div>
          <div class="main fct bd-5">自适应</div>
        </div>
      </div>
    </div>
    <div class="layer-2">
      <div class="layer">
        <h4>2列布局-定宽+自适应 float + overflow</h4>
        <div class="wrap clearfix">
          <div class="left fct bd-5">定宽</div>
          <div class="main fct bd-5">自适应</div>
        </div>
      </div>
    </div>
    <div class="layer-3">
      <div class="layer clearfix">
        <h4>2列布局-定宽+自适应 position+float+margin-left</h4>
        <div class="wrap">
          <div class="left fct bd-5">定宽</div>
          <div class="main">
            <div class="inner fct bd-5">自适应</div>
          </div>
        </div>
      </div>
    </div>
    <div class="layer-4">
      <div class="layer clearfix">
        <h4>2列布局-定宽+自适应 display: table; table-layout: fixed;</h4>
        <div class="wrap">
          <div class="left bd-5">
            <div class="inner fct">定宽</div>
          </div>
          <div class="main">
            <div class="inner fct bd-5">自适应</div>
          </div>
        </div>
      </div>
    </div>
    <div class="layer-5">
      <div class="layer clearfix">
        <h4>2列布局-定宽+自适应 display: fixed;</h4>
        <div class="wrap">
          <div class="left">
            <div class="inner  fct bd-5">定宽</div>
          </div>
          <div class="main">
            <div class="inner fct bd-5">自适应</div>
          </div>
        </div>
      </div>
    </div>
    <div class="layer-6">
      <div class="layer clearfix">
        <h4>2列布局-定宽+自适应 display: fixed;</h4>
        <div class="wrap">
          <div class="right fct bd-5">
            <div class="inner">定宽</div>
          </div>
          <div class="main fct bd-5">自适应</div>
        </div>
      </div>
    </div>
    <div class="layer-7">
      <div class="layer clearfix">
        <h4>2列布局-不定宽+自适应 display: table;</h4>
        <div class="wrap">
          <div class="left">
            <div class="inner bd-5 fct">不定宽,内层元素决定宽度</div>
          </div>
          <div class="main bd-5">
            <div class="inner fct">自适应</div>
          </div>
        </div>
      </div>
    </div>
    <div class="layer-8">
      <div class="layer">
        <h4>2列布局-等高</h4>
        <div class="wrap">
          <div class="left bd-5 fct">定宽-高自适应</div>
          <div class="main">
            <div class="inner bd-5">
              <p>right</p>
              <p>right</p>
              <p>right</p>
              <p>right</p>
              <p>right</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layer-9">
      <h4>2列布局- 菜单+列表</h4>
      <div class="wrap clearfix">
        <div class="side bd-5 fct f-fl">定宽</div>
        <div class="main">
          <div class="inner">
            <div class="grid">
              <div class="grid-4">
                <div class="bd-5 fct">item 1</div>
              </div>
              <div class="grid-4">
                <div class="bd-5 fct">item 2</div>
              </div>
              <div class="grid-4">
                <div class="bd-5 fct">item 3</div>
              </div>
              <div class="grid-4">
                <div class="bd-5 fct">item 4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layer-10 row">
      <h4>3列布局- 侧栏与主区域</h4>
      <div class="wrap clearfix">
        <div class="left fct bd-5">left</div>
        <div class="center fct bd-5">center</div>
        <div class="right fct bd-5">right</div>
      </div>
    </div>
    <div class="layer-11 row">
      <div class="layer">
        <h4>4列布局-均分 百分比</h4>
        <div class="wrap clearfix">
          <div class="column">
            <div class="inner fct bd-5">column 1</div>
          </div>
          <div class="column">
            <div class="inner fct bd-5">column 2</div>
          </div>
          <div class="column">
            <div class="inner fct bd-5">column 3</div>
          </div>
          <div class="column">
            <div class="inner fct bd-5">column 4</div>
          </div>
        </div>
      </div>
      <div class="layer-12 row">
        <div class="layer">
          <h4>4列布局-均分 table</h4>
          <div class="wrap f-clr">
            <div class="wrap-in">
              <div class="column">
                <div class="inner fct bd-5">column 1</div>
              </div>
              <div class="column">
                <div class="inner fct bd-5">column 2</div>
              </div>
              <div class="column">
                <div class="inner fct bd-5">column 3</div>
              </div>
              <div class="column">
                <div class="inner fct bd-5">column 4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="layer-13 row">
        <div class="layer">
          <h4>4列布局-均分 flex</h4>
          <div class="wrap f-clr">
            <div class="column">
              <div class="inner fct bd-5">column 1</div>
            </div>
            <div class="column">
              <div class="inner fct bd-5">column 2</div>
            </div>
            <div class="column">
              <div class="inner fct bd-5">column 3</div>
            </div>
            <div class="column">
              <div class="inner fct bd-5">column 4</div>
            </div>
          </div>
        </div>
      </div>
      <div class="layer-14">
        <div class="layer">
          <h4>5列浮动布局</h4>
          <div>
            <div class="grid f-clr tac">
              <div class="grid-5">
                <div class="bd-5 fct">grid inner</div>
              </div>
              <div class="grid-5">
                <div class="bd-5 fct">grid inner</div>
              </div>
              <div class="grid-5">
                <div class="bd-5 fct">grid inner</div>
              </div>
              <div class="grid-5">
                <div class="bd-5 fct">grid inner</div>
              </div>
              <div class="grid-5">
                <div class="bd-5 fct">grid inner</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clearfix {clear: both}
.clearfix:before, .clearfix:after {content: ''; display: block; clear: both}
.layer .left,.layer .main,.layer .right{height:240px;box-sizing:border-box}
.snippet-wrap {margin: 20px 0;}
.wrap {width: 100%;}
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
.layer-5 .left .inner{height: 100%}

.layer-6 .main{width:100%}
.layer-6 .right{float:right;margin-left:-200px}

.layer-7 .wrap{display:table}
.layer-7 .left,.layer-7 .main{display:table-cell}
.layer-7 .left .inner,.layer-7 .main .inner{height:100%}
.layer-7 .left{width:.1%; padding-right: 10px;}
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

.layer-10 .wrap .left,
.layer-10 .wrap .right,
.layer-10 .wrap .center {width: 200px; height: 240px; background-color: #fff;}
.layer-10 .wrap .left,
.layer-10 .center {float: left; margin-right: 20px;}
.layer-10 .wrap .left {width: 200px;}
.layer-10 .wrap .right {overflow: hidden; width: auto;}

/* 4列均分布局 百分比 */
.layer-11 .wrap {margin-left: -20px;}
.layer-11 .wrap .column{float: left; width: 25%; padding-left: 20px; box-sizing: border-box;}
.layer-11 .wrap .column .inner{height: 200px;}

/* 4列均分布局 table */
.layer-12 .wrap .wrap-in{display: table; table-layout: fixed; width: 100%;}
.layer-12 .wrap .column{float: left; width: 25%; padding-left: 20px; box-sizing: border-box;}
.layer-12 .wrap .column .inner{height: 200px;}

/* 4列均分布局 flex */
.layer-13 .wrap {display: flex;}
.layer-13 .wrap .column{flex: 1;}
.layer-13 .wrap .column .inner{height: 200px; box-sizing: border-box;}

.layer-14 .grid-5 > div {line-height: 200px;}

.mlo-20 {margin-left: -20px;}
.bd-5 { border: 5px solid #ddd; box-sizing: border-box; border-radius: 4px;}
.fct {display: flex; justify-content: center; align-items: center;}
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