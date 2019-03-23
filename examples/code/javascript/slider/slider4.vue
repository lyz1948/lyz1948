<template lang="pug">
  .slider-wrapper
    h2 3D翻转幻灯片
    .wrapper
      .box-list(:style="styleObj", ref="listHook")
        .box(v-for="(item, index) in nums", :key="index")
      .btn-group
        input(type="button", value="重置", @click="handleReset")
        input(type="button", value="切换", @click="handleShow")
</template>

<script>
export default {
  data () {
    return {
      wrap: null,
      items: null,
      nums: 70,
      rows: 7,
      cells: 10,
      styleObj: {
        width: '500px',
        height: '350px'
      },
      resultArr: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.wrap = this.$refs.listHook
      let boxes = this.wrap.children
      this.items = boxes

      this.styleObj = {
        width: boxes[0].offsetWidth * this.cells,
        height: boxes[0].offsetHeight * this.rows
      }
      this.resultArr = this.setPosData()
    })
  },
  methods: {
    handleShow () {
      let x = this.resultArr.length - 1
      let y = this.resultArr[0].length - 1

      this.handleMove(x, y, -1, 30, function () {
        this.style.borderColor = 'rgba(0, 0, 0, .5)'
        this.style.boxShadow = '0 0 4px blue'
        this.style.WebkitTransform = 'translate(-50px, -100px) rotateX(720deg) rotateY(540deg)'
        this.style.opacity = '0'
      })
    },
    handleReset () {
      this.handleMove(0, 0, 1, 30, function () {
        this.style.borderColor = 'rgba(0, 0, 0, 0)'
        this.style.boxShadow = '0 0 0 blue'
        this.style.WebkitTransform = 'translate(0, 0) rotateX(0deg) rotateY(0deg)'
        this.style.opacity = '1'
      })
    },
    handleMove (x, y, dir, delay, cb) {
      let arr = this.resultArr
      if (!arr[x] || !arr[x][y]) return

      if (cb) {
        cb.call(arr[x][y])

        clearTimeout(arr[x][y].timer)
        arr[x][y].timer = setTimeout(() => {
          if (dir > 0) {
            this.handleMove(x + 1, y, dir, delay, cb)
            this.handleMove(x, y + 1, dir, delay, cb)
          } else {
            this.handleMove(x - 1, y, dir, delay, cb)
            this.handleMove(x, y - 1, dir, delay, cb)
          }
        }, delay)
      }
    },
    setPosData () {
      let rows = this.rows
      let cells = this.cells
      let boxes = this.wrap.children
      let res = []
      for (let i = 0; i < rows; i++) {
        let arr = []
        for (let j = 0; j < cells; j++) {
          boxes[i * cells + j].setAttribute('posX', i)
          boxes[i * cells + j].setAttribute('posY', j)
          boxes[i * cells + j].style.backgroundPosition = `-${j * 50}px -${i * 50}px`
          arr.push(boxes[i * cells + j])
        }
        res.push(arr)
      }
      return res
    }
  }
}
</script>

<style lang="stylus">
$boxWidth = 400px

.wrapper
  .box-list
    width: $boxWidth
    height: $boxWidth
    -webkit-perspective: 600px
    -webkit-transform-style: preserve-3d
  .box
    float: left
    width: 50px
    height: 50px
    border: 1px solid rgba(0, 0, 0, 0)
    background: url('http://cdn.ykpine.com/images/orange.jpeg') no-repeat
    background-origin: border-box
    box-sizing: border-box
    transition: .5s background, .2s border, .3s .1s box-shadow,  2s .2s -webkit-transform, 2s .3s opacity
  .btn-group
    width: $boxWidth
    padding: 20px 0
    input
      padding: 8px 15px
      border-radius: 4px
      outline: none
      margin: 0 5px
</style>
