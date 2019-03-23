<template lang="pug">
  .wrapper
    h2 CSS3 3D翻转幻灯片
    ul.cube-box
      li.item(
        v-for="(item, index) in getLength",
        :key="index",
        :style="'z-index:' + (index > len/ 2 ? len - index : index +1) ")
        a.face(href="#", :style="'background-position:' + -(index * oneWidth) +'px 0px'")
        a.face(href="#", :style="'background-position:' + -(index * oneWidth) +'px 0px'")
        a.face(href="#", :style="'background-position:' + -(index * oneWidth) +'px 0px'")
        a.face(href="#", :style="'background-position:' + -(index * oneWidth) +'px 0px'")
        span.side.side-left
        span.side.side-right
    .ctrl-box.tac
      span.item(
        v-for="(num, idx) in 4",
        :class="{'cur': curIndex == idx}",
        @click="handleTab(idx)"
        :key="num") {{ num }}
</template>

<script>
let count = 0
export default {
  data () {
    return {
      timer: null,
      boxWidth: 625,
      oneWidth: 25,
      len: 0,
      curIndex: 0,
      delay: 6
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.len = this.getLength

      this.autoSwiper()
    })
  },
  computed: {
    getLength () {
      return this.boxWidth / this.oneWidth
    }
  },
  methods: {
    handleTab (index) {
      if (index === this.curIndex) return
      clearInterval(this.timer)

      let oUl = document.querySelector('.cube-box')
      let aItem = oUl.children
      let len = aItem.length

      for (let i = 0; i < len; i++) {
        aItem[i].style.transition = `${0.5 * Math.abs(this.curIndex - index)}s ${i * 50}ms all ease-in-out`
        aItem[i].style.transform = `translateZ(-150px) rotateX(-${index * 90}deg)`
      }
      this.curIndex = index
      count = index
      this.autoSwiper()
    },
    autoSwiper () {
      this.timer = setInterval(() => {
        count++
        count %= 4

        this.handleTab(count)
      }, this.delay * 1000)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="stylus" scoped>
$boxWidth = 625px

.ctrl-box
  width: $boxWidth
  padding: 20px 0
  .item
    display: inline-block
    width: 30px
    height: 30px
    line-height: 30px
    margin: 0 10px
    border-radius: 50%
    font-size: 20px
    color: #fff
    background-color: #000
    cursor: pointer
    &.cur
      background-color: #f90

.cube-box
  width: $boxWidth
  height: 300px
  -webkit-perspective: 800px
  .item
    position: relative
    float: left
    width: 25px
    height: 100%
    -webkit-transform-style: preserve-3d
    -webkit-transform: translateZ(-150px) rotateX(0deg)
  .face
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    &:nth-of-type(1)
      background: url('../../../assets/images/1.jpg') no-repeat
      -webkit-transform: translateZ(150px)
    &:nth-of-type(2)
      background: url('../../../assets/images/2.jpg') no-repeat
      -webkit-transform: translateZ(-150px) rotateX(90deg)
      -webkit-transform-origin: top
    &:nth-of-type(3)
      background: url('../../../assets/images/3.jpg') no-repeat
      -webkit-transform: translateZ(-150px) rotateX(180deg)
    &:nth-of-type(4)
      background: url('../../../assets/images/4.jpg') no-repeat
      -webkit-transform-origin: bottom
      -webkit-transform: translateZ(-150px) rotateX(-90deg)
  .side
    position: absolute
    display: block
    width: 300px
    height: 300px
    background-color: #2e2e2e
  .side-left
    left: 0
    -webkit-transform: translateZ(-150px) rotateY(-90deg)
    -webkit-transform-origin: left
  .side-right
    right: 0
    -webkit-transform: translateZ(-150px) rotateY(90deg)
    -webkit-transform-origin: right
</style>
