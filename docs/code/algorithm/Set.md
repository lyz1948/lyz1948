# 集合

## 创建集合

```js
function Set() {
  var items = {}

  this.add = function(value) {
    if(!this.has(value)) {
      items[value] = value
      return true
    }
    return false
  }

  this.remove = function(value) {
    if(this.has(value)) {
      delete items[value]
      return true
    }
    return false
  }

  this.has = function(value) {
    return items.hasOwnProperty(value)
  }
  // this.has = function(value) {
  //   return value in items
  // }

  this.clear = function() {
    items = {}
  }
  // 这个方法更简单
  this.size = function() {
    return Object.keys(items).length
  }
  // 这个方式兼容性更好
  // this.size = function() {
  //   let count = 0
  //   for(let prop in items) {
  //     if(items.hasOwnProperty(prop)) {
  //       ++count
  //     }
  //     return count
  //   }
  // }

  this.values = function() {
    return Object.keys(items)
  }
  // 这个方式兼容性更好
  // this.values = function() {
  //   let keys = []
  //   for(let key in items) {
  //     keys.push(key)
  //   }
  //   return keys
  // }

}
```

### 操作集合

**并集**
对于给定的两个集合，返回一个包含两个集合中所有元素的新集合

```js
this.union = function(otherSet) {
  let unionSet = new Set()
  let values = this.values

  for(let i = 0; i < values.length; i++) {
    unionSet.add(values[i])
  }

  values = otherSet.values()
  for(let j = 0; j < values.length; j++){
    unionSet.add(values[j])
  }

  return unionSet
}
```

**交集**
对于给定的两个集合，返回一个包含两个集合中 有元素的新集合

```js
this.interSection = function(otherSet) {
  let intersectionSet = new Set()

  let values = this.values()
  for(let i = 0; i < values.length; i++) {
    if(otherSet.has(values[i])) {
      intersectionSet.add(values[i])
    }
  }
  return intersectionSet
}
```

**差集**
对于给定的两个集合，返回一个包含所有存在于第一个集合 不存在于第二个集
合的元素的新集合

```js
this.difference = function(other) {
  let diffSet = new Set()

  let values = this.values()
  for(let i = 0; i < values.length; i++) {
    if(!otherSet.has(values[i])) {
      diffSet.add(values[i])
    }
  }
  return diffSet
}
```

**子集**
验证一个给定集合是否是另一集合的子集

```js
this.subset = function(otherSet) {
  if(this.size() > otherSet.size()) {
    return false
  } else {
    let values = this.values()
    for(let i = 0; i < values.length; i++) {
      if(!otherSet.has(values[i])) {
        return false
      }
    }
    return true
  }
}
```

### 类的写法

```js
class Set {
  constructor() {
    this.items = {}
  }

  has(value) {
    return this.items.hasOwnProperty(value)
  }

  add(value) {
    if(!this.has(value)) {
      this.items[value] = value
      return true
    }
    return false
  }

  remove(value) {
    if(this.has(value)) {
      delete this.items[value]
      return true
    }
    return false
  }

  get size() {
    return Object.keys(this.items).length
  }

  get values() {
    return Object.keys(this.items)
  }

  // 并集 意思是x（元素）存在于A中，或x存在于B中
  union(otherSet) {
    const unionSet = new Set()
    this.values.forEach((v, i) => unionSet.add(this.values[i]))
    otherSet.values.forEach((v, i) => unionSet.add(otherSet.values[i]))
    return unionSet
  }

  // 交集 意思是x（元素）存在于A中，且x存在于B中
  intersection(otherSet) {
    const intersectionSet = new Set()
    this.values.forEach((v, i) => {
      if(otherSet.has(v)) {
        intersectionSet.add(v)
      }
    })
    return intersectionSet
  }

  // 差集 意思是x（元素）存在于A中，且不x存在于B中
  difference(otherSet) {
    const differenceSet = new Set()
    this.values.forEach((v, i) => {
      if(!otherSet.has(v)) {
        differenceSet.add(v)
      }
    })
    return differenceSet
  }

  // 子集 子集的数学概念：集合A是B的子集，或者说集合B包含了集合A
  subset(otherSet) {
    if(this.size > otherSet.size) {
      return false
    } else {
      return !this.values.some(v => !otherSet.has(v))
    }
  }
}
```

### Use Set

```js
let set = new Set()
set.add(2)
set.add(3)
set.add(8)
set.add(112)
set.add(5)
set.remove(5)
console.log(set.size)
console.log(set.has(2))
console.log(set.values)

let set2 = new Set()
set2.add(2)
set2.add(3)

let unionRes = set.union(set2)
let itsRes = set2.intersection(set)
let diffRes = set2.difference(set)
let subRes = set2.subset(set)
console.log('union result:', unionRes)
console.log('itersection result:', itsRes)
console.log('difference result:', diffRes)
console.log('sub result:', subRes)
```
