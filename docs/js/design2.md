# JavaScript 设计模式

全局变量

```bash
// 不要使用这样的方式赋值，当你这样赋值的时候，b就变成了全局变量
function foo() {
  var a = b = 0
}
```

for循环中缓存 数组（或容器）的长度，会大大提高速度，其中在safari3中提高2倍以上，IE7中提高170倍

```bash
for(var i = 0, len = ary.length; i < len; i++) {

}
```

将变量放到循环外面

```bash
function looper() {
  var i = 0,
      len = ary.length

  for(i = 0, i < len; i++) {
    //
  }
}
```

使用`i++` 替代以下两种表达式

```bash
i = i + 1
i += 1
```

for-in 循环

```bash
var man = {
  hands: 2,
  legs: 2,
  heads: 1
}

for(var i in man) {
  if(man.hasOwnProperty(i)) {
    console.log(i + ': ' + man[i])
  }
}

var i,
  hasOwn = Object.prototype.hasOwnProperty
  for(i in man) {
    if(hasOwn.call(man, i)) {
      console.log(i + ': ' + man[i])
    }
  }
```

不要增加内置的原型，如果非要添加，可以采用下面的方式增加判断

```bash
if(typeof Object.prototype.myMethod !== 'function') {
  Object.prototype.myMethod = function() {
    // doSomeThing
  }
}
```

避免使用隐式转换,为了避免隐式类型转换导致的混淆不清，使用`===`和 `!==`来比较

```bash
var zero = 0
if(zero === false) {
  // zero 是 0， 而不是false， 不会执行到这里
}

if(zero == 0) {
  // 代码会走这里来
}
```

编写API文档

```bash
/**
 * 翻转一个字符串
 * @param  {string} 输入需要翻转的字符串
 * @return {string} 翻转后的字符串
 */
var reverse = function(str) {
  return str
}
```

命名空间

```bash
var MYAPP = {}

MYAPP.math_stuff = {
  /**
   * 加法
   * @param  {Number} 第一个数
   * @param  {Number} 第二个数
   * @return {Number} 两个输入的总和
   */
  sun: function(a, b) {
    return a + b
  },
  /**
   * 乘法
   * @param  {Number} 第一个数字
   * @param  {Number} 第二个数字
   * @return {Number} 两个数字相乘的结果
   */
  multi: function(a, b) {
    return a * b
  }
}

MYAPP.Person = function(first, last) {
  /**
   * 人的姓
   * @type {String}
   */
  this.firstName = first
  /**
   * 人的名
   * @type {String}
   */
  this.lastName = last
}

/**
 * @method getName
 * @return {String} 人的姓名
 */
MYAPP.Person.prototype.getName = function() {
  return this.firstName + ' ' + this.lastName
}

```

### 字面量和构造函数

```bash
if(typeof Array.isArray === 'undefined') {
  Array.isArray = function(args) {
    return Object.prototype.toString.call(args) === '[object Array]'
  }
}
```

错误对象

```bash
try {
  throw {
    name: 'MyErrorType', // 自定义错误类型
    message: 'oops',
    extra: 'This was rather embrrassing',
    remedy: errorHandler // 指定应该处理该错误的函数
  } catch(e) {
    console.log(e.message)
    e.remedy() // 调用函数errorHandler
  }
}
```

回调函数

```bash
var findNodes = function() {
  var i = 100000,  // 大而繁重的循环
      nodes = [], // 存储结果
      fonud; // 找到下一个节点
  while(i) {
    i--
    nodes.push(found)
  }
  return nodes
}

var hide = function(nodes) {
  var i = 0,
    max = nodes.length;
    for(; i < max; i++) {
      nodes[i].style.display = 'none'
    }
}

hide(findNodes())
```

以上的代码实现是低效的，因为hide() 必须再次循环遍历由findNodes()返回的数组节点，如果能避免这种循环，并且只要在findeNodes()中选择变可实现隐藏逻辑，由于检索和修改逻辑耦合，那么它不再是一个通用函数。对于这种问题解决的方法是采用回调函数。

```bash
// 重构findNodes() 接受一个回调函数作为参数
var findNodes = function(callback) {
  var i = 100000,
      nodes = [],
      found;

  // 检查回调函数
  if(typeof callback !== 'function') {
    callback = false
  }

  while(i) {
    i--

    // 运行回调
    if(callback) {
      callback(found)
    }

    nodes.push(found)
  }
  return nodes
}

var hide = function(node) {
  node.style.display = 'none'
}

// 找到指定节点，将其隐藏
findNodes(hide)

// 传递一个匿名函数
findNodes(function(node) {
  node.style.display = 'none'
})
```

回调与作用域

```bash
var myapp = {
  color: 'green',
  paint: function(node) {
    node.style.color = this.color
  }
}

var findNodes = function(callback) {
  // ...
  if(typeof callback === 'function') {
    callback(found)
  }
  // ...
}

findNodes(myapp.paint)
```

