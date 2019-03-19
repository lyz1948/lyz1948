# 作用域

预解析

::: tip
预解析：
  查找关键字：如var functioin 参数等
  当关键字var 和 function 重名的时候只保留function
2 逐行解读代码：
  读代码的是从上到下，从左到右的顺序，遇到表达式如：+ - * ／ % = 时候会进行赋值操作
:::

``` js
alert(a)
var a = 1
```

::: tip
以上代码执行的顺序

1) 预解析:
  a = undefined
2) 逐行解读代码:
  alert(a)  // undefined
:::

``` js
var a = 2
function fn1() {
  alert(a)
  var a = 3
}
fn1()
alert(a)
```

::: tip
1: 预解析
  a = undefined
  fn1 = function fn1() { alert(a) var a = 3}
2: 读代码
  a = 2  把2赋值给a
  fn1() 函数调用,函数是一个局部作用域，调用时候会执行内部的域解析域代码执行
    1: 预解析 a = undefined
    2: 读代码 => alert(a) // undefined => a = 3
  alert(a)  // 2
:::

``` js
var a = 2
function fn1() {
  alert(a)
  a = 3
}
fn1()
alert(a)
```

::: tip
1: 预解析
  a = undefined
  fn1 = function fn1() { alert(a)  a = 3 }
2: 读代码
  a = 2  把2赋值给a
  fn1() 函数调用,函数是一个局部作用域，调用时候会执行内部的域解析域代码执行
    1: 预解析(没有找到任何关键字var fn)
    2: 读代码 => alert(a) // 2  子级作用域会找到父级的a
      a = 3  把外面的a修改为 3
  alert(a)  // 3
:::

``` js
var a = 2
function fn1(a) {
  alert(a)
  a = 3
}
fn1()
alert(a)
```

::: tip
1: 预解析
  a = undefined
  fn1 = function fn1(a) { alert(a)  a = 3 }
2: 读代码
  a = 2
  fn1() => a = undefined => alert(a) => //undefined => a = 3
  函数调用时候没有传参数，等于var a;  a = 3  只是赋值给fn1函数内的参数a,并不会修改全局定义的a
  alert(a) // 2
:::
