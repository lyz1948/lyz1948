
## 注释

```js
// 单行注册

/*
   多行注释
*/
```

## 声明

变量声明的三种方式

1. `var`
   声明一个变量，可赋一个初始化值
2. `let`
   声明一个块作用域的局部变量，可赋一个初始化值
3. `const`
   声明一个块作用域的只读的命名常量

## 变量

`声明一个变量`
使用关键字`var`或者`let`
例如`var a = 10`
直接赋值 `a = 20` 这样等于声明了一个全局变量，在严格模式下会报`RefferenceError`引用错误
使用`let`来声明一个块级作用域的变量，

### 变量求值

```js
var a
console.log(a) // undefined

console.log(b) // undefined
var b

let x
console.log(x) // undefined

console.log(y) // RefferenceError
let y
```

### 常量 `const`

声明一个常量，可以使用es6中新增的 const, 常量标识符的命名规则和变量相同：必须以字母、下划线或美元符号开头并可以包含有字母、数字或下划线。
常量不可以通过赋值改变其值，也不可以在脚本运行时重新声明。它必须被初始化为某个值。

``` js
const num = 100
function num () {} // 这样会报错

// 这样会报错
function foo() {
  const bar = 10;
  var bar
}
```

常量不可以改变，然而，常量定义的对象属性是可以修改的

```js
const NUM = 10

NUM = 20 // 报错

const PERSON = {
  name: 'john'
}

PERSON.name = 'ben'
```

`变量的作用域`

```js
if (true) {
  var x = 10
}
console.log(x) // 10
```

如果在 ECMAScript6 中的`let`声明，将会报错

```js
if (true) {
  let x = 10
}
console.log(x) // x is not defined
```

`变量声明提升`

```js
console.log(x)
var x
```

上面的代码没有报错，只是值是`undefined`原因是 javascript 会自动提升变量的位置，在解析器读到`console.log(x)`这句代码之前，会先读取代码中的变量，并赋初始值为`undefined`,所以我们先获取，后声明并不会报错

```js
console.log(a === undefined) // true
var a = 10

// 等同于下面的代码

var a
console.log(a === undefined) // true
a = 10

var str = 'hello js'(function() {
  console.log(str) // undefined
  var str = 'javascript'
})()

// 等同于下面的代码

var str = 'global value'(function() {
  var str
  console.log(str) // undefined
  str = 'local value'
})()
```

如果改用`let`声明变量将不会自动提升到代码块的顶部

```js
console.log(x) // RefferenceError
let x = 10
```

`函数提升`
对于函数，只有函数声明会被提升到顶部，而不包括函数表达式

```js
// 函数声明
fn() // fun

function fn() {
  console.log('fun')
}

// 函数表达式
foo() // TypeError: foo is not a function

var foo = function() {
  console.log('foo')
}
```

`全局变量`

> 全局变量实际上就是全局对象的属性，`window`在浏览器中是全局对象，以`window.innerWidth`的方式来访问全局对象

### 变量的声明方式

1. `var`  声明一个变量
2. `let` 声明一个块级作用域的局部变量
3. `const` 声明一个只读的常量

```js
var value
if(value === undefined) {
  // do this
}
else {
  // do something
}
```

`undefined` 值在布尔类型环境中会被当作 false

``` js
var arr = []
if(!arr[0]) {
  console.log('hello')
}
```

`undefined` 在数值类型环境中 值会被转换为 `NaN`

``` js
var num
console.log(num + 2); // NaN
```

当你对一个 `null` 变量求值时，空值 `null` 在数值类型环境中会被当作0来对待，而布尔类型环境中会被当作 `false`

``` js
var val = null
typeof(val) // object
console.log(val * 2); // 0
console.log(val - 2); // -2
```

### 变量的作用域

> 在函数之外声明的变量，叫做全局变量。在函数之内声明的变量叫局部变量，其值只能在函数内访问。

``` js
if(true) {
  var a = 10
}
console.log(a); // 10
```

如果使用ES6中的let声明，情况就不一样了

``` js
if(true) {
  let a = 10
}
console.log(a); // ReferenceError: a is not defined
```

### 变量声明提升

``` js
console.log(a === undefined) // true
var a = 10

var a
console.log(a === undefined) // true
a = 10

var myvar = 'my value';
(function() {
  console.log(myvar)
  var myvar = 'local value'
})()

var myvar = 'my value';
(function() {
  var myvar
  console.log(myvar) // undefined
  myvar = 'local value'
})()
```

虽然变量提升并不会造成语法错误，但尽量不要这样写，不利于代码阅读。一个函数的var
语句尽可能放在接近函数顶部的地方。能不使用全局变量最好不使用全局变量。
在 ECMAScript 2015 中，let（const）将不会提升变量到代码块的顶部。

``` js
console.log(a) // referenceError: a is not defined
let a = 10;
```

``` js
const obj = {"name": "hello"}
obj.name = 'hello world'
```

字符串与数字(+)运算，会把数字转成字符串

``` js
a = 'my age is' + 10;  // tmy age is 10
b = 20 + 'this is he age'; // 20 this is he age
```

字符串与数字(-)运算，会把字符串转成数字

``` js
'20' - 10;  // 10
```

## 数据类型

javascript 中 7 中数据类型

- Boolean 布尔值， `true` 和 `false`

- null 值为 null 的特殊关键字

- undefined 变量未定义时的属性

- String 字符串 e.g: "abc"

- Number 数字 e.g: 18 or 3.4

- Symbol ES6 中新增类型，一个唯一且不可改变的

- Object 对象

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

## 类型转换

```js
var desc = 11

desc = 'This is a description'
```

一开始把 11 赋值给 `desc` 此时是 Number 类型
然后，我们在把字符串赋值给`desc` 这是完全正常的，因为 javascript 中类型的动态的

```js
x = 'my age is ' + 18
y = 18 + ' years old this year'

'18' - 8 // 10
'18' + 10 // '1810'
```

## 字面量

- 数组字面量
- 布尔字面量
- 浮点数字面量
- 整数
- 对象字面量
- 字符串字面量
- 正则

### 数组字面量

```js
var fruit = ['apple', 'banane', 'pear']
var arr = [3]

console.log(a.length) // 1
console.log(a[0]) // 3
```

数组字面值中的多余逗号,也会占一个位置，只是值为`undefined`

```js
var fish = ['lion', , 'Angel']
console.log(fish.length) // 3
console.log(a[1]) // 'undefined'
```

### 布尔字面量

布尔类型有两种字面量：`true`和`false`

### 整数字面量

- 十进制整数字面量由一串数字序列组成，且没有前缀 0
- 八进制的整数以 0（或 0O、0o）开头，只能包括数字 0-7
- 十六进制整数以 0x（或 0X）开头，可以包含数字（0-9）和字母 a~f 或 A~F
- 二进制整数以 0b（或 0B）开头，只能包含数字 0 和 1

### 浮点数字面量

浮点数字面值可以有以下的组成部分：

- 一个十进制整数，可以带正负号（即前缀“+”或“ - ”）
- 小数点（“.”）
- 小数部分（由一串十进制数表示）
- 指数部分

指数部分以“e”或“E”开头，后面跟着一个整数，可以有正负号（即前缀“+”或“-”）。浮点数字面量至少有一位数字，而且必须带小数点或者“e”（大写“E”也可）。

正则语法表示如下：

```js
[(+|-)][digits][.digits][(E|e)[(+|-)]digits]
```

### 对象字面量

```js
var fruit = {
  '': 'key 为空',
  '!': 'key 也可以是其他符合',
  apple: 10,
  banana: 20,
  orange: {
    num: 5,
    city: '新西兰'
  }
}
```

访问对象字面量，通过`对象.属性`名来访问

```js
console.log(fruit.apple)
console.log(fruit['apple'])
console.log(fruit.orange.num)
```

### RegExp 字面值

```js
var reg = /^\w+{2, 6}/
```

`字符串字面量`

```js
'abc'
'123'
'hello'
```

## 语句块

```js
{
  语句1;
  语句2;
  语句N;
}

while(true) {
  console.log('go')
}
```

