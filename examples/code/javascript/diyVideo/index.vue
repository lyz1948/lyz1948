<template lang="pug">
  .snippet-wrap
    .top-title
      h2 自定义播放器
    .wrapper.pos-r.mt20
      video(src="../../../assets/video/01.mp4", ref="videoHook")
      .video-bar.pos-a.tac
        .bar-item.fl.play(@click="togglePlay") {{ playText }}
        .progress.pos-a(ref="proBarHook", @click="handleForward")
          .progress-inner(ref="barInnerHook")
          .progress-line.pos-a(@mousedown="handleDown", ref="lineHook")
        div.fr
          .bar-item.cur-time {{ getCurTime }}
          .bar-item.duration {{ getTotalTime }}
          .bar-item.muted.pos-r
            span(@click="handleMuted") {{ mutedText }}
            //- .volume-bar.pos-a(@click="handleVolume", ref="volHook")
            //-   .volume-bar-inner
          .bar-item.full(@click="handleFull") 全屏
</template>

<script>
export default {
  name: 'diyVideo',
  data () {
    return {
      video: null,
      ctrl: null,
      proBar: null,
      playText: '播放',
      mutedText: '静音',
      duration: '00:00:00',
      curTime: 0,
      timer: null,
      isFull: false,
      drag: {
        downX: 0,
        isDrag: false
      },
      sound: {
        downY: 0
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.video = this.$refs.videoHook
      this.ctrl = this.$refs.lineHook
      this.proBar = this.$refs.proBarHook

      setTimeout(() => {
        if (this.video && this.video.readyState === 4) {
          this.duration = this.formatTime(this.video.duration)
          this.curTime = this.formatTime(this.video.currentTime)
        }
      }, 200)
    })
  },
  computed: {
    getTotalTime () {
      return this.duration
    },
    getCurTime () {
      return this.curTime
    }
  },
  methods: {
    play () {
      this.video.play()

      this.timer = setInterval(this.formatCurTime, 1000)
    },
    pause () {
      this.video.pause()
      clearInterval(this.timer)
    },

    togglePlay () {
      this.video.paused ? this.play() : this.pause()
      this.playText = this.video.paused ? '播放' : '暂停'
    },
    handleMuted () {
      this.video.volume = this.video.muted ? 1 : 0
      this.mutedText = this.video.muted ? '静音' : '声音'
      this.video.muted = !this.video.muted
    },
    handleVolume (ev) {
      ev = ev || window.event
      this.sound.downY = ev.clientY - ev.target.offsetTop
    },
    handleFull () {
      let oVideo = this.$refs.videoHook
      this.isFull
        ? this.cancelFullScreen(oVideo)
        : this.fullScreen(oVideo)

      this.isFull = !this.isFull
    },
    fullScreen (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen()
      }
    },
    cancelFullScreen (element) {
      if (element.cancelFullscreen) {
        element.cancelFullscreen()
      } else if (element.mozCancelFullScreen) {
        element.mozCancelFullScreen()
      } else if (element.webkitCancelFullScreen) {
        element.webkitCancelFullScreen()
      }
    },
    formatCurTime () {
      // clearInterval(this.timer)
      this.curTime = this.formatTime(this.video.currentTime)
      let scale = this.video.currentTime / this.video.duration
      this.changeBarPos(scale)
    },
    formatTime (time) {
      time = parseInt(time)

      let iHour = Math.floor(time / 3600) + ''
      let iMin = Math.floor(time % 3600 / 60) + ''
      let iSec = Math.floor(time % 60) + ''

      return `${this.toDouble(iHour)}:${this.toDouble(iMin)}:${this.toDouble(iSec)}`
    },
    toDouble (str) {
      return ('00' + str).substr(str.length)
    },
    handleDown (ev) {
      ev = ev || window.event
      ev.preventDefault()
      const me = this.$refs.lineHook
      this.drag.downX = ev.clientX - me.offsetLeft
      this.drag.isDrag = true

      document.onmousemove = (ev) => {
        this.handleMove(ev)
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        this.drag.isDrag = false
      }
    },
    handleForward () {},
    handleMove (ev) {
      ev = ev || window.event
      let oCtrl = this.ctrl
      let proBar = this.proBar

      if (this.drag.isDrag) {
        let l = ev.clientX - this.drag.downX

        if (l < 0) {
          l = 0
        } else if (l >= proBar.offsetWidth - oCtrl.offsetWidth) {
          l = proBar.offsetWidth - oCtrl.offsetWidth
        }

        let scale = l / (proBar.offsetWidth - oCtrl.offsetWidth)

        this.changeVideo(scale)

        oCtrl.style.left = l + 'px'
      }
    },
    changeBarPos (scale) {
      this.$refs.barInnerHook.style.width = scale * this.proBar.offsetWidth + 'px'
      this.ctrl.style.left = scale * this.proBar.offsetWidth + 'px'
    },
    changeVideo (scale) {
      this.video.currentTime = this.video.duration * scale
      this.formatCurTime(this.video.currentTime)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  width: 50rem
  &:hover
    .video-bar
      opacity: 1
      transform: translate(-50%, -5px)
  video
    width: 50rem
  .video-bar
    bottom: 0
    left: 50%
    transform: translateX(-50%)
    width: 100%
    height: 2.5rem
    line-height: 2.5rem
    background-color: rgba(0, 0, 0, .5)
    transition: transform .2s ease
    opacity: 0
  .bar-item
    display: inline-block
    padding: 0 5px
    width: 80px
    font-size: 0.875rem
    box-sizing: border-box
    color: #fff
    cursor: pointer
  .volume-bar
    left: 50%
    bottom: 50%
    width: 5px
    height: 100px
    background-color: #999
    border-radius: 25px
    z-index: 10
    .volume-bar-inner
      width: 100%
      height: 100%
      background-color: pink
      border-radius: 25px
  .progress
    left: 70px
    top: 50%
    transform: translateY(-50%)
    width: 400px
    height: 5px
    background-color: #999
    cursor: pointer
    &:hover
      box-shadow: 0 0 4px #fff
    .progress-inner
      width: 0
      height: 100%
      background-color: pink
    .progress-line
      width: 8px
      height: 24px
      left: 0
      top: -10px
      background-color: greenyellow
      cursor: pointer
</style>
