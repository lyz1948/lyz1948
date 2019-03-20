# 链表

## 链表的创建

```js
function LinkedList() {

  var Node = function(element) {
    this.element = element
    this.next = null
  }

  var length = 0
  var head = null
  var tail = null

  // 链表尾部添加元素
  this.append = function(element) {
    var node = new Node(element)
    var current
    // 第一个节点
    if(head === null) {
      head = node

    } else {
      current = head
      // 循环列表，找到最后一项
      while(current.next) {
        current = current.next
      }
      // 找到最后一项，将新添加创建的node赋值给next,建立链表
      current.next = node
      tail = node
    }
    // 更新链表长度
    length++
  }

  this.insert = function(position, element) {
    // 检查越界
    if(position >= 0 && position <= length) {
      var node = new Node(element),
        current = head, // 第一个元素赋值给current
        previous,
        index = 0

      // 如果插入元素位置是在第0个位置，需要把之前的第一元素设置为新创建元素的下一个节点，在把新创建的节点设置为head节点
      if(position === 0) {
        node.next = current
        head = node
      } else {
        // 在非0以外的任意位置插入
        while(index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }
      length++
      return true
    }
    return false
  }

  // 链表中删除元素
  this.removeAt = function(position) {
    // 检查越界
    if(position > -1 && position < length) {
      // 找到第一项，赋值给current
      var current = head,
          previous,
          index;
      // 移除第一项，先找到第一项的下一个元素
      if(position === 0) {
        head = current.next
      } else {
        // 其他项
        while(index++ < position) {
          previous = current
          current = current.next
        }
        // 将previous（previous就是当前的head）的下一项指向current的下一项
        previous.next = current.next
      }
      // 更新链表长度
      length--
      // 返回被删除的元素
      return current.element
    } else {
      // 如果位置不在链表范围之内则返回null
      return null
    }
  }

  // 删除元素，参数为要删除的元素
  this.remove = function(element) {
    var index = this.indexOf(element)
    return this.removeAt(index)
  }

  // 查找元素下标
  this.indexOf = function(element) {
    var current = head,
        index = 0

    while(current) {
      if(current.element === element) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }
  // 第一个元素
  this.head = function() {
    return head
  }
  // 最后一个元素
  this.tail = function() {
    return tail
  }
  // 是否为空
  this.isEmpty = function() {
    return length === 0
  }
  // 链表长度
  this.size = function() {
    return length
  }
  // toString
  this.toString = function() {
    var current = head,
        string = ''

    while(current) {
      string += current.element
      current = current.next
    }
    return string
  }
  // 打印链表
  this.print = function() {
    console.log(this.)
  }
}
```

类的写法

```js
class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  // 追加元素
  append(element) {
    const node = new Node(element)
    let current = null
    // 链表为空，第一次添加
    if(this.head === null) {
      this.head = node
    } else {
      // 第二次添加
      current = this.head
      // 当前元素后面还有元素
      while(current.next) {
        current = current.next
      }
      // 将当前元素的下一个元素指向 => 后面添加的元素
      current.next = node
    }
    this.length++
  }

  // 任意位置插入 position: 元素插入的位置  element: 插入的元素

  insert(position, element) {
    // 插入的位置必须不能小于0且不能大于元素的长度

    if (position >= 0 && position <= this.length) {
      const node = new Node(element)
      let current = this.head
      let previous = null
      let index = 0

      if(position === 0) {
        this.head = node
      } else {
        while(index++ < position) {
          previous = current
          current = current.next
        }
        // while循环跳出来的时候，current 是当前元素的下一个
        node.next = current
        // 上一个元素的next 指向 当前元素
        previous.next = node
      }
      this.length++
      return true
    }
    return false
  }

  // 移除指定位置的元素
  removeAt(position) {
    if(position > -1 && position < this.length) {
      let current = this.head
      let previous = null
      let index = 0
      // 如果是第一个
      if(position === 0) {
        // 把第二个的作为第一个
        this.head = current.next
      } else {
        while(index++ < position) {
          previous = current
          current = current.next
        }
        // 假设position = 3  previous= 2 current = 3 current.next = 4
        // 2 => 4
        previous.next = current.next
      }
      this.length--
      return current.element
    }
    return null
  }
  // 查找元素的下标
  findIndex(element) {
    let current = this.head
    let index = 0
    while(current) {
      if(element === current.element) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }
  // 删除指定元素
  remove(element) {
    const index = this.findIndex(element)

    return this.removeAt(index)
  }

  get isEmpty() {
    return !this.length
  }

  size () {
    return this.length
  }

  toString() {
    let current = this.head
    let string = ''
    while(current) {
      string += ` ${current.element}`
      current = current.next
    }
    return string
  }
}

module.exports = LinkedList
```

使用链表

```js
const linkedList = new LinkedList()
console.log(linkedList)

linkedList.append(5)
linkedList.append(8)
linkedList.append(125)
linkedList.append(138)
linkedList.insert(3, 38)
console.log(linkedList)

linkedList.remove(125)
console.log(linkedList.toString())
console.log(linkedList.isEmpty())
```