上面的代码将会报错，this.color没有被定义，由于findNodes() 是一个全局函数，因此，对象this指向全局对象

解决方案，将对象传递进去， 结合call()或者apply()来修改this指向

```bash
findNodes(myapp.paint, myapp)

var findNodes = function(callback, cbObj) {
  // ...
  if(typeof callback === 'function') {
    callback.call(cbObj, found)
  }
  // ...
}
```

传递一个对象和一个方法以用做回调函数的另外一种选择是，将其中的方法作为字符串来传递，无需重复输入该对象名称

```bash
findNodes('paint', myapp)

var findNodes = function(callback, cbObj) {
  if(typeof callback === 'string') {
    callback = cbObj[callback]
  }
  if(typeof callback === 'function') {
    callback.call(cbObj, found)
  }
}
```

返回函数

```bash
var setup = function() {
  alert('1')
  return function() {
    alert('2')
  }
}

var my = setup() // alerts 1
my() // alerts 2

var setup = function() {
  var count = 0

  return function() {
    return (count++)
  }
}

var next = setup()
next() // 1
next() // 2
next() // 3
```

自定义函数

```bash
var scareMe = function() {
  console.log('1')
  scareMe = function() {
    console.log('double 1')
  }
}

scareMe() // 1
scareMe() // double 1

```

及时函数

```bash
(function() {
  console.log('hahah')
}())

(function() {
  console.log('xixi')
})()
```

及时函数参数传递

```bash
(function(who, when) {
  console.log('I met ' + who + 'on ' + when)
})('Joe Black, new Date()')

(function(global) {
  console.log(global)
})(this)
```

及时函数返回值

```bash
var res = (function(a, b) {
  return a + b
}())

// 另一种写法
var res = function(a, b) {
  return a + b
}()

// 另一种写法
var res = (function(a, b) {
  return a + b
})()

var getResult = (function() {
  var res = 2 + 3
  return function() {
    return res
  }
}())

```

使用及时函数定义对象

```bash
var obj = {
  message: (function() {
    var who = 'me',
    var what = 'call'
    return what + ' ' + who
  }()),
  getMsg: function() {
    return this.message
  }
}

obj.getMsg() // call me
obj.message  // call me
```

及时对象初始化

```bash
({
  // 定义初始设定值
  // 又名配置常数
  maxWidth: 600,
  maxHeight: 450,
  // 还可以定义一些使用的方法
  gimmeMac: function() {
    return this.maxWidth + ' * ' this.maxHeight
  },
  init: function() {
    console.log(this.gimmeMac())
    // 更多初始化任务
  }
}).init()

// 这2种方式都可以
({...}).init()
({...}.init())
```

> 这种模式主要适用于一次性任务，而且在init()完毕后也没有对该对象的访问。如果想在init()完毕后保存该对象的一个引用，可以通过init()尾部添加`return this`语句实现该功能

初始化分支

```bash
// 之前

var utils = {
  addListener: function(el, type, fn) {
    if(typeof window.addEventListener === 'function') {
      el.addEventListener(type, fn, false)
    }
    else if(typeof doucment.attachEvent === 'function') {
      el.attachEvent('on' + type, fn)
    } else {
      el['on' + type] = fn
    }
  },
  removeListener: function(el, type, fn) {

  }
}

// 优化之后
var utils = {
  addListener: null,
  removeListener: null
}

if(typeof window.addEventListener === 'function') {
  utils.addListener = function(el, type, fn) {
    el.addEventListener(type, fn, false)
  }
  utils.removeListener = function(el, type, fn) {
    el.removeEventListener(type, fn, false)
  }
} else if(typeof doucment.attachEvent === 'function') {
  utils.addListener = function(el, type, fn) {
    el.attachEvent('on' + type, fn)
  }
  utils.removeListener = function(el, type, fn) {
    el.detachEvent('on' + type, fn)
  }
} else {
  utils.addListener = function(el, type, fn) {
    el['on' + type] = fn
  }
  utils.removeListener = function(el, type, fn) {
    el['on' + type] = null
  }
}
```

函数属性--备忘模式

```bash
function foo(a, b, c) {}
console.log(foo.length) // 3

var myFunc = function(param) {
  if(!myFunc.cache[param]) {
    myFunc.cache[param] = {}
  }
  return myFunc.cache[param]
}
myFunc.cache = {}


var myFunc = function() {
  var cacheKey = JSON.stringify(Array.prototype.shift.call(arguments))

  if(!myFunc.cache[cacheKey]) {
    myFunc.cache[cacheKey] = {}
  }

  return myFunc.cache[cacheKey]
}
myFunc.cache = {}
```

配置对象

```bash
function addPerson(first, last) {}

// 后来需求改变，需要添加工作，性别，地址等信息
function addPerson(first, last, job, gender, addr) {}

// 参数传递太多不太方便，用配置对象的方式传递参数

addPerson(conf)

var conf = {
  first: 'batman',
  last: 'Wayne',
  ...
}
```

配置对象的优点：

