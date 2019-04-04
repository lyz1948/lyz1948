# ES6 语法与新特性

### 解构数组

```js
function breakfast() {
  return ['dessert', 'coffee', 'apple']
}

let [dessert, drink, fruit] = breakfast()

console.log(dessert, drink, fruit)
```

### 解构对象

```js
function breakfast() {
  return { dessert: 'cookie', drink: 'tea', fruit: 'apple' }
}

let { dessert: dessert, drink: drink, fruit: fruit } = breakfast()

console.log(dessert, drink, fruit)
```

### 解构参数

```js
function breakfast(dessert, drink, { location, restaurant } = {}) {
  console.log(dessert, drink, location, restaurant)
}

breakfast('cake', 'milk', '广州', '和记餐馆')
```

### 字符串模版

```js
let name = 'hello'
let age = 30
let intro = `my nam is ${name}, and my age is ${age}`

console.log(intro)
```

### 带标签的模版字符串

```js
let dessert = 'cake'
let drink = 'coffee'

let breakfast = kitchen `我今天吃了\n
  ${dessert} 和 ${drink}`

function kitchen(strings, ...values) {
  console.log(strings)
  console.log(values)

  let result = ''
  for(let i = 0; i < values.length; i++) {
    result += strings[i]
    result += values[i]
  }
  result += strings[strings.length #### 1]

  return result
}
```

### 判断是否包含其他字符串

```js
let dessert = 'cake'
let drink = 'tea'

let breakfast = '今天吃的早餐是： ${dessert} 和 ${drink}!'

console.log(breakfast.startWith('今天')) 是不是以‘今天’开头
console.log(breakfast.endWith('!')) // 是不是以‘！’结尾
console.log(breakfast.includes('apple')) // 是否包含‘apple’
```

### 默认参数

```js
function breakfast(dessert = 'cake', drink: 'water') {
  return `${dessert} + ${drink} `
}

console.log(breakfast) // 输出默认值
console.log(breakfast('cookie', 'coffee'))
```

### 展开操作符

```js
var fruit = ['apple', 'pear']
var food = ['milk', ...fruit]

console.log(fruit) // ['apple', 'pear']
console.log(...fruit) // apple pear
console.log(food) // ['milk', 'apple', 'pear']
```

### reset 剩余操作符

```js
function breakfast(dessert, drink, ...foods) {
  console.log(dessert, drink, foods)
}

breakfast('cake', 'tea', 'apple', 'pear') // ['cake', 'tea', ['apple', 'pear']]

function breakfast(dessert, drink, ...foods) {
  console.log(dessert, drink, ...foods)
}

breakfast('cake', 'tea', 'apple', 'pear') // ['cake', 'tea', 'apple', 'pear']
```

### 函数的名字

```js
function breakfast() {}
console.log(breakfast.name) // breakfast

let breakfast = function() {}
console.log(breakfast.name) // breakfast

let breakfast = function superBreakfast() {}
console.log(breakfast.name) // superBreakfast
```

### 箭头函数

```js
let breakfast = food => food
//等同于与
let breakfast = function(food) {
  return food
}

// 多个参数用括号包起来
let breakfast = (food, drink) => food + drink

// 如果不是直接返回参数需要用大括号
let breakfast = food => {
  let eat = '吃' + food
  console.log(eat)
}
```

### 对象表达式

```js
let dessert = 'cake'
let drink = 'coffee'

let food = {
  dessert: dessert,
  drink: drink
}

let food = {
  dessert,
  drink
}
```

### 对比 2 个值是否相等

```js
NaN === NaN // false
Object.is(NaN, NaN) + //  true
  0 ===
  -0 // true
Object.is(+0, -0) // false
```

### 对象复制

```js
let breakfast = {}

Object.assign(breakfast, { drink: 'tea' })
console.log(breakfast)
```

### prototypeOf

