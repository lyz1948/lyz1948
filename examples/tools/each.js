// each
// 第一版
function each(obj, cb) {
  var len, i = 0
  if(isArrayLike(obj)) {
    len = obj.length
    for( ; i < len; i++) {
      cb(i, obj[i])
    }
  }
  else {
    for( i in obj ) {
      cb(i, obj[i])
    } 
  }
  return obj 
}

// 第二版
function each(obj, cb) {
  var len, i = 0
  if(isArrayLike(obj)) {
    len = obj.length 
    for( ; i < len; i++) {
      if(cb(i, obj[i]) == false) {
        break
      }
    }
  }
  else {
    for( i in obj) {
      if(cb(i, obj[i]) === false) {
        break
      }
    }
  }
  return obj
}

