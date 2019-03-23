<template lang="pug">
  #snipper-demo
    .box(:style='styleObj', @dragover='onDragOver', @dragleave='onDragLeave', @drop='onDrop') {{ msg }}
    div(v-if='getUploadImgs')
      p.picnum {{getUploadImgs.length}}/8
      .imgbox(v-if='getUploadImgs')
        .pic(v-for='(item, idx) in getUploadImgs', :key='idx')
          img(:src='item')
          a(href='javascript:;', @click='handleDelete(idx)') x
</template>

<script>
export default {
  name: 'dragUpload',
  data () {
    return {
      msg: '请将文件拖拽到此',
      count: 0,
      imgs: [],
      styleObj: {
        backgroundColor: '#fff'
      }
    }
  },
  computed: {
    getUploadImgs () {
      if (this.imgs.length) {
        return this.imgs
      }
      return null
    }
  },
  methods: {
    handleDelete (index) {
      this.imgs.splice(index, 1)
    },
    onDragOver (ev) {
      ev = ev || event
      ev.preventDefault()
      this.msg = '可以释放了！'
      this.styleObj.backgroundColor = '#f90'
    },
    onDragLeave () {
      this.msg = '请将文件拖拽到此区域'
    },
    onDrop (ev) {
      ev = ev || event
      ev.preventDefault()
      this.styleObj.backgroundColor = '#fff'

      this.msg = '请将文件拖拽到此区域'
      let self = this
      let fin = ev.dataTransfer.files

      // console.log(fin);
      /**
       * lastModified: 1546786777789
          lastModifiedDate: Sun Jan 06 2019 22:59:37 GMT+0800 (China Standard Time) {}
          name: "orange.png"
          size: 245217
          type: "image/png"
          webkitRelativePath: ""
       */

      // console.log("文件类型：", fin[0].type);

      for (let i = 0; i < fin.length; i++) {
        if (fin[i].type.indexOf('image') !== -1) {
          // 创建读取文件对象
          let fr = new FileReader()
          fr.readAsDataURL(fin[i])

          fr.onload = function () {
            self.imgs.push(this.result)
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.snipper-demo
  width: 500px
  margin: 50px auto

.box
  height: 300px
  line-height: 300px
  color: #ccc
  border: 1px solid #f0f0f0
  text-align: center
  box-shadow: 0 0 5px #ccc

.imgbox
  width: 500px
  .pic
    width: 200px
    padding: 2px
    margin-right: 2px
    border: 1px solid #f1f1f1
    position: relative
    float: left
    &:hover
      a
        display: block
        opacity: 1
  img
    width: 100%
    opacity: 0.6
    z-index: 1
    &:hover
      opacity: 1
  a
    width: 30px
    height: 20px
    line-height: 15px
    text-align: center
    display: none
    opacity: 0
    position: absolute
    right: 0
    top: 2px
    color: #fff
    background: rgba(0, 0, 0, 0.4)
    z-index: 2

.picnum
  width: 200px
</style>
