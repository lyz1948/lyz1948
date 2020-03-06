# 设计模式集合

## 单例模式

### 惰性单例

```js
Singleton.getInstance = (function() {
  var instance = null
  return function(name) {
    if(!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
})()
```

### 通用单例

```js
var getSingle = function(fn) {
  var result
  return function() {
    return result || (result = fn.apply(this, arguments))
  }
}
```

## 策略模式

策略模式计算奖金

```js
var strategies = {
  'S': function(salary) {
    return salary * 4
  },
  'B': function(salary) {
    return salary * 3
  },
  'A': function(salary) {
    return salary * 2
  },
}
var calculateBouns = function(level, salary) {
  return strategies[level](salary)
}
calculateBouns('S', 10000)
```

下面这样的写法，你还看得出是策略模式吗？

```js
var S = function(salary) {
  return salary * 4
}
var B = function(salary) {
  return salary * 3
}
var A = function(salary) {
  return salary * 2
}

var calculateBouns = function(func, salary) {
  return func(salary)
}
calculateBouns(S, 10000)
```

### 策略模式表单校验

策略对象

```js
var strategies = {
  isNonEmpty: function(value, errorMsg) {
    if(value === '') {
      return errorMsg
    }
  },
  minLength: function(value, length, errorMsg) {
    if(value.length < length) {
      return errorMsg
    }
  },
  isMobile: function(value, errorMsg) {
    let reg = /^1[3|5|8][0-9]{9}$/
    if(!reg.test(value)) {
      return errorMsg
    }
  }
}
```

Validator 类

```js
var validataFunc = function() {
  // 创建validator对象
  var validator = new Validator()

  // 添加校验规则
  validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空')
  validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位')
  validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确')

  // 获取校验结果
  var errorMsg = validator.start()

  // 返回结果
  return errorMsg
}

var Validator = function() {
  // 保存校验规则
  this.cache = []
}

Validator.prototype.add = function(dom, rule, errorMsg) {
  // 把strategy和参数分开
  var ary = rule.split(':')
  this.cache.push(function() {
    var strategy = ary.shift()
    ary.unshift(dom.value)
    ary.push(errorMsg)
    return strategies[ strategy ].apply(dom, ary)
  })
}

Validator.prototype.start = function() {
  for(var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    var errorMsg = validatorFunc()
    // 如果有错误消息，说明没通过，返回错误信息
    if(errorMsg) {
      return errorMsg
    }
  }
}
```

校验多个值

```js
Validator.prototype.add = function(dom, rules) {
  var self = this

  for(var i = 0, rule; rule = rules[i++];) {
    (function(rule) {
      var strategyAry = rule.strategy.split(':')
      var errorMsg = rule.errorMsg

      self.cache.push(function() {
        var strategy = strategyAry.shift()
        strategyAry.unshift(dom.value)
        strategyAry.push(errorMsg)
        return strategies[strategy].apply(dom, strategyAry)
      })
    })(rule)
  }
}

var registerForm = document.getElementById( 'registerForm' )

var validataFunc = function() {
  var validator = new Validator()

  validator.add(registerForm.userName, [
    { strategy: 'isNonEmpty', errorMsg: '用户名不能为空'},
    { strategy: 'minLength:6', errorMsg: '用户名长度不能小于6位'}
  ])

  validator.add(registerForm.password, [
    { strategy: 'minLength:6', errorMsg: '密码长度不能小于6位'}
  ])

  validator.add(registerForm.phoneNumber, [
    { strategy: 'isMobile', errorMsg: '手机号码格式不正确'}
  ])

  var errorMsg = validator.start()
  return errorMsg
}

registerForm.onsubmit = function() {
  var errorMsg = validataFunc()

  if(errorMsg) {
    return false
  }
}

```

## 代理模式

```js
var Flower = function() {}

var xiaoming = {
  sendFlower: function(target) {
    target.receiveFlower()
  }
}

var B = {
  receiveFlower: function() {
    A.listenGoodMood(function() {
      var flower = new Flower()
      A.receiveFlower(flower)
    })
  }
}

var A = {
  receiveFlower: function(flower) {
    console.log('收到 ' + flower)
  },
  listenGoodMood: function(fn) {
    setTimeout(function() {
      fn()
    }, 5 * 1000)
  }
}

xiaoming.sendFlower( B )
```

虚拟代理实现图片预加载

```js
var myImage = (function() {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)

  return {
    setSrc: function(src) {
      imgNode.src = src
    }
  }
})()

var proxyImage = (function() {
  var img = new Image
  img.onload = function() {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('./images/loading.gif')
      img.src = src
    }
  }
})()

proxyImage.setSrc('http://odbzr9u4f.bkt.clouddn.com/tiger.jpg')
```

虚拟代理合并HTTP请求

