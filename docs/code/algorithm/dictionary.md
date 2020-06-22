# 字典

## 创建字典

```js
function Dictionary() {
  let items = {}

  this.set = function(key, value) {
    items[key] = value
  }

  this.remove = function(key) {
    if (this.has(key)) {
      delete items[key]
      return true
    }
    return false
  }

  this.has = function(key) {
    return key in items
  }

  this.get = function(key) {
    return this.has(key) ? items[key] : undefined
  }

  this.clear = function() {
    items = {}
  }

  this.keys = function() {
    return Object.keys(items)
  }

  this.values = function() {
    let values = []
    for (let key in items) {
      if (this.has(key)) {
        values.push(items[key])
      }
    }
    return values
  }

  this.getItems = function() {
    return items
  }
}
```

类的写法

```js
class Dictionary {
  constructor() {
    this.items = {}
  }

  set(key, value) {
    this.items[key] = value
  }

  get(key) {
    return this.items[key]
  }

  remove(key) {
    delete this.items[key]
  }

  get keys() {
    return Object.keys(this.items)
  }

  get values() {
    return Object.keys(this.items).reduce((acc, val, idx) => {
      acc.push(this.items[val])
      return acc
    }, [])
  }
}
```

### Use Dictionary

```js
let dct = new Dictionary()
dct.set('age', 20)
dct.set('sex', 'male')
dct.set('job', 'teacher')

console.log(dct)
console.log(dct.get('sex'))
console.log(dct.remove('age'))
console.log(dct.values)
```
