# 栈

## 栈的创建

```js
function Stack() {
  var items = []

  this.push = function(element) {
    items.push(element)
  }

  this.pop = function() {
    return items.pop()
  }

  this.isEmpty = function() {
    return items.length == 0
  }

  this.head = function() {
    return items[0]
  }

  this.tail = function() {
    return items[items.length - 1]
  }

  this.clear = function() {
    items = []
  }

  this.print = function() {
    console.log(items.toString())
  }
}
```

## 类的写法

```js
class Stack {
  constructor() {
    this.items = []
  }

  // 入栈
  push (element) {
    this.items.push(element)
  }

  // 出栈
  pop() {
    return this.items.pop()
  }

  // 获取长度
  get size() {
    return this.items.length
  }

  // 最后一个元素
  get tail() {
    return this.items[this.items.length - 1]
  }

  // 是否为空
  get isEmpty() {
    return !this.items.length
  }

  // 清空栈
  clear() {
    this.items = []
  }

  // 打印信息
  print() {
    console.log(this.items.toString())
  }
}

// Use Stack
const stack = new Stack()
console.log(stack.isEmpty) // true

stack.push(5)
stack.push(6)
stack.push(7)
console.log(stack.size) // 3

stack.pop()
stack.pop()
console.log(`now size ${stack.size}`) // now size 1

console.log(`last item ${stack.tail}`) // last item 5

stack.print() // 6
```

## 使用栈来转换类型

### 十进制转二进制

转换公式： 十进制数字除以2，取余数，再将除完后的值除2，直到结果为O、

上代码🌰

```js
function divideBy2(decNumber) {
  var remStack = new Stack(),
      rem,
      binaryString = ''

  while(decNumber > 0) {
    rem = Math.floor(decNumber % 2)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / 2)
  }

  while(!remStack.isEmpty()) {
    // 从后往前取出
    binaryString += remStack.pop()
  }

  return binaryString
}
```

通用转换方法

```js
function baseConverter(decNumber, base) {
  var remStack = new Stack(),
      rem,
      baseString = '',
      digits = '0123456789ABCDEF'

  while(decNumber > 0) {
    rem = Math.floor(decNumber % base)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / base)
  }

  while(!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]
  }

  return baseString
}
```
