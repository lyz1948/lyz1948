<template lang="pug">
  .snippet-wrap
    .top-title
      h2 根据兄弟元素的数量范围来匹配元素

    .row.list-wrap1
      p .li:nth-child(4),.li:nth-child(4) ~ li{/* 命中第4个和第4个以后的li */}
      ul
        li.item 1
        li.item 2
        li.item 3
        li.item 4
        li.item 5
        li.item 6
        li.item 7
        li.item 8

      p li:only-child { /* 当列表正好包含四项时 */}
      ul
        li.item 1
      p
        | li:first-child:nth-last-child(4),
        | li:first-child:nth-last-child(4) ~ li {
        | /* 当列表正好包含四项时，命中所有列表项 */
        | }
      ul
        li.item 1
        li.item 2
        li.item 3
        li.item 4
    .row.list-wrap2
      p :nth-child(n+4) 将会选中除了第一、二、三个子元素之外的所有子元素
      ul
        li.item 1
        li.item 2
        li.item 3
      ul
        li.item 1
        li.item 2
        li.item 3
        li.item 4
      ul
        li.item 1
        li.item 2
        li.item 3
        li.item 4
        li.item 5
        li.item 6
        li.item 7
        li.item 8
</template>

<script>
export default {
  name: 'selector'
}
</script>

<style scoped>
  .item {
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0 0 20px 20px;
    background: #ddd;
    border-radius: 4px;
    text-align: center;
  }

  .list-wrap1 .item:nth-child(4),
  .list-wrap1 .item:nth-child(4)~li {
    background: #FD5856;
  }

  /* 只有一个元素时候 */
  .list-wrap1 .item:only-child {
    background: #31FF45;
  }

  .list-wrap1 .item:first-child:nth-last-child(1) {
    /* 等同与li:only-child */
  }

  .list-wrap1 .item:first-child:nth-last-child(4),
  .list-wrap1 .item:first-child:nth-last-child(4)~li {
    /* 当列表正好包含四项时，命中所有列表项 */
    background: #16FFFD;
  }

  .list-wrap2 .item:nth-child(n+4) {
    background: #2169E8;
  }
</style>
