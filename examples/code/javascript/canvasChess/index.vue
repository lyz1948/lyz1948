<template lang="pug">
  .snippet-wrap
    .top-title
      h2 五子棋
    .row
      canvas#chess(width="450", height="450")
    .row
      button(type="button", @click="start") {{ text }}
</template>

<script>
export default {
  name: 'canvasChess',
  data () {
    return {
      ctx: null,
      canvas: null,
      me: true,
      chessBoard: [], // 棋盘中的每个点数组
      wins: [],
      myWin: [],
      computWin: [],
      count: 0,
      over: false,
      text: '开始'
    }
  },
  mounted () {
    let canvas = document.querySelector('#chess')
    this.ctx = canvas.getContext('2d')

    // 棋盘线条颜色
    this.ctx.strokeStyle = '#d9d9d9'

    this.init()

    // 点击落子
    canvas.onclick = (e) => {
      this.playChess(e)
    }
    this.canvas = canvas
  },
  methods: {
    start () {
      if (this.over) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.over = false
        this.chessBoard = [] // 棋盘中的每个点数组
        this.wins = []
        this.myWin = []
        this.computWin = []
        this.coutn = 0
        this.me = true
        this.init()
      }
    },
    init () {
      this.initWinerArr()
      this.initChessBoardArr()
      this.winFunRow()
      this.winFunCol()
      this.winFunLT2RB()
      this.winFunRT2LB()
      this.initPlayData()
      this.loadBgImage()
    },
    // 背景图片
    loadBgImage () {
      let oImg = new Image()
      oImg.src = require('../../../assets/images/logo.png')
      oImg.onload = () => {
        this.ctx.drawImage(oImg, 150, 150, 150, 150)
        this.drawChess()
      }
    },
    initChessBoardArr () {
      for (let i = 0; i < 15; i++) {
        this.chessBoard[i] = []
        for (let j = 0; j < 15; j++) {
          this.chessBoard[i][j] = 0
        }
      }
    },
    initWinerArr () {
      for (let i = 0; i < 15; i++) {
        this.wins[i] = []
        for (let j = 0; j < 15; j++) {
          this.wins[i][j] = []
        }
      }
    },
    // 初始化游戏角色数据
    initPlayData () {
      for (let i = 0; i < this.count; i++) {
        this.myWin[i] = 0
        this.computWin[i] = 0
      }
    },
    // 赢法算法
    // 横排赢法的可赢次数
    winFunRow () {
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 11; j++) {
          for (let k = 0; k < 5; k++) {
            this.wins[i][j + k][this.count] = true
          }
          this.count++
        }
      }
    },
    // 竖排赢法的可赢次数
    winFunCol () {
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 11; j++) {
          for (let k = 0; k < 5; k++) {
            this.wins[j + k][i][this.count] = true
          }
          this.count++
        }
      }
    },
    // 斜线赢法的可赢次数
    winFunLT2RB () {
      for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
          for (let k = 0; k < 5; k++) {
            this.wins[i + k][j + k][this.count] = true
          }
          this.count++
        }
      }
    },
    // 反斜线赢法的可赢次数
    winFunRT2LB () {
      for (let i = 0; i < 11; i++) {
        for (let j = 14; j > 3; j--) {
          for (let k = 0; k < 5; k++) {
            this.wins[i + k][j - k][this.count] = true
          }
          this.count++
        }
      }
    },
    // 棋盘
    drawChess () {
      let ctx = this.ctx
      ctx.beginPath()
      for (let i = 0; i < 15; i++) {
        ctx.moveTo(15 + i * 30, 15)
        ctx.lineTo(15 + i * 30, 435)
        ctx.stroke()
        ctx.moveTo(15, 15 + i * 30)
        ctx.lineTo(435, 15 + i * 30)
        ctx.stroke()
      }
    },
    // 画棋子
    drawChessBorad (i, j, player) {
      let ctx = this.ctx
      ctx.beginPath()
      ctx.arc(15 + i * 30, 15 + j * 30, 12, 0, 2 * Math.PI)
      ctx.closePath()
      // 渐变
      let gradient = ctx.createRadialGradient(
        15 + i * 30,
        15 + j * 30,
        20,
        15 + i * 30,
        15 + j * 30,
        0
      )
      if (player) {
        // 第一个圆
        gradient.addColorStop(0, '#000')
        // 第二个圆
        gradient.addColorStop(1, '#ddd')
      } else {
        gradient.addColorStop(0, '#d9d9d9')
        gradient.addColorStop(1, '#f9f9f9')
      }

      ctx.fillStyle = gradient
      ctx.fill()
    },
    computerAI () {
      let myWin = this.myWin
      let computWin = this.computWin
      let myScore = []

      let computerScore = []

      let max = 0

      let u = 0

      let v = 0

      // 初始化棋盘可落子的点
      for (let i = 0; i < 15; i++) {
        myScore[i] = []
        computerScore[i] = []
        for (let j = 0; j < 15; j++) {
          myScore[i][j] = 0
          computerScore[i][j] = 0
        }
      }

      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          // 如果该位置还未下子
          if (this.chessBoard[i][j] === 0) {
            for (let k = 0; k < this.count; k++) {
              if (this.wins[i][j][k]) {
                if (myWin[k] === 1) {
                  myScore[i][j] += 200
                } else if (myWin[k] === 2) {
                  myScore[i][j] += 400
                } else if (myWin[k] === 3) {
                  myScore[i][j] += 1000
                } else if (myWin[k] === 4) {
                  myScore[i][j] += 2000
                } else if (myWin[k] === 5) {
                  myScore[i][j] += 10000
                }

                if (computWin[k] === 1) {
                  computerScore[i][j] += 210
                } else if (computWin[k] === 2) {
                  computerScore[i][j] += 410
                } else if (computWin[k] === 3) {
                  computerScore[i][j] += 1100
                } else if (computWin[k] === 4) {
                  computerScore[i][j] += 2100
                } else if (computWin[k] === 5) {
                  computerScore[i][j] += 20000
                }
              }
            }
          }

          if (myScore[i][j] > max) {
            max = myScore[i][j]
            u = i
            v = j
          } else if (myScore[i][j] === max) {
            if (computerScore[i][j] > computerScore[u][v]) {
              u = i
              v = j
            }
          }

          if (computerScore[i][j] > max) {
            max = computerScore[i][j]
            u = i
            v = j
          } else if (computerScore[i][j] === max) {
            if (myScore[i][j] > myScore[u][v]) {
              u = i
              v = j
            }
          }
        }
      }

      this.drawChessBorad(u, v, false)
      this.chessBoard[u][v] = 2

      for (let k = 0; k < this.count; k++) {
        if (this.wins[u][v][k]) {
          computWin[k]++
          myWin[k] = 6
          if (computWin[k] === 5) {
            setTimeout(() => {
              window.alert('Computer Win!')
              this.text = '再来一次'
            }, 1000)
            this.over = true
          }
        }
      }
      if (!this.over) {
        this.me = !this.me
      }
    },
    playChess (e) {
      if (this.over) return
      if (!this.me) return
      let x = e.offsetX
      let y = e.offsetY
      let i = Math.floor(x / 30)
      let j = Math.floor(y / 30)

      if (this.chessBoard[i][j] === 0) {
        this.drawChessBorad(i, j, this.me)
        this.chessBoard[i][j] = 1

        for (let k = 0; k < this.count; k++) {
          if (this.wins[i][j][k]) {
            this.myWin[k]++
            this.computWin[k] = 6
            if (this.myWin[k] === 5) {
              setTimeout(() => {
                window.alert('You Win!')
                this.text = '再来一次'
              }, 1000)
              this.over = true
            }
          }
        }
        if (!this.over) {
          this.me = !this.me
          this.computerAI()
        }
      }
    }
  }
}
</script>