- 不需要记住众多的参数以及顺序
- 可以安全忽略可选参数
- 更易于添加和删除参数

配置对象的缺点：

- 需要记住参数名称
-属性名称无法被压缩

#### Curry
函数应用

```bash
var sayHi = function(who) {
  return 'Hello ' + who + '!'
}

sayHi() // 'Hello !'
sayHi('World') // 'Hello World!'
sayHi.appli(null, ['Hello']) // 'Hello Hello!'
```

当函数是对象的方法时候，此时不能传递`null`引用，在这种情况下，这里的对象将成为`apply()`的第一个参数

```bash
var alien = {
  sayHi: function(who) {
    return 'Hello ' + who + '!'
  }
}

alien.sayHi('me') // 'Hello me'
sayHi.apply(alien, ['abcd']) // 'Hello abcd'
sayHi.call(alien, 'abcd') // 'Hello abcd'
```

curry化的add()函数
// 接受部分参数列表

```bash
function add(x, y) {
  var oldX = x, oldY = y
  // 如果只传了一个数，就在返回一个函数
  if(typeof oldY == 'undefined') {
    return function(newY) {
      return oldX + newY
    }
  }
  // 完全应用
  return x + y
}

add(40)(2) // 42
var add1 = add(10)
add1(20) // 30
```

精简add()函数

```bash
function add(x, y) {
  if(typeof y === 'undefined') {
    return function(y) {
      return x + y
    }
  }
  return x + y
}
```

通用的curry化函数示例

```bash
  function curry(fn) {
    console.log(fn) // function add(x, y) {return x + }
    var _slice = Array.prototype.slice,
      _args = _slice.call(arguments, 1)
      // _args 2
    return function() {
      var newArgs = _slice.call(arguments),
        args2 = _args.concat(newArgs)
      // newArgs 3
      // args2 [2, 3]
      return fn.apply(null, args2)
    }
  }

function add(x, y) {
  return x + y
}

var newAdd = curry(add, 2)
```

何时使用Curry化？
当发现正在调用同一个函数，并且传递的参数绝大多数都是相同的，那么该函数可能适用于Curry化的一个很好的候选参数。

小结：
创建函数的语法

1. 命名函数表达式
2. 匿名函数表达式
3. 函数声明
4. 对象函数
5. 函数原型方法

- API模式， 可以帮助函数提供更整洁的接口

回调模式 => 将函数作为参数传递
配置对象 => 有助于保持控制函数的参数数量
返回函数 => 返回值为另外一个函数
Curry化 => 当新函数是基于现有函数，并加上部分参数列表创建时

- 初始化模式

及时函数 => 只要定义之后立即执行
及时对象初始化 => 提供了可被立即调用的方法
初始化分支 => 帮助分支在代码初始化执行过程中仅检测一次，这与以后在程序生命期内多次检测相反

- 性能模式
备忘模式（缓存） => 使用函数属性以便使得计算过的值无须再次计算
自定义模式 => 以新的主体重写本身，以使得在第二次或以后调用时仅需执行更少的工作

### 对象创建模式

#### 命名空间模式

```bash
var MYAPP = {}

MYAPP.Parent = function() {}
MYAPP.Child = function() {}
MYAPP.name = 'apple'
MYAPP.modules = {}
MYAPP.modules.module1 = {}
MYAPP.modules.module1.data = { a: 1, b: 2}
MYAPP.modules.module2 = {}
```

命名空间的缺点：

- 需要更多的字符，每个变量都要加上命名空间的前缀，增加代码量
- 仅有一个全家实例意味着任何代码都可以修改该全局实例，并且其余的功能获得更新后的状态
- 长嵌套名字意味更长（更慢）的属性解析查询时间

命名空间函数

```bash
var MYAPP = MYAPP = {}
MYAPP.namespace = function(nsStr) {
  var parts = nsStr.split('.'),
      parent = MYAPP,
      i;
  if(parts[0] === "MYAPP") {
    parts = parts.slice(1)
  }

  for(i = 0; i < parts.length; i++) {
    if(typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {}
    }
    parent = parent[parts[i]]
  }
  return parent
}
```

私有变量

```bash
function Person() {
  var name = 'apple'
  this.getName = function() {
    return this.name
  }
}

var otc = new Person()
console.log(otc.name) // undefined
console.log(otc.getName) // 'apple'
```

私有性失效

```bash
function Person() {
  var info = {
    age: 40,
    name: 'bob',
    weight: '70kg',
    height: '179cm',
    price: '1亿'
  }

  this.getInfo = function() {
    return this.info
  }
}

var badBody = new Person()
var info = badBody.getInfo()
info.age = 100
info.price = '-10'
console.log(badBody.getInfo)

// age: 100
// price: '-10'
```

对象字面量以及私有性

```bash
var myobj

(function() {
  var name = 'my name'
  // 实现共有部分
  myobj = {
    getName: function() {
      return name
    }
  }
})()

myobj.getName() // 'my name'
```

模块模式

