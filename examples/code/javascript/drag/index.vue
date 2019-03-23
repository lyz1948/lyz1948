<template lang="pug">
  .snippet-demo.drag
    .top-title
      h2 拖拽购物车
    .wrap.pos-r
      #box.pos-a(ref="box", v-drag)
        img(src="../../../assets/images/logo.png")
</template>

<script>

export default {
  name: 'drag',
  data () {
    return {
      drag: ''
    }
  },
  directives: {
    drag: {
      bind: function (el) {
        let prevX = 0
        let prevY = 0
        let speedX = 0
        let speedY = 0
        let timer
        let timer2
        initBox()

        el.onmousedown = function (e) {
          let disX = e.clientX - el.offsetLeft
          let disY = e.clientY - el.offsetTop
          prevX = e.clientX
          prevY = e.clientY
          clearInterval(timer)

          document.onmousemove = function (e) {
            let l = e.clientX - disX
            let t = e.clientY - disY

            el.style.left = l + 'px'
            el.style.top = t + 'px'

            speedX = e.clientX - prevX
            speedY = e.clientY - prevY
            prevX = e.clientX
            prevY = e.clientY
          }
          document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null

            doMove()
          }
          return false
        }
        function initBox () {
          el.style.width = 0
          el.style.height = 0
          el.style.left = document.documentElement.clientWidth / 2 + 'px'
          el.style.top = document.documentElement.clientHeight / 2 + 'px'
          showBox(200)
        }
        function showBox (target) {
          clearInterval(timer2)
          var offsetL = el.offsetLeft
          var offsetT = el.offsetTop
          timer2 = setInterval(function () {
            if (el.offsetWidth >= target) {
              clearInterval(timer2)
              doMove()
            } else {
              el.style.width = el.offsetWidth + 10 + 'px'
              el.style.height = el.offsetHeight + 10 + 'px'
              el.style.left = offsetL + el.offsetWidth / 2 + 'px'
              el.style.top = offsetT + el.offsetHeight / 2 + 'px'
            }
          }, 30)
        }
        function doMove () {
          if (!el) return
          clearInterval(timer)

          timer = setInterval(function () {
            speedY += 3
            let l = el.offsetLeft + speedX
            let t = el.offsetTop + speedY

            if (l < 0) {
              l = 0
              speedX *= -1
              speedX *= 0.75
            } else if (l >= document.documentElement.clientWidth - el.offsetWidth) {
              l = document.documentElement.clientWidth - el.offsetWidth
              speedX *= -1
              speedX *= 0.75
            }

            if (t < 60) {
              t = 60
              speedY *= -1
              speedY *= 0.75
            } else if (t >= el.parentNode.offsetHeight - el.offsetHeight) {
              t = el.parentNode.offsetHeight - el.offsetHeight
              speedY *= -1
              speedY *= 0.75
              speedX *= 0.75
            }

            el.style.left = l + 'px'
            el.style.top = t + 'px'
          }, 30)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.drag
  .wrap
    width: 100%
    height: 500px
#box
  left: 50%
  top: 50%
  width: 200px
  height: 200px
  transform: translate(-50%, -50%)
  img
    width: 100%
    height: 100%
  .bar
    width: 20px
    height: 20px
    right: 0
    bottom: 0
    background-color: pink
</style>
