# 散列表

## 创建散列表

```js
function HashTable() {
  let table = []

  const loseloseHashCode = function(key) {
    let hash = 0
    for(let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37
  }

  this.put = function(key, value) {
    let position = loseloseHashCode(key)
    table[position] = value
  }

  this.remove = function(key) {
    table[loseloseHashCode(key)] = undefined
  }

  this.get = function(key) {
    return talbe[loseloseHashCode(key)]
  }

  this.getHead = function() {
    return table[0]
  }
}
```

类的写法

```js
class HashTable {
  constructor() {
    this.tables = []
  }

  static loseloseHashTable(key) {
    let hash = 0
    for(let keycode of key) {
      hash += keycode.charCodeAt()
    }
    return hash % 37
  }

  set(key, value) {
    let position = HashTable.loseloseHashTable(key)
    console.log(`${position} - ${key}`)
    this.tables[position] = value
  }

  get (key) {
    return this.tables[HashTable.loseloseHashTable(key)]
  }

  remove(key) {
    this.tables[HashTable.loseloseHashTable(key)] = undefined
  }
}
```

### Use hashTable

```js
let hashtable = new HashTable()
console.log(hashtable)
hashtable.set('helloman', 'helloman@vip.com')
hashtable.set('john', 'john@vip.com')
hashtable.remove('john')
console.log(hashtable.get('helloman'))
console.log(hashtable)
```

### 处理散列表中的冲突

**分离散列**

```js
function HashTable() {

  let ValuePair = function(key, value) {
    this.key = key
    this.value = value

    this.toString = function() {
      return '[' + this.key + ' - ' + this.value + ']'
    }
  }

  this.put = function(key, value) {
    let position = loseloseHashCode(key)

    if(table[position] == undefined) {
      table[position] = new LinkedList()
    }

    table[position].append(new ValuePair(key, value))
  }

  this.get = function(key) {
    let position = loseloseHashCode(key)

    if(table[position] !== undefined) {
      let current = table[position].getHead()

      while(current.next) {
        if(current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }

      # 检测元素在链表第一个或则最后一个节点的情况
      if(current.element.key === key) {
        return current.element.value
      }
    }
    return undefined
  }

  this.remove = function(key) {
    let position = loseloseHashCode(key)

    if(table[position] !== undefined) {
      let current = table[position].getHead()

      while(current.next) {
        if(current.element.key === key) {
          talbe[position].remove(current.element)
          if(talbe[position].isEmpty()) {
            talbe[position] = undefined
          }
          return true
        }
        current = current.next
      }

      if(current.element.key === key) {
        table[position].remove(current.element)
        if(table[position].isEmpty()) {
          talbe[position] = undefined
        }
        return true
      }
    }
    return false
  }
}
 ```

### 线性探查

```js
this.put = function(key, value) {
  let position = loseloseHashCode(key)

  if(table[position] == undefined) {
    table[position] = new ValuePair(key, value)
  } else {
    let index = ++position
    while(table[index] != undefined) {
      index++
    }
    table[index] = new ValuePair(key, value)
  }
}


this.get = function(key) {
  let position = loseloseHashCode(key)

  if(table[position] !== undefined) {
    if(table[position].key === key) {
      return table[position].value
    } else {
      let index = ++position
      while(table[index] === undefined || table[index].key !== key) {
        index++
      }

      if(table[indx].key === key) {
        return table[index].value
      }
    }

  }
  return undefined
}

this.remove = function(key) {
  let position = loseloseHashCode(key)

  if(table[position] !== undefined) {
    if(table[position].key === key) {
      table[position].value = undefined
    } else {
      let index = ++position
      while(table[index] === undefined || table[index].key !== key) {
        index++
      }
      if(table[index].key === key) {
        table[index] = undefined
      }
    }
  }
  return undefined
}
```

### 创建更好的散列函数

```js
const djb2HashCode = function(key) {
  let hash = 5381
  for(let i = 0; i < key.length; i++) {
    hash = hash * 33 + key.charCodeAt(i)
  }
  return hash % 1013
}
```
