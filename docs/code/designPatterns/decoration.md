# 装饰模式

```bash
var plane = {
  file: function() {
    console.log('发射普通子弹')
  }
}

var missileDecorator = function() {
  console.log('发射导弹')
}

var atomDecorator = function() {
  console.log('发射原子弹')
}

var fire1 = plane.fire

plane.fire = function() {
  fire1()
  missileDecorator()
}

var fire2 = plane.fire

plane.fire = function() {
  fire2()
  atomDecorator()
}

plane.fire()
```

### 用AOP装饰函数
```bash
Function.prototype.before = function(beforefn) {
  var _self = this  // 保存原函数的引用
  return function() { // 返回包含了原函数和新函数的‘代理’函数 也会原封不动地传入原函数，新函数在原函数执行之前，执行原函数并返回函数的执行结果， 并保证this不被劫持
    beforefn.apply(this, arguments)
    return _slef.apply(this, arguments)
  }
}

Function.prototype.after = function(afterfn) {
  var _self = this
  return function() {
    var ret = _self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}

var before = function(fn, beforefn) {
  return function() {
    beforefn.apply(this, arguments)
    return fn.apply(this, arguments)
  }
}

var a = before(
  function() {console.log(3)},
  function() {console.log(2)}
)

a = before(a, function() {
  console.log(1)
})

a() // 1, 2, 3
```

### AOP应用实例

```bash
Function.prototype.after = function(afterfn) {
  var self = this
  reutrn function() {
    var ret = self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}
var showLogin = function() {
  console.log('打开登录浮层')
}

var log = function() {
  console.log('上报标签为：' + this.getAttribute('tag'))
}

showLogin = showLogin.after(log)

document.querySelector('#button').onclick = showLogin
```

### 用AOP动态改变函数的参数

```bash
Function.prototype.before = function(beforefn) {
  var self = this
  return function() {
    beforefn.apply(this, arguments)
    return self.apply(this, arguments)
  }
}

var func = function(param) {
  console.log(param)
}

func = func.before(function(param) {
  param.b = b
})

func({a: a})

var ajax = function(type, url, param) {
  console.log(param)
}

var getToken = function() {
  return 'Token'
}

ajax = ajax.before(function(type, url, param) {
  param.Token = getToken()
})

```

### 插件形式表单验证

```bash
var validator = function() {
  if(username.value === '') {
    console.log('用户名不能为空')
    return
  }

  if(password === '') {
    console.log('密码不能为空')
    return
  }
}

var formSubmit = function() {
  if(validator() === false) {
    return
  }
  var param = {
    username: username.value,
    password: password.value
  }
  ajax('http://xxxx.abc.com/login', param)
}

submintBtn.onclick = function() {
  formSubmit()
}
```

### 优化代码，分离 `validator` 和 `formSubmit`

```bash
Function.prototype.before = function(beforefn) {
  var self = this
  return function() {
    if(beforefn.apply(this, arguments) === false) {
      return
    }
    return self.apply(this, arguments)
  }
}

var validator = function() {
  if(username.value === '') {
    console.log('用户名不能为空')
    return
  }

  if(password === '') {
    console.log('密码不能为空')
    return
  }
}

var formSubmit = function() {
  var param = {
    username: username.value,
    password: password.value
  }

  ajax('http://abc.com/login', param)
}

formSubmit = formSubmit.before(validator)

submintBtn.onclick = function() {
  formSubmit()
}
```