```js
var synchronousFile = function(id) {
  console.log('开始同步文件， id为：' + id)
}

var proxySynchronousFile = (function() {
  var cache = []
  var timer

  return function(id) {
    cache.push(id)

    if(timer) {
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
for(var i = 0, c; c = checkbox[i++];) {
  c.onclick = function() {
    if(this.checked === true) {
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
    if(args in cache) {
      return cache[args]
    }
    return cache[args] = mult.apply(this, arguments)
  }
})()
```

高阶函数动态创建代理

```js
var mult = function() {
  var a = 1
  for(var i = 0, l = arguments.length; i < l; i++) {
    a *= arguments[i]
  }
  return a
}

var plus = function() {
  var a = 0
  for(var i = 0, l = arguments.length; i < l; i++) {
    a += arguments[i]
  }
  return a
}

var createProxyFactory = function(fn) {
  var cache = {}
  return function() {
    var args = Array.prototype.join.call(arguments, ',')
    if(args in cache) {
      return cache[args]
    }
    return cache[args] = fn.apply(this, arguments)
  }
}

var proxyMult = createProxyFactory(mult)
var proxyPlus = createProxyFactory(plus)

console.log(proxyMult(1, 2, 3, 4)) // 24
console.log(proxyMult(1, 2, 3, 4)) // 24
console.log(proxyPlus(1, 2, 3, 4)) // 10
console.log(proxyPlus(1, 2, 3, 4)) // 10
```

## 迭代器模式

外部迭代器

```js
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

倒序迭代器

```js
var reveresEach = function(ary, callback) {
  for(var l = ary.length - 1; l >= 0; l--) {
    callback(l, ary[l])
  }
}
```

终止迭代器

```js
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

迭代器例子

```js
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

## 发布-订阅器模式

```js
var salesOffices = {}

salesOffices.clientList = {}

salesOffices.listen = function(key, fn) {
  if(!this.clientList[key]) {
    this.clientList[key] = []
  }
  this.clientList[key].push(fn)
}

salesOffices.trigger = function() {
  var key = Array.prototype.shift.call(arguments)
  var fns = this.clientList[key]

  if(!fns || fns.length === 0) {
    return false
  }

  for(var i = 0, fn; fn = fns[i++];) {
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

### 通用发布订阅模式

```js
var event = {
  clientList: [],
  listen: function(key, fn) {
    if(!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function() {
    var key = Array.prototype.shift.call(arguments)
    var fns = this.clientList[key]

    if(!fns || fns.length === 0) {
      return false
    }

    for(var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  },
  remove: function(key, fn) {
    var fns = this.clientList[key]

    if(!fns) {
      return false
    }

    if(!fn) {
      fns && (fns.length = 0)
    } else {
      for(var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l]
        if(_fn === fn) {
          fns.splice(l, 1)
        }
      }
    }
  }
}

var installEvent = function(obj) {
  for(var i in event) {
    obj[i] = event[i]
  }
}

```

#### 发布订阅模式-网站登录例子

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
    }
  }
})()

var nav = (function() {
  login.listen('loginSucc', function(data) {
    nav.setAvatar(data.avatar)
  })
  return {
    setAvatar: function(data) {
      console.log('设置 nav 模块头像')
    }
  }
})()

var address = (function() {
  login.listen('loginSucc', function(obj) {
    address.refresh(obj)
  })
  return {
    setAvatar: function(addr) {
      console.log('刷新收货地址')
    }
  }
})()
```

### 全局的发布订阅对象

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

## 命令模式

```js
// 设置命令
var setCommand = function(button, command) {
  button.onclick = function() {
    command.execute()
  }
}

// 命令
var MenuBar = {
  refresh: function() {
    console.log('刷新菜单')
  }
}

// 命令接收者
var RefreshMenuBarCommand = function(receiver) {
  this.receiver = receiver
}

RefreshMenuBarCommand.prototype.execute = function() {
  this.receiver.refresh()
}

var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar)

setCommand(button1, refreshMenuBarCommand)
```

### 用闭包实现命令模式

```js
var setCommand = function(button, func) {
  button.onclick = functioin() {
    func()
  }
}

var Menu = {
  refresh: function() {
    console.log('刷新菜单')
  }
}

var RefreshMenuBarCommand = function(receiver) {
  return function() {
    reciever.refresh()
  }
}

var refreshMenuBarCommand = RefreshMenuBarCommand(Menu)

setCommand(button, refreshMenuBarCommand)
```

### 撤销命令

```js
var MoveCommand = function(receiver, pos) {
  this.receiver = receiver
  this.pos = pos
  this.oldPos = null
}

MoveCommand.prototype.execute = function() {
  this.receiver.start('left', this.pos, 1000, 'strongEaseOut')
  this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName]
}

MoveCommand.prototype.undo = function() {
  this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut')
}

