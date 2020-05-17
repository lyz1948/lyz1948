# 发布-订阅器模式

```js
var salesOffices = {}

salesOffices.clientList = {}

salesOffices.listen = function(key, fn) {
  if (!this.clientList[key]) {
    this.clientList[key] = []
  }
  this.clientList[key].push(fn)
}

salesOffices.trigger = function() {
  var key = Array.prototype.shift.call(arguments)
  var fns = this.clientList[key]

  if (!fns || fns.length === 0) {
    return false
  }

  for (var i = 0, fn; (fn = fns[i++]); ) {
    fn.apply(this, arguments)
  }
}

salesOffices.listen('suqareMeter88', function(price) {
  console.log('价格= ' + price)
})
salesOffices.listen('suqareMeter120', function(price) {
  console.log('价格= ' + price)
})

salesOffices.trigger('suqareMeter88', 30000)
salesOffices.trigger('suqareMeter120', 40000)
```

## 通用发布订阅模式

```js
var event = {
  clientList: [],
  listen: function(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function() {
    var key = Array.prototype.shift.call(arguments)
    var fns = this.clientList[key]

    if (!fns || fns.length === 0) {
      return false
    }

    for (var i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments)
    }
  },
  remove: function(key, fn) {
    var fns = this.clientList[key]

    if (!fns) {
      return false
    }

    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l]
        if (_fn === fn) {
          fns.splice(l, 1)
        }
      }
    }
  },
}

var installEvent = function(obj) {
  for (var i in event) {
    obj[i] = event[i]
  }
}
```

## 发布订阅模式-网站登录例子

```js
$.ajax('http://xxx.abc.com?login', function(data) {
  login.trigger('loginSucc', data)
})

var header = (function() {
  login.listen('loginSucc', function(data) {
    header.setAvatar(data.avatar)
  })
  return {
    setAvatar: function(data) {
      console.log('设置 header 模块头像')
    },
  }
})()

var nav = (function() {
  login.listen('loginSucc', function(data) {
    nav.setAvatar(data.avatar)
  })
  return {
    setAvatar: function(data) {
      console.log('设置 nav 模块头像')
    },
  }
})()

var address = (function() {
  login.listen('loginSucc', function(obj) {
    address.refresh(obj)
  })
  return {
    setAvatar: function(addr) {
      console.log('刷新收货地址')
    },
  }
})()
```

## 全局的发布订阅对象

```js
var Event = (function() {
  var clientList = {},
      listen,
      trigger,
      remove;

  listen = function(key, fn) {
    if(!clientList[key]) {
      clientList[key] = []
    }
    clientList[key].push(fn)
  }

  trigger = function() {
    var key = Array.prototype.shift.call(arguments)
    var fns = clientList[key]
    if(!fns || fns.length === 0) {
      return false
    }
    for(var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  }

  remove = function(key, fn) {

    var fns = clientList[key]
    if(!fns) {
      return false
    }

    if(!fn) {
      fns && fns.length = 0
    } else {
      for(var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l]
        if(_fn === fn) {
          fns.splice(l, 1)
        }
      }
    }
  }

  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  }
})()
```
