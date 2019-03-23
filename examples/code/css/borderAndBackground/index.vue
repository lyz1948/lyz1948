<template lang="pug">
  .snippet-wrap
    .top-title
      h2 背景与边框
    .row
      .demo.demo1
        code box-shadow
      .demo.demo2 outline outline-offset
      .demo.demo3 background-origin: content-box
      .demo.demo4 background-position: calc(100% - 20px) calc(100% - 10px)
      .demo.demo5 outline: 0.6em solid #655
</template>

<script>
export default {
  name: 'borderAndBackground'
}
</script>

<style scoped>
.code {
  padding: 20px 0
}
.wrap {
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  overflow: hidden;
}

.demo {
  width: 200px;
  height: 120px;
  margin: 0 40px 40px 0;
  padding: 10px;
  color: #fff;
  float: left;
}

.demo1 {
  background: yellowgreen;
  box-shadow: 0 0 0 10px #655, 0 0 0 15px deeppink, 0 2px 5px 15px rgba(0, 0, 0, .6);
}

.demo2 {
  background: yellowgreen;
  border: 10px solid #655;
  outline: 5px solid deeppink;
  outline-offset: 10px;
}

.demo3 {
  padding: 10px;
  border: 10px solid #58a;
  background: url(https://ss1.baidu.com/73N1bjeh1BF3odCf/it/u=3186279626,2931547208&fm=202&gp=0.jpg) no-repeat #58a bottom right;
  background-position: right 20px bottom 10px;
  background-origin: content-box;
}

.demo4 {
  background: url(https://ss1.baidu.com/73N1bjeh1BF3odCf/it/u=3186279626,2931547208&fm=202&gp=0.jpg) no-repeat #58a bottom right;
  background-position: calc(100% - 20px) calc(100% - 10px);
}

.demo5 {
  background: tan;
  border-radius: .8em;
  padding: 1em;
  box-shadow: 0 0 0 .6em #58a;
  outline: .6em solid #655;
}
</style>