var moveCommand
var ball = document.querySelector('#ball')
var pos = document.querySelector('#pos')
var moveBtn = document.querySelector('#moveBtn')
var cancelBtn = document.querySelector('#cancelBtn')

moveBtn.onclick = function() {
  var animate = new Animate(ball)
  moveCommand = new MoveCommand(animate, pos.value)
  moveCommand.execute()
}

cancelBtn.onclick = function() {
  moveCommand.undo()
}
```

### 命令模式-撤销和重做

```js
var Ryu = {
  attack: function() {
    console.log('攻击')
  },
  defense: function() {
    console.log('防御')
  },
  jump: function() {
    console.log('跳跃')
  },
  crouch: function() {
    console.log('蹲下')
  }
}

var makeCommand = function(receiver, state) {
  return function() {
    receiver[state]
  }
}

var commands = {
  "119": "jump",  // W
  "115": "crouch", // S
  "97": "defense", // A
  "100": "attack",  // D
}

var commandStack = []

document.onkeypress = function(ev) {
  var keyCode = ev.keyCode,
      command = makeCommand(Ryu, commands[keyCode])

  if(command) {
    command() // 执行命令
    commandStack.push(command) // 将刚才执行的命令保存到堆栈
  }
}

document.getElementById('replay').onclick = function() {
  var command
  while(command = commandStack.shift()) {
    command()
  }
}
```

## 宏命令

```js
var closeDoorCommand = {
  execute: function() {
    console.log('关门')
  }
}
var openPcCommand = {
  execute: function() {
    console.log('打开电脑')
  }
}
var openQQCommand = {
  execute: function() {
    console.log('登录QQ')
  }
}

var MacroCommand = function() {
  return {
    commandList: [],
    add: function(command) {
      this.commandList.push(command)
    },
    execute: function() {
      for(var i = 0, command; command = this.commandList[i++];) {
        command()
      }
    }
  }
}

var macroCommand = MacroCommand()
macroCommand.add(closeDoorCommand)
macroCommand.add(openPcCommand)
macroCommand.add(openQQCommand)

macroCommand.execute()
```

## 组合模式

```js
var MacroCommand = function()  {
  return {
    commandList: [],
    add: function(command) {
      this.commandList.push(command)
    },
    execute: function() {
      for(var i = 0, command; command = this.commandList[i++];) {
        command.execute()
      }
    }
  }
}

var openAcCommand = {
  execute: function() {
    console.log('打开空调')
  }
}
var openTvCommand = {
  execute: function() {
    console.log('打开电视')
  }
}
var openSoundCommand = {
  execute: function() {
    console.log('打开音响')
  }
}
var macroCommand1 = MacroCommand()
macroCommand1.add(openAcCommand)
macroCommand1.add(openTvCommand)
macroCommand1.add(openSoundCommand)

var openPcCommand = {
  execute: function() {
    console.log('打开电脑')
  }
}

var openQQCommand = {
  execute: function() {
    console.log('打开QQ')
  }
}

var macroCommand2 = MacroCommand()
macroCommand2.add(openPcCommand)
macroCommand2.add(openQQCommand)

// 组合所有命令
var macroCommand = MacroCommand()
macroCommand.add(macroCommand1)
macroCommand.add(macroCommand2)

var setCommand = (function(command) {
  document.querySelector('#button').onclick = function() {
    command.execute()
  }
})(macroCommand)

```

#### 组合模式-扫描文件夹🌰

```js
// folder
var Folder = function(name) {
  this.name = name
  this.files = []
}

Folder.prototype.add = function(file) {
  this.files.push(file)
}

Folder.prototype.scan = function() {
  console.log('开始扫描文件夹：' + this.name)
  for(var i = 0, file, files = this.files; file = files[i++];) {
    file.scan()
  }
}

// file
var File = function(name) {
  this.name = name
}

File.prototype.add = function () {
  throw new Error('文件下面不能添加文件')
}

File.prototype.scan = function() {
  console.log('开始扫描文件：' + this.name)
}

var folder = new Folder('web开发')
var folder1 = new Folder('Javascript')
var folder2 = new Folder('Nodejs')

var file1 = new File('JavaScript设计模式与开发实践')
var file2 = new File('Javascript高级程序设计')
var file3 = new File('重构与模式')
var file4 = new File('深入浅出Nodejs')

folder1.add(file1)
folder1.add(file2)
folder2.add(file4)

folder.add(folder1)
folder.add(folder2)
folder.add(file3)

var file5 = new File('Javascript语音精髓与编程实践')

folder.add(file5)

folder.scan()
```

#### 组合模式-引用父对象

```js
var Folder = function(name) {
  this.name = name
  this.parent = null
  this.files = []
}

Folder.prototype.add = function(file) {
  this.files.push(file)
  file.parent = this
}

