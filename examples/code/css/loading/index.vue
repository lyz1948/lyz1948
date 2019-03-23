<template lang="pug">
  .snippet-wrap
    .top-title
      h2 loading 动画

    .loading-wrap
      .row
        h3 圆形动画
        span.bonut-loader

      .row
        h3 跳动动画
        .bounce-loader.clearfix
          div(v-for="i in 5", :key="i")

      .row
        .bounce-loader-rect.clear
          div(v-for="i in 6", :key="i")

      .row.clearfix
        h3 进度条动画
        .bar-loader
          .bar-wrap
            .bar-progress
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang="stylus" scoped>
$width = 30px
$black = #000

.row
  padding: 1.25rem 0

.bonut-loader
  display: inline-block
  width: $width
  height: $width
  border-radius: 50%
  border: 4px solid rgba($black, .1)
  border-left-color: #7983ff
  animation: spiner 1.2s linear infinite

@keyframes spiner
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }

$dotW = 1rem
.bounce-loader
  & > div
    float: left
    width: $dotW
    height: $dotW
    margin: 1.25rem 0.2rem
    border-radius: 50%
    background-color: #7988ff
    animation: bounce-loader .6s infinite alternate
    &:nth-of-type(2)
      animation-delay: .2s
    &:nth-of-type(3)
      animation-delay: .4s
    &:nth-of-type(4)
      animation-delay: .6s
    &:nth-of-type(5)
      animation-delay: .8s

@keyframes bounce-loader
  to
    opacity: .1
    transform: translate3d(0, -1rem, 0)

.bounce-loader-rect
  & > div
    width: 5px
    height: 40px
    background: #1A8BF1
    float: left
    margin-right: 10px
    animation: 2s bounce-loader-rect linear infinite
    &:nth-child(1)
      animation-delay: -0.2s
    &:nth-child(2)
      animation-delay: -0.4s
    &:nth-child(3)
      animation-delay: -0.6s
    &:nth-child(4)
      animation-delay: -0.8s
    &:nth-child(5)
      animation-delay: -1s
    &:nth-child(6)
      animation-delay: -1.2s

@keyframes bounce-loader-rect
  0%
    transform: scale(1)
  50%
    transform: scale(.2)
  100%
    transform: scale(1)

// 进度条动画
.bar-loader
  width: 500px
  height: 40px
  .bar-wrap
    width: 460px
    height: 30px
    background: #fff
    border-radius: 15px
    box-shadow: 0 0 4px #999

  .bar-progress
    width: 60%
    height: 100%
    background: #5cb85c
    border-radius: 15px
    background-image: -webkit-linear-gradient(
      -45deg,#5cb85c 25%,
      #74c274 25%,
      #74c274 50%,
      #5cb85c 50%,
      #5cb85c 75%,
      #74c274 75%)
    background-size: 40px 40px
    animation: bar-loader .5s linear infinite
    transition: 1s

@keyframes bar-loader
  0%
    background-position: 0 40px
  100%
    background-position: 0 0

</style>
