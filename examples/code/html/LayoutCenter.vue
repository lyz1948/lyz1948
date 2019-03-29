<template>
  <div class="snippet-wrap clearfix">
    <h4>水平居中</h4>
    <div class="row clearfix">
      <div class="wrap">
        <p>inline-block+text-align</p>
        <div class="parent1 box">
          <div class="item1"></div>
        </div>
      </div>
      <div class="wrap">
        <p>margin: 0 auto;</p>
        <div class="parent2 box">
          <div class="item2"></div>
        </div>
      </div>
      <div class="wrap">
        <p>position: absolute;</p>
        <div class="parent3 box">
          <div class="item3"></div>
        </div>
      </div>
      <div class="wrap">
        <p>flex+justify-content</p>
        <div class="parent4 box">
          <div class="item4"></div>
        </div>
      </div>
      <div class="wrap">
        <p>flex+margin</p>
        <div class="parent5 box">
          <div class="item5"></div>
        </div>
      </div>
    </div>
    <h4>垂直居中</h4>
    <div class="row clearfix">
      <div class="wrap">
        <p>table-cell + vertical-align</p>
        <div class="vertical1 box">
          <div class="item1"></div>
        </div>
      </div>
      <div class="wrap">
        <p>position: absolute;</p>
        <div class="vertical2 box">
          <div class="item2"></div>
        </div>
      </div>
      <div class="wrap">
        <p>flex+align-item</p>
        <div class="vertical3 box">
          <div class="item"></div>
        </div>
      </div>
    </div>
    <h4>水平垂直居中</h4>
    <div class="row">
      <div class="wrap">
        <p>inline-block+table-cell</p>
        <div class="mid1 box">
          <div class="item"></div>
        </div>
      </div>
      <div class="wrap">
        <p>position</p>
        <div class="mid2 box">
          <div class="item"></div>
        </div>
      </div>
      <div class="wrap">
        <p>flex</p>
        <div class="mid3 box">
          <div class="item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clearfix {
  clear: both;
}
.clearfix:before, .clearfix:after {content: ''; display: block; clear: both;}
.snippet-wrap {margin: 20px 0;}
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