Folder.prototype.scan = function() {
  console.log('开始扫描文件夹：' + this.name)
  for(var i = 0, file, files = this.files; file = files[i++];) {
    file.scan()
  }
}

Folder.prototype.remove = function() {
  // 根节点或树外者游离的节点
  if(!this.parent) {
    return
  }
  for(var files = this.parent.files, l = files.length -1; l >= 0; l--) {
    var file = files[l]
    if(file === this) {
      files.splice(l, 1)
    }
  }
}

var folder = new Folder('web开发')
var folder1 = new Folder('Javascript')
var folder2 = new Folder('Nodejs')

var file1 = new File('JavaScript设计模式与开发实践')
var file2 = new File('Javascript高级程序设计')

folder.add(folder1)
folder.add(file1)

folder1.remove()
folder.scan()
```

## 模板方法模式

```js
var Beverage = function(){}

Beverage.prototype.boilWater = function(){
  console.log( '把水煮沸' )
}

Beverage.prototype.brew = function(){
  // 空方法，由子类重写
  throw new Error('子类必须重写 brew 方法')
}

Beverage.prototype.pourInCup = function(){
  // 空方法，由子类重写
  throw new Error('子类必须重写 brew 方法')
}

Beverage.prototype.addCondiments = function(){
  // 空方法，由子类重写
  throw new Error('子类必须重写 brew 方法')
}

Beverage.prototype.customerWantCondiments = function() {
  // 默认需要调料
  return true
}

Beverage.prototype.init = function(){
  this.boilWater()
  this.brew()
  this.pourInCup()
  if(this.customerWantCondiments()) {
    this.addCondiments()
  }
}

// 创建咖啡类
var Coffee = function() {}
Coffee.prototype = new Beverage()

Coffee.prototype.brew = function() {
  console.log('用沸水冲泡咖啡')
}

Coffee.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子')
}

Coffee.prototype.addCondiments = function() {
  console.log('加糖和牛奶')
}

Coffee.prototype.customerWantCondiments = function() {
  window.confirm('请问需要调料吗？')
}

var coffee = new Coffee()
coffee.init()

// 创建茶类

var Tea = function() {}
Tea.prototype = new Beverage()

Tea.prototype.brew = function() {
  console.log('用沸水泡茶')
}

Tea.prototype.pourInCup = function() {
  console.log('把茶水倒进杯子')
}

Tea.prototype.addCondiments = function() {
  console.log('加🍋')
}

var tea = new Tea()
tea.init()

```

真的需要继承吗？

```js

var Beverage = function(param) {

  var boilWater = function() {
    console.log('把水煮沸')
  }

  var brew = param.brew || function() {
    throw new Error('必须传递 brew 方法')
  }

  var pourInCup = param.pourInCup || function() {
    throw new Error('必须传递 pourInCup 方法')
  }

  var addCondiments = param.addCondiments || function() {
    throw new Error('必须传递 addCondiments 方法')
  }

  var F = function() {}

  F.prototype.init = function() {
    boilWater()
    brew()
    pourInCup()
    addCondiments()
  }
  return F
}

var Coffee = Beverage({
  brew: function() {
    console.log('用沸水冲咖啡')
  },
  pourInCup: function() {
    console.log('把咖啡倒杯子')
  },
  addCondiments: function() {
    console.log('加牛奶和糖')
  }
})
var Tea = Beverage({
  brew: function() {
    console.log('用沸水泡茶')
  },
  pourInCup: function() {
    console.log('把茶倒杯子')
  },
  addCondiments: function() {
    console.log('加🍋')
  }
})

var coffee = new Coffee()
coffee.init()

var tea = new Tea()
tea.init()
```

## 享元模式

```js
var Model = function(sex) {
  this.sex = sex
}

Model.prototype.takePhoto = function() {
  console.log('sex= ' + this.sex + 'underwear= ' + this.underwear)
}

var maleModel = new Model('male')
var femaleModel = new Model('female')

for(var i = 1; i <= 50; i++) {
  maleModel.underwear = 'underwear' + i
  maleModel.takePhoto()
}

for(var i = 1; i <= 50; i++) {
  femaleModel.underwear = 'underwear' + i
  femaleModel.takePhoto()
}
```

### 享元模式-上传🌰

```js
var Upload = function(uploadType) {
  this.uploadType = uploadType
}

Upload.prototype.delFile = function(id) {
  uploadManager.setExternalState(id, this)

  if(this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom)
  }

  if(window.confirm('确定要删除该文件吗？' + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom)
  }
}

// 对象实例化工厂
var uploadFactory = (function() {
  var createFlyWeightObjs = {}

  return {
    create: function(uploadType) {
      if(createFlyWeightObjs[uploadType]) {
        return createFlyWeightObjs[uploadType]
      }
      return createFlyWeightObjs[uploadType] = new Upload(uploadType)
    }
  }
})()