```bash
var myboj = (function() {
  // 私有成员
  var name = 'my name'

  // 实现共有部分
  return {
    getName: function() {
      return name
    }
  }
}())

myobj.getName() // 'my name'
```

原型和私有性

```bash
function Gadget() {
  var name = 'lyz'
  this.getName = function() {
    return name
  }
}

Gadget.prototype = (function() {
  var browser = 'Mobile Webkit'

  return {
    getBrowser: function() {
      return browser
    }
  }
}())

var toy = new Gadget()
console.log(toy.getName())
console.log(toy.getBrowser())
```

将私有方法揭示为公共方法

```bash
var myarr
(function(){
  var astr = '[objcet Array]',
      toString = Object.prototype.toString

  function isArray(a) {
    return toString.call(a) === astr
  }

  function indexOf(hasStack, needle) {
    var i = 0,
      len = hasStack.length
    for(; i < len; i++) {
      if(hasStack[i] === needle) {
        return i
      }
    }
    return -1
  }

  myarr = {
    isArray: isArray,
    indexOf: indexOf,
    inArray: indexOf
  }
}())
```

如果发生意外的事情，例如公用indexOf()方法发生意外，但私有的indexOf()方法任然是安全的

```bash
myarr.indexOf = null
myarr.inArray(['1', '2', '3'], 1) // 0
```

模块模式

- 命名空间
- 即时函数
- 私有和特权会员
- 声明依赖

```bash
// 命名空间
MYAPP.namespace('MYAPP.utils.arr')

MYAPP.utils.arr = (function(){
  // 依赖
  var obj = MYAPP.utils.object,
      ulang = MYAPP.utils.lang,

      // 私有属性
      arr_str = '[object Array]',
      toString = Object.prototype.toString,

      // 私有方法
      inArr: function(hayStack, needle) {
        for(var i = 0, len = hayStack.length; i < len; i++) {
          if(hayStack[i] === needle) {
            return true
          }
        }
      },
      isArr: function(a) {
        return toString.call(a) === arr_str
      }
      // ... 其他方法和属性

  // 可选的一次性初始化过程

  // 揭示公有API
  return {
    isArray: isArr,
    indexOf: inArr
  }
}())
```

创建构造函数的模块

```bash
MYAPP.namespace('MYAPP.utils.Array')

MYAPP.utils.Array = (function() {
      // 依赖
  var obj = MYAPP.utils.object,
      ulang = MYAPP.utils.lang,
      // 私有方法
      Constr;
  // 可选的一次性初始化过程
  // ...

  // 公有API--构造函数
  Constr = function(o) {
    this.elements = this.toArray(o)
  }
  // 公有API--原型
  Constr.prototype = {
    constructor: MYAPP.utils.Array,
    version: '2.0',
    toArray: function(obj) {
      for(var i = 0, a = [], len = obj.length; i < len; i++) {
        a[i] = obj[i]
      }
      return a
    }
  }
  // 返回要分配给新命名空间的构造函数
  return Constr
}())

```

使用新构造函数的方法

```bash
var arr = new MYAPP.utils.Array(obj)
```

将全局变量导入到模块中

```bash
MYAPP.utils.module = (function(app, global) {
  // 引用全局对象
  // 以及现在被转换成局部变量的
  // 全局应用程序命名空间对象
}(MYAPP, this))
```

### 沙箱模式

```bash
Sendbox(['ajax', 'event'], function(box) {

})
Sendbox('ajax', 'event', function(box) {

})
Sendbox('*', function(box) {

})
Sendbox(function(box) {

})

Sendbox('dom', 'event', function(box) {
  Sendbox('ajax', function(box) {

  })
})
```

增加模块

```bash
Sandbox.modules = {}

Sandbox.modules.dom = function(box) {
  box.getElement = function() {}
  box.getStyle = function() {}
  box.foo = 'bar'
}

Sandbox.modules.event = function(box) {
  box.attachEvent = function() {}
  box.dettachEvent = function() {}
}

Sandbox.modules.ajax = function(box) {
  box.makeRequest = function() {}
  box.getRequest = function() {}
}
```

实现构造函数

```bash
function Sandbox() {
      // 将参数转换为数组
  var args = Array.prototype.slice.call(arguments),
      // 最后一个是回调函数
      callback = args.pop(),
      // 模块可以作为数组，或作为单独参数传递
      modules = (args[0] && typeof args[0] === 'string') ? args : args[0],
      i;
  // 确保该函数作为构造函数被调用
  if(!(this instanceof Sandbox)) {
    return new Sandbox(modules, callback)
  }

  // 需要向this添加的属性
  this.width = 100

  // 向this对象添加模块，不指定或指定‘*’ 都表示使用所有模块
  if(!modules || modules === '*') {
    modules = []
    for(i in Sandbox.modules) {
      if(Sandbox.modules.hasOwnProperty) {
        modules.push(i)
      }
    }
  }

  // 初始化所需模块
  for(i = 0; i < modules.length; i++) {
    Sandbox.modules[modules[i]]()
  }
  // call the callback
  callback(this)
}

Sandbox.prototype = {
  name: 'My Sendbox',
  version: '1.0',
  getName: function() {
    return this.name
  }
}
```

