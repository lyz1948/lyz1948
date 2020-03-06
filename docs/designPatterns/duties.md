# 职责链模式

```js
var order500 = function(orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500元定金预购，优惠100元')
  } else {
    return 'nextSuccessor'
  }
}
var order200 = function(orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金预购，优惠50元')
  } else {
    return 'nextSuccessor'
  }
}
var orderNormal = function(orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通用户购买，无优惠')
  } else {
    console.log('库存不足')
  }
}

var Chain = function(fn) {
  this.fn = fn
  this.successor = null
}

Chain.prototype.setNextSuccessor = function(successor) {
  this.successor = successor
}

Chain.prototype.passRequest = function() {
  var ret = this.fn.apply(this, arguments)

  if (ret === 'nextSuccessor') {
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    )
  }
  return ret
}

var chainOrder500 = new Chain(order500)
var chainOrder200 = new Chain(order200)
var chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

chainOrder500.passRequest(1, true, 500)
chainOrder500.passRequest(2, true, 500)
chainOrder500.passRequest(3, true, 500)
chainOrder500.passRequest(1, false, 0)

// 需求改变，新增300元定金购买用户优惠方式
var order300 = function(orderType, pay, stock) {
  if (orderType === 3 && pay === true) {
    console.log('300元定金用户，优惠80')
  } else {
    return 'nextSuccessor'
  }
}

var chainOrder300 = new Chain(order300)
chainOrder500.setNextSuccessor(chainOrder300)
chainOrder300.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)
```

### 异步职责链

```js
Chain.prototype.next = function() {
  return (
    this.successor &&
    this.successor.passRequest.apply(this.successor, arguments)
  )
}

var fn1 = new Chain(function() {
  console.log(1)
  return 'nextSuccessor'
})

var fn2 = new Chain(function() {
  console.log(2)
  var self = this
  setTimeout(function() {
    self.next()
  }, 2000)
})

var fn3 = new Chain(function() {
  console.log(3)
})

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3)
fn1.passRequest()
```

### 用 AOP 实现职责链

```js
Function.prototype.after = function(fn) {
  var self = this
  return function() {
    var ret = self.apply(this, arguments)
    if (ret === 'nextSuccessor') {
      return fn.apply(this, arguments)
    }
    return ret
  }
}

var order = order500.after(order200).after(orderNormal)

order(1, true, 500)
order(2, true, 500)
order(1, false, 500)
```
