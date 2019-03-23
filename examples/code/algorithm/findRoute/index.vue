<template lang="pug">
  .snippet-wrap
    .top-title
      h2 A* Star 寻路算法
    .wrap.mt20
      span.btn#beginBtn(@click="openFn") 寻路
    .route-wrap
</template>

<script>
export default {
  name: 'findRoute',
  data () {
    return {
      num: 20,
      cols: 20,
      size: 20,
      beginLi: null,
      endLi: null,
      map: [],
      openAry: [],
      closeAry: []
    }
  },
  mounted () {
    this.initData()
    this.beginLi = document.getElementsByClassName('sty1')
    this.endLi = document.getElementsByClassName('sty2')
  },
  computed: {
    getCount () {
      return this.cols * this.size
    }
  },
  methods: {
    initData () {
      let num = this.num
      let map = this.map
      for (let i = 0; i < num; i++) {
        map[i] = []
        for (let j = 0; j < num; j++) {
          if (i === 8 && j === 5) {
            map[i][j] = 1
          }

          if (i === 2 && j === 2) {
            map[i][j] = 2
          }

          if (j === 5 - i) {
            map[i][j] = 3
          }

          map[i].push(0)
        }
      }
      this.cols = map.length
      this.createMap()
    },
    createMap () {
      let box = document.createElement('ul')
      let map = this.map
      box.className = 'list clearfix'
      box.style.width = this.size * this.cols + 'px'
      box.style.height = this.size * this.cols + 'px'

      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
          let grid = document.createElement('li')
          grid.className = 'item'
          box.appendChild(this.setStyle(grid, map[i][j]))
          document.querySelector('.route-wrap').appendChild(box)
        }
      }
    },
    setStyle (grid, i) {
      switch (i) {
        case 1:
          grid.classList.add('sty1')
          this.openAry.push(grid)
          break
        case 2:
          grid.classList.add('sty2')
          break
        case 3:
          grid.classList.add('sty3')
          this.closeAry.push(grid)
          break
      }
      return grid
    },
    openFn (point) {
      let curPoint = this.openAry.shift()

      if (curPoint === this.endLi[0]) {
        this.drawLine()
        return
      }
      this.closeFn(curPoint)
      this.findFn(curPoint)
      // 排序获取离目标点最近的点
      this.openAry.sort(function (a, b) {
        return a.num - b.num
      })
      // 递归调用
      this.openFn()
    },
    closeFn (point) {
      this.closeAry.push(point)
    },
    findFn (nowLi) {
      let res = []
      let aLi = document.getElementsByTagName('li')

      let filterFn = (oLi) => {
        for (let i = 0; i < this.closeAry.length; i++) {
          if (this.closeAry[i] === oLi) {
            return false
          }
        }
        for (let i = 0; i < this.openAry.length; i++) {
          if (this.openAry[i] === oLi) {
            return false
          }
        }
        return true
      }

      for (let i = 0; i < aLi.length; i++) {
        if (filterFn(aLi[i])) {
          res.push(aLi[i])
        }
      }

      for (let k = 0, len = res.length; k < len; k++) {
        if (Math.abs(nowLi.offsetLeft - res[k].offsetLeft) <= this.size && Math.abs(nowLi.offsetTop - res[k].offsetTop) <= this.size) {
          res[k].num = this.f(res[k])
          res[k].parent = nowLi
          this.openAry.push(res[k])
        }
      }
    },
    drawLine () {
      let res = []
      let lastLi = this.closeAry.pop()
      let step = 0

      let findParent = (oLi) => {
        res.unshift(oLi)
        if (oLi.parent === this.beginLi[0]) {
          return
        }
        findParent(oLi.parent)
      }
      findParent(lastLi)

      let move = function () {
        res[step].style.background = 'red'
        timer = requestAnimationFrame(move)
        step++
        if (step === res.length) {
          cancelAnimationFrame(timer)
        }
      }
      let timer
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(move)
    },
    f (node) {
      return this.startFn(node) + this.endFn(node)
    },
    startFn (node) {
      let a = this.beginLi[0].offsetLeft - node.offsetLeft
      let b = this.beginLi[0].offsetTop - node.offsetTop
      return Math.sqrt(a * a + b * b)
    },
    endFn (node) {
      let a = this.endLi[0].offsetLeft - node.offsetLeft
      let b = this.endLi[0].offsetTop - node.offsetTop
      return Math.sqrt(a * a + b * b)
    }
  }
}
</script>

<style lang="stylus">
.route-wrap
  .list
    margin: 0;
    padding: 0;
    border-top: 1px solid #caca9b;
    border-left: 1px solid #caca9b;
    clear: both;
    margin-top: 50px;
    list-style: none;
    .item
      width: 19px;
      height: 19px;
      float: left;
      border-bottom: 1px solid #caca9b;
      border-right: 1px solid #caca9b;
      &.sty1
        background-color: palegreen

      &.sty2
        background-color: lightcoral

      &.sty3
        background-color: plum

.btn
  display: inline-block;
  padding: 9px 15px;
  background-color: lightpink;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;

.clearfix, .clearfix:before
  display: table;
  height: 0;
  line-height: 1;
  clear: both;
</style>
