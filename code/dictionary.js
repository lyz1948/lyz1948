function Dictionary() {
  let items = {}

  this.set = function(key, value) {
    items[key] = value
  }

  this.has = function(key) {
    return key in items
  }

  this.remove = function(key) {
    if (this.has(key)) {
      delete items[key]
      return true
    }
    return false
  }

  this.get = function(key) {
    return this.has(key) ? items[key] : 'undefined'
  }

  this.clear = function() {
    items = {}
  }

  this.keys = function() {
    return Object.keys(items)
  }

  this.values = function() {
    const result = []

    for (let key in items) {
      if (this.has(key)) {
        result.push(items[key])
      }
    }
    return result
  }
}

var d = new Dictionary()

d.set('a', 1)
d.set('b', 2)
d.set('c', 3)

console.log(d.get('a'))
console.log(d.has('d'))
console.log(d.keys())
console.log(d.values())
