// 防抖
function debounce(fn, wait, immediate) {
  var timer, result
  return function() {
    var ctx = this
    var args = arguments
    if (timer) clearTimeout(timer)
    if (immediate) {
        var callnow = !timer
        timer = setTimeout(function() {
          timer = null
        }, wait)
        if (callnow) {
          result = fn.apply(ctx, args)
        }
    } else {
      timer = setTimeout(function() {
        fn.apply(ctx, args)
      }, wait)
    }
    return result
  }
}

function debounce(fn, wait, immediate) {
  var timer, result

  var debounced = function() {
    var ctx = this
    var args = arguments

    if (timer) clearTimeout(timer)
    if (immediate) {
      var callnow = !timer
      timer = setTimeout(function() {
        tiimer = null
      }, wait)
      if (callnow) result = fn.apply(ctx, args)
    } else {
      timer = setTimeout(function() {
        fn.apply(ctx, args)
      }, wait)
    }
    return result
  }
  debounced.cancel = function() {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}

// 动画防抖
function debounce(fn) {
  var t
  return function() {
    cancelAnimationFrame(t)
    t = requestAnimationFrame(fn)
  }
}

// 表单验证
function setResult(tag, content, color) {
  if (tag && typeof tag == 'object') {
    tag.innerHTML = content;
    tag.style.color = color;
  }
}

var validateEmail = function(e) {
  // 邮箱正则
  var reg = /^[a-z0-9]+(\w|_)+@+([a-z0-9]){2,4}.[a-z]{2,4}$/;
  var currentValue = e.target.value;
  var resultTag = document.getElementById('resultEmail'),
    content = reg.test(currentValue) ? '邮箱正确' : '请输入正确的邮箱',
    color = reg.test(currentValue) ? 'green' : 'red';
  setResult(resultTag, content, color);
}

var validateMobile = function(e) {
  // 手机号正则
  var reg = /^1(3|4|5|7|8){1}[0-9]{9}$/
  var currentValue = e.target.value;
  var resultTag = document.getElementById('resultMobile'),
    content = reg.test(currentValue) ? '手机号正确' : '请输入正确的手机号',
    color = reg.test(currentValue) ? 'green' : 'red';
  setResult(resultTag, content, color);
}

// 防抖
function debounce(func, wait) {
  var timeOut;

  return function() {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    // 保存this上下文，参数
    var that = this,
      args = arguments;
    timeOut = setTimeout(function() {
      func.apply(that, args);
    }, wait)
  }
}

document.getElementById('emailIpt').onkeyup = debounce(validateEmail, 1000);
document.getElementById('mobileIpt').onkeyup = debounce(validateMobile, 1000);