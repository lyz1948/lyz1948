<template>
  <div class="snippet-wrap">
    <div class="row">
      <h3>正常排序display: flex;</h3>
      <div class="wrap box1">
        <div class="item">Item1</div>
        <div class="item">Item2</div>
        <div class="item">Item3</div>
      </div>
    </div>
    <div class="row">
      <h3>倒序排序 display: flex; flex-direction: row-reverse;</h3>
      <div class="wrap box2">
        <div class="item">Item1</div>
        <div class="item">Item2</div>
        <div class="item">Item3</div>
      </div>
    </div>
    <div class="row">
      <h3>纵向排序 display: flex; flex-direction: column;</h3>
      <div class="wrap box3">
        <div class="item">Item1</div>
        <div class="item">Item2</div>
        <div class="item">Item3</div>
      </div>
    </div>
    <div class="row">
      <h3>纵向倒序排序 display: flex; flex-direction: column-reverse;</h3>
      <div class="wrap box4">
        <div class="item">Item1</div>
        <div class="item">Item2</div>
        <div class="item">Item3</div>
      </div>
    </div>
    <div class="row">
      <h3>按照父级宽度来均分每个子元素的宽度(包含内外边距)</h3>
      <div class="wrap box5">
        <div class="item">Item1</div>
        <div class="item">Item2</div>
        <div class="item">Item3</div>
        <div class="item">Item4</div>
        <div class="item">Item5</div>
      </div>
    </div>
    <div class="row">
      <h3>包含每个子元素，超出宽度则换行display: flex; flex-wrap: wrap;</h3>
      <div class="wrap box6">
        <div class="item">Item1</div>
        <div class="item">Item2</div>
        <div class="item">Item3</div>
        <div class="item">Item4</div>
        <div class="item">Item5</div>
      </div>
    </div>
    <div class="row">
      <h3>倒序排列，总最后一行排序display: flex; flex-wrap: wrap-reverse;</h3>
      <div class="wrap box7">
        <div class="item">Item1</div>
        <div class="item">Item2</div>
        <div class="item">Item3</div>
        <div class="item">Item4</div>
        <div class="item">Item5</div>
      </div>
    </div>
    <div class="row">
      <h3>居顶部对齐：align-items: flex-start;</h3>
      <div class="wrap fs">
        <div class="item item1">item</div>
        <div class="item item2">item</div>
        <div class="item item3">item</div>
      </div>
    </div>
    <div class="row">
      <h3>居底部对齐：align-items: flex-end;</h3>
      <div class="wrap fe">
        <div class="item item1">item</div>
        <div class="item item2">item</div>
        <div class="item item3">item</div>
      </div>
    </div>
    <div class="row">
      <h3>居中部对齐：align-items: center;</h3>
      <div class="wrap fc">
        <div class="item item1">item</div>
        <div class="item item2">item</div>
        <div class="item item3">item</div>
      </div>
    </div>
    <div class="row">
      <h3>居中部对齐：align-items: stretch;</h3>
      <div class="wrap s">
        <div class="item item1">item</div>
        <div class="item item2">item</div>
        <div class="item item3">item</div>
      </div>
    </div>
    <div class="row">
      <h3>居中部对齐：align-items: baseline;</h3>
      <div class="wrap b">
        <div class="item item1">item</div>
        <div class="item item2">item</div>
        <div class="item item3">item</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.snippet-wrap {margin: 20px 0;}
.wrap{margin: 20px auto;}
.item{padding: 10px; margin: 10px; background-color: #8BC34A;}
.box { clear: both; width: 300px; height: 200px;}
/* 正常排序 */
.box1{display: flex;}

/* 倒序排序 */
.box2{ display: flex; flex-direction: row-reverse;}

/* 纵向排序 */
.box3{display: flex; flex-direction: column;}

/* 纵向倒序排序 */
.box4{display: flex; flex-direction: column-reverse;}

/* 均分 */
.box5{display: flex;}
.box5 .item{width: 300px;}

/* 包含 */
.box6{display: flex; flex-wrap: wrap;}
.box6 .item{width: 300px;}

/* 包含 */
.box7{display: flex; flex-wrap: wrap-reverse;}
.box7 .item{width: 300px;}

.title{margin: 0; padding: 10px 0; font-size: 20px; text-align: center; background-color: #8BC34A; color: #fff;}
.wrap{background-color: rgba(76, 175, 80, .1);}
.item{padding: 10px; margin: 10px; color: #fff; background-color: #e91e638a; border-radius: 6px;}

.wrap{display: flex;}
.item1{line-height: 100px;}
.item2{line-height: 60px;}
.fs{align-items: flex-start;}
.fe{align-items: flex-end;}
.fc{align-items: center;}
.s{align-items: stretch;}
.b{align-items: baseline;}
</style>