### 条件判断

- `if...else`

```js
if (条件) {
  当条件为真的时候，执行语句1;
  当条件为真的时候，执行语句2;
} else {
  当条件为假的时候，执行语句3;
  当条件为假的时候，执行语句4;
}
```

- `switch`

```js
var date = '星期1'
switch(date) {
  case "星期1":
    console.log('吃面')
  [break;]
  case "星期2":
    console.log('吃面')
  [break;]
  case "星期3":
    console.log('吃面')
  [break;]
  default:
    console.log('还吃面')
    [break;]
}
```

### 循环

**`for`**

```js
var step
for (step = 0; step < 2; step++) {
  // 执行3次
  console.log(step)
}
```

**`do while`**

```js
var i = 0
do {
  i += 1
  console.log(i)
} while (i < 5)
```

**`while`**

```js
while (i < 5) {
  console.log(i)
}
```

**`break` 语句**

```js
for (var i = 0; i < 5; i++) {
  if (i == 3) {
    console.log('跳出for循环')
    break
  }
  console.log(i)
}
```

**`continue` 语句**

```js
for (var i = 0; i < 5; i++) {
  if (i == 3) {
    continue
    console.log('跳过，但会继续执行for循环', i)
  }
  console.log(i)
}

checkiandj: while (i < 4) {
  console.log(i)
  i += 1
  checkj: while (j > 4) {
    console.log(j)
    j -= 1
    if (j % 2 == 0) {
      continue checkj
    }
    console.log(j + ' is odd.')
  }
  console.log('i = ' + i)
  console.log('j = ' + j)
}
```

**`label`语句**

```js
var x = 0;
var z = 0
labelCancelLoops: while (true) {
  console.log("外部循环: " + x);
  x += 1;
  z = 1;
  while (true) {
    console.log("内部循环: " + z);
    z += 1;
    if (z === 10 && x === 10) {
      break labelCancelLoops;
    } else if (z === 10) {
      break;
    }
  }
```

**`for in`语句**

```js
var obj = { name: 'zhangchang', age: 20 }

for (var i in obj) {
  console.log('obj.' + i + '=' + obj[i])
}
```

`for of` 语句
`for in` 遍历的是数组的下标
`for of` 遍历的是数组的每个元素

```js
var arr = ['apple', 'banana', 'cherry', 'mango']

for (var j in arr) {
  console.log(j) // 0 1 2 3
}

for (var i of arr) {
  console.log(i) // 'apple', 'banana', 'cherry', 'mango'
}
```

**异常处理**
`throw`语句

```js
throw new Error()
throw 'error'
throw 123
throw false
throw {
  toString: function() {
    return 'A Object!'
  }
}

function UserException(message) {
  this.message = message
  this.name = 'UserException'
}

UserException.prototype.toString = function() {
  return this.name + ':"' + this.message + '"'
}

throw new UserException('value to high')
```

`try...catch` 语句

`catch`块是用来处理在`try`中抛出的错误

```js
try {
  throw 'error'
} catch (e) {
  console.log(e)
}
```

`finally`块

`finally`块接着在`try catch` 之后，无论是否抛出异常，就算没有异常处理，`finally`块都会执行

```js
openMyFile()

try {
  writeMyFile(theData) //This may throw a error
} catch (e) {
  handleError(e) // If we got a error we handle it
} finally {
  closeMyFile() // always close the resource
}
```

## 函数

### 函数声明

```js
function square(n) {
  return n * n
}
```

### 函数表达式

**匿名函数表达式**

```js
var square = function(n) {
  return n * n
}
```

**有名字的函数表达式**

```js
var factorial = function fac(n) {
  return n < 2 ? 1 : n * fac(n - 1)
}
```

### 函数传参

```js
function map(f, a) {
  var result = [],
    i
  for (i = 0; i != a.length; i++) result[i] = f(a[i])
  return result
}
```

### 函数调用

```js
square(2) // 4
var r = square(2)
console.log(r) // 4
```

### 函数作用域

```js
var name = 'global'

function globalFun() {
  console.log(name)
}

function localFun() {
  var name = 'local'
  console.log(name)
}

globalFun() // 'global'
localFun() // 'local'

var num1 = 10
var num2 = 20
function multiply() {
  return num1 * num2
}

multiply() // 200

function getScore() {
  var num1 = 2
  var num2 = 3

  function add() {
    return num1 + num2
  }

  return add()
}

getScore() // 5
```

### 递归

递归，函数调用自身，有 3 种方法可以实现递归

1. 函数名
2. argument.callee
3. 作用域下的一个指向该函数名的变量名

```js
var foo = function bar() {}
```

在这个函数体内，以下语句是等价的

```js
bar()
arguments.callee()
foo()
```

::: tip
递归需要有一个退出条件，类似循环
:::

```js
function walktree(node) {
  if (node == null) {
    return
  }
  for (var i = 0; i < node.childNodes.length; i++) {
    walktree(node.childNodes[i])
  }
}

function bar(x) {
  if (x < 0) {
    return
  }

  console.log('begin' + x)
  bar(x - 1)
  console.log('end: ' + x)
}

bar(3)
// begin:3
// begin:2
// begin:1
// begin:0
// end:0
// end:1
// end:2
// end:3
```

### 嵌套函数和闭包

内部函数只可以在外部函数中访问。
内部函数形成了一个闭包：它可以访问外部函数的参数和变量，但是外部函数却不能使用它的参数和变量。

```js
function addSquare(x) {
  function inside(y) {
    return x + y
  }
  return inside()
}
```

**多层嵌套函数**
函数可以多层嵌套，外层函数包含内层函数,A 包含 B，内层函数可以访问外层函数，B 可以访问 A, C 可以访问 B 和 A，因为 C 包含 B,B 包含 A，B 和 C 形成了闭包。

```js
function A(x) {
  function B(y) {
    function C(z) {
      console.log(x + b + c)
    }
    C(3)
  }
  B(2)
}
A(1) // 6
```

### 命名冲突

```js
function outside() {
  var a = 10
  function inside(a) {
    return a * 2
  }
  return inside
}

var out = outside() // return inside
out(20) // 40
```

### 闭包

```js
var pet = function(name) {
  var getName = function() {
    return name
  }

  return getName
}

var myPet = pet('poli')
myPet() // 'poli'
```

```js
var createPet = function(name) {
  var sex

  return {
    setName: function(newName) {
      name = newName
    },
    getName: function() {
      return name
    },
    setSex: function(newSex) {
      if (
        (typeof newSex === 'string' && newSex.toLowerCase() == 'male') ||
        newSex.toLowerCase() == 'female'
      ) {
        sex = newSex
      }
    },
    getSex() {
      return sex
    }
  }
}

var pet = createPet('wancai')
pet.getName()
pet.setSex('female')
pet.setName('gougou')
pet.getName()
pet.getSex()
```

### `arguments` 对象

函数的实际参数会被保存在一个类似数组的 arguments 对象中。在函数内，用`arguments[下标]`的方式来获取，在不确定参数数量的情况下，`arguments`就派上用场了

```js
arguments[i]
```

```js
function myConcat(separatar) {
  var res = ''
  for (var i = 0; i < arguments.length; i++) {
    res += arguments[i] + separatar
  }
  return res
}
myConcat('-', 'red', 'blue', 'green', 'yellow', 'pink')
```

::: tip
`arguments`变量只是类数组，并没有数组的方法
:::

### 函数参数

`默认参数`
函数参数的默认值是`undefined`

```js
function multiply(x, y) {
  y = typeof y !== 'undefined' ? y : 1
  return x * y
}
multiply(10) // 10
```

从 ECMAScript 6 开始，有两个新的类型的参数：默认参数，剩余参数

```js
function multiply(x, y = 1) {
  return a * y
}
```

如果给默认参数传递下面的值，会得到不同效果

```js
function test(n = 1) {
  console.log(typeof n)
}

test() // 'number'
test(undefined) // 'number'

test('') // 'string'
test(null) // 'object'
```

