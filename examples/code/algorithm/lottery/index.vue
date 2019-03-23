<template lang="pug">
  .snippet-wrap
    .top-title
      h2 概率
    .row
      input(type='text', v-model='val')
      button(@click='handleStart') 开始
    .row
      p
        | 一等奖：
        span {{ getWinerCount1 }}
      p
        | 二等奖：
        span {{ getWinerCount2 }}
      p
        | 三等奖：
        span {{ getWinerCount3 }}
      p
        | 安慰奖：
        span {{ getLast }}
</template>

<script>
export default {
  data () {
    return {
      size: 10000,
      res: [],
      min: 0.002,
      mid: 0.03,
      max: 0.8,
      val: 1000
    }
  },
  created () {
    this.arr = [this.size * this.min, this.size * this.mid, this.size * this.max]
  },
  mounted () {
    this.setWin()
  },
  computed: {
    getWinerCount1 () {
      return this.res.length && this.res[0].count
    },
    getWinerCount2 () {
      return this.res.length && this.res[1].count
    },
    getWinerCount3 () {
      return this.res.length && this.res[2].count
    },
    getLast () {
      let count = 0
      if (this.res.length) {
        this.res.map(it => {
          count += it.count
        })
      }
      return this.val - count
    }
  },
  methods: {
    setWin () {
      let num = 0
      this.res = []
      for (let i = 0, len = this.arr.length; i < len; i++) {
        num += this.arr[i]
        this.res.push({ count: 0, val: num })
      }
    },
    handleStart () {
      this.setWin()
      for (let i = 0; i < this.val; i++) {
        let val = Math.random() * this.size
        this.lottery(val)
      }
    },
    lottery (val) {
      this.res.map(it => {
        if (it.val > val) {
          it.count++
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
input, button
  padding: 9px 16px
  font-size: 14px
button
  margin-left: 10px
</style>
