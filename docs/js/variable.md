# 变量

#### 变量的声明方式

1. `var`  声明一个变量
2. `let` 声明一个块级作用域的局部变量
3. `const` 声明一个只读的常量

#### 变量求值

用 `var` 或 `let` 声明的且未赋初值的变量，值会被设定为 undefined。

```js
var a
console.log(a) // undefined

console.log(b) // Reference: b is not defined

console.log(c) // undefined
var c

console.log(d) // Reference: b is not defined
let d
```

可以使用 `undefined` 来判断变量是否已赋值

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

#### 变量的作用域
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

#### 函数提升

**函数声明**

``` js
fn()
function fn () {
  console.log('fn')
}
fn2(); // TypeError: fn2 is not a function
```

此时的`fn2`相当于一个声明的变量，类型为`undefined`
由于`baz`只是相当于一个变量，因此浏览器认为`baz()`不是一个函数。

**函数表达式**

```js
var fn2 = function() {
  console.log('fn2');
};
```

#### 常量 `const`
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

常量不可以改变，然后，常量定义的对象属性是可以修改的

``` js
const obj = {"name": "hello"}
obj.name = 'hello world'
```

#### 数据类型
- Boolean 布尔类型
- Number 数字类型
- String 字符串类型
- null 一个表明 null 值的特殊关键字
- undefined 变量未定义时的属性
- Symbol es6新增 一种数据类型，它的实例是唯一且不可改变的
- Object 对象类型

#### 数据类型的转换
``` js
var a = 10
a = 'this is a text'
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
