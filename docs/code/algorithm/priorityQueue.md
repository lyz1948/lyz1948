# 优先队列

## 创建队列

```js
function PriorityQueue() {
  var items = []

  function QueueElement(element, priority) {
    this.element = element
    this.priority = priority
  }

  this.enqueue = function(element, priority) {
    var queueElement = new QueueElement(element, priority)

    if(this.isEmpty()) {
      items.push(queueElement)
    } else {
      var added = false
      for(let i = 0; i < items.length; i++) {
        if(queueElement.priority < items[i].priority) {
          items.splice(i, 0, queueElement)
          added = true
          break
        }
      }
      if(!added) {
        items.push(queueElement)
      }
    }
  }

  this.dequeue = function() {
    return items.shift()
  }

  this.isEmpty = function() {
    return !items.length
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

  this.size = function() {
    return items.length
  }

  this.print = function() {
    console.log(items.toString())
  }
}

```

类的写法

```js
class PriorityQueue {
  constructor() {
    this.items = []
  }

  enqueue(element, priority) {
    const queueElement = { element, priority }
    if(this.isEmpty) {
      this.items.push(queueElement)
    } else {
      const preIndex = this.items.findIndex((item) => queueElement.priority < item.priority)
      if(preIndex > -1) {
        this.items.splice(preIndex, 0, queueElement)
      } else {
        this.items.push(queueElement)
      }
    }
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
    console.log(this.items)
  }
}
```

### Use PriorityQueue

```js
const pq = new PriorityQueue()
pq.enqueue('马化腾', '2')
pq.enqueue('马Yun', '2')
pq.enqueue('jobs', '1')
pq.enqueue('雷军', '3')
console.log(pq.size)
pq.print()
console.log(pq.isEmpty)
```
