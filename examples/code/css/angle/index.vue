<template lang="pug">
  .snippet-wrap
    .top-title
      h2 折角效果
    .row
      .angle.angle45 45°折角效果
      .angle.angle60 60°折角效果
</template>

<script>
export default {
  name: 'angle'
}
</script>

<style scoped>
.angle {
  width: 100px;
  padding: 20px 30px;
  color: #fff;
  height: 60px;
  margin-bottom: 20px;
}
.angle45 {
  background: #58a;
  /* 回退样式 */
  background: linear-gradient(to left bottom, transparent 50%, rgba(0, 0, 0, .4) 0) no-repeat 100% 0 / 2em 2em, linear-gradient(-135deg, transparent 1.5em, #58a 0);
}
.angle60 {
  position: relative;
  background: #58a;
  /* 回退样式 */
  background: linear-gradient(-150deg, transparent 1.5em, #58a 0);
  border-radius: .5em;
}

.angle60::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(to left bottom, transparent 50%, rgba(0, 0, 0, .2) 0, rgba(0, 0, 0, .4)) 100% 0 no-repeat;
  width: 1.73em;
  height: 3em;
  transform: translateY(-1.3em) rotate(-30deg);
  transform-origin: bottom right;
  border-bottom-left-radius: inherit;
  box-shadow: -.2em .2em .3em -.1em rgba(0, 0, 0, .15);
}
</style>