公有静态成员

```bash
// 构造函数
var Gadget = function() {}

// 静态方法
Gadget.isShiny = function() {
  return 'you bet'
}

// 原型上的普通方法
Gadget.prototype.setPrice = function(price) {
  this.price = price
}

Gadget.isShiny() // 'you bet'

var iphone = new Gadget()
iphone.setPrice(398)

// 试图以静态方式调用一个实例方法是无法运行的
typeof Gadget.setPrice   // 'undefined'
typeof iphone.isShiny   // 'undefined'

```

静态方法与实例连接起来

```bash
Gadget.prototype.isShiny = Gadget.isShiny

iphone.isShiny() // 'you bet'
```
在这种情况下，如果静态方法内部使用了this要特别注意，如果执行iphone.isShiny(),那么this将会指向iphone

```bash
// 构造函数
var Gadget = function(price) {
  this.price = price
}

// 静态方法
Gadget.isShiny = function() {
  var msg = 'you bet'

  if(this instanceof Gadget) {
    msg += ', it costs $' + this.price + '!'
  }
  return msg
}

// 向该原型添加一个普通的方法
Gadget.prototype.isShiny = function() {
  return Gadget.isShiny.call(this)
}

// 测试静态方法
Gadget.isShiny() // 'you bet'

// 测试实例方法
var g = new Gadget('199')
g.isShiny() // 'you bet, it costs $199 !'
```

私有静态成员

```bash
 var Gadget = (function() {
  // 静态变量/属性
  var counter = 0,
      NewGadget

  // 新的构造函数实现
  NewGadget = function() {
    counter += 1
  }
  // 特权方法
  NewGadget.prototype.getLastId = function() {
    return counter
  }
  // 覆盖该构造函数
  return NewGadget
 }())

var iphone = new Gadget()
iphone.getLastId() // 1
var iphone2 = new Gadget()
iphone2.getLastId() // 2
var iphone3 = new Gadget()
iphone3.getLastId() // 3
 ```

对象常量

```bash
var constant = (function() {
  var constants = {},
      hasOwn = Object.prototype.hasOwnProperty,
      allowed = {
        string: 1,
        number: 1,
        boolean: 1
      },
      prefix = (Math.random() + '_').slice(2)

  return {
    set: function(name, value) {
      if(this.isDefined(name)) {
        return false
      }
      if(!hasOwn.call(allowed, typeof value)) {
        return false
      }
      constants[prefix + name] = value
      return true
    },
    isDefined: function(name) {
      return hasOwn.call(constants, prefix + name)
    },
    get: function(name) {
      if(this.isDefined(name)) {
        return constants[prefix + name]
      }
      return null
    }
  }
}())


// 检查是否已经定义
constant.isDefined('maxwidth') // false
// 定义
constant.set('maxwidth', 600) // true
// 再次检查
constant.isDefined('maxwidth') // true
// 试图重新定义
constant.set('maxwidth', 800) // false
// 该值是否保持不变
constant.get('maxwidth') // 600
```

#### 链模式

```bash
var obj = {
  value: 1,
  increment: function() {
    this.value += 1
    return this
  },
  add: function(v) {
    this.value += v
    return this
  },
  shout: function() {
    console.log(this.value)
  }
}

obj.increment().add(3).shout() // 5
obj.increment()
obj.add(3)
obj.shout()
```

`Method()`方法

```bash
if(typeof Function.prototype.method !== 'function') {
  Function.prototype.method = function(name, impementation) {
    this.prototype[name] = impementation
    return this
  }
}

var Person = function(name) {
  this.name = name
}.method('getName', function() {
  return this.name
}).method('setName', function() {
  this.name = name
  return this
})

var r = new Person('admin')
console.log( r.getName() )
console.log(r.setName('administartor').getName() )

```

### 代码复用模式

```bash
// 父构造函数
function Parent(name) {
  this.name = name || 'lyz'
}
// 原型上的普通方法
Parent.prototype.say = function() {
  return this.name
}

// 空白的子构造函数
function Child(name) {}

// 继承
inherit(Child, Parent)
```

#### 类式继承模式#1 -- 默认模式

```bash
function inherit(C, P) {
  C.prototype = new P
}
```

重要的是需要记住，原型属性应该指向一个对象，而不是一个函数，因此它必须指向一个由父构造函数所创建的实例（一个对象），而不是构造函数本身。也就是说，要注意使用new操作符来创建新对象。因为需要new才能使用这种模式运行

```bash
var kid = new Child()
kid.say() // 'lyz'
```

```bash
var kid = new Child()
kid.name = 'anne'
kid.say() // 'anne'
```

#### 类式继承模式#2 -- 借用构造函数

```bash
function Child(a, b, c, d) {
  Parent.apply(this, arguments)
}
```

