# JS中的类型

**Javascript内置的类型**
javascript中共有7中类型

- null
- undefined
- boolean
- number
- string
- object
- symbol -- ES6增加的

``` js
typeof undefined === 'undefined'
typeof true === 'boolean'
typeof 28 === 'number'
typeof '28' === 'string'
typeof {value: 28} === 'object'
typeof Symbol === 'symbol'
```

上面的判断得到的结果都是true

``` js
typeof null === 'object' // true
```

null 也是对象

``` js
var a = null
(!a && typeof a === 'object') // true

typeof [1,2,3] === 'object' // true
```

用typeof来判断null和 array 是否是object对象类型，获得的值都是true对象

``` js
function foo(a, b, c) {}

foo.length // 3
```

函数也有length，函数的长度取决于传入的参数个数

``` js
var a = 10
typeof a // "number"

a = true
typeof a // "boolean"
```

typeof 操作符判断一个对象总是返回 string类型

``` js
typeof typeof 10 // "string"
```

typeof 10 得到的结果是 "number", 当在typeof "number"的时候就是"string"

**undefined**
通过typeof 来判断一个已经声明，但未赋值的对象，得到的都是字符串类型的undefined

``` js
var a

typeof a // "undefined"

var b = 20
var c

b = c

typeof b // "undefined"
typeof c // "undefined"

var a

a // undefined

b // ReferenceError: b is not defined
```

undefined 和 is not defined 是2个不同的结果

``` js
var a

typeof a  // "undefined"
typeof b  // "undefined"
```

但是，如果我们通过typeof来判断b的时候，得到的结果却是和定义了var的a 是一样的输出，这是一个初学者很蛋疼的事情

``` js
// 这样写会得到一个错误
if(DEBUG) {
  console.log('这样会报错');
}

// 这样判断会更安全
if(typeof DEBUG !== 'undefined') {
  console.log('这样来判断会是更安全的做法');
}
```

当我们用一些条件来判断的时候，用typeof的方式来写，会是更好的选择，如果一个对象没有定义，获取该名字了，这个时候程序就会出错，出错会影响后面的代码执行

``` js
if(typeof abc === 'undefined') {
  abc = function() {
    return "abc"
  }
}
```

这样的判断是有必要的，如果一个对象不存在，则重新赋值，但不需要用var 来声明

``` js
if(window.DEBUG) {}

if(!window.abc) {}
```

另外的一种做法，用typeof来检查全局变量，在对象的前面加上window,这样来判断会更安全

``` js
function doSth() {
  var helper = (typeof abc !== 'undefined') ? abc : function() {}

  var val = helper()
}

// 更简单的写法
function doSomethingCool(abc) {
  var helper = abc ||
    function() { /*.. default feature ..*/ };

  var val = helper();
  // ..
}
```

doSth 函数如果没有找到 abc 就声明一个新的函数，如果有，就使用已经定义的
