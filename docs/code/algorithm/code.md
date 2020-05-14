# 算法编程

## 每日温度上升问题

```js
function dailyTemperatures(arr) {
  const len = arr.length
  const stack = []
  const res = (new Array(len)).fill(0)

  for (let i = 0; i < len; i++) {
    while(stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      const top = stack.pop()
      res[i] = i - top
    }
    stack.push(i)
  }
  return res
}
```

## 最小栈

```js
const MiniStack = function() {
  this.stack1 = []
  this.stack2 = []
}

MiniStack.prototype = {
  constructor: MiniStack,

  push: function(v) {
    this.stack1.push(v)
    // 如果 stack2 为空，或者插入的值比 stack2中最后一个值小
    if (!this.stack2.length || this.stack2[this.stack2.length - 1] >= v) {
      this.stack2.push(v)
    }
  },

  pop: function() {
    // 如果出栈的是最小值，同步更新 stack2
    if (this.stack1.pop() === this.stack2[this.stack2.length - 1]) {
      this.stack2.pop()
    }
  },

  empty: function() {
    this.stack1 = []
    this.stack2 = []
  },

  isEmpty: function() {
    return !this.stack1.length
  },

  head: function() {
    return this.stack1[this.stack1.length -1]
  },

  getMin: function() {
    return this.stack2[this.stack2.length -1]
  }
}

```

## 用栈实现队列

```js
const StackToQueeue = function() {
  this.stack1 = []
  this.stack2 = []
}

StackToQueeue.prototype = {
  constructor: StackToQueeue,

  push: function(v) {
    this.stack1.push(v)
  },

  pop: function() {
    if (!this.stack2.length) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop())
      }
    }
  },

  peek: function() {
    if (!this.stack2.length) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop())
      }
    }
    const stack2Len = this.stack2.length
    return stack2Len && this.stack2[stack2Len - 1]
  },

  isEempty: function() {},
}
```
