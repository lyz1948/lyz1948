---
title: 枚举类型
sidebarDepth: 2
sidebar: false
---

## 数字枚举

```js
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
```

`Direction`是一个枚举类型，定义了`Up`的值为1，其他的并没有定义，枚举类型会自动为其他成员赋值。`Up`的值为1，`Down`的值为2，`Left`的值为3，`Right`的值为4

```js
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

如果删除Up的值，那么现在Up的值为0,其他值根据顺序依次递增

```js
enum Response {
  No = 0
  Yes = 1
}

function respond(recipient: string, message: Response): void {
  // ...
}

respond('princess carolin', Response.Yes)
```

### 字符串枚举

```js
eunm Direction {
  Up: 'UP',
  Down: 'DOWN',
  Left: 'LEFT',
  Right: 'RIGHT'
}
```

### 计算和常量成员

```js
enum E { x }

enum E1 { X, Y Z }

enum E2 {
  A = 1, B, C
}


enum FileAccess {
  // 常量成员
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // 计算成员
  G = 'abcd'.length
}
```

### 联合枚举成员的类型

```js
enum ShapeKind {
  Circle,
  Square
}

interface Circle {
  kind: ShapeKind.Circle
  radius: number
}

interface Square {
  kind: ShapeKind.Square
  sideLength: number
}

let c: Circle = {
  kind: ShapeKind.Square,
  // error
  radius: 25
}
```

### 运行时枚举

```js
enum E {
  X, Y, Z
}

function fn(obj: { X: number }) {
  return obj.X
}

fn(E)
```

### 反向映射

```js
enum Enum {
  A
}

let a = Enum.A
let nameOfA = Enum[a]

```

### 常量枚举

```js
const enum Enum {
  A = 1,
  B = A * 2
}

const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right
]

// 编译后生成的代码
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */]

```

### 外部枚举

```js
declare enum Enum {
  A = 1,
  B,
  C = 2
}
```

外部枚举和内部枚举的区别，正常情况下，没有初始化的方法成员被当成常数成员，而非常量成员没有初始化方法被当做需要计算的成员