不传参数的时候默认是 1，这个已经非常明确了。 传入`undefined`的时候还是 1，因为函数的默认参数就是`undefined`所以传递`undefined`等同于`test()`
当传入空字符串的时候，此时参数为`string`类型， `null`是没有东西，但是`null`是`object`类型，所以参数的结果也就变了

```js
function append(value, array = []) {
  array.push(value)
  return array
}

append(1) // [1]
append(2) // [2] 并非[1, 2]
```

把函数作为一个默认参数

```js
function callSomething(thing = something()) {
  return thing
}

function something() {
  return 'sth'
}

callSomething() // 'sth'
```

### 剩余参数

剩余参数语法允许将不确定数量的参数表示为数组, 第一个参数之后的其他参数，我们不确定有多少个的情况下，使用剩余参数来

```js
function multiply(multiplier, ...theArgs) {
  return theArgs.map(it => {
    multiplier * it
  })
}
multiply(3, 1, 2, 3) // 3, 6, 9
```

**箭头函数**
箭头函数更简洁，同时，函数内的 this 指向函数本身

```js
function Person() {
  this.age = 0

  // 非严格模式下，定时器函数内的this并不指向Person函数
  setTimeout(function() {
    this.age++
  }, 1000)
}

function Person() {
  // 修正this指向
  var self = this
  this.age = 0

  setTimeout(function() {
    slef.age++
  })
}
```

使用箭头函数就不存在 this 指向错误问题

```js
function Person() {
  this.age = 0

  setTimeout(() => {
    this.age++
  })
}
```

## 预定义函数

**`eval()`**

- `eval()`方法会对一串字符串形式的 JavaScript 代码字符求值

**`isFinite()`**
`isFinite()`函数判断传入的值是否是有限的数值。 如果需要的话，其参数首先被转换为一个数值

**`isNaN()`**
`isNaN()` 函数判断一个值是否是`NaN`
注意：`isNaN`函数内部的强制转换规则十分有趣； 另一个可供选择的是 ECMAScript 6 中定义 Number.isNaN() , 或者使用 typeof 来判断数值类型。

**`parseFloat()`**
`parseFloat()` 函数解析字符串参数，并返回一个浮点数。

**`parseInt()`**
`parseInt()` 函数解析字符串参数，并返回指定的基数（基础数学中的数制）的整数。

**`decodeURI()`**
`decodeURI()` 函数对先前经过 encodeURI 函数或者其他类似方法编码过的字符串进行解码。

**`ecodeURIComponent()`**
`decodeURIComponent()`方法对先前经过 encodeURIComponent 函数或者其他类似方法编码过的字符串进行解码。

**`encodeURI()`**
`encodeURI()` 方法通过用以一个，两个，三个或四个转义序列表示字符的 UTF-8 编码替换统一资源标识符（URI）的某些字符来进行编码（每个字符对应四个转义序列，这四个序列组了两个”替代“字符）。

**`encodeURIComponent()`**
`encodeURIComponent()` 方法通过用以一个，两个，三个或四个转义序列表示字符的 UTF-8 编码替换统一资源标识符（URI）的每个字符来进行编码（每个字符对应四个转义序列，这四个序列组了两个”替代“字符）。

## 运算符

**赋值运算符**
赋值

```js
x = y // x = y
```

加法赋值

```js
x += y // x = x + y
```

减法赋值

```js
x -= y // x = x - y
```

乘法赋值

```js
x *= y // x = x * y
```

除法赋值

```js
x /= y // x = x / y
```

求余赋值

```js
x %= y // x = x % y
```

求幂赋值

```js
x **= y // x = x ** y
```

左移位赋值

```js
x <<= y // x = x << y
```

右移位赋值

```js
x >>= y // x = x >> y
```

无符号右移位赋值

```js
x >>>= y // x = x >>> y
```

按位与赋值

```js
x &= y // x = x & y
```

安位异或赋值

```js
x ^= y // x = x ^ y
```

按位或赋值

```js
x |= y // x = x | y
```

比较运算符

```js
var val1 = 1
var val2 = 2

等于 ==
val1 == 1
val1 == '1'

不等于 `!=`
val1 != '2')

全等 ===
val1 === 1  // true
var1 === '1' // false

全不等 !==
val2 !== val1

大于
val1 > val2  // false

大于等于
val1 >= 1 // true

小于
val1 < val2 // true

小于等于
val1 <= val2  // false
```

算数运算符

```js
10 / 4 = 2.5
```

- 求余%
  二元运算符. 返回相除之后的余数

```js
14 % 3 = 2
```

- 自增++
  一元运算符. 将操作数的值加一. 如果放在操作数前面 (++x), 则返回加一后的值; 如果放在操作数后面 (x++), 则返回操作数原值,然后再将操作数加一.

```js
var a = 3
++a // 4
```

- 自减--
  一元运算符. 将操作数的值减一. 前后缀两种用法的返回值类似自增运算符.

```js
var b = 10
--b // 9
```

- 一元负值符(-)
  一元运算符,返回操作数的负值

```js
var a = 8
console.log(-a) // -8
```

- 一元正值符(+)
  一元运算符, 如果操作数在之前不是 number，试图将其转换为 number

```js
console.log(+'7') // 7
```

位运算符

- 按位与 AND `&`
  在 a,b 的位表示中，每一个对应的位都为 1 则返回 1， 否则返回 0

```js
a & b
15 & 9 // 9 => 1111 & 1001 => 1001 = 9
```

- 按位或 OR `|`
  在 a,b 的位表示中，每一个对应的位，只要有一个为 1 则返回 1， 否则返回 0

```js
a | b
15 | 9 // 15 => 1111 | 1001 => 1111 = 15
```

- 按位异或 XOR `^`
  在 a,b 的位表示中，每一个对应的位，两个不相同则返回 1，相同则返回 0

```js
a ^ b
15 ^ 9 // 6 => 1111 ^ 1001 => 0110 = 6
```

- 按位非 NOT `~`
  反转被操作数的位

```js
~a
~15 // -16 => ~00000000...00001111 = 11111111...11110000
~9 // -10 => ~00000000...00001001 = 11111111...11110110
```

- 左移 shift `&`
  将 a 的二进制串向左移动 b 位,右边移入 0

```js
a << b
```

- 算术右移
  把 a 的二进制表示向右移动 b 位，丢弃被移出的所有位(译注:算术右移左边空出的位是根据最高位是 0 和 1 来进行填充的)

```js
a >> b
```

- 无符号右移
  把 a 的二进制表示向右移动 b 位，丢弃被移出的所有位，并把左边空出的位都填充为 0

```js
a >>> b
```

- 逻辑运算符
  `&&`逻辑与
  如果 expr1 能被转换为 false，那么返回 expr1；否则，返回 expr2。因此，&&用于布尔值时，当操作数都为 true 时返回 true；否则返回 false.

```js
expr1 && expr2
```

```js
var a1 = true && true // true
var a2 = true && false // false
var a3 = false && true // false
var a4 = false && 1 == 3 // false
var a5 = 'Cat' && 'Dog' // 'Dog'
var a6 = false && 'abc' // false
var a7 = 'abc' && false // 'abc'
```

`||`逻辑或
如果 expr1 能被转换为 true，那么返回 expr1；否则，返回 expr2。因此，||用于布尔值时，当任何一个操作数为 true 则返回 true；如果操作数都是 false 则返回 false

```js
expr1 || expr2
```

```js
var o1 = true || true // true
var o2 = true || false // true
var o3 = false || true // true
var o4 = false || 1 == 3 // false
var o5 = false || 'abc' // 'abc'
var o6 = 'abc' || 'xyz' // 'abc'
var o7 = 'xyz' || false // 'xyz'
```

`!`逻辑非
如果操作数能够转换为 true 则返回 false；否则返回 true。

```js
!expr1
```

```js
var n1 = !false // true
var n2 = !true // false
var n3 = !'abc' // false
```

短路求值

```js
true && 'abc' // abc
false && 'xyz' // false
```

字符串运算符

```js
console.log('my' + 'name') // 'myname'
```

条件（三元）云算法

```js
var a = 1
a > 2 ? '大于2' : '小于或者等于2'
```

逗号运算符

