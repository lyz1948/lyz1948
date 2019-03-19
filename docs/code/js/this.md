# This

this 谁调用它，它就指向谁。
这个例子中，对象blue和green使用了[call](http://ykpine.net/coding/call.md) 方法，color()方法，因为blue和green本身并没有color()方法。
也可以理解为color()这个函数，将this指向了blue和green对象，这时候函数里的this就是指向的对象，对象里面有name属性

showColor() 方法也是调用了[call](http://ykpine.net/coding/call.md) 方法，函数体内的this指向就是blue和green对象本身。对象又借助call调用color()方法，将this传给对象。

``` js
function color() {
  return this.name
}

function showColor() {
  var hobby = '我喜欢的颜色是：' + color.call(this)

  console.log(hobby)
}

var blue = {
  name: '蓝色'
}

var green = {
  name: '绿色'
}

color.call(blue) // 蓝色
color.call(green) // 绿色

showColor.call(blue) // 我喜欢的颜色是：蓝色
showColor.call(green) // 我喜欢的颜色是：绿色
```

通过上下文的方式将对象传递

``` js
function color(context) {
  return context.name
}

function showColor(context) {
  var hobby = '我喜欢的颜色是：' + color.call(context)

  console.log(hobby)
}

var blue = {
  name: '蓝色'
}

var green = {
  name: '绿色'
}

color(blue) // 蓝色
color(green) // 绿色
```

``` js
function count(num) {
  console.log('timer=>' + num)
  this.timer++
}
count.timer = 0

for(var i = 0; i < 5; i++) {
  count(i) // 调用了5次
}

console.log(count.timer) // 0
```

上面这段代码，count在for循环里被执行了5次，但最后timer的值还是0，并没有被改变。
count函数调用的时候，this指向是window，你可以这样理解，在for循环里的代码是window.count(i), 那函数里的this指向就是window,然而window下并无timer的变量，所以打印的count.timer是初始定义的值，所以是0

``` js
function count(num) {
  console.log('count ' + num)
  obj.timer++
}

var obj = {
  timer: 0
}

for(var i = 0; i < 5; i++) {
  count(i)
}

console.log(obj.timer) // 5
```

``` js
function count(num) {
  console.log('count ' + num)
  count.timer++
}

count.timer = 0

for(var i = 0; i < 5; i++) {
  count(i)
}

console.log(count.timer) // 5
```

如果代码换成这样，是不是能就更好的理解了？
现在在来看下面这个例子

``` js
function count(num) {
  console.log('count ' + num)
  this.timer++
}

count.timer = 0

for(var i = 0; i < 5; i++) {
  count.call(count, i)
}

console.log(count.timer) // 5
```

这次我们使用call，来修改this指向，将count函数里的this 指向count自己本身，count.timer初始值定义了0，循环了几次自然就自增了几次，所以得到的值为5

有了上面这几个例子，对this指向是否已经有所理解了呢？

``` js
function foo() {
  var num = 10
  this.baz()
}

function baz() {
  console.log(this.num)
}

foo() // 请给出这里答案
```

默认情况下

``` js
function foo() {
  console.log(this.num)
}

var num = 666

foo() // 666
```

严格模式下，this的范围只在当前函数体内

``` js
function foo() {
  'use strict'
  console.log(this.num)
}
var num = 666

foo() // TypeError: Cannot read property 'num' of undefined
```

``` js
function foo() {
  console.log( his.num)
}

var num = 666

(function(){
  "use strict";

  foo(); // 666
})();
```

自执行函数内定义了严格模式，但调用了非严格模式下的函数，这样对函数并不起作用，但这样的写法并无意义

``` js
function foo() {
  console.log(this.num)
}

var obj = {
  num: 8,
  foo: foo
}

obj.foo() // 8
```

foo 函数被obj对象引用了，此时foo里面的this隐式的绑定了obj

``` js
function foo() {
  console.log(this.num)
}

var bar = {
  num: 8,
  foo: foo
}

var obj = {
  num: 666,
  bar: bar
}

obj.bar.foo() // 8
```

``` js
function foo(num) {
  console.log(this.num)
}

var obj = {
  num: 8,
  foo: foo
}

var bar = obj.foo  // 等同与 var bar = foo
var num = 2

bar() // 等同与 window.bar()  2
```

函数体内调用执行的方法，this指向都是window

``` js
function foo() {
  console.log(this.num)
}

function doFoo(fn) {
  fn()
}
var obj = {
  num: 2,
  foo: foo
}
var num = 'i am not num'

doFoo(obj.foo) // i am not num
```

定时器内执行的函数this指向也是window

``` js
function foo() {
  console.log(this.num)
}

var obj = {
  num: 2,
  foo: foo
}
var num = 'i am not num'

setTimeout(obj.foo, 1000) // i am not num
```

使用call来改变this指向

``` js
function foo() {
  console.log(this.num)
}

var obj = {
  num: 10
}

var bar = function() {
  foo.call(obj)
}

bar()  // 10
setTimeout(bar, 1000) // 10
bar.call(window) // 10
```

通过使用call方法后，不管哪种方式调用，都能保证foo函数内的this指向obj

``` js
function foo(sth) {
  console.log(this.a, sth)
  return this.a + sth
}

var obj = {
  a: 2
}

var bar = function() {
  return foo.apply(obj, arguments)
}

var b = bar(6) // 2, 6
console.log(b) // 8
```

另外一种绑定方式，实行函数复用

``` js
var bind = function (fn, obj) {
  return function () {
    return fn.apply(obj, arguments)
  }
}

function foo(sth) {
  console.log(this.a, sth)
  return this.a + sth
}

var obj = {
  a: 2
}

var bar = bind(foo, obj)
var b = bar(6) // 2 6
console.log(b) // 8
```

Function 原型的bind来绑定对象

``` js
function foo(sth) {
  console.log(this.a, sth)
  return this.a + sth
}

var obj = {
  a: 2
}

var bar = foo.bind(obj)
var b = bar(6) // 2 6
console.log(b) // 8
```

``` js
function foo(el) {
  console.log(el, this.id)
}

var obj = {
  id: 'hello'
}

[4,5,6].forEach(foo, obj) // 4 hello 5 hello 6 hello
```

``` js
function foo(a) {
  this.a = a
}

var bar = new foo(2) // 相当于 b 引用来 foo = {a: 2}
console.log(bar.a) // 2
```

``` js
function foo() {
  console.log(this.a)
}

var obj1 = {
  a: 2,
  foo: foo
}

var obj2 = {
  a: 6,
  foo: foo
}

obj1.foo() // 2
obj2.foo() // 6

obj1.foo.call(obj2) // 6
obj2.foo.call(obj1) // 2
```

``` js
function foo(sth) {
  this.a = sth
}

var obj = {
  foo: foo
}

var obj2 = {}

obj.foo(2)
console.log(obj.a) // 5

obj.foo.call(obj2, 3)
console.log(obj2.a) // 3

var baz = new obj.foo(4)  // bar = foo => {a: 4}
console.log(obj.a) // 2
console.log(bar.a) // 4
```

``` js
function foo(sth) {
  this.a = sth
}

var obj = {
  foo: foo
}

var bar = foo.bind(obj)
bar(2)
console.log(obj.a) // 2

var baz = new bar(3)
console.log(obj.a) // 2
console.log(baz.a) // 3
```

如果对象通过使用new关键字创建出来的话，this 指向就是函数本身

``` js
var bar = new foo()  // this => foo
```

如果对象通过call 或者 apply 关键字显式绑定对象的话，this指向就是绑定的对象

``` js
var bar = foo.call(obj) // this => obj
```

如果对象通过context上下文来隐式绑定对象的话，this指向就是context上下文的对象

``` js
var bar = foo.call(obj) // this => obj
```

如果对象没有使用new、call、apply关键字，也没有通过context上下文传参，在非(strict)严格模式下this指向就是全局对象window，如果在(strict)严格模式下，this为undefined

``` js
var bar = foo() // this => window
```

如果通过call关键字来绑定对象null、window 、undefined的话，这些值会被忽略掉的

``` js
function foo() {
  console.log(this.a)
}

var a = 10

foo.call(null) // 10
foo.call(window) // 10
foo.call(undefined) // 10
```

通过绑定null关键字来指定对象，虽然被忽略掉，但经常被用来传递多个或不确定参数时来使用

``` js
function foo(a, b) {
  console.log('a:' + a + ',b:' + b)
}

foo.apply(null, [6, 7]) // a: 6 b: 7
var bar = foo.bind(null, 8) // a
bar(9) // 9
```

``` js
function foo() {
  console.log(this.a)
}

var a = 10
var obj = {a: 20, foo: foo}
var bar = {a: 30}

foo() // 10
foo.call(obj) // 20
(bar.foo = obj.foo)() // 20
```

上面这段代码中的bar.foo = obj.foo 是对象的引用，对象引用指向的都是同一个堆栈，并不会改变值

在es6的箭头函数里，this指向都是当前函数都作用域内

``` js
function foo() {
  return (a) => {
    console.log(this.a)
  }
}

var obj1 = {
  a: 10
}

var obj2 = {
  a: 20
}

var bar = foo.call(obj1)
bar.call(obj2) // 10
```

foo函数借用call将this指向了obj1，foo函数返回了一个匿名函数，因为返回都函数是箭头函数，箭头函数内的this 是不允许覆盖的，所以得到的值是10，而不是20

``` js
function foo() {
  setTimeout(() => {
    console.log(this.a)
  }, 200)
}

var obj = {
  a: 10
}

foo.call(obj) // 10
```

当箭头函数在定时器里使用，this指向依然还是foo, 所以得到的值是10，而不是undefined
