<template lang="pug">
.snippet-wrap
  .top-title
    h2 loopMove 组件
  .box
    ul.list(ref="moveHook")
      li 1
      li 2
      li 3
      li 4
</template>

<script>

export default {
  name: 'loopMove',
  mounted () {
    var oUl = this.$refs.moveHook
    oUl.innerHTML += oUl.innerHTML
    oUl.style.width = oUl.offsetWidth * 2 + 'px'
  }
}
</script>

<style scoped>
.box {
  position: relative;
  width: 800px;
  height: 150px;
  padding: 1px;
  margin: 20px auto;
  overflow: hidden;
  border: 1px solid #ccc;
  -moz-transition: 1s;
  -webkit-transition: 1s;
  transition: 1s;
}
.list{
  position: absolute;
  left: 0;
  -moz-animation: move 8s linear infinite;
  -webkit-animation: move 8s linear infinite;
  animation: move 8s linear infinite;
}
.list:hover{
  -moz-animation-play-state: paused;
  -webkit-animation-play-state: paused;
}
.list li{float: left; width: 200px; height: 150px; border: 1px solid #fff; line-height: 150px; text-align: center; font-size: 40px; background: pink; box-sizing: border-box}

@keyframes move{
  0%{left: 0;}
  100%{left: -800px;}
}
@-webkit-keyframes move{
  0%{left: 0;}
  100%{left: -800px;}
}
</style>
