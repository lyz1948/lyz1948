<template lang="pug">
  .snippet-wrap
    .top-title
      h2 行列矩阵
    .content
      .refresh(@click='refresh')
        span 刷新
      .matrix-box
</template>

<script>
const gridSize = 76
const size = 8
const len = size * size
let arr = []
let aLi
export default {
  mounted () {
    this.createLi()
    this.findSame()
  },
  methods: {
    refresh () {
      this.createLi()
      this.findSame()
    },
    createLi () {
      const box = document.getElementsByClassName('matrix-box')[0]
      const ul = document.createElement('ul')
      box.innerHTML = ''
      ul.style.width = gridSize * size + 'px'
      ul.style.height = gridSize * size + 'px'

      for(let i = 0; i < len; i++) {
        const li = document.createElement('li')
        let rdm = Math.floor(Math.random() * 6) * 90
        li.style.width = gridSize + 'px'
        li.style.height = gridSize + 'px'
        li.style['background-position'] = rdm +'px ' + '88px'
        li.className = 'box' + rdm
        arr.push(i)
        ul.appendChild(li)
      }
      box.appendChild(ul)
    },
    toggleMatrix (newArr) {
      for(let i = 0, len = aLi.length; i < len; i++) {
        aLi[i].innerHTML = newArr[i]
      }
    },
    onMatrix (array, size) {
      const resArr = []
      let count = 0

      const factory = function() {
        for(let i = 0, len = array.length; i < len; i++) {
          if(i % size === count) {
            resArr.push(array[i])
          }
        }
        count++
        if(count < size) {
          factory()
        }
      }
      factory()
      return resArr
    },
    findSame () {
      aLi = document.querySelectorAll('li')
      let res = []

      var find = function(aLi) {

        let num = 0
        let prev = aLi[0]
        for(let i = 0, len = aLi.length; i < len; i++) {
          if(prev.className == aLi[i].className && i % size != 0) {
            num++
          } else {
            // 当num > 2的时候，说明已经有最少3个相同的
            if(num >= 2) {
              // 将这几个相同的添加的结果数组
              for(let j = 0; j <= num; j++) {
                if(toCon(aLi[(i-1) - j])) {
                  res.unshift(aLi[(i - 1) - j])
                }
              }
            }
            // 重置累加的数量
            num = 0
          }
          prev = aLi[i]
        }
      }

      function toCon(el) {
        for(let i = 0; i < res.length; i++) {
          if(el == res[i]) {
            return false
          }
        }
        return true
      }

      find(aLi)
      find(this.onMatrix(aLi, size))

      for(let i = 0; i < aLi.length; i++) {
        aLi[i].style.opacity = '0.2'
      }

      for(let i = 0; i < res.length; i++) {
        res[i].style.opacity = 1
      }

      return res
    }
  }
}
</script>

<style>
.content {
  margin-top: 20px
}
.matrix-box {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0;
  clear: both;
  overflow: hidden;
}

.matrix-box ul > li {
  float: left;
  border-bottom: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  box-sizing: border-box;
  font-size: 16px;
  color: #333;
  background-image: url('/img/emoji.png');
  filter: grayscale(50%)
}
.refresh span {
  display: inline-block;
  padding: 5px 20px;
  margin-bottom: 20px;
  border-radius: 25px;
  background-color: forestgreen;
  color: #fff;
  text-align: center;
  font-size: 14px;
}
</style>
