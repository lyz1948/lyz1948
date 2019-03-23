<template lang="pug">
  .snippet-wrap
    .top-title
      h2 八皇后
    .content
      ul.list(ref='listWrap')
        li.item.grid-item(v-for='item in 64', :key='item')
</template>

<script>
export default {
  data () {
    return {
      gridRows: 8,
      count: 0,
      posArr: [],
      posAllArr: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setPosition()
    })
  },
  methods: {
    setPosition () {
      let gridRows = this.gridRows
      let list = this.$refs.listWrap
      let aLi = list.children
      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridRows; j++) {
          aLi[i * gridRows + j].x = i
          aLi[i * gridRows + j].y = j
          // aLi[i * gridRows + j].innerHTML = i + '.' + j
          aLi[i * gridRows + j].index = -1
        }
      }
      this.setQueen(0)
      this.imageFlicker()
    },
    setQueen (queen) {
      let list = this.$refs.listWrap
      let aLi = list.children
      let gridRows = this.gridRows
      // 终止条件
      if (queen === this.gridRows) {
        this.count++
        this.posAllArr.push(this.posArr.concat())
        return
      }

      for (let i = 0; i < gridRows; i++) {
        // 满足条件才允许放子
        if (aLi[queen * gridRows + i].index === -1) {
          // 设置当前位置已放子
          aLi[queen * gridRows + i].index = queen
          // 辅助
          // aLi[queen * gridRows + i].innerHTML = '皇后' + queen

          this.posArr.push(aLi[queen * gridRows + i])
          let x = aLi[queen * gridRows + i].x
          let y = aLi[queen * gridRows + i].y

          // 循环遍历设置其他位置
          for (let k = 0; k < aLi.length; k++) {
            if (
              aLi[k].index === -1 &&
              (aLi[k].x === x ||
              aLi[k].y === y ||
              aLi[k].x + aLi[k].y === x + y ||
              aLi[k].x - aLi[k].y === x - y)
            ) {
              aLi[k].index = queen
              // aLi[k].innerHTML = queen
            }
          }
          // 递归
          this.setQueen(queen + 1)
          // 回溯
          this.back(queen)
          this.posArr.pop()
        }
      }
    },
    // 回溯函数
    back (last) {
      let list = this.$refs.listWrap
      let aLi = list.children
      for (let i = 0, len = aLi.length; i < len; i++) {
        if (aLi[i].index === last) {
          aLi[i].index = -1
        }
      }
    },
    imageFlicker () {
      let list = this.$refs.listWrap
      let aLi = list.children
      var flicker = () => {
        let randomArr = this.posAllArr[Math.floor(Math.random() * this.posAllArr.length)]
        for (let i = 0; i < aLi.length; i++) {
          aLi[i].style.backgroundColor = ''
        }

        for (let i = 0; i < randomArr.length; i++) {
          randomArr[i].style.backgroundColor = this.randomHexColorCode()
        }
      }

      flicker()

      setInterval(function () {
        flicker()
      }, 5 * 1000)
    },
    randomHexColorCode () {
      let n = (Math.random() * 0xfffff * 1000000).toString(16)
      return '#' + n.slice(0, 6)
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  width: 490px
  .list
    margin: 0
    padding: 0
    list-style: none
    border-top: 1px solid #2e2e2e
    border-left: 1px solid #2e2e2e
    // box-sizing: border-box
    font-size: 0
    clear: both
    overflow: hidden

    .item
      float: left
      width: 60px
      height: 60px
      border-bottom: 1px solid #2e2e2e
      border-right: 1px solid #2e2e2e
      box-sizing: border-box
      font-size: 16px
      color: #333
</style>