// 管理器封装外部状态

var uploadManager = (function() {
  var uploadDatabase = {}

  return {
    add: function(id, uploadType, fileName, fileSize) {
      var flyWeightObj = uploadFactory.create(uploadType)
      var dom = document.createElement('div')
      dom.innerHTML = '<span>文件名称:'+ fileName +', 文件大小: '+ fileSize +'</span>' + '<button class="delFile">删除</button>'

      document.querySelector('.delFile').onclick = function() {
        flyWeightObj.delFile(id)
      }
      document.body.appendChild(dom)

      uploadDatabase[id] = {
        fileName: fileName,
        fileSize: fileSize,
        dom: dom
      }
      return flyWeightObj
    },
    setExternalState: function(id, flyWeightObj) {
      var uploadData = uploadDatabase[id]
      for(var i in uploadData) {
        flyWeightObj[i] = uploadData[i]
      }
    }
  }
})()

var id = 0

window.startUpload = function(uploadType, files) {
  for(var i = 0, file; file = files[i++];) {
    var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize)
  }
}

startUpload('plugin', [
  {
    fileName: 'a.txt',
    fileSize: 2000
  },
  {
    fileName: 'b.txt',
    fileSize: 4000
  },
  {
    fileName: 'c.txt',
    fileSize: 5000
  }
])

startUpload('flash', [
  {
    fileName: 'x.txt',
    fileSize: 2000
  },
  {
    fileName: 'y.txt',
    fileSize: 4000
  },
  {
    fileName: 'z.txt',
    fileSize: 5000
  }
])
```

#### 对象池

```js
var toolTipFactory = (function() {
  var toolTipPool = []

  return {
    create: function() {
      if(toolTipPool.length === 0) {
        var div = document.createElement('div')
        document.body.appendChild(div)
        return div
      } else {
        return toolTipPool.shift()
      }
    },
    recover: function(tooltipDom) {
      // 对象池回收dom
      return toolTipPool.push(tooltipDom)
    }
  }
})()

var ary = []
for(var i = 0, str; str = ['银行', '邮局'][i++];) {
  var toolTip = toolTipFactory.create()
  toolTip.innerHTML = str
  ary.push(toolTip)
}

for(var i = 0, toolTip; toolTip = ary[i++];) {
  toolTipFactory.recover(toolTip)
}
```

#### 通用对象池

```js
var objectPoolFactory = function(createFn) {
  var objectPool = []

  return {
    create: function() {
      var obj = objectPool.length === 0
        ? createFn.apply(this, arguments)
        : objectPool.shift()

      return obj
    },
    recover: function(obj) {
      objectPool.push(obj)
    }
  }
}

var iframeFactory = objectPoolFactory(function() {
  var iframe = document.createElement('iframe')
  document.body.appendChild(iframe)

  iframe.onload = function() {
    iframe.onload = null // 防止重复加载
    iframeFactory.recover(iframe) //  iframe 加载完后回收节点
  }
  return iframe
})

```

## 职责链模式

```js
var order500 = function(orderType, pay, stock) {
  if(orderType === 1 && pay === true) {
    console.log('500元定金预购，优惠100元')
  } else {
    return 'nextSuccessor'
  }
}
var order200 = function(orderType, pay, stock) {
  if(orderType === 2 && pay === true) {
    console.log('200元定金预购，优惠50元')
  } else {
    return 'nextSuccessor'
  }
}
var orderNormal = function(orderType, pay, stock) {
  if(stock > 0) {
    console.log('普通用户购买，无优惠')
  } else {
    console.log('库存不足')
  }
}

var Chain = function(fn) {
  this.fn = fn
  this.successor = null
}

Chain.prototype.setNextSuccessor = function(successor) {
  this.successor = successor
}

Chain.prototype.passRequest = function() {
  var ret = this.fn.apply(this, arguments)

  if(ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
  }
  return ret
}

var chainOrder500 = new Chain(order500)
var chainOrder200 = new Chain(order200)
var chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

chainOrder500.passRequest(1, true, 500)
chainOrder500.passRequest(2, true, 500)
chainOrder500.passRequest(3, true, 500)
chainOrder500.passRequest(1, false, 0)

// 需求改变，新增300元定金购买用户优惠方式
var order300 = function(orderType, pay, stock) {
  if(orderType === 3 && pay === true) {
    console.log('300元定金用户，优惠80')
  } else {
    return 'nextSuccessor'
  }
}

var chainOrder300 = new Chain(order300)
chainOrder500.setNextSuccessor(chainOrder300)
chainOrder300.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)
```

### 异步职责链

```js
Chain.prototype.next = function() {
  return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}

var fn1 = new Chain(function() {
  console.log(1)
  return 'nextSuccessor'
})