```js
let breakfast = {
  drink() {
    return 'mikl'
  }
}

let dinner = {
  drink() {
    return 'beer'
  }
}

let party = Object.create(breakfast)
console.log(party.drink()) // mikl
console.log(Object.getPrototypeOf(party) === breakfast) // true

Object.setPrototype(party, dinner)
console.log(party.drink) // beer
console.log(Object.getPrototypeOf(party) === breakfast) // false
```

### **proto**

```js
let breakfast = {
  drink() {
    return 'milk'
  }
}

let dinner = {
  drink() {
    return 'beer'
  }
}

let party = {
  __proto__: breakfast
}

console.log(party.drink)
console.log(Object.getPrototypeOf(party) === breakfast) // true

party.__proto__ = dinner
console.log(party.drink)
console.log(Object.getPrototypeOf(party) === dinner) // true
```

### super

```js
let breakfast = {
  drink() {
    return 'milk'
  }
}

let dinner = {
  drink() {
    return 'beer'
  }
}

let party = {
  __proto__: breakfast,
  getDrink() {
    return super.drink() + 'tea'
  }
}

party.getDrink() // milk + tea
```

### iterators

```js
function g(goods) {
  let i = 0

  return {
    next() {
      let done = i >= goods.length
      let value = !done ? goods[i++] : undefind

      return {
        done: done,
        value: value
      }
    }
  }
}

var gen = g('table', 'chair')
gen.next() // table false
gen.next() // chair false
gen.next() // undefind true

const it = makeIterator(['吃饭', '睡觉', '打豆豆'])

console.log('1=>', it.next().value)
console.log('2=>', it.next().value)
console.log('3=>', it.next().value)
console.log('4=>', it.next().value)
```

### generator

```js
function gen(foods) {
  for(let i = 0; i < foods.length; i++) {
    yield foods[i]
  }
}

var g = gen(['tomato','egg'])
g.next() // tomato
g.next() // egg
g.next() // undefind
```

### class 类

```js
class Chef {
  constructor(food) {
    this.food = food
  }

  cook() {
    console.log(this.food)
  }
}

let fanwei = new Cher('tomato')
fanwei.cook()
```

### 类的 get 与 set

```js
class Chef {
  constructor(food) {
    this.food = food
    this.dish = []
  }

  get menu() {
    return this.dish
  }

  set menu(dish) {
    this.dish.push(dish)
  }

  cook(food) {
    console.log(this.food)
  }
}

var fanwei = new Chef()
console.log((fanwei.menu = 'beef'))
console.log((fanwei.menu = 'chicken'))
console.log(fanwei.menu)
```

### 静态方法

```js
class Chef {
  constructor(food) {
    this.food = food
  }

  static cook(food) {
    console.log(food)
  }
}

Chef.cook('potato')
```

### extends 继承

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  introduce() {
    return `姓名：${name} 年龄：${age}`
  }
}

class Chef extends Person {
  constructor(name, age) {
    super(name, age)
  }
}

let who = new Chef('guodegang', 50)
who.introduce()
```

### Set

```js
let bjx = new Set('zhao qian sun li')
bjx.add('wang')
bjx.add('liu')

console.log(bjx)
console.log(bjx.size)
console.log(bjx.has('zhao'))
bjx.delete('zhao')

bjx.forEach(item => {
  console.log(item)
})

bjx.clear()
console.log(bjx)
```

### entries

```js
const obj = { a: '123', b: '456', c: '789' }

for (let [key, val] of Object.entries(obj)) {
  console.log(`key: ${key}, value: ${val}`)
}
```

### values

```js
const obj = { a: '123', b: '456', c: '789' }

const arr = Object.values(obj)
console.log(arr) // [123, 456, 789]
```

### padStart

```js
let str = 'abc'

str.padStart(10) // '       abc'
str.padStart(5, 'foo') // foabc
str.padStart(8, '0') // 00000abc

if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    // 转换为数字 或 0
    targetLength = targetLength >> 0
    padString = String(typeof padStaring !== 'undefined' ? padString : ' ')

    if (this.length > targetLength) {
      return String(this)
    } else {
      targetLength = targetLength - this.length
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length)
      }
      return padString.slice(0, targetLength) + String(this)
    }
  }
}
```
