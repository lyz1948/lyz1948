<template lang="pug">
  .slider-wrapper
    h2 幻灯片
    .wrapper
      ul.box-list(ref="boxList")
        li.box-item(
          v-for="(item, index) in textArr",
          :key="index",
          :style="'background:' + colorArr[index]",
          :class="{'active': index == iNow}") {{ item }}
      p.dot-list
        span.dot-item(
          :key="index",
          v-for="(item, index) in textArr",
          @mouseover="handleMouseOver(index)",
          :class="{'active': index == iNow}")
</template>

<script>

export default {
  data () {
    return {
      iNow: 0,
      bBtn: true
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

      // doMove(this.$refs.boxList, { left: -index * item.offsetWidth })
    }
  }
}
</script>

<style lang="stylus" scoped>

  .wrapper
    width: 500px
    height: 300px
    border: 1px solid #fff
    position: relative
    overflow: hidden

  .box-list
    position: absolute
    left: 0

  .box-item
    width: 500px
    height: 100%
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