var fn2 = new Chain(function() {
  console.log(2)
  var self = this
  setTimeout(function() {
    self.next()
  }, 2000)
})

var fn3 = new Chain(function() {
  console.log(3)
})

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3)
fn1.passRequest()

```

### 用AOP实现职责链

```js
Function.prototype.after = function(fn) {
  var self = this
  return function() {
    var ret = self.apply(this, arguments)
    if(ret === 'nextSuccessor') {
      return fn.apply(this, arguments)
    }
    return ret
  }
}

var order = order500.after(order200).after(orderNormal)

order(1, true, 500)
order(2, true, 500)
order(1, false, 500)
```

## 中介者模式

```js
// 玩家对象
function Player(name, teamColor) {
  this.name = name // 角色名字
  this.teamColor = teamColor // 队伍颜色
  this.state = 'alive' // 玩家生成状态
}

// 赢家
Player.prototype.win = function() {
  console.log(this.name + ' won')
}
// 输家
Player.prototype.lose = function() {
  console.log(this.name + 'lose')
}
// 阵亡
Player.prototype.die = function() {
  this.state = 'dead'
  playerDirector.receiveMessage('playerDead', this)
}
// 移除玩家
Player.prototype.remove = function() {
  playerDirector.receiveMessage('removePlayer', this)
}
// 玩家换队
Player.prototype.changeTeam = function(color) {
  playerDirector.receiveMessage('changeTeam', this, color)
}
// 创建玩家工厂
var playerFactory = function(name, teamColor) {
  var newPlayer = new Player(name, teamColor)
  playerDirector.receiveMessage('addPlayer', newPlayer)
  return newPlayer
}

// 玩家代理
var playerDirector = (function() {
  var player = {}
  var operations = {}

  operations.addPlayer = function(player) {
    var teamColor = player.teamColor
    // 如果该颜色还没有玩家，则新建一个队伍
    players[teamColor] = players[teamColor] || []
    // 添加玩家进队伍
    players[teamColor].push(player)
  }

  operations.removePlayer = function(player) {
    var teamColor = player.teamColor
    var teamPlayers = players[teamColor] || []

    for(var i = teamPlayers.length - 1; i >= 0; i--) {
      if(teamPlayers[i] === player) {
        teamPlayers.splice(i, 1)
      }
    }
  }
  operations.changeTeam = function(player, newTeamColor) {
    // 从原来的队里删除
    operations.removePlayer(player)
    // 改变队伍的颜色
    player.teamColor = newTeamColor
    // 增加到新队伍当中
    operations.addPlayer(player)
  }
  operations.playerDead = function(player) {
    var teamColor = player.teamColor
    var teamPlayers = players[teamColor]

    var all_dead = true

    for(var i = 0, player; player = teamPlayers[i++];) {
      if(player.state !== 'dead') {
        all_dead = false
        break
      }
    }

    if(all_dead === true) {
      for(var i = 0, palyer; player = teamPlayers[i++];) {
        player.lose()
      }

      for(var color in players) {
        if(color !== teamColor) {
          var teamPlayers = players[color]
          for(var i = 0, player; palyer = teamPlayers[i++];) {
            player.win()
          }
        }
      }
    }
  }
  var receiveMessage = function() {
    var message = Array.prototype.shift.call(arguments)
    operations[message].apply(this, arguments)
  }
})()

var player1 = playerFactory('皮蛋', 'red')
var player2 = playerFactory('小丫', 'red')
var player3 = playerFactory('狗蛋', 'red')
var player4 = playerFactory('二娃', 'red')


var player5 = playerFactory('黑妞', 'green')
var player6 = playerFactory('小米', 'green')
var player7 = playerFactory('二狗', 'green')
var player8 = playerFactory('开元', 'green')

player1.die()
player2.die()
player3.die()
player4.die()
```

#### 中介者模式-购买商品🌰

```js
// 手机库存
var goods = {
  'red|32G': 3,
  'red|64G': 5
  'blue|32G': 1
  'blue|64G': 14
}

var mediator = (function() {
  var colorSelect = document.getElementById('colorSelect')
  var memorySelect = document.getElementById('memorySelect')
  var numberInput = document.getElementById('numberInput')
  var colorInfo = document.getElementById('colorInfo')
  var numberInfo = document.getElementById('numberInfo')
  var memoryInfo = document.getElementById('memoryInfo')
  var nextBtn = document.getElementById('nextBtn')

  return {
    changed: function(obj) {
      var color = colorSelect.value,
          memory = memorySelect.value,
          number = numberInput.value,
          stock = goods[color + '|' + memory]

      if(obj === colorSelect) {
        colorInfo.innerHTML = color
      } else if(obj === memorySelect) {
        memoryInfo.innerHTML = memory
      } else if(obj === numberInput) {
        numberInfo.innerHTML = number
      }

      if(!color) {
        nextBtn.disabled = true
        nextBtn.innerHTML = '请选择手机颜色'
        return
      }

      if(!memory) {
        nextBtn.disabled = true
        nextBtn.innerHTML = '请选择内存大小'
        return
      }

      if((number - 0) | 0) !== number - 0) {
        nextBtn.disabled = true
        nextBtn.innerHTML = '请输入正确的购买数量'
        return
      }

      nextBtn.disabled = false
      nextBtn.innerHTML = '加入购物车'
    }
  }
})()