一元运算符
`delete`操作符，删除一个对象或一个对象的属性或者一个数组中某一个键值

```js
delete objectName
delete object.age
delete arr[0]
```

`typeof`操作符

```js
typeof a
typof(a)
```

```js
var fun = new Function(1)
var a = 'abc'
var num = 3
var date = new Date()

typeof fun // return function
typeof a // return string
typeof num // return number
typeof date // return object
typeof bbb // undefined

typeof true // boolean
typeof null // object

typeof Date // function
typeof Function // function
typeof Math // object
typeof Option // function
typeof String // function
```

`void`
void 运算符,表明一个运算没有返回值。expression 是 javaScript 表达式，括号中的表达式是一个可选项

```js
void expression
void expression
```

关系操作符`in`

```js
propNameOrNumber in objectName
```

```js
var fruit = ['apple', 'mongoo', 'banana', 'orange', 'pear']

'apple' in fruit // false
0 in fruit // true
6 in fruit // false

var str = 'abcdefg'
length in str // true

'PI' in Math // true

var obj = { name: 'hello', age: 30 }
name in obj // true
age in obj // true
```

`instanceof`
objectName 是需要做判别的对象的名称,而 objectType 是假定的对象的类型

```js
objectName instanceof objectType
```

```js
var today = new Date()
if (today instanceof Date) {
  // todo
}
```

### 表达式

**基本表达式**
`this`

```js
this.propertyName
this['propertyName']
```

**分组操作符**
分组操作符（）控制了表达式中计算的优先级

```js
var a = 1
var b = 2
var c = 3

// 默认优先级
a + b * c // 7
# 等同于下面的代码
a + (b * c) // 7

(a + b) * c // 9
```

**左值表达式**
`new`你可以使用`new operator` 创建一个自定义类型或者是预置类型的对象实例

```js
var objName = new ObjType(parma1, prama2, ..., pramaN)
```

`super`关键字可以用来调用一个对象父类的函数，它在用来调用一个类的父类的构造函数时非常有用

```js
super([arguments])
```

## 数字

- 十进制
  十进制可以以 0 开头，后面接其他十进制数字，但是假如下一个接的十进制数字小于 8，那么该数字将会被当做八进制处理。

```js
1234567890
19
0888 // 888 将被当做十进制处理
0777 // 在非严格格式下会被当做八进制处理 (用十进制表示就是511)
```

- 二进制
  二进制数字语法是以零为开头，后面接一个小写或大写的拉丁文字母 B(0b 或者是 0B)

```js
var FLT_SIGNBIT = 0b10000000000000000000000000000000 // 2147483648
var FLT_EXPONENT = 0b01111111100000000000000000000000 // 2139095040
var FLT_MANTISSA = 0b00000000011111111111111111111111 // 8388607
```

- 八进制
  八进制数字语法是以 0 为开头的。假如 0 后面的数字不在 0 到 7 的范围内，该数字将会被转换成十进制数字。

```js
var n = 0755
var b = 0654
```

- 十六进制
  十六进制数字语法是以零为开头，后面接一个小写或大写的拉丁文字母 X(0x 或者是 0X)。假如 0x 后面的数字超出规定范围(0123456789ABCDEF)，那么就会提示这样的语法错误

```js
0xfffffffffffffffff // 295147905179352830000
0x123456789abcdef // 81985529216486900
0xa // 10
```

指数形式

```js
1e3 // 1000
2e6 // 2000000
0.1e2 // 10
```

### 数字对象

- 数字的属性
  `Number.MAX_VALUE`可表示的最大值
  `Number.MIN_VALUE`可表示的最小值
  `Number.NaN`特指”非数字“
  `Number.NEGATIVE_INFINITY`特指“负无穷”;在溢出时返回
  `Number.POSITIVE_INFINITY`特指“正无穷”;在溢出时返回
  `Number.EPSILON`表示 1 和比最接近 1 且大于 1 的最小 Number 之间的差别
  `Number.MIN_SAFE_INTEGER`JavaScript 最小安全整数
  `Number.MAX_SAFE_INTEGER`JavaScript 最大安全整数

- 数字的方法
  `Number.parseFloat()`把字符串参数解析成浮点数，
  和全局方法 parseFloat() 作用一致
  `Number.parseInt()`把字符串解析成特定基数对应的整型数字，和全局方法 parseInt() 作用一致
  `Number.isFinite()`判断传递的值是否为有限数字
  `Number.isInteger()`判断传递的值是否为整数
  `Number.isNaN()`判断传递的值是否为 NaN
  `Number.isSafeInteger()`判断传递的值是否为安全整数

- 数字原型上的方法
  `toExponential()`返回一个数字的指数形式的字符串，形如：1.23e+2
  `toFixed()`返回指定小数位数的表示形式
  `toPrecision()`返回一个指定精度的数字

### 数学对象`Math`

Math.PI
Math.sin()
abs() // 绝对值
sin(), cos(), tan() // 标准三角函数;参数为弧度
asin(), acos(), atan(), atan2() // 反三角函数; 返回值为弧度
sinh(), cosh(), tanh() // 双曲三角函数; 返回值为弧度
asinh(), acosh(), atanh() // 反双曲三角函数;返回值为弧度
pow(), exp(), expm1(), log10(), log1p(), log2() // 指数与对数函数
floor(), ceil() // 返回最大/最小整数小于/大于或等于参数
min(), max() // 返回一个以逗号间隔的数字参数列表中的较小或较大值(分别地)
random() // 返回 0 和 1 之间的随机数
round(), fround(), trunc() // 四舍五入和截断函数
sqrt(), cbrt(), hypot() // 平方根，立方根，平方参数的和的平方根,两个参数平方和的平方根
sign() // 数字的符号, 说明数字是否为正、负、零
clz32() // 在 32 位 2 进制表示中，开头的 0 的数量
imul() // 返回传入的两个参数相乘结果的类 C 的 32 位表现形式

## Date 日期对象

Date 对象的范围是相对距离 UTC 1970 年 1 月 1 日 的前后 100,000,000 天
创建一个时间对象

```js
var date = new Date([params])
```

不使用 new 关键字来调用 Date 对象将返回当前时间和日期的字符串

创建时间对象的参数可以是下面任意一种：
无参数 创建今天的日期和时间，例如：

```js
var today = new Date()
```

一个符合以下格式的表示日期的字符串: "月 日, 年 时:分:秒.", 如果省略时分秒，它们将默认为 0

```js
var date = new Date('September 11 2001 09:11:11')
```

一个年，月，日的整型值的集合

```js
var date = new Date(1997, 7, 1)
```

一个年，月，日，时，分，秒的集合

```js
var date = new Date(1999, 10, 1, 12, 30, 0)
```

### Date 对象的方法

- `set` 方法, 用于设置 Date 对象的日期和时间的值
- `get` 方法,用于获取 Date 对象的日期和时间的值
- `to` 方法,用于返回 Date 对象的字符串格式的值
- `parse` 和`UTC` 方法, 用于解析 Date 字符串

`get` 和 `set`方法可以设置和取秒，分，时，日，星期，月份，年
`getDay`可以获取到星期，但是，没有设置星期的方法

- 秒， 分： 00-59
- 时： 0-23
- 星期： 0(周日)-6(周六)
- 日期： 1-31
- 月份： 0(一月) - 11(十二月)
- 年份： 从 1900 开始的年数

## 字符串

- String 字面量
  可以使用单引号或双引号创建简单的字符串

```js
'hello'
'world'
```

16 进制转义序列

```js
'\xA9' // "©"
```

Unicode 转义序列
Unicode 转义序列在\u 之后需要至少 4 个字符

```js
'\u00A9' // "©"
```

Unicode 字元逸出

- 字符串对象
  `String` 对象是对原始 string 类型的封装

```js
var str = new String('abc')
console.log(str)
```

除非必要, 应该尽量使用 String 字面值, 因为 String 对象的某些行为可能并不与直觉一致

```js
var s1 = '2 + 2'
var s2 = new String('2 + 2')
eval(s1)
eval(s2)
```

字符串的长度`length`属性, 长度包括空格

