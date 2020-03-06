# call、apply、bind 方法

语法

```js
fun.apply(thisArg [, argsArray])
fun.call(thisArg [, args2][, args2])
fun.bind(thisArg)
```

参数

`thisArg`
可选的。在 fun 函数运行时使用的 this 值。需要注意的是，使用的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的包装对象。

`argsArray`
可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。

返回值

调用有指定this值和参数的函数的结果

使用`apply`
使用Math.max/Math.min来找出一个数组中的最大/最小值

```js
var nums = [1, 9, 23, 20, 15, 8, 3, 6]

var maxer = Math.max.apply(null, nums)
var mixer = Math.min.apply(null, nums)

console.log(maxer) // 23
console.log(miner) // 1
```

当使用apply传递的参数太多时候，比如超过1w个或者更多时候，我们需要通过切片方式来循环传递

```js
function minOfArray(arr) {
  var min = Infinity
  var QUANTUM = 32768

  for(var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.min.apply(null, arr.slice(i, Math.min(i+QUANTUM, len)))
    min = Math.min(submin, min)
  }

  return min
}

var min = minOfArray([5, 6, 2, 3, 7])

var originalfoo = someobject.foo;

someobject.foo = function() {
  //在调用函数前干些什么
  console.log(arguments);
  //像正常调用这个函数一样来进行调用：
  originalfoo.apply(this,arguments);
  //在这里做一些调用之后的事情。
}
```

使用apply来链接构造器

```js
Function.prototype.construct = function(args) {
  var oNew = Object.create(this.prototype)
  this.apply(oNew, args)
  return oNew
}
```

在不支持`Object.create`的环境下，使用下面的方式
使用`Object.__proto__`

```js
Function.prototype.construct = function(args) {
  var oNew = {}
  oNew.__proto__ = this.prototype
  this.apply(oNew, args)
  return oNew
}
```

## 使用闭包

```js
Function.prototype.construct = function(args) {
  var fConstructor = this
  var fNewConstr = function() {
    fConstructor.apply(this, args)
  }
  fNewConstr.ptototype = fConstructor.prototype
  return new fNewConstr()
}
```

使用 Function 构造器

```js
Function.ptototype.construct = function(args) {
  var oNew = new Function('')
  oNew.prototype = this.prototype
  this.apply(oNew, args)
  return oNew
}
```

使用方式

```js
function myFun() {
  for(var i = 0; i < arguments.length; i++) {
    this['prop'+i] = arguments[i]
  }
}
var arr = ['abc', 'hello', true, 124]
var myInstance = myFun.construct(arr)
console.log(myInstance.prop1)

function changeStyle(attr, value) {
  this.style[attr] = value
}
var div = document.querySelector('.box')
window.changeStyle.call(div, 'width', '300')
window.changeStyle.apply(div, ['width', '300'])

function fatherName() {
  return this.father.name
}

var zhuli = {
  father: {
    name: 'zyz'
  },
  fatherName: fatherName
}

zhuli.fatherName() // zyz

var zhansan = {
  father: {
    name: 'lisi'
  },
  fatherName: fatherName
}

zhansan.fatherName() // lisi
```

以上代码重复了，可以用call 和 apply 来继承调用

```js
function fatherName() {
  return this.father.name
}

var zhuli = {
  father: {
    name: 'zyz'
  }
}
var zhansan = {
  father: {
    name: 'lisi'
  }
}

[zhuli, zhansan].map(function(who) {
  return fatherName.call(who)
})
```

不是每个人被问到爸爸名字的时候，都这么规规矩矩的回答，有人会这样

```js
function fatherName() {
  return this.father.name
}

var likui = {
  father: {
    name: '你谁呀，敢问你爷爷的爸爸'
  }
}
var ligui = {
  father: {
    name: function() {
      return '你自己琢磨'
    }
  }
}
[likui, ligui].map(function(who) {
  var name = fatherName.call(who)

  return Object.prototype.toString.call(name) === '[object Function]' ? name() : name
})
```

bind 使用方式

```js
var man = {
  name: 'helloman',
  showName: function() {
    return this.name
  }
}

document.querySelector('a').onclick = man.showName  // this 指向a标签
document.querySelector('a').onclick = function() {
  man.showName() // this 指向man
}
document.querySelector('a').onclick = man.showName.bind(man) // this 指向a标签
```

**bind 与 apply call的区别**
apply call函数是立即执行的，bind函数不会立即执行，需要绑定的对象事件触发才执行

## constructor

```js
Function.prototype.construct = function(args) {
  var oNew = Object.create(this.prototype)
  this.apply(oNew, args)
  return oNew
};

function myConstructor () {
  for(var i = 0; i < arguments.length; i++) {
    this['prop' + i] = arguments[i]
  }
}

var arr = ['abc', 'hello', 123, false]

var myInstance = myConstructor.construct(arr)
console.log(myInstance.prop0) // 'abc'
// myInstance 是不是myConstructor构造出来的
console.log(myInstance instanceof myConstructor) // true
console.log(myInstance.constructor) // myConstructor


var nums = [1, 9, 23, 20, 15, 8, 3, 6]

var maxer = Math.max.apply(null, nums)
var miner = Math.min.apply(null, nums)

console.log(maxer) // 23
console.log(miner) // 1


function minOfArray(arr) {
  var min = Infinity
  var QUANTUM = 32768

  for(var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.min.apply(null, arr.slice(i, Math.min(i+QUANTUM, len)))
    min = Math.min(submin, min)
  }

  return min
}

var min = minOfArray([5, 488, 2, 3, 7])
console.log(min)

var obj = {
  foo: function() {
    console.log(1)
  }
}

var originFn = obj.foo

obj.foo = function() {
  console.log(arguments)
  originFn.apply(this, arguments)

  console.log(2)
}

obj.foo(123, 345)

function fatherName() {
  return this.father.name
}

var zhuli = {
  father: {
    name: 'zyz'
  }
}
var zhansan = {
  father: {
    name: 'lisi'
  }
}

[zhuli, zhansan].map(function(who) {
  return fatherName.call(who)
})
```