colorSelect.onchange = function() {
  mediator.changed(this)
}

memorySelect.onchange = function() {
  mediator.changed(this)
}

numberInput.oninput = function() {
  mediator.changed(this)
}

```

## 装饰模式

```js
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

```js
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

```js
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

```js
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

```js
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

优化代码，分离 `validator` 和 `formSubmit`

```js
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

## 状态模式

```js
var OffLightState = function(light) {
  this.light = light
}

OffLightState.prototype.buttonWasPressed = function() {
  console.log('弱光')
  this.light.setState(this.light.weakLightState)
}

var WeakLightState = function(light) {
  this.light = light
}

WeakLightState.prototype.buttonWasPressed = function() {
  console.log('强光')
  this.light.setState(this.light.strongLightState)
}

var StrongLightState = function(light) {
  this.light = light
}

StrongLightState.prototype.buttonWasPressed = function() {
  console.log('关灯')
  this.light.setState(this.light.offLightState)
}

var Light = function() {
  this.offLightState = new OffLightState(this)
  this.weakLightState = new WeakLightState(this)
  this.strongLightState = new StrongLightState(this)
  this.button = null
}

Light.prototype.init = function() {
  var button = document.createElement('button'),
      self = this
  this.button = document.body.appendChild(button)
  this.button.innerHTML = '开关'

  this.currentState = this.offLightState

  this.button.onclick = function() {
    self.currentState.buttonWasPressed()
  }
}

Light.prototype.setState = function(newStata) {
  this.currentState = newStata
}

var State = function() {}

State.prototype.buttonWasPressed = function() {
  throw new Error('父类的buttonWasPressed 方法必须重写')
}

var SuperStrongLightState = function(light) {
  this.light = light
}

SuperStrongLightState.prototype = new State()

SuperStrongLightState.prototype.buttonWasPressed = function() {
  console.log('关灯')
  this.light.setState(this.light.offLightState)
}

var light = new Light()
light.init()
```

### 状态模式-文件上传

```js
// 上传对象
window.external.upload = function(state) {
  console.log(state)
}

// 插件
var plugin = (function() {
  var plugin = document.createElement('embed')
  plugin.style.display = 'none'

  plugin.type = 'application/txftn-webkit'

  plugin.sign = function() {
    console.log('开始扫描文件')
  }
  plugin.pause = function() {
    console.log('暂停文件上传')
  }
  plugin.uploading = function() {
    console.log('开始文件上传')
  }
  plugin.del = function() {
    console.log('删除上传文件')
  }
  plugin.done = function() {
    console.log('上传完成')
  }
  document.body.appendChild(plugin)

  return plugin
})()

var Upload = function(fileName) {
  this.plugin = plugin
  this.fileName = fileName
  this.button1 = null
  this.button2 = null
  this.signState = new SignState(this) // 设置初始状态
  this.uploadingState = new UploadingState(this)
  this.pauseState = new PauseState(this)
  this.doneState = new DoneState(this)
  this.errorState = new ErrorState(this)
  this.currentState = this.signState
}

Upload.prototype.init = function() {
  var that = this
  this.dom = document.createElement('div')
  this.dom.innerHTML =
    '<span>文件名称：'+ this.fileName +'</span>\
    <button data-action="button1">扫描中</button>\
    <button data-action="button2">删除</button>'

  document.body.appendChild(this.dom)
  this.button1 = document.querySelector('[data-action="button1"]')
  this.button2 = document.querySelector('[data-action="button2"]')

  this.bindEvent()
}

Upload.prototype.bindEvent = function() {
  var that = this
  this.button1.onclick = function() {
    that.currentState.clickHandler1()
  }
  this.button2.onclick = function() {
    that.currentState.clickHandler2()
  }
}

Upload.prototype.sign = function() {
  this.plugin.sign()
  this.currentState = this.signState
}

Upload.prototype.uploading = function() {
  this.button1.innerHTML = '正在上传，点击暂停'
  this.plugin.uploading()
  this.currentState = this.uploadingState
}

Upload.prototype.pause = function() {
  this.button1.innerHTML = '已暂停，点击继续'
  this.plugin.pause()
  this.currentState = this.pauseState
}

Upload.prototype.done = function() {
  this.button1.innerHTML = '上传完成'
  this.plugin.done()
  this.currentState = this.doneState
}

