# 队列

队列是遵循FIFO(First In First Out，先进先出，也称为先来先服务)原则的一组有序的项。 队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。
常见例子是排队。

## 创建队列

```js
function Queue() {
  var items = []
  // 入列
  this.enqueue = function(element) {
    items.push(element)
  }

  // 出列
  this.dequeue = function() {
    return items.shift()
  }

  // 头部元素
  this.head = function() {
    return items[0]
  }

  // 尾部元素
  this.tail = function() {
    return items[items.length - 1]
  }

  // 队列是否为空
  this.isEmpty = function() {
    return items.length == 0
  }
  // 清空队列
  this.clear = function() {
    items = []
  }
  // 队列长度
  this.size = function() {
    return items.length
  }
  // 打印队列元素
  this.print = function() {
    console.log(items.toString())
  }
}
```

类的写法

```js
class Queue {
  constructor(items) {
    this.items = items || []
  }
  enqueue(element) {
    this.items.push(element)
  }

  dequeue() {
    return this.items.shift()
  }

  head() {
    return this.items[0]
  }

  tail() {
    return this.items[this.items.length - 1]
  }

  clear() {
    this.items = []
  }

  get size() {
    return this.items.length
  }

  get isEmpty() {
    return !this.items.length
  }

  print() {
    console.log(this.items.toString())
  }
}
```

## 使用队列

```js
const queue = new Queue()
console.log(queue.isEmpty)
queue.enqueue('5')
queue.enqueue('8')
console.log(queue.size)
console.log(queue.head())
console.log(queue.tail())
queue.dequeue()
console.log(queue.size)
queue.clear()
console.log(queue.size)
```
