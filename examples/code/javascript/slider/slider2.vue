<template lang="pug">
  .slider-wrapper(ref="wrap")
    h2 移动端切换幻灯片
    .wrapper
      ul.box-list(
        ref="boxList",
        @touchstart="handleDown",
        @touchend="handleUp",
        @touchmove="handleMove",
        )
        li.box-item(
          :key="index",
          v-for="(item, index) in textArr",
          :style="'background:' + colorArr[index]") {{ item }}
      p.dot-list
        span.dot-item(
          :key="index",
          v-for="(item, index) in textArr",
          @mouseover="handleMouseOver(index)",
          :class="{'active': index == iNow}")
</template>

<script>

import {
  doMove
} from '@/utils'

export default {
  data () {
    return {
      iNow: 0,
      bBtn: true,
      oneBtn: false,
      isDrag: false,
      downX: 0,
      downLeft: 0,
      downTime: 0
    }
  },
  created () {
    this.textArr = ['side 1', 'side 2', 'side 3', 'side 4', 'side 5', 'side 6', 'side 7']
    this.colorArr = ['#8A2BE2', '#76EE00', '#76EEC6', '#D15FEE', '#C0FF3E', '#CD3333', '#D02090']
  },
  mounted () {
    let wrap = this.$refs.boxList
    let item = wrap.children
    wrap.style.width = this.textArr.length * item[0].offsetWidth + 'px'
  },
  methods: {
    handleMouseOver (index) {
      this.iNow = index
      let wrap = this.$refs.boxList
      let item = wrap.children[0]

      doMove(this.$refs.boxList, { left: -index * item.offsetWidth })
    },
    handleDown (ev) {
      const touchs = ev.type === 'touchstart' ? ev.changedTouches[0] : ev || window.event

      this.downX = touchs.pageX
      this.downLeft = this.$refs.boxList.offsetLeft
      this.isDrag = true
      this.downTime = Date.now()
    },
    handleMove (ev) {
      const touchs = ev.type === 'touchstart' ? ev.changedTouches[0] : ev || window.event

      const oWrap = this.$refs.wrapper
      const box = this.$refs.boxList
      let left

      if (this.isDrag) {
        if (box.offsetLeft >= 0) {
          if (!this.oneBtn) {
            this.oneBtn = true
            this.downX = touchs.pageX
          }
          left = (touchs.pageX - this.downX) / 3
        } else if (box.offsetLeft <= oWrap.offsetWidth - box.offsetWidth) {
          if (!this.oneBtn) {
            this.oneBtn = true
            this.downX = touchs.pageX
          }
          left = (touchs.pageX - this.downX) / 3 + (oWrap.offsetWidth - box.offsetWidth)
        } else {
          left = touchs.pageX - this.downX + this.downLeft
        }

        this.$refs.boxList.style.left = left + 'px'
      }
    },
    handleUp (ev) {
      const touchs = ev.changedTouches[0]
      const box = this.$refs.boxList
      const item = box.children[0]

      if (touchs.pageX > this.downX) { // →
        if (this.iNow > 0) {
          if (((touchs.pageX - this.downX > item.offsetWidth / 2) || (Date.now() - this.downTime) < 300) && (touchs.pageX - this.downX) > 50) {
            this.iNow--
          }
        }
        doMove(box, { left: -this.iNow * item.offsetWidth }, () => {
          this.bBtn = true
        })
      } else if (touchs.pageX < this.downX) { // ←
        if (this.iNow < this.textArr.length - 1) {
          if ((this.downX - touchs.pageX > item.offsetWidth / 2 ||
              (Date.now() - this.downTime) < 300) &&
                this.downX - touchs.pageX > 50
          ) {
            this.iNow++
          }
        }
        doMove(box, { left: -this.iNow * item.offsetWidth }, () => {
          this.bBtn = true
        })
      }

      this.isDrag = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    width: 500px
    height: 300px
    border: 1px solid #fff
    overflow: hidden
    position: relative

  .box-list
    position: absolute
    left: 0

  .box-item
    width: 500px
    height: 300px
    font-size: 50px
    text-align: center
    line-height: 300px
    color: #fff
    float: left

  .dot-list
    margin: 0
    text-align: center
    position: absolute
    bottom: 10px
    left: 50%
    transform: translateX(-50%)

  .dot-item
    width: 10px
    height: 10px
    border-radius: 50%
    background: #ccc
    display: inline-block
    margin-right: 5px

  .wrap .active
    background: #7EC0EE

</style>
