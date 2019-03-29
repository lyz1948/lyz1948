<template>
  <div class="snippet-wrap">
    <h4>等分布局 box-sizing:border-box</h4>
    <div class="wrap wrap1">
      <div class="parent clearfix">
        <div class="column">
          <p>column</p>
        </div>
        <div class="column">
          <p>column</p>
        </div>
        <div class="column">
          <p>column</p>
        </div>
        <div class="column">
          <p>column</p>
        </div>
      </div>
    </div>
    <div class="row">
      <h4>等分布局 display: table + width: 100% + margin-left</h4>
      <div class="wrap wrap2">
        <div class="parent-fix">
          <div class="parent">
            <div class="column">
              <p>column</p>
            </div>
            <div class="column">
              <p>column</p>
            </div>
            <div class="column">
              <p>column</p>
            </div>
            <div class="column">
              <p>column</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <h4>等分布局 display: flex + flex + margin-left</h4>
      <div class="wrap wrap3">
        <div class="parent">
          <div class="column">
            <p>column</p>
          </div>
          <div class="column">
            <p>column</p>
          </div>
          <div class="column">
            <p>column</p>
          </div>
          <div class="column">
            <p>column</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.snippet-wrap {margin: 20px 0;}
.title{background-color: #4CAF50; padding: 10px; color: #fff;}
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