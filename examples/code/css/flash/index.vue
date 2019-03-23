<template lang="pug">
  .snippet-wrap
    .top-title
      h2 滑动屏幕开锁
    .wrap
      h2.title 滑动屏幕开锁
</template>

<script>
export default {
  name: 'flash'
}
</script>

<style scoped>
  .wrap {
    background: #000;
  }
  .wrap h2 {
    color: rgba(255, 255, 255, .4);
    background: #000; text-align: center; font-size: 60px; font-family: "微软雅黑";
  }

  .wrap .title {
    background: -webkit-linear-gradient(-30deg, rgba(255, 255, 255, 0) 100px, rgba(255, 255, 255, 1) 120px, rgba(255, 255, 255, 1) 150px, rgba(255, 255, 255, 0) 200px)no-repeat -300px 0;

    -webkit-background-clip: text;
    transition: 1s;
    -webkit-animation: 3s move linear infinite;
  }

  @-webkit-keyframes move {
    0% {
      background-position: 150px 0px;
    }

    100% {
      background-position: 3000px 0px;
    }
  }
</style>
