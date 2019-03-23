<template lang="pug">
  .slider-wrapper
    h2 手机端滑屏滚动
    .wrapper
      div(ref="wrapHook")
        ul.list(ref="boxHook", @touchstart="handleDown",  @mousedown="handleDown")
          li.item(v-for="(item, index) in 100", :key="index") {{ index + 1 }}
        .scroll-bar(ref="barHook")
</template>

<script>
import { doMove } from '@/utils'
export default {
  data () {
    return {
      mouse: {
        isDrag: false,
        downTop: 0,
        downY: 0,
        speed: 0,
        prev: 0,
        scrollY: 0
      },
      barHeight: 0,
      oneBtn: false
    }
  },
  mounted () {
    this.$wrapHook = this.$refs.wrapHook
    this.$boxHook = this.$refs.boxHook
    this.$barHook = this.$refs.barHook
    this.initScrollBar()
  },
  methods: {
    initScrollBar () {
      let barHeight = parseInt(this.$wrapHook.offsetHeight * this.$wrapHook.offsetHeight / this.$boxHook.offsetHeight)

      // 限制滚动条的高度
      if (barHeight <= 40) {
        barHeight = 40
      } else if (this.$boxHook.offsetHeight < this.$wrapHook.offsetHeight) {
        barHeight = 0
      }
      this.barHeight = barHeight
      this.$barHook.style.height = barHeight + 'px'
    },
    handleDown (ev) {
      const touchs = ev.type === 'touchmove' ? ev.changedTouches[0] : ev || window.event
      this.mouse.isDrag = true
      this.mouse.downY = touchs.pageY
      this.mouse.prev = touchs.pageY
      this.mouse.downTop = this.$boxHook.offsetTop

      document['on' + ev.type] = (ev) => {
        this.handleMove(ev)
      }
      document['on' + ev.type] = (ev) => {
        this.handleUp()
        document['on' + ev.type] = null
      }
    },
    handleMove (ev) {
      const touchs = ev.type === 'touchmove' ? ev.changedTouches[0] : ev || window.event
      let wrapHeight, boxTop, bar, barHeight, diff, top

      if (this.mouse.isDrag) {
        this.mouse.speed = touchs.pageY - this.mouse.prev
        this.mouse.prev = touchs.pageY

        wrapHeight = this.$wrapHook.offsetHeight
        // 内容
        boxTop = this.$boxHook.offsetTop

        bar = this.$barHook
        barHeight = this.barHeight
        // 容器与内容差值
        diff = this.$wrapHook.offsetHeight - this.$boxHook.offsetHeight

        // 顶部
        if (this.$boxHook.offsetTop >= 0) {
          if (!this.oneBtn) {
            this.oneBtn = true
            this.mouse.downY = touchs.pageY
          }
          top = (touchs.pageY - this.mouse.downY) / 3

          // 修改滚动条高度
          bar.style.height = barHeight * (1 - boxTop / wrapHeight) + 'px'
          bar.style.top = 0
        } else if (boxTop <= diff) {
          if (!this.oneBtn) {
            this.oneBtn = true
            this.mouse.downY = touchs.pageY
          }
          top = (touchs.pageY - this.mouse.downY) / 3 + diff

          // 修改滚动条高度
          bar.style.height = barHeight * (1 - Math.abs(boxTop - diff) / wrapHeight) + 'px'
          bar.style.top = wrapHeight - bar.offsetHeight + 'px'
        } else {
          top = touchs.pageY - this.mouse.downY + this.mouse.downTop
          this.mouse.scrollY = boxTop / diff
          bar.style.top = this.mouse.scrollY * (wrapHeight - barHeight) + 'px'
        }
      }

      this.$boxHook.style.top = top + 'px'
    },
    handleUp () {
      let wrapHeight, boxTop, bar, barHeight, diff

      const move = () => {
        wrapHeight = this.$wrapHook.offsetHeight
        // 内容
        boxTop = this.$boxHook.offsetTop

        bar = this.$barHook
        barHeight = this.barHeight
        // 容器与内容差值
        diff = this.$wrapHook.offsetHeight - this.$boxHook.offsetHeight
        if (Math.abs(this.mouse.speed) <= 1 || boxTop > 50 || boxTop < diff - 50) {
          cancelAnimationFrame(timer)

          // 顶部
          if (boxTop >= 0) {
            doMove(this.$boxHook, { top: 0 })
            // doMove(bar, {height:  barHeight})
          } else if (boxTop <= diff) { // 尾部
            doMove(this.$boxHook, { top: diff })
            // doMove(bar, {height:  barHeight, top: wrapHeight - barHeight})
          }
          this.mouse.isDrag = false
          this.oneBtn = false
        } else {
          this.mouse.speed *= 0.95
          this.mouse.speed = this.mouse.speed > 0 ? Math.ceil(this.mouse.speed) : Math.floor(this.mouse.speed)
          this.$boxHook.style.top = this.mouse.speed + boxTop + 'px'

          if (boxTop >= 0) {
            // 修改滚动条高度
            bar.style.height = barHeight * (1 - boxTop / wrapHeight) + 'px'
            bar.style.top = 0
          } else if (boxTop <= diff) {
            // 修改滚动条高度
            bar.style.height = barHeight * (1 - Math.abs(boxTop - diff) / wrapHeight) + 'px'
            bar.style.top = wrapHeight - bar.offsetHeight + 'px'
          } else {
            // 滚动条
            this.mouse.scrollY = boxTop / diff
            bar.style.top = this.mouse.scrollY * (wrapHeight - barHeight) + 'px'
          }
          timer = requestAnimationFrame(move)
        }
      }
      let timer
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(move)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  position: relative
  border: 1px solid #888
  width: 500px
  height: 400px
  overflow: hidden
  .list
    position: absolute
    top: 0
    width: 100%
    color: #333
  .scroll-bar
    position: absolute
    right: 0
    top: 0
    width: 4px
    height: 40px
    border-radius: 4px
    background: #666
</style>