```bash
// 父类构造函数
function Article() {
  this.tags = ['js', 'css']
}

var article = new Article()

// 文章对象继承了article对象
function BlogPost() {}
BlogPost.prototype = article

var blog = new BlogPost()

// 静态页面继承了article
// 借用构造函数模式
function StaticPage() {
  Article.call(this)
}
var page = new StaticPage()

console.log(article.hasOwnProperty('tags')) // true
console.log(article.hasOwnProperty('tags')) // false
console.log(article.hasOwnProperty('tags'))  // true

blog.tags.push('html')
page.tags.push('php')
console.log(article.tags.join(',')) // js, css, html
```

```bash
function Parent(name) {
  this.name = name  || 'lyz'
}
Parent.prototype.say = function() {
  return this.name
}

function Child(name) {
  Parent.apply(this, arguments)
}

var kid = new Child('Patrick')
kid.name  // 'Patrick'
typeof kid.say // 'undefined'
```

#### 借用构造函数实现多重继承

```bash
function Cat() {
  this.legs = 4
  this.say = function() {
    return 'meaowww'
  }
}

function Bird() {
  this.wings = 2
  this.fly = true
}

function CatWings() {
  Cat.apply(this)
  Bird.apply(this)
}

var jane = new CatWings()
console.log(jane)
```

#### 类式继承模式#3 -- 借用和设置原型

```bash
function Child(a, b, c, d) {
  Parent.apply(this, arguments)
}

Child.prototype = new Parent()
```

#### 类式继承模式#4 -- 共享原型

```bash
function inherit(C, P) {
  C.prototype = P.prototype
}
```

#### 类式继承模式#5 -- 临时构造函数

```bash
function inherit(C, P) {
  var F = function() {}
  F.prototype = P.prototype
  C.prototype = new F()
}
```

#### 存储超类

```bash
function inherit(C, P) {
  var F = function() {}
  F.prototype = P.prototype
  C.prototype = new F()
  C.uber = P.prototype
}
```

#### 重置构造函数指针

```bash
function inherit(C, P) {
  var F = function() {}
  F.prototype = P.prototype
  C.prototype = new F()
  C.uber = P.prototype
  C.prototype.constructor = C
}
```

#### 缓存代理构造函数，仅创建一次临时构造函数

```bash
var inherit = (function() {
  var F = function() {}
  return function(C, P) {
    F.prototype = P.prototype
    C.prototype = new F()
    C.uber = P.prototype
    C.prototype.constructor = C
  }
}())
```

#### 原型继承

```bash
// 要继承的对象
var parent = {
  name: 'Papa'
}

// 新对象
var child = object(parent)

console.log(child.name) // Papa

function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
```

```bash
function Person() {
  this.name = 'lyz'
}

Person.prototype.getName = function() {
  return this.name
}

var papa = new Person()

var kid = object(papa)

console.log(kid.getName()) // 'lyz'
```

```bash
function Person() {
  this.name = 'lyz'
}

Person.prototype.getName = function() {
  return this.name
}

var kid = object(Person.prototype)

console.log(typeof kid.getName) // function
console.log(typeof kid.name) // undefined 只有原型是继承的，属性并没有继承到
```

#### `Object.create`增加到ECMAScript中

在ECMAScript中，原型继承模式已经正式成为该语言的一部分。这种模式通过Object.create()来实现

```bash
var child = Object.create(parent)
```

Object.create()接受一个额外的参数，即一个对象。这个额外的对象的属性将会被添加到新对象中，以此作为新对象自身的属性，然后Object.create()返回该新对象。

```bash
var child = Object.create(parent, {
  age: { value: 2 }
})

child.hasOwnProperty('age') // true
```

#### 通过复制属性实现继承

浅复制

```bash
function extend(parent, child) {
  child = child || {}
  for(var i in parent) {
    if(parent.hasOwnProperty(i)) {
      child[i] = parent[i]
    }
  }
  return child
}
```

深度复制

```bash
function extendDeep(parent, child) {
  var i,
      _toString = Object.prototype.toString,
      astr = '[object Array]'

  for(i in parent) {
    if(parent.hasOwnProperty(i)) {
      if(typeof parent[i] === 'object') {
        child[i] = (_toString.call(parent[i]) === 'astr') ? [] : {}
        extendDeep(parent[i], child[i])
      } else {
        child[i] = parent[i]
      }
    }
  }
  return child
}
```

```bash
var papa = {
  counts: [1, 2, 3, 4],
  reads: { paper: true }
}

var kid = extendDeep(papa)
kid.counts.push(5)
kid.counts.toString() // 1, 2, 3, 4, 5
papa.counts.toString() // 1, 2, 3, 4

papa.reads === kid.reads // false
kid.reads.paper = false
console.log(papa.reads.paper) // true
```

#### 混入

