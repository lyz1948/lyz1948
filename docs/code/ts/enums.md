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

```