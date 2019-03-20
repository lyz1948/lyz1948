// 01 demo
var obj = document.querySelector('#rect')

var x = 0
var v = 10
var target = 500

var moveTo = function(obj) {
  const render = () => {
    if(x < target) {
      x += v
    }
    if(x > target - obj.clientWidth) { // 物体碰到右壁
      v = -v    // 弹回
      x = target - obj.clientWidth // 重新设定目标
    }
    if(x < 0) {
      v = -v
      x = 0
    }
    obj.style.left = x + 'px'
    timer = requestAnimationFrame(render)
  }
  cancelAnimationFrame(timer)
  var timer = requestAnimationFrame(render)
  return x
}

moveTo(obj)