```js
var str = 'hello world'
var len = str.length // 11
```

**`String`对象方法**
返回字符串指定位置的字符或者字符编码

```js
charAt()
charCodeAt()
codePointAt()
```

分别返回字符串中指定子串的位置或最后位置

```js
indexOf()
lastIndexOf()
```

返回字符串是否以指定字符串开始、结束或包含指定字符串

```js
startsWith()
endsWith()
includes()
```

连接两个字符串并返回新的字符串

```js
concat()
```

从指定的 Unicode 值序列构造一个字符串。这是一个 String 类方法，不是实例方法

```js
fromCharCode()
fromCodePoint()
```

通过将字符串分离成一个个子串来把一个 String 对象分裂到一个字符串数组中

```js
split()
```

从一个字符串提取片段并作为新字符串返回

```js
slice()
```

分别通过指定起始和结束位置，来返回字符串的指定子集

```js
substring()
```

起始位置和长度来返回字符串的指定子集

```js
substr()
```

通过正则表达式来工作

```js
match()
replace()
search()
```

分别返回字符串的小写表示和大写表示

```js
toLowerCase()
toUpperCase()
```

按照指定的一种 Unicode 正规形式将当前字符串正规化

```js
normalize()
```

将字符串内容重复指定次数后返回

```js
repeat()
```

去掉字符串开头和结尾的空白字符

```js
trim()
```

下面是 🌰 demo

```js
var str = '百度-WWW.baidu.com'
```

按下标查找字符串

```js
str.charAt(1) // '度'
```

将字符转为数字

```js
str.charCodeAt(1) // 24230
```

将数字转为文字字符

```js
String.fromCharCode(30334, 24230) // '百度'
```

根据给出的下标，查找字符所在位置（从前往后找）

```js
str.indexOf('m', 4) // 15
```

根据给出的下标，查找字符所在位置（从后往前找）

```js
str.lastIndexOf('o') // 14
```

字符串的比较，按照位置来一一对比，只要有一个大，后面就不做比较

```js
'1000' < '2' // true
```

2 种不同类型比较，默认会做隐式转换，字符串将会转为数字，所以为 true

```js
'1000' > 2 // true
```

截取字符串，起始位置，结束位置 可以检测 2 个数，大的往后扔，小的往前扔,负数则为 0

```js
str.substring(0, 4) // "百度-w"
```

截取字符串,如果为负数,则将从后往前数,来截取字符,不交换位置

```js
str.slice(-3) // 'com'
```

转换为大写(只针对英文)

```js
str.toUpperCase() // "百度-WWW.BAIDU.COM"
```

转换为小写(只针对英文)

```js
str.toLowerCase() // "百度-www.baidu.com"
```

切割字符串，第一个参数是以什么截断字符串，第二参数是保留几段,转入数组中，此时已是数组,如果不传参数，则整个字符串一起切割，如果传入空字符串，则以每个字符来切割

```js
str.split('.', 2) // ["百度-www", "baidu"]
```

将数组拼接为字符串，参数是拼接的符号，如不传参，则默认为'，'号拼接，如传的是'' 空字符串，则没有任何符号拼接

```js
var arr = ['www', 'baidu', 'com']
arr.join('aaa') // "wwwaaabaiduaaacom"
```

## 正则表达式

`g` 全局匹配 是否全文搜索，默认 false

`i` 忽略大小写 是否大小写敏感，默认 false

`m` 多行匹配(字符串有换行的时候)，默认 false

### 正则的写法

```js
var re = /a/
var re = /a+b/
var re = /^[a-zA-Z]+[0-9]*\W?_$/gi
var re = new RegExp('a')
var re = new RegExp('a+c')
var re = new RegExp('^[a-zA-Z]+[0-9]*W?_$', 'gi')
```

### 正则方法

```js
// 一个在字符串中执行查找匹配的 RegExp 方法，它返回一个数组（未匹配到则返回 null）
exec()

// 一个在字符串中测试是否匹配的 RegExp 方法，它返回 true 或 false
test()

// 一个在字符串中执行查找匹配的 String 方法，它返回一个数组或者在未匹配到时返回 null
match()

// 一个在字符串中测试匹配的 String 方法，它返回匹配到的位置索引，或者在失败时返回-1
search()

// 一个在字符串中执行查找匹配的 String 方法，并且使用替换字符串替换掉匹配到的子字符串
replace()

// 一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的 String 方法
split()

// 检索字符串中指定的值。返回 true 或 false
test()

// 检索字符串中指定的值。返回找到的值，并确定其位置
exec()

// 检索与正则表达式相匹配的值
search()

// 找到一个或多个正则表达式的匹配
match()

// 替换与正则表达式匹配的子串
replace()

// 把字符串分割为字符串数组
split()
```

### 预定义类

`.` 除了回车符和换行符之外的所有字符
`. = [^\r\n]`

`\d` 数字字符
`\d = [0-9]`

`\D` 非数字字符
`\D = [^0-9]`

`\s` 空白符
`\s = [\t\n\x0B\f\r]`

`\S` 非空白符
`\S = [^\t\n\x0B\f\r]`

`\w` 单词字符（字母、数字下划线）
`\w = [a-zA-Z_0-9]`

`\W` 非单词字符
`\W = [^a-zA-Z_0-9]`

### 边界

`^` 以 xxx 开头

`$` 以 xxx 结束

`\b` 单词边界

`\B` 非单词边界

```js
var re = /^@./g
var str = '@123@456@789@'
str.replace(re, 'X') // X23@456@789@

var re = /.@$/g
var str = '@123@456@789@'
str.replace(re, 'X') // @123@456@78X

var re = /\bis\b/g
var str = 'who is this man? This man who?'
str.replace(re, 'X') // who X this man? This man who?

var re = /\Bis\b/g
var str = 'who is this man? This man who?'
str.replace(re, 'X') // who is thX man? ThX man who?
```

### 重复项

`\1` 重复的第一个子项

`\2` 重复的第二个子项

### 或 `|`

```js
var re = /b(e|a|i)d/g
var str = 'bedbadbabybid'
str.replace(re, 'X') // XXbabyX
```

### `[]` 范围选择

- `[abc]` 括号内的任意字符匹配均可以

- `[a-z]` 范围 a-z 的范围内

- `[h-m]` h - m 范围

- `[A-Z]` 范围 A-Z 的范围内

- `[0-9]` 范围 0-9 的范围内

```js
var re = /[a-z]/g
var str = 'a1b2c3d4x5y6z7'
str.replace(re, 'X')

var re2 = /[a-zA-Z]/g
var str2 = 'a1b2c3d4x5y6z7ABCDE'
str2.replace(re2, '0')

var re3 = /[0-9-]/g
var str3 = '1948-01-21'
str3.replace(re3, 'G')
```

### 量词

`{n}` 正好出现 n 次

`{n,m}` 最少出现 n 次，最多 m 次

`{n,}` 最少出现 n 次，最多不限

`+`同`{1,}` 最少出现 1 次，最多不限

`?`同`{0,1}` 最少出现 0 次就是可以不出现，最多 1 次

`*`同`{0,}` 最少出现 0 次，最多不限 (谨慎使用)

### 分组 `()`

```js
var re = /[a-z]\d{3}/g
var str = 'a1b2c3d4'
str.replace(re, 'X') // a1b2c3d4

var re = /([a-z]\d){3}/g
var str = 'a1b2c3d4'
str.replace(re, 'X') // Xd4
```

### 正则匹配实用 🌰

- 浮点数 float

```js
;/^[-\+]?\d+(\.\d+)?$/
```

- 正整数 integer

```js
;/^[-\+]?\d+$/
```

- 数字 0-9 number

```js
;/^\d+$/
```

- 中文汉字 chiness string

```js
;/^[\u0391-\uFFE5]+?$/
```

- 汉字

```js
;/^[\u4e00-\u9fa5]+$/
```

- 中文汉字或者字符

```js
;/^[\u0391-\uFFE5]+$/
```

- 英文字符串 English string

```js
;/^[a-zA-Z]+$/
```

- 手机号码 phone number

