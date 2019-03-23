<template lang="pug">
  .snippet-wrap
    .top-title
      h2 阴影
    .row
      .box.box1
      .box.box2
      .box.box3
      .box.box4
      .box.box5 Hello Man
</template>

<script>
export default {
  name: 'boxShadow'
}
</script>

<style scoped>
.box {
    width: 200px;
    height: 120px;
    background: yellow;
    margin-right: 20px;
    margin-bottom: 20px;
    float: left;
  }

  .box1 {
    box-shadow: 0 5px 4px -4px black;
  }

  .box2 {
    box-shadow: 3px 3px 6px -3px black;
  }

  .box3 {
    box-shadow: 5px 0 5px -5px black, -5px 0 5px -5px black;
  }

  .box4 {
    box-shadow: 0 5px 5px -5px black, 0 -5px 5px -5px black;
  }

  .box5 {
    color: deeppink;
    background: #fff;
    font-size: 30px;
    line-height: 100px;
    text-align: center;
    border: 2px solid;
    text-shadow: .1em .2em yellow;
    -webkit-filter: drop-shadow(.05em .05em .1em gray);
  }
</style>
