# 双向链表

## 创建链表

```js
function DoublyLinkedList() {

  var Node = function(element) {
    this.element = element
    this.next = null
    this.prev = null
  }

  var length = 0
  var head = null
  var tail = null

  this.insert = function(position, element) {
    if(position >= 0 && position < length) {
      var node = new Node(element),
          current = head,
          previous,
          index = 0

      if(position === 0) {
        if(!head) {
          head = node
          tail = node
        } else {
          node.next = current
          current.prev = node
          head = node
        }
      }

      else if(position === length) {
        current = tail
        current.next = node
        node.prev = current
        tail = node
      } else {
        while(index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
        current.prev = node
        node.prev = previous
      }
      length++
      return true
    }
    return false
  }

  this.removeAt = function(position) {
    // 检查越界
    if(position > -1 && position < length) {
      var current = head,
          previous,
          index = 0

      // 如果是第一项
      if(position === 0) {
        head = current.next

        // 如果只有一项，更新tail
        if(length === 1) {
          tail = null
        } else {
          head.prev = null
        }
        // 如果是最后一项
      } else if(position === length - 1) {
        current = tail
        tail = current.prev
        tail.next = null
      } else {
        while(index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
        current.next.prev = previous
      }
      length--
      return current.element
    } else {
      return null
    }
  }
}
```
