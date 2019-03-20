# 迭代器模式

### 外部迭代器
```bash
var Iterator = function(obj) {
  var current = 0

  var next = function() {
    current += 1
  }

  var isDone = function() {
    return current >= obj.length
  }

  var getCurrItem = function() {
    return obj[current]
  }

  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem
  }
}
```

### 倒序迭代器
```bash
var reveresEach = function(ary, callback) {
  for(var l = ary.length - 1; l >= 0; l--) {
    callback(l, ary[l])
  }
}
```

### 终止迭代器
```bash
var each = function(ary, callback) {
  for(var i = 0, l = ary.length; i < l; i++) {
    if(callback(i, ary[i] === false)) {
      break
    }
  }
}

each([1, 2, 3, 4], function(i, n) {
  if(n > 2) {
    return false
  }
  console.log(n)
})

```
### 迭代器例子
```bash
var getActiveUploadObj = function() {
  try{
    return new ActiveXObject('TXFTActiveX.FTNUpload')
  } catch(e) {
    return false
  }
}

var getFlashUploadObj = function() {
  if(supportFlash()) {
    var str = '<object type="application/x-shockwave-flash"></object>'
    return $(str).appenTo($('body'))
  }
  return false
}

var getFormUploadObj = function() {
  var str = '<input name="file" type="file" class="ui-file"/>'
  return $(str).appenTo($('body'))
}

var iteratorUploadObj = function() {
  for(var i = 0, fn; fn = arguments[i++];) {
    var uploadObj = fn()
    if(uploadObj !== false) {
      return uploadObj
    }
  }
}

var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUploadObj)
```
