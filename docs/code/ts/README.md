# TypeScript

## 基本类型

### 布尔值

```js
let b: boolean = true
```

### 数字

```js
let decLiteral: number = 8
let hexDigt: number = 0xf00d
let binarayDigt: number = 0b1011
let octalDigt: number = 0o744
```

### 字符串

```js
let name: string = 'john'
let age: number = 20
let sentence: string = `Hello, my name is ${ namge } nad my old year is ${ age }`
```

### 数组

```js
let arr: number[] = [1, 2, 3, 4]
// or
let ary: Array<number> = [1, 2, 3]
```

### 元组Tuple

```js
let x: [string, number]

x = ['hello', 112] // ok

x = [112, 'world'] // error

console.log(x[0].substr(1)) // ok
console.log(x[1].substr(1)) // Error

x[3] = 'typescript' // ok 当前赋值符合(string | number)类型

x[4] = false // error 当前赋值不在元组参数里
```

### 枚举

```js
enum Color {Red, Green, Blue, Yellow}

let c: Color = Color.Green

// or
enum Color { Red = 1, Green, Blue}
let colorName: string = Color[2]

console.log(colorName) // Green
```

### 任意值

```js
let anyVal: any = 5381
anyVal = 'myybe a string'
anyVal = true

anyVal.ifItExists() // ok 
nayVal.toFixed() // ok

let list: any[] = ['abc', 123, false]

list[3] = 12
```

### 空值

```js
function warnUser(): void {
  alert('This is a warning message')
}
```

声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null

```js
let unueable: void = undefined
```

### Null 和 Undefined

```js
let u: undefined = undefined
let n: null = null
```

### Never

```js
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error('Something woring')
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
  while(true) {}
}
```

### Object

```js
declare function create(o: object | null): void;

create({prop: 0}) // ok
create(null) // Ok
create(12) // Error
create('str') // Error
create(true) // Error
create(undefined) // Error
```

### 类型断言

```js
let sv: any = 'this is a string'
let slen: number = (sv as string).length

// or
let sv: any = 'this is a string'
let slen: number = (<string>sv).length
```

### 变量声明

### `var`声明

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
