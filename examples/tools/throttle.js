
function throttle(fn, wait) {
 var args = arguments, previous = 0
 return function() {
   var now = + new Date()

   if(now - previous > wait) {
     fn.apply(this, args)
     previous = now
   }
 }
}

function throttle(fn, wait) {
  var args = arguments, timer, previous = 0
  
  return function() {
    if(!timer) {
      timer = setTimeout(function() {
        timer = null 
        fn.apply(this, args)
      }, wait)
    }
  }
}

function throttle(fn, wait) {
  var ctx, timer, result, args = arguments, previous = 0
  
  var later = function(){
    previous = +new Date()
    timer = null
    fn.apply(ctx, args)
  }

  var throttled = function() {
    var now = +new Date() 
    var remaining = wait - (now -previous)
    ctx = this
    
    if(remaining <= 0 || remaining > wait) {
      if(timer) {
        clearTimeout(timer)
        timer = null
      }
      previous = now
      fn.apply(ctx, args)
    }
    else if(!timer) {
      timer = setTimeout(later, remaining)
    }
  }
  return throttled
}

function throttle(fn, wait, options) {
  var timer, ctx, args = arguments, result, previous = 0
  if(!options) options = {}

  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime()
    timer = null
    fn.apply(ctx, args)
    if(!timer) ctx = args = null
  }

  var throttled = function() {
    var now = new Date().getTime()
    if(!previous && options.leading === false) previous = now

    var remaining = wait - (now - previous) 
    context = this
    args = arguments
    if(remaining <= 0 || remaining > wait) {
      if(timer) {
        clearTimeout(timer)
        timer = null
      }
      previous = now
      fn.apply(ctx, args)
      if(!timer) ctx = args = null
    }
    else if(!timer && options.trailing !== false){
      timer = setTimeout(later, remaining)
    }
  }
  return throttled
}