```bash
function mix() {
  var arg, prop, child = {}
  for(arg = 0; arg < arguments.length; arg++) {
    for(prop in arguments[arg]) {
      if(arguments[arg].hasOwnProperty(prop)) {
        child[prop] = arguments[arg][prop]
      }
    }
  }
  return child
}

var cake = mix(
  {eggs: 2, large: true},
  {butter: 1, salted: true},
  {flour: '3 cups'},
  {sugar: 'sure!'}
)
```

#### 借用方法

```bash
var one = {
  name: 'obj',
  say: function(greet) {
    return greet + this.name
  }
}

var two = {
  name: 'another obj'
}

one.say('hello') // hello obj
one.say.apply(tow, ['hi']) // hi another obj
```

bind()绑定

```bash
var say = one.say()
say('hoho') // hoho undefined

var yetanother = {
  name: 'yet another obj',
  method: function(cb) {
    return cb('hola')
  }
}

yetanother.method(one.say) // holla undefined
```

以上两种情况，say()方法内部的this都指向了全局变量

```bash
function bind(o, m) {
  return function() {
    return m.apply(o, [].slice.call(arguments))
  }
}
```

```bash
var towsay = bind(tow, one.say)
twosay('yoyo') // yoyo another object
```

#### Function.prototype.bind()

```bash
if(typeof Function.prototype.bind === 'undefined') {
  Function.prototype.bind = function(thisArg) {
    var fn = this,
        slice = Array.prototype.slice,
        args = slice.call(arguments, 1)

    return function() {
      return fn.apply(thisArg, args.concat(slice.call(arguments)))
    }
  }
}
```

```bash
var one = {
  name: 'obj',
  say: function(greet) {
    return greet + this.name
  }
}

var two = {
  name: 'another obj'
}

var twosay2 = one.say.bind(two)
twosay2('Bonjour') // Bonjour another obj
```

## 设计模式

### 单例模式

```bash
function Universe() {
  var instance = this

  this.start_time = 0
  this.band = 'Big'

  Universe = function() {
    return instance
  }
}

var uni = new Universe()
var uni2 = new Universe()
console.log(uni === uni2) // true
```

```bash
function Universe() {

  // 缓存实例
  var instance

  // 重新构造函数
  Universe = function() {
    return instance
  }
  // 保留原型属性
  Universe.prototype = this

  // 实例
  instance = new Universe()

  // 重置构造函数指针
  instance.constructor = Universe

  // 所有功能
  instance.strat_time = 0
  instance.bang = 'Big'

  return instance
}
```

测试实例

```bash
// 更新原型并创建实例

Universe.prototype.nothing = true
var uni = new Universe()

Universe.prototype.everything = true
var uni2 = new Universe()

// 比较
uni == uni2 // true

// 所有原型属性都起作用了
uni.nothing && uni.everything && uni2.nothing && uni2.everything // true

// 正常属性
uni.bang // 'Big'

// 该构造函数指向正确
uni.constructor === Universe // true
```

另外一种解决方案

```bash
var Universe
(function() {
  var instance

  Universe = function Universe() {
    if(instance) {
      return instance
    }
    instance = this

    this.start_time = 0
    this.bang = 'Big'
  }
}())
```

### 工厂模式

设计工厂模式的目的是为了创建对象，它通过在类或者类的静态方法中实现，具有下列目标

- 当创建相似对象时执行重复操作
- 在编译时不知道具体类型(类)的情况下，为工厂客户提供一种创建对象的接口

```bash
// 父构造函数
function CarMaker() {}

// 普通方法
CarMaker.prototype.drive = function() {
  return 'Vroom, I have ' + this.doors + 'doors'
}

// 静态工厂方法
CarMaker.factory = function(type) {
  var constr = type,
      newcar
  // 如果不存在，抛出异常
  if(typeof CarMaker[constr] !== 'function') {
    throw {
      name: 'Error',
      message: constr + 'doesn‘t exist'
    }
  }
  // 构造函数是已知存在的，我们使得原型继承父类，但仅继承一次
  if(typeof CarMaker[constr].prototype.drive !== 'function') {
    CarMaker[constr].prototype = new CarMaker()
  }

  // 创建一个新实例
  newcar = new CarMaker[constr]()

  // 返回新实例
  return newcar
}

// 定义特定的汽车制造商
CarMaker.Compact = function() {
  this.doors = 4
}

CarMaker.Convertible = function() {
  tihs.doors = 2
}

CarMaker.SUV = function() {
  this.doors = 24
}

var corolla = CarMaker.factory('Compact')
var solstice = CarMaker.factory('Convertible')
var cherokee = CarMaker.factory('SUV')

corolla.drive() // Vroom, I have 4 doors
solstice.drive() // Vroom, I have 2 doors
cherokee.drive() // Vroom, I have 24 doors
```

#### 内置对象工厂

```bash
var o = new Object(),
    n = new Object(1),
    s = Object('1'),
    b = Object(true)

o.constructor === Object  // true
n.constructor === Number  // true
s.constructor === String  // true
b.constructor === Boolean  // true
```

### 迭代器模式

