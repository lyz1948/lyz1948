<template lang="pug">
  .snippet-wrap
    .top-title
      h2 背景渐变
    .row
      .demo.demo6
      .demo.demo7
      .demo.demo8
      .demo.demo9
      .demo.demo10
      .demo.demo11
      .demo.demo12
      .demo.demo13
      .demo.demo14
      .demo.demo15
      .demo.demo16
      .demo.demo17
      .demo.demo18
      .demo.demo19
      .demo.demo20
      .demo.demo21
      .demo.demo22
      .demo.demo23
      .demo.demo24
      .demo.marching-ants
</template>

<script>
export default {
  name: 'gradient'
}
</script>

<style scoped>
.wrap {
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  overflow: hidden;
}

.demo {
  width: 200px;
  height: 120px;
  margin: 0 40px 20px 0;
  padding: 10px;
  color: #fff;
  float: left;
}

.demo6 {
  background: linear-gradient(#fb3 20%, #58a 80%);
}

.demo7 {
  background: linear-gradient(#fb3 30%, #58a 0);
  background-size: 100% 30px;
}

.demo8 {
  background: linear-gradient(#fb3 33.3%, #58a 0, #58a 66.6%, yellowgreen 0);
  background-size: 100% 30px;
}

.demo9 {
  background: linear-gradient(to right,
    /* 或 90deg */
    #fb3 50%, #58a 0);
  background-size: 30px 100%;
}

.demo10 {
  background: linear-gradient(45deg, #fb3 50%, #58a 0);
  background-size: 30px 30px;
}

.demo11 {
  background: linear-gradient(45deg, #fb3 25%, #58a 0, #58a 50%, #fb3 0, #fb3 75%, #58a 0);
  background-size: 42.4px 42.4px;
}

.demo12 {
  background: repeating-linear-gradient(45deg, #fb3, #58a 30px);
}

.demo13 {
  background: repeating-linear-gradient(45deg, #fb3 0, #fb3 25%, #58a 0, #58a 50%);
  background-size: 42.426406871px 42.426406871px;
}

.demo14 {
  background: #58a;
  background-image: repeating-linear-gradient(30deg, hsla(0, 0%, 100%, .1), hsla(0, 0%, 100%, .1) 15px, transparent 0, transparent 30px);
}

.demo15 {
  background: white;
  background-image: linear-gradient(90deg, rgba(200, 0, 0, .5) 50%, transparent 0), linear-gradient(rgba(200, 0, 0, .5) 50%, transparent 0);
  background-size: 30px 30px;
}

.demo16 {
  background: #58a;
  background-image: linear-gradient(white 1px, transparent 0), linear-gradient(90deg, white 1px, transparent 0);
  background-size: 30px 30px;
}

.demo17 {
  background: #58a;
  background-image: linear-gradient(white 2px, transparent 0), linear-gradient(90deg, white 2px, transparent 0), linear-gradient(hsla(0, 0%, 100%, .3) 1px, transparent 0), linear-gradient(90deg, hsla(0, 0%, 100%, .3) 1px, transparent 0);
  background-size: 75px 75px, 75px 75px, 15px 15px, 15px 15px;
}

.demo18 {
  background: #655;
  background-image: radial-gradient(tan 30%, transparent 0);
  background-size: 30px 30px;
}

.demo19 {
  background: #655;
  background-image: radial-gradient(tan 30%, transparent 0), radial-gradient(tan 30%, transparent 0);
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
}

@mixin polka($size, $dot, $base, $accent) {
  background: $base;
  background-image: radial-gradient($accent $dot, transparent 0), radial-gradient($accent $dot, transparent 0);
  background-size: $size $size;
  background-position: 0 0, $size/2 $size/2;
}

@include polka(30px, 30%, #655, tan);

.demo20 {
  background: #eee;
  background-image: linear-gradient(45deg, #bbb 25%, transparent 0), linear-gradient(45deg, transparent 75%, #bbb 0), linear-gradient(45deg, #bbb 25%, transparent 0), linear-gradient(45deg, transparent 75%, #bbb 0);
  background-position: 0 0, 15px 15px, 15px 15px, 30px 30px;
  background-size: 30px 30px;
}

.demo21 {
  background: #eee;
  background-image: linear-gradient(45deg, rgba(0, 0, 0, .25) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, .25) 0), linear-gradient(45deg, rgba(0, 0, 0, .25) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, .25) 0);
  background-position: 0 0, 15px 15px;
  background-size: 30px 30px;
}

  .demo22 {
    background: hsl(20, 40%, 90%);
    background-image: linear-gradient(90deg, #fb3 11px, transparent 0), linear-gradient(90deg, #ab4 23px, transparent 0), linear-gradient(90deg, #655 23px, transparent 0);
    background-size: 83px 100%, 61px 100%, 41px 100%;
  }
  .demo23 {
    width: 160px;
    height: 80px;
    padding: 1em;
    border: 1em solid transparent;
    background: linear-gradient(white, white), url('http://cdn.ykpine.com/images/orange.jpeg');
    background-size: cover;
    background-clip: padding-box, border-box;
    background-origin: border-box;
  }

  .demo24 {
    width: 160px;
    height: 70px;
    /* background: linear-gradient(white, white) padding-box, repeating-linear-gradient(-45deg, red 0, red 12.5%, transparent 0, transparent 25%, #58a 0, #58a 37.5%, transparent 0, transparent 50%) 0 / 5em 5em; */
    padding: 1em;
    border: 16px solid transparent;
    border-image: 16 repeating-linear-gradient(-45deg, red 0, red 1em, transparent 0, transparent 2em, #58a 0, #58a 3em, transparent 0, transparent 4em);
  }

  @keyframes ants {
    to {
      background-position: 100%
    }
  }

  .marching-ants {
    width: 160px;
    height: 100px;
    padding: 1em;
    border: 1px solid transparent;
    background: linear-gradient(white, white) padding-box, repeating-linear-gradient(-45deg, black 0, black 25%, white 0, white 50%) 0 / .6em .6em;
    animation: ants 12s linear infinite;
  }
</style>
