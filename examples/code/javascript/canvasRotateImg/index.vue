<template lang="pug">
  .snippet-wrap
    .top-title
      h2 旋转图片
    #wrap
      a.rtd(href='javascript:;', ref='btnHook', @click='handleChange')
      img(src='../../../assets/images/pic.jpg', alt='', ref='imgHook')
</template>

<script>
export default {
  name: 'canvasRotateImg',
  data () {
    return {
      iNum: 0,
      cvs: null,
      img: null,
      oGc: null
    }
  },
  mounted () {
    this.initImage()
  },
  methods: {
    initImage () {
      this.img = this.$refs.imgHook
      let objimg = new Image()
      objimg.onload = () => {
        this.drawImage(this.img)
      }
      objimg.src = this.img.src
    },
    drawImage (obj) {
      let oC = document.createElement('canvas')
      oC.id = 'myCanvas'
      let oGc = oC.getContext('2d')

      oC.width = obj.width
      oC.height = obj.height
      obj.parentNode.replaceChild(oC, obj)
      oGc.drawImage(obj, 0, 0)
      this.cvs = oC
      this.oGc = oGc
    },
    handleChange () {
      if (this.iNum === 4) {
        this.iNum = 0
      }
      this.iNum++
      this.fnRotate()
    },
    fnRotate () {
      let oC = this.cvs
      let obj = this.img
      let oGc = this.oGc
      switch (this.iNum) {
        case 1:
          oC.width = obj.height
          oC.height = obj.width
          oGc.rotate(90 * Math.PI / 180)
          oGc.drawImage(obj, 0, -obj.height)
          break
        case 2:
          oC.width = obj.width
          oC.height = obj.height
          oGc.rotate(180 * Math.PI / 180)
          oGc.drawImage(obj, -obj.width, -obj.height)
          break
        case 3:
          oC.width = obj.height
          oC.height = obj.width
          oGc.rotate(270 * Math.PI / 180)
          oGc.drawImage(obj, -obj.width, 0)
          break
        case 4:
          oC.width = obj.width
          oC.height = obj.height
          oGc.rotate(0)
          oGc.drawImage(obj, 0, 0)
          break
      }
    }
  }
}
</script>

<style scoped>
#wrap{width: 960px; text-align: center; margin: 20px auto; position: relative; transition: 1s;}
#wrap .rtd{width: 50px; height: 50px; display: inline-block; position: absolute; left: 900px; top: 150px; background: url(../../../assets/images/rtd.png)no-repeat; background-size: cover; z-index: 2;}
#myCanvas{transition: all 1s;}
</style>