```bash
var agg = (function() {
  var index = 0,
      data = [1, 2, 3, 4, 5],
      length = data.length

  return {
    next: function() {
      var element

      if(!this.hasNext()) {
        return null
      }

      element = data[index]
      index = index + 2
      return element
    },
    hasNext: function() {
      return index < length
    },
    rewind: function() {
      index = 0
    },
    current: function() {
      return data[index]
    }
  }
}())

// 循环 1， 3， 5
while(agg.hasNext()) {
  console.log(agg.next())
}

// 回退
agg.rewind()

console.log(agg.current()) // 1
```

### 装饰者模式

```bash
function Sale(price) {
  this.price = price || 100
}

Sale.prototype.getPrice = function() {
  return this.price
}

Sale.prototype.decorate = function(decorator) {
  var F = function() {},
      overrides = this.constructor.decorators[decorator],
      i, newobj

  F.prototype = this

  newobj = new F()
  newobj.uber = F.prototype
  for(i in overrides) {
    if(overrides.hasOwnProperty(i)) {
      newobj[i] = overrides[i]
    }
  }
  return newobj
}

Sale.decorators = {}

Sale.decorators.fedtax = {
  getPrice: function() {
    var price = this.uber.getPrice()
    price += price * 5 / 100
  }
}

Sale.decorators.quebec = function() {
  getPrice: function() {
    var price = this.uber.getPrice()
    price += price * 7.5 / 1000
    return price
  }
}

Sale.decorators.money = function() {
  getPrice: function() {
    return '$' + this.uber.getPrice().toFixed(2)
  }
}

Sale.decorators.cdn = function() {
  getPrice: function() {
    return 'CDN$' + this.uber.getPrice().toFixed(2)
  }
}
```

#### 使用列表实现

```bash
var sale = new Sale(100)
sale.decorate('fedtax')
sale.decorate('quebec')
sale.decorate('money')
sale.getPrice()

function Sale(price) {
  this.price = (price > 0) || 100
  this.decorators_list = []
}

Sale.decorators = {}

Sale.decorators.fedtax = {
  getPrice: function(price) {
    return price * 5 / 100
  }
}

Sale.decorators.quebec = {
  getPrice: function(price) {
    return price * 7.5 / 100
  }
}

Sale.decorators.money = {
  getPrice: function(price) {
    return '$' + price.toFixed(2)
  }
}

Sale.prototype.decorate = function(decorator) {
  this.decorators_list.push(decorator)
}

Sale.prototype.getPrice = function() {
  var price = this.price,
      i,
      max = this.decorators_list.length

  for(i = 0; i < max; i++) {
    name = this.decorators_list[i]
    price = Sale.decorators[name].getPrice(price)
  }
  return price
}
```

使用列表实现的装饰者模式更为简单，并且不涉及到继承。装饰的方法也非常的简单。

### 策略模式

```bash
var validator = {
  // 所有可用的检查
  types: {},
  // 当前验证会话中的错误消息
  message: [],

  config: {},

  // 接口方法
  validate: function(data) {
    var i, msg, type, checker, result_ok
    // 重置消息
    this.message = []

    for(i in data) {
      if(data.hasOwnProperty(i)) {
        type = this.config[i]
        checker = this.types[type]
      }

      if(!type) {
        continue; // 不需要验证
      }

      if(!checker) {
        throw {
          name: 'ValidationError',
          message: 'No handler to validate type' + type
        }
      }

      result_ok = checker.validate(data[i])
      if(!result_ok) {
        msg = 'invalid value for *' + i + '*, ' + checker.instructions
        this.message.push(msg)
      }
    }
    return this.hasErrors()
  },
  hasErrors: function() {
    return this.message.length !== 0
  }
}

var data = {
  first_name: 'Super',
  last_name: 'man',
  age: 'unknow',
  username: '^~^'
}

validator.validate(data)
if(validator.hasErrors()) {
  console.log(validator.message.join('\n'))
}

validator.config = {
  first_name: 'isNonEmpty',
  age: 'isNumber',
  username: 'isAlphaNum'
}

// 非空值检查
validator.types.isNonEmpty = {
  validate: function(value) {
    return value !== ''
  },
  instructions: 'the value connot be empty'
}

validator.types.isNumber = {
  validate: function(value) {
    return !isNaN(value)
  },
  instructions: 'the value can only be a valid number'
}

validator.types.isAlphaNum = {
  validate: function(value) {
    return !/[^a-z0-9]/i.test(value)
  },
  instructions: 'the value can only contain charcters and numbers, no special symbols'
}

```

### 外观模式

```bash
var myevent = {
  stop: function(e) {
    if(typeof e.preventDefault === 'function') {
      e.preventDefault()
    }
    if(typeof e.stopPropagation === 'function') {
      e.stopPropagation()
    }
    // IE浏览器
    if(typeof e.returnValue === 'boolean') {
      e.returnValue = false
    }
    if(typeof e.cancelBubble === 'boolean') {
      e.cancelBubble()
    }
  }
}
```

### 代理模式

```bash

```