```js
value.length == 11 && /^(13[0-9]{1}|(15[0-9]{1})|(18[0-9]{1})\d{8})$/
```

- 电话号码 telephone

```js
;/^(\d{3,4}-?)?(\d{7,9})$/g
```

- qq 号码

```js
;/^[1-9]\d{4,12})/
```

- 邮编 post code

```js
;/^[0-9]{6}/
```

- 6-12 位密码 password, only start for letter and length between 6-12

```js
;/^[a-zA-Z]\w{6,12}$/
```

- Ip 地址

```js
;/^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/
```

- 字符验证，只能包含中文、英文、数字、下划线等字符

```js
;/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/
```

- 判断是否为合法字符( a-zA-Z0-9-\_ )

```js
;/^[A-Za-z0-9_-]+$/
```

- 判断是否包含中英文特殊字符，除英文" -\_ "字符外

```js
var reg = RegExp(
  /[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/
)
```

- 车牌号校验

```js
function isPlateNo(plateNo) {
  var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/
  if (re.test(plateNo)) {
    return true
  }
  return false
}
```

- 身份证号码的验证规则

```js
function isIdCardNo(num) {
  //if (isNaN(num)) {alert("输入的不是数字！"); return false;}
  var len = num.length,
    re
  if (len == 15) re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/)
  else if (len == 18)
    re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/)
  else {
    //alert("输入的数字位数不对。");
    return false
  }
  var a = num.match(re)
  if (a != null) {
    if (len == 15) {
      var D = new Date('19' + a[3] + '/' + a[4] + '/' + a[5])
      var B =
        D.getYear() == a[3] && D.getMonth() + 1 == a[4] && D.getDate() == a[5]
    } else {
      var D = new Date(a[3] + '/' + a[4] + '/' + a[5])
      var B =
        D.getFullYear() == a[3] &&
        D.getMonth() + 1 == a[4] &&
        D.getDate() == a[5]
    }
    if (!B) {
      //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。");
      return false
    }
  }
  if (!re.test(num)) {
    //alert("身份证最后一位只能是数字和字母。");
    return false
  }
  return true
}
```

## Array

### 创建数组

```js
var arr = new Array('ab', 'cd', 'ef')
var arr = Array('ab', 'c', 'd')
var arr = ['a', 'b', 'c', 'd']
```

创建一个长度不为 0，但是又没有任何元素的数组

```js
var arr = new Array(4)
var arr = Array(4)
arr.length // 4

var arr = []
arr.length = 4
```

```js
var arr = [42] // 创建一个只有唯一元素的数组:

var arr = Array(42) // 创建一个没有元素的数组,但是数组的长度被设置成42.

// 上面的代码与下面的代码等价
var arr = []
arr.length = 42
```

### 填充数组

```js
var arr = []
arr[0] = 'abc'
arr[1] = 'xyz'
```

### 引用数组

```js
var arr = ['red', 'blue', 'yellow']
arr[2] // yellow
arr['length'] // 3
```

### 数组长度

```js
var color = []
color[10] = 'red'
console.log(color.length) // 11

var arr = ['red', 'blue', 'green', 'yellow']
console.log(arr.length)

arr.length = 3
console.log(arr) // ['red', 'blue', 'green']

arr.length = 0
console.log(arr)[(undefined, undefined, undefined)]
```

### 遍历数组

```js
var colors = ['red', 'blue', 'green', 'yellow']
for (var i = 0; i < colors.length; i++) {
  console.log(i)
  console.log(colors[i])
}

colors.forEach(function(color) {
  console.log(color)
})
```

### 数组的方法

```js
// 连接两个数组并返回一个新的数组
concat()

// 将数组的所有元素连接成一个字符串
join()

// 在数组末尾添加一个或多个元素，并返回数组操作后的长度
push()

// 从数组移出最后一个元素，并返回该元素
pop()

// 从数组移出第一个元素，并返回该元素
shift()

// 在数组开头添加一个或多个元素，并返回数组的新长度
unshift()

// 从数组提取一个片段，并作为一个新数组返回
slice()

// 从数组移出一些元素，（可选）并替换它们
splice()

// 颠倒数组元素的顺序：第一个变成最后一个，最后一个变成第一个
reverse()

// 给数组元素排序
sort()

// 在数组中搜索 searchElement 并返回第一个匹配的索引。
indexOf()

// 和 indexOf 差不多，但这是从结尾开始，并且是反向搜索。
lastIndexOf()

// 在数组每个元素项上执行 callback
forEach()

// 在数组的每个单元项上执行 callback 函数，并把返回包含回调函数返回值的新数组（译者注：也就是遍历数组，并通过 callback 对数组元素进行操，并将所有操作结果放入数组中并返回该
map()

// 返回一个包含所有在回调函数上返回为 true 的元素的新数组（译者注：callback 在这里担任的是过滤器的角色，当元素符合条件，过滤器就返回 rue，而 filter 则会返回所有符合过滤条件的
filter()

// 数组中每一个元素在 callback 上被返回 true 时就返回 true（译者注：同上，every 其实类似 filter，只不过它的功能是判断是不是数组中的所元素都符合条件，并且返回的是布
every()

// 只要数组中有一项在 callback 上被返回 true，就返回 true（译者注：同上，类似 every，不过前者要求都符合筛选条件才返回 true，后者只要有合条件的就返回 tr
some()

// 使用回调函数 callback(firstValue, secondValue) 把数组列表计算成一个单一值（译者注：他数组元素两两递归处理的方式把数组计算成一个值
reduce()
```

### 多维数组

```js
var arr = [['abc', 'xyz'], [1, 2, 3], [4, 5, 6]]

console.log(arr[0][0]) // abc
```

## 映射

**Map 对象**
一个 Map 对象就是一个简单的键值对映射集合，可以按照数据插入时的顺序遍历所有的元素

```js
var saying = new Map()

saying.set('dog', 'woof')
saying.set('cat', 'meow')
saying.set('elephant', 'toot')

saying.size // 3
saying.get('fox') // undefined
saying.has('bird') // false
saying.delete('dog')
saying.has('dog') // false
```

遍历`Map`对象

```js
for (let [key, val] of saying) {
  console.log(key + '=' + val)
}
```

清空`Map`对象

```js
saying.clear()
console.log(saying.size) // 0
```

Object 和 Map 比较

- Object 的键均为 Strings 类型，在 Map 里键可以是任意类型。
- 必须手动计算 Object 的尺寸，但是可以很容易地获取使用 Map 的尺寸。
- Map 的遍历遵循元素的插入顺序。
- Object 有原型，所以映射中有一些缺省的键。（可以理解为 map = Object.create(null)）

在开发中，到底是使用`Object` 还是 `Map` ?
这三条提示可以帮你决定用 Map 还是 Object：

- 如果键在运行时才能知道，或者所有的键类型相同，所有的值类型相同，那就使用 Map。
- 如果需要将原始值存储为键，则使用 Map，因为 Object 将每个键视为字符串，不管它是一个数字值、布尔值还是任何其他原始值。
- 如果需要对个别元素进行操作，使用 Object。

WeakMap 对象

```js
const privates = new WeakMap()

function Public() {
  const me = {
    // Private data goes here
  }
  privates.set(this, me)
}

Public.prototype.method = function() {
  const me = privates.get(this)
  // Do stuff with private data in `me`...
}

module.exports = Public
```

## 集合

Set 对象
::: tip
Set 对象是一组值的集合，这些值是不重复的，可以按照添加顺序来遍历。
:::

```js
var mySet = new Set()
mySet.add(1)
mySet.add('foo bar')
mySet.add('abc')

mySet.has(1) // true
mySet.delete('abc')
mySet.size() // 2

for (let i of mySet) {
  console.log(i) // 1 'foo bar'
}
```

### 数组和集合的转换

可以使用 Array.from 或展开操作符来完成集合到数组的转换。同样，Set 的构造器接受数组作为参数，可以完成从 Array 到 Set 的转换。需要重申的是，Set 对象中的值不重复，所以数组转换为集合时，所有重复值将会被删除。

