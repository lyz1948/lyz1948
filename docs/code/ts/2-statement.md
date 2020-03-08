# 变量声明

## `var`声明

```js
var a = 42
```

函数内部定义变量

```js
function func() {
  var str = 'this is a string'

  return str
}
```

定义在函数内部

```js
function func() {
  var a = 20
  return function() {
    var b = a + 10
    return b
  }
}

var fn = func()
fn() // 30
```

可选参数 ?

```js
function fn(a: string, b?: string, c: string = 'lyz') {
  console.log(a, b, c)
}

fn('xx', 'yy', 'zz')
fn('xxx', 'yyy')
fn('xxxx')
```

spread 操作符

```js
function bar(...args) {
  console.log(...args)
}

bar(1, 2, 3)
bar(1, 2, 3, 4, 5)

function foo(a, b, c) {
  console.log(a, b, c)
}

var arr = [1, 2]
foo(...arr) // => 1, 2, undefined

var arr2 = [1, 2, 3, 4, 5]
foo(...arr2) // 1, 2, 3
```

generator 函数

```js
function* count() {
  var a = 1

  yield

  a++
}

const it = count()
it.next() // 1
it.next() // 2

function* getStockPrice(stock) {
  while (true) {
    yield Math.random() * 100
  }
}

let gp = getStockPrice()
let limitPirce = 30
let price = 100

while (price > limitPrice) {
  price = gp.next().value
  console.log(`price is ${price}`)
}

console.log('done')
```
