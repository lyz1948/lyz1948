<template lang="pug">
  .snippet-wrap
    .top-title
      h2 flex弹性布局

    .row
      h3 正常排序display: flex;
      .wrap.box1
        .item Item1
        .item Item2
        .item Item3
    .row
      h3 倒序排序 display: flex; flex-direction: row-reverse;
      .wrap.box2
        .item Item1
        .item Item2
        .item Item3
    .row
      h3 纵向排序 display: flex; flex-direction: column;
      .wrap.box3
        .item Item1
        .item Item2
        .item Item3
    .row
      h3 纵向倒序排序 display: flex; flex-direction: column-reverse;
      .wrap.box4
        .item Item1
        .item Item2
        .item Item3
    .row
      h3 按照父级宽度来均分每个子元素的宽度(包含内外边距)
      .wrap.box5
        .item Item1
        .item Item2
        .item Item3
        .item Item4
        .item Item5
    .row
      h3 包含每个子元素，超出宽度则换行display: flex; flex-wrap: wrap;
      .wrap.box6
        .item Item1
        .item Item2
        .item Item3
        .item Item4
        .item Item5
    .row
      h3 倒序排列，总最后一行排序display: flex; flex-wrap: wrap-reverse;
      .wrap.box7
        .item Item1
        .item Item2
        .item Item3
        .item Item4
        .item Item5

    .row
      h3 居顶部对齐：align-items: flex-start;
      .wrap.fs
        .item.item1 item
        .item.item2 item
        .item.item3 item
    .row
      h3 居底部对齐：align-items: flex-end;
      .wrap.fe
        .item.item1 item
        .item.item2 item
        .item.item3 item
    .row
      h3 居中部对齐：align-items: center;
      .wrap.fc
        .item.item1 item
        .item.item2 item
        .item.item3 item
    .row
      h3 居中部对齐：align-items: stretch;
      .wrap.s
        .item.item1 item
        .item.item2 item
        .item.item3 item
    .row
      h3 居中部对齐：align-items: baseline;
      .wrap.b
        .item.item1 item
        .item.item2 item
        .item.item3 item

</template>

<script>
export default {
  name: 'layoutFlex',
  inject: ['name'],
  mounted () {
    console.log(this.name)
  }
}
</script>

<style scoped>
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
