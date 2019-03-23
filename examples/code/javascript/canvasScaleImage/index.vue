<template lang="pug">
  .snippet-wrap
    .top-title
      h2 滚轮缩放图片大小
    #canvas
</template>

<script>
export default {
  name: 'canvasScaleImage',
  methods: {
    // init() {
    //   var canvas = document.getElementById("canvas")
    //   var ctx = canvas.getContext("2d")
    //   var imgScale = 1
    //   var minScale = 0.9
    //   var maxScale = 1.2
    //   var img;
    //   var imgX = 0
    //   var imgY = 0

    //   img = new Image()
    //   img.id = "pic"
    //   img.onload = function () {
    //     this.loadImage()
    //     this.drawImage()
    //   }
    //   img.src = '../../images/image.jpg'
    //   canvas.width = document.documentElement.clientWidth
    //   canvas.height = document.documentElement.clientHeight
    // },
    // handleClick(event) {
    //   var pos = this.windowToCanvas(canvas, event.clientX, event.clientY)
    // },
    // handleWheel(event) {
    //   event.wheelDelta = event.wheelDelta ? event.wheelDelta :
    //       (event.deltaY * (-40));

    //     if (event.wheelDelta > 0) {
    //       if (imgScale < 2) {
    //         imgScale *= maxScale;
    //         imgX = (canvas.width - img.width * imgScale) / 2
    //         imgY = (canvas.height - img.height * imgScale) / 2
    //       }
    //     } else {
    //       if (imgScale > 1) {
    //         imgScale *= minScale;
    //         imgX = (canvas.width - img.width * imgScale) / 2
    //         imgY = (canvas.height - img.height * imgScale) / 2
    //       }
    //     }

    //     this.drawImage();
    //     return false;
    // },
    // loadImage() {
    //       if (img.width <= canvas.width && img.height <= canvas.height) {
    //         imgX = (canvas.width - img.width * imgScale) / 2
    //         imgY = (canvas.height - img.height * imgScale) / 2;

    //       } else {
    //         let ratio = img.width / img.height;
    //         let widthTime = img.width / canvas.width;
    //         let heightTime = img.height / canvas.height;

    //         if (widthTime > heightTime) {
    //           img.width = canvas.width;

    //           img.height = canvas.width / ratio;
    //         } else {
    //           img.height = canvas.height;
    //           img.width = canvas.height * ratio;
    //         }

    //         imgX = (canvas.width - img.width * imgScale) / 2
    //         imgY = (canvas.height - img.height * imgScale) / 2
    //       }
    //     },
    //     drawImage() {
    //       ctx.clearRect(0, 0, canvas.width, canvas.height)
    //       ctx.drawImage(
    //         img,
    //         imgX,
    //         imgY,
    //         img.width * imgScale,
    //         img.height * imgScale
    //       )
    //     },
    //     // windowToCanvas此方法用于鼠标所在点的坐标切换到画布上的坐标
    //     windowToCanvas(canvas, x, y) {
    //       var bbox = canvas.getBoundingClientRect();
    //       return {
    //         x: x - bbox.left - (bbox.width - canvas.width) / 2,
    //         y: y - bbox.top - (bbox.height - canvas.height) / 2
    //       };
    //     }
  }
}
</script>

<style scoped>
#canvasBox {
  width: 100%;
  height: 100%;
}
</style>
