---
title: 类型推断
sidebarDepth: 2
sidebar: false
---

## 类型推断

```js
let a = 3
```

变量a没有设置指定类型，typescript会自动推断为数字类型，这种推断只发生在初始化变量和成员，在设置默认参数值和决定函数返回值时

最佳通用类型

```js
let x = [0, 1, null]
```

这里有2种类型选择，即`number`和`null`， 计算通用类型算法会考虑所有候选类型，并给出一个兼容所有的类型的值

```js
let zoo = [new Rhino(), new Elephant(), new Snake()]
```

我们期望程序推断zoo为Animal[]类型，但是，数组里并没有Animal对象类型，因此不能自动推断出这个类型

```js
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()]
```

### 上下文类型

```js
window.onmousedown = (mouseEvent) => {
  // error
  console.log(mouseEvent.button)
}


window.onmousedown = (mouseEvent: any) => {
  // ok
  console.log(mouseEvent.button)
}
```

上下文归类会在很多情况下用到，通常包含函数参数，赋值表达式的右边，类型断言，对象成员和数组字面量和返回值语句。

```js
function createAnimal(): Animal {
  return [new Rhino(), new Elephant(), new Snake()]
}
```

`createAnimal`函数有4个候选类型： `Animal`, `Rhino`, `Elephant` 和 `Snake`, 当然，`Animal`会别作为最佳通用类型