```js
var mySet = new Set()
mySet.add(1)
mySet.add('abc')
var myNewSet = Array.from(mySet)

myNewSet = [...mySet]

var mySet2 = new Set([1, 2, 3, 4])
```

### Array 与 Set 比较

一般情况下，在 JavaScript 中使用数组来存储一组元素，而新的集合对象有这些优势：

- 数组中用于判断元素是否存在的 indexOf 函数效率低下。
- Set 对象允许根据值删除元素，而数组中必须使用基于下标的 splice 方法。
- 数组的 indexOf 方法无法找到 NaN 值。
- Set 对象存储不重复的值，所以不需要手动处理包含重复值的情况。

## 对象 `Object`

### 对象和属性

```js
var apple = new Object()
apple.color = 'red'
apple.weight = 1
apple.price = 5
```

对象中未赋值的属性的值为 undefined（而不是 null）
对象的属性还可以通过`方括号`的方式访问

```js
apple['color']
apple['weight']
```

一个对象的属性名可以是任何有效的 JavaScript 字符串，或者可以被转换为字符串的任何类型，包括空字符串。然而，一个属性的名称如果不是一个有效的 JavaScript 标识符（例如，一个由空格或连字符，或者以数字开头的属性名），就只能通过方括号标记访问。这个标记法在属性名称是动态判定（属性名只有到运行时才能判定）时非常有用

```js
var myObj = new Object()
var obj2 = new Object()
var str = 'string'
var rdm = Math.random()

myObj[obj2] = 'object'
myObj[str] = 'string'
myObj[rdm] = 'random number'
myObj[''] = 'empty'
```

### 枚举对象的所有属性

`for...in` 循环
该方法依次访问一个对象及其原型链中所有可枚举的属性

`Object.keys(obj)`
该方法返回一个对象 `obj` 自身包含（不包括原型中）的所有属性的名称的数组。

`Object.getOwnPropertyNames(obj)`
该方法返回一个数组，它包含了对象 `obj` 所有拥有的属性（无论是否可枚举）的名称

遍历访问对象的所有属性
在 ECMAScript 5 之前，没有原生的方法枚举一个对象的所有属性。然而，可以通过以下函数完成

```js
function listAllProperties(o) {
  var objectToInspect
  var result = []

  for (
    objectToInspect = o;
    objectToInspect !== null;
    objectToInspect = Object.getPrototypeOf(objectToInspect)
  ) {
    result = result.concat(Object.getOwnPropertyNames(objectToInspect))
  }

  return result
}
```

### 创建对象

使用对象初始化器

```js
var obj = {
  name: 'helloman',
  2: 'number',
  [2 + 3]: '5555',
  job: 'web developer'
}

var myHonda = {
  color: 'red',
  wheels: 4,
  engine: {
    cylinders: 4,
    size: 2.2
  }
}
```

### 使用构造函数

```js
function Car(make, model, color) {
  this.make = make
  this.model = model
  this.color = color
}

var myCar = new Car('bill', 'Talon tsi', 1990)
```

一个对象的属性值可以是另外一个对象

```js
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
}

var foo = new Person('geo', 30, 'teacher')
var bar = new Person('lucy', 23, 'dancer')

function Car(make, model, year, owner) {
  this.make = make
  this.model = model
  this.year = year
  this.owner = owner
}

var car1 = new Car('eagle', 'Talon', 1992, foo)
var car2 = new Car('Nisson', 'BMW', 1900, bar)
```

Object.create()方法

对象也可以用 Object.create() 方法创建。该方法非常有用，因为它允许你为创建的对象选择其原型对象，而不用定义一个构造函数。

```js
var Animal = {
  type: 'Mammals',
  displayType: function() {
    console.log(this.type)
  }
}

var dog = Object.create(Animal)
dog.displayType() // 'Mammals'

var fish = Object.create(Animal)
fish.type = 'Fishes'
fish.displayType() // Fishes
```

**对象的继承**
所有的 JavaScript 对象继承于至少一个对象。被继承的对象被称作原型，并且继承的属性可通过构造函数的 prototype 对象找到

**对象的属性索引**
JavaScript 1.0 中，你可以通过名称或序号访问一个属性。但是在 JavaScript 1.1 及之后版本中，如果你最初使用名称定义了一个属性，则你必须通过名称来访问它；而如果你最初使用序号来定义一个属性，则你必须通过索引来访问它。

### 对象上的属性

```js
Car.prototype.color = 'red'
myCar.color = 'green'
```

### 对象上的方法

```js
obj1.show = function() {
  console.log('show')
}

var obj2 = {
  show: function() {
    console.log('show')
  }
  hide() {
    console.log('hide')
  }
}

obj1.show()
obj2.hide()
```

### 对象中的`this`

定义`getters`与`setters`

```js
var d = Date.prototype
Object.defineProperty(d, 'year', {
  get: function() {
    return this.getFullYear()
  },
  set: function(val) {
    this.setFullYear(val)
  }
})

var o = {
  a: 1,
  get b() {
    return this.a + 1
  },
  set c(x) {
    this.a = x / 2
  }
}
```

使用 Object.defineProperties 的方法，同样也可以对一个已创建的对象在任何时候为其添加 getter 或 setter 方法。这个方法的第一个参数是你想定义 getter 或 setter 方法的对象，第二个参数是一个对象，这个对象的属性名用作 getter 或 setter 的名字，属性名对应的属性值用作定义 getter 或 setter 方法的函数，下面是一个例子定义了和前面例子一样的 getter 和 setter 方法

```js
var o = { a: 1 }
Object.defineProperties(o, {
  b: {
    get: function() {
      return this.a + 1
    }
  },
  c: {
    set: function(x) {
      this.a = x / 2
    }
  }
})
```

### 删除属性

```js
var obj = new Object()

obj.a = 1
obj.b = 2

delete obj.a
```

如果一个全局变量不是用 var 关键字声明的话，你也可以用 delete 删除它

```js
g = 'global'
delete g
```

**比较对象**
在 JavaScript 中 objects 是一种引用类型。两个独立声明的对象永远也不会相等，即使他们有相同的属性，只有在比较一个对象和这个对象的引用时，才会返回 true.

```js
var fruit = { name: 'apple' }
var fruitbear = { name: 'apple' }

fruit == fruitbear // false
fruit === fruitbear // false
```

两个变量, 同一个对象

```js
var fruit = { name: 'apple' }
var fruitbear = fruit

fruit == fruitbear // true
fruit === fruitbear // true
```

**对象的属性**
添加属性
在 JavaScript 中，您可以在运行时为任何对象添加属性，而不必受限于构造器函数提供的属性。添加特定于某个对象的属性，只需要为该对象指定一个属性值

```js
var mark = new WorkerBee()
mark.name = 'Doe, Mark'
mark.dept = 'admin'
mark.projects = ['navigator']

mark.bonus = 1000
```

这样 mark 对象就有了 bonus 属性，而其它 WorkerBee 则没有该属性

## 类`Class`

### 构造函数 Constructor

```js
class CoolGuy {
  specialTrick = nothing

  CoolGuy(trick) {
    specialTrick = trick
  }

  showOff() {
    output("Here's my trick", specialTrick)
  }
}

var John = new CoolGuy('bmw')
John.showOff()
```

### 类的继承

```js
// 交通工具类
class Vehicle {
  engine = 1

  ignition() {
    output('turning on my engine')
  }

  drive() {
    ignition()
    output('Steering and moving forward')
  }
}

// 汽车类
class Car inherits Vehicle {
  wheels = 4

  drive() {
    inherited: drive()
    output('Rolling on all', wheels, 'whells')
  }
}

// 游船类
class SpeedBoat inherits Vehicle {
  engines = 2

  ignition() {
    output('truning on my', engines, 'engines')
  }

  pilot() {
    inherited: drive()
    output('Speeding through the water with ease')
  }
}
```

汽车与游船都属于交通工具类，同时都有引擎，汽车可能只有 1 个，轮船有可能有 2 个，这是不同的地方，但它们共同的地方是，开动之前都需要先发动引擎，还有 drive 是所有交通类都有的，所以单独出来，作为父类，让其他交通工具类来继承。

