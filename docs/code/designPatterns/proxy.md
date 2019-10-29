# 代理模式

```js
var Flower = function() {}

var xiaoming = {
  sendFlower: function(target) {
    target.receiveFlower()
  },
}

var B = {
  receiveFlower: function() {
    A.listenGoodMood(function() {
      var flower = new Flower()
      A.receiveFlower(flower)
    })
  },
}

var A = {
  receiveFlower: function(flower) {
    console.log('收到 ' + flower)
  },
  listenGoodMood: function(fn) {
    setTimeout(function() {
      fn()
    }, 5 * 1000)
  },
}

xiaoming.sendFlower(B)
```

虚拟代理实现图片预加载

```js
var myImage = (function() {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)

  return {
    setSrc: function(src) {
      imgNode.src = src
    },
  }
})()

var proxyImage = (function() {
  var img = new Image()
  img.onload = function() {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('./images/loading.gif')
      img.src = src
    },
  }
})()

proxyImage.setSrc('http://odbzr9u4f.bkt.clouddn.com/tiger.jpg')
```

虚拟代理合并 HTTP 请求

```js
var synchronousFile = function(id) {
  console.log('开始同步文件， id为：' + id)
}

var proxySynchronousFile = (function() {
  var cache = []
  var timer

  return function(id) {
    cache.push(id)

    if (timer) {
      return
    }

    timer = setTimeout(function() {
      synchronousFile(cache.join(','))
      clearTimeout(timer)
      timer = null
      cache.length = 0
    }, 2000)
  }
})()

var checkbox = document.getElementByTagName('input')
for (var i = 0, c; (c = checkbox[i++]); ) {
  c.onclick = function() {
    if (this.checked === true) {
      proxySynchronousFile(this.id)
    }
  }
}
```

缓存代理-计算乘积

```js
var proxyMult = (function() {
  var cache = {}
  return function() {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return (cache[args] = mult.apply(this, arguments))
  }
})()
```

高阶函数动态创建代理

```js
var mult = function() {
  var a = 1
  for (var i = 0, l = arguments.length; i < l; i++) {
    a *= arguments[i]
  }
  return a
}

var plus = function() {
  var a = 0
  for (var i = 0, l = arguments.length; i < l; i++) {
    a += arguments[i]
  }
  return a
}

var createProxyFactory = function(fn) {
  var cache = {}
  return function() {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return (cache[args] = fn.apply(this, arguments))
  }
}

var proxyMult = createProxyFactory(mult)
var proxyPlus = createProxyFactory(plus)

console.log(proxyMult(1, 2, 3, 4)) // 24
console.log(proxyMult(1, 2, 3, 4)) // 24
console.log(proxyPlus(1, 2, 3, 4)) // 10
console.log(proxyPlus(1, 2, 3, 4)) // 10
```