Upload.prototype.error = function() {
  this.button1.innerHTML = '上传失败'
  this.currentState = this.errorState
}

Upload.prototype.del = function() {
  this.plugin.del()
  this.dom.parentNode.removeChild(this.dom)
}

var StateFactory = (function() {
  var State = function() {}

  State.prototype.clickHandler1 = function() {
    throw new Error('子类必须重写父类的clickHandler1方法')
  }
  State.prototype.clickHandler2 = function() {
    throw new Error('子类必须重写父类的clickHandler2方法')
  }

  return function(param) {
    var F = function(uploadObj) {
      this.uploadObj = uploadObj
    }

    F.prototype = new State()

    for(var i in param) {
      F.prototype[i] = param[i]
    }
    return F
  }
})()

var SignState = StateFactory({
  clickHandler1: function() {
    console.log('扫描中，点击无效')
  },
  clickHandler2: function() {
    console.log('文件正在上传中，不能删除')
  }
})

var UploadingState = StateFactory({
  clickHandler1: function() {
    this.uploadObj.pause()
  },
  clickHandler2: function() {
    console.log('文件正在上传中，不能删除')
  }
})

var PauseState = StateFactory({
  clickHandler1: function() {
    this.uploadObj.uploading()
  },
  clickHandler2: function() {
    this.uploadObj.del()
  }
})

var DoneState = StateFactory({
  clickHandler1: function() {
    console.log('文件已上传完成，点击无效')
  },
  clickHandler2: function() {
    this.uploadObj.del()
  }
})

var ErrorState = StateFactory({
  clickHandler1: function() {
    console.log('文件已上传失败，点击无效')
  },
  clickHandler2: function() {
    this.uploadObj.del()
  }
})
```

模拟上传测试代码

```js
var uploadObj = new Upload('JavaScript设计模式与开发实践')

uploadObj.init()

window.external.upload = function() {
  uploadObj[state]()
}

window.external.upload('sign')

setTimeout(function() {
  window.external.upload('uploading')
}, 1000)

setTimeout(function() {
  window.external.upload('done')
}, 3000)
```

### JavaScript状态机 模式灯泡开关状态🌰

```js
var Light = function() {
  this.currentState = FSM.off // 初始化状态
  this.button = null
}

Light.prototype.init = function() {
  var button = document.createElement('button')
  var self = this
  button.innerHTML = '已关灯'
  this.button = document.body.appendChild(button)

  this.button.onclick = function() {
    self.currentState.buttonWasPressed.call(self)
  }
}

var FSM = {
  off: {
    buttonWasPressed: function() {
      console.log('关灯')
      this.button.innerHTML = '下一次点击开灯'
      this.currentState = FSM.on
    }
  },
  on: {
    buttonWasPressed: function() {
      console.log('开灯')
      this.button.innerHTML = '下一次点击关灯'
      this.currentState = FSM.off
    }
  }
}

var light = new Light()
light.init()
```

```js
var delegate = function(client, delegation) {
  return {
    buttonWasPressed: function() {
      return delegation.buttonWasPressed.apply(client, arguments)
    }
  }
}

var FSM = {
  off: {
    buttonWasPressed: function() {
      console.log('关灯')
      this.button.innerHTML = '下一次按我是开灯'
      this.currentState = this.onState
    }
  },
  on: {
    buttonWasPressed: function() {
      console.log('开灯')
      this.button.innerHTML = '下一次按我是关灯'
      this.currentState = this.offState
    }
  }
}

var Light = function() {
  this.offState = delegate(this, FSM.off)
  this.onState = delegate(this, FSM.on)
  this.currentState = this.offState
  this.button = null
}

Light.prototype.init = function() {
  var button = document.createElement('button')
  var self = this
  button.innerHTML = '已关灯'
  this.button = document.body.appendChild(button)
  this.button.onclick = function() {
    self.currentState.buttonWasPressed()
  }
}

var light = new Light()
light.init()
```

## 适配器模式

```js
var googleMap = {
  show: function() {
    console.log('开始渲染谷歌地图')
  }
}

var baiduMap = {
  show: function() {
    console.log('开始渲染百度地图')
  }
}

var renderMap = function(map) {
  if(map.show instanceOf Function) {
    map.show()
  }
}

renderMap(googleMap)
renderMap(baiduMap)
```

程序正常执行，如果第三方接口并是不是我们控制之内，如果百度地图没有`show`方法呢?
下面我们通过适配器模式来解决

```js
var googleMap = {
  show: function() {
    console.log('开始渲染谷歌地图')
  }
}

var baiduMap = {
  display: function() {
    console.log('开始渲染百度地图')
  }
}

var baiduMapAdapter = {
  show: function() {
    return baiduMap.display()
  }
}

renderMap(googleMap)
renderMap(baiduMap)
```