javascript 的类是 ES6 才具有的，在此前的版本根本没有类的说法，那怎么样能实现继承呢？
用拷贝的方式来实现类似继承的效果。

```js
function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key]
    }
  }

  return targetObj
}

var Vehicle = {
  engines: 1,
  ignition: function() {
    console.log('发动引擎')
  },
  drive: function() {
    this.ignition()
    console.log('驾驶前进')
  }
}

var Car = mixin(Vehicle, {
  wheels: 4,
  drive: function() {
    Vehicle.drive.call(this)
    console.log('开着' + whells + '个轮子的汽车')
  }
})
```

### 寄生继承

```js
// 传统面向对象的写法
function Vehicle() {
  this.engines = 1
}

Vehicle.prototype.ignition = function() {
  console.log('发动我的引擎')
}

Vehicle.prototype.drive = function() {
  this.ignition()
  console.log('驾驶前进')
}

function Car() {
  var car = new Vehicle()

  car.wheels = 4

  var vehDrive = car.drive

  car.drive = function() {
    vehDrive.call(this)
    console.log('驾驶着我的' + this.wheels + '个轮子的汽车')
  }

  return car
}

var myCar = new Car()
myCar.drive()
```

### 隐私继承

```js
var Soldier = {
  count: function() {
    this.name = '我的一名士兵'
    this.number = this.number ? this.number + 1 : 1
  }
}

Soldier.count()
Soldier.name
Soldier.number // 1

var Another = {
  count: function() {
    Soldier.count.call(this)
  }
}

Another.count()
Another.name
Another.number // 1
```

## This

this 谁调用它，它就指向谁。
这个例子中，对象 blue 和 green 使用了[call](http://ykpine.net/coding/call.md) 方法，color()方法，因为 blue 和 green 本身并没有 color()方法。
也可以理解为 color()这个函数，将 this 指向了 blue 和 green 对象，这时候函数里的 this 就是指向的对象，对象里面有 name 属性

showColor() 方法也是调用了[call](http://ykpine.net/coding/call.md) 方法，函数体内的 this 指向就是 blue 和 green 对象本身。对象又借助 call 调用 color()方法，将 this 传给对象。

```js
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

```js
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

```js
function count(num) {
  console.log('timer=>' + num)
  this.timer++
}
count.timer = 0

for (var i = 0; i < 5; i++) {
  count(i) // 调用了5次
}

console.log(count.timer) // 0
```

上面这段代码，count 在 for 循环里被执行了 5 次，但最后 timer 的值还是 0，并没有被改变。
count 函数调用的时候，this 指向是 window，你可以这样理解，在 for 循环里的代码是 window.count(i), 那函数里的 this 指向就是 window,然而 window 下并无 timer 的变量，所以打印的 count.timer 是初始定义的值，所以是 0

```js
function count(num) {
  console.log('count ' + num)
  obj.timer++
}

var obj = {
  timer: 0
}

for (var i = 0; i < 5; i++) {
  count(i)
}

console.log(obj.timer) // 5
```

```js
function count(num) {
  console.log('count ' + num)
  count.timer++
}

count.timer = 0

for (var i = 0; i < 5; i++) {
  count(i)
}

console.log(count.timer) // 5
```

如果代码换成这样，是不是能就更好的理解了？
现在在来看下面这个例子

```js
function count(num) {
  console.log('count ' + num)
  this.timer++
}

count.timer = 0

for (var i = 0; i < 5; i++) {
  count.call(count, i)
}

console.log(count.timer) // 5
```

这次我们使用 call，来修改 this 指向，将 count 函数里的 this 指向 count 自己本身，count.timer 初始值定义了 0，循环了几次自然就自增了几次，所以得到的值为 5

有了上面这几个例子，对 this 指向是否已经有所理解了呢？

```js
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

```js
function foo() {
  console.log(this.num)
}

var num = 666

foo() // 666
```

严格模式下，this 的范围只在当前函数体内

```js
function foo() {
  'use strict'
  console.log(this.num)
}
var num = 666

foo() // TypeError: Cannot read property 'num' of undefined
```

```js
function foo() {
  console.log(his.num)
}

var num = 666(function() {
  'use strict'

  foo() // 666
})()
```

自执行函数内定义了严格模式，但调用了非严格模式下的函数，这样对函数并不起作用，但这样的写法并无意义

```js
function foo() {
  console.log(this.num)
}

var obj = {
  num: 8,
  foo: foo
}

obj.foo() // 8
```

foo 函数被 obj 对象引用了，此时 foo 里面的 this 隐式的绑定了 obj

```js
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

```js
function foo(num) {
  console.log(this.num)
}

var obj = {
  num: 8,
  foo: foo
}

var bar = obj.foo // 等同与 var bar = foo
var num = 2

bar() // 等同与 window.bar()  2
```

函数体内调用执行的方法，this 指向都是 window

```js
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

定时器内执行的函数 this 指向也是 window

```js
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

使用 call 来改变 this 指向

```js
function foo() {
  console.log(this.num)
}

var obj = {
  num: 10
}

var bar = function() {
  foo.call(obj)
}

bar() // 10
setTimeout(bar, 1000) // 10
bar.call(window) // 10
```

通过使用 call 方法后，不管哪种方式调用，都能保证 foo 函数内的 this 指向 obj

```js
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

```js
var bind = function(fn, obj) {
  return function() {
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

Function 原型的 bind 来绑定对象

```js
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

```js
function foo(el) {
  console.log(el, this.id)
}

var obj = {
  id: 'hello'
}[(4, 5, 6)].forEach(foo, obj) // 4 hello 5 hello 6 hello
```

```js
function foo(a) {
  this.a = a
}

var bar = new foo(2) // 相当于 b 引用来 foo = {a: 2}
console.log(bar.a) // 2
```

```js
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

```js
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

var baz = new obj.foo(4) // bar = foo => {a: 4}
console.log(obj.a) // 2
console.log(bar.a) // 4
```

```js
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

如果对象通过使用 new 关键字创建出来的话，this 指向就是函数本身

```js
var bar = new foo() // this => foo
```

如果对象通过 call 或者 apply 关键字显式绑定对象的话，this 指向就是绑定的对象

```js
var bar = foo.call(obj) // this => obj
```

如果对象通过 context 上下文来隐式绑定对象的话，this 指向就是 context 上下文的对象

```js
var bar = foo.call(obj) // this => obj
```

如果对象没有使用 new、call、apply 关键字，也没有通过 context 上下文传参，在非(strict)严格模式下 this 指向就是全局对象 window，如果在(strict)严格模式下，this 为 undefined

```js
var bar = foo() // this => window
```

如果通过 call 关键字来绑定对象 null、window 、undefined 的话，这些值会被忽略掉的

```js
function foo() {
  console.log(this.a)
}

var a = 10

foo.call(null) // 10
foo.call(window) // 10
foo.call(undefined) // 10
```

通过绑定 null 关键字来指定对象，虽然被忽略掉，但经常被用来传递多个或不确定参数时来使用

```js
function foo(a, b) {
  console.log('a:' + a + ',b:' + b)
}

foo.apply(null, [6, 7]) // a: 6 b: 7
var bar = foo.bind(null, 8) // a
bar(9) // 9
```

```js
function foo() {
  console.log(this.a)
}

var a = 10
var obj = { a: 20, foo: foo }
var bar = { a: 30 }

foo() // 10
foo.call(obj)(
  // 20
  (bar.foo = obj.foo)
)() // 20
```

上面这段代码中的 bar.foo = obj.foo 是对象的引用，对象引用指向的都是同一个堆栈，并不会改变值

在 es6 的箭头函数里，this 指向都是当前函数都作用域内

```js
function foo() {
  return a => {
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

foo 函数借用 call 将 this 指向了 obj1，foo 函数返回了一个匿名函数，因为返回都函数是箭头函数，箭头函数内的 this 是不允许覆盖的，所以得到的值是 10，而不是 20

```js
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

当箭头函数在定时器里使用，this 指向依然还是 foo, 所以得到的值是 10，而不是 undefined
