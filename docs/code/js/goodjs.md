# 正确的使用JS

```js
const good = {
  foo: 1,
  bar: 2,
  'my-data': 3

// good
Object.prototype.hasOwnProperty.call(object, key)

// best
const has = Object.prototype.hasOwnProperty
has.call(object, key)

const origin = { a: 1, b: 2 }
const copy = { ...origin, c: 3 }
const { a, ...other } = copy
```

## Arrays

```js
// bad
const arr = new Array()

// good
const arr = []

const stack = []
// bad
stack[stack.length] = 'abcdefg'

// good
stack.push('abcdefg')
```

spreads

```js
// bad
const len = items.length
const arrCopy = []

for(let i = 0; i < len; i++) {
  arrCopy[i] = items[i]
}

// good
cosnt itemCopy = [...items]

const elms = document.querySelectorAll('.item')

// good
const nodes = Array.from(elms)

// best
const nodes = [...elms]

const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz' }

// bad
const arr = Array.prototype.slice.call(arrLike)

// good
const arr = Array.from(arrLike)

// bad
const baz = [...foo].map(bar)

// good
const baz = Array.from(foo, bar)

// good
[1, 2, 3].map(x) => {
  const y = x + 1
  return x * y
}

// good
[1, 2, 3].map(x => x + 1)

// bad
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item)
  acc[index] = flatten
})

// good
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item)
  acc[index] = flatten
  return flatten
})

// bad
inbox.filter(msg) => {
  const { subject, author } = msg
  if (subject === 'Mockingbird') {
    return author === 'Lyz'
  } else {
    return false
  }
}

// good
inbox.filter(msg) => {
  const { subject, author } = msg
  if (subject === 'Mockingbird') {
    return author === 'Lyz'
  }
  return false
}
```

## Destructuring

```js
// bad
function getFullName (user) {
  const firstName = user.firstName
  const lastName = user.lastName
  return `${firstName} ${lastName}`
}

// good
function getFullName (user) {
  const { firstName, lastName } = user
  return `${firstName} ${lastName}`
}

// bast
function getFullName ({ firstName, lastName }) {
  return `${firstName} ${lastName}`
}

const arr = [1, 2, 3, 4]
// bad
const first = arr[0]
const second = arr[1]

// good
const [first, second] = arr

// bad
function processInput (input) {
  return [left, right, top, bottom]
}
const [left, __, top] = processInput(input)

// good
function processInput (input) {
  return { left, right, top, bottom }
}
const { left, right } = processInput(input)
```

## String

```js
// bad
const name = "Capt. Janeway"

// bad 使用模板字符串应该在换行或者有对象的时候
const name = `Capt. Janeway`

// good
const name = 'Capt. Janeway'

// bad
const errMsg = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.'

// bad
const errMsg = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.'

// good
const errMsg = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

// bad
function sayHi (name) {
  return 'How are you, ', name, '?'
}

// bad
function sayHi (name) {
  return ['How are you, ', name, '?'].join()
}

// bad
function sayHi (name) {
  return `How are you, ${ name }?`
}

// good
function sayHi (name) {
  return `How are you, ${name}?`
}
```

## Functions

```js
// bad
function foo () {

}

// bad
const foo = function () {

}

// good
const short = function longUniqueMoreDescriptiveLexicalFoo () {}

// IIFE
(function () {
  console.log('IIFE')
}())

// bad
if (curUser) {
  function getUser () {
    console.log('do not do that')
  }
}

// good
let getUser
if (curUser) {
  getUser = () => {
    console.log('Bingo')
  }
}

// bad
function foo (name, options, arguments) {

}

// good
function foo (name, options, args) {

}

// bad
function concatenateAll () {
  const args = Array.prototype.slice.call(arguments)
  return args.join('')
}

// good
function concatenateAll (...args) {
  return args.join('')
}

// really bad
function handler (opts) {
  opts = opts || {}
}

// still bad
function handler (opts) {
  if (opts === void 0) {
    opts = {}
  }
}

// good
function handler (opts = {}) {

}

var b = 1
// bad
function count (a = b++) {
  console.log(a)
}
count() // 1
count() // 2
count(3) // 3
count() // 3

// bad
function handler (opts = {}, name) {
  // ...
}

// good
function handler (name, opts = {}) {
  // ...
}

// bad
var add = new Function('a', 'b', 'return a + b')

// still bad
var subtract = Function('a', 'b', 'return a - b')

// bad
function fn (obj) {
  obj.key = 1
}

// good
function fn (obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1
}

// bad
function fn (a) {
  a = 1
}

function fn (a) {
  if (!a) {
    a = 1
  }
}

// good
function fn (a) {
  const b = a || 1
}

function fn (a = 1) {
  // ...
}

// bad
const x = [1, 2, 3, 4]
console.log.apply(console, x)

// good
const x = [1, 2, 3, 4]
console.log(...x)

// bad
new (Function.prototype.bind.apply(Date, [null, 2019, 3, 30]))

// good
new Date(...[2019, 3, 30])

// bad
function foo (bar,
              baz,
              quux) {
  // ...
}

// good
function foo (
  bar,
  baz,
  quux
) {
  // ...
}

// bad
console.log(foo,
  bar,
  baz
)

// good
console.log(
  foo,
  bar,
  quux
)
```

## Arrow Functions

```js
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1
  return x * y
})

// good
[1, 2, 3].map(x => {
  const y = x + 1
  return x * y
})

// bad
[1, 2, 3].map(n => {
  const nextNum = n + 1
  `A string containing the ${nextNum}`
})

// good
[1, 2, 3].map(num => `A string containing the ${nextNum}`)

// good
[1, 2, 3].map(num => {
  const nextNum = num + 1
  return `A string containing the ${nextNumber}.`
})

function foo (cb) {
  const val = cb()
  if (val === true) {
    // ...
  }
}

let bool = false

// bad
foo(() => bool = true)

// good
foo(() => {
  bool = true
})

// bad
['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProerty.call(httpMagicObjectWithAVeryLongName, httpMethod)
)

// good
['get', 'post', 'put'].map(httpMethod => (
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod
  )
))

// bad
[1, 2, 3].map((x) => x * x)

// good
[1, 2, 3].map(x => x * x)

// good 返回的内容太长，我们不希望写在同一行，用括号括起来
[1, 2, 3].map(num => (
  `A long string with the ${num}. It's so long that we don't want to take up space on the .map line`
))

// bad
[1, 2, 3].map(x => {
  const y = x + 1
  return x * y
})

// good
[1, 2, 3].map((x) => {
  const y = x + 1
  return x * y
})

// bad
const itemHeight = item => item.height > 256 ? item.largeSize : item.samllSize

// bad
const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize

// good
const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize)

// good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item
  return height > 256 ? largeSize : samllSize
}


// bad
(foo) =>
  bar;
(foo) =>
  (bar)

// good
(foo) => bar
(foo) => (bar)
(foo) => (
  bar
)
```

## Class & Constructors

```js
// bad
function Queue (contents = []) {
  this.queue = [...contents]
}

Queue.prototype.pop = function () {
  const value = this.queue[0]
  this.queue.splice(0, 1)
  return value
}

// good
class Queue {
  constructor (contents = []) {
    this.queue = [...contents]
  }
  pop () {
    const value = this.queue[0]
    this.queue.splice(0, 1)
    return value
  }
}

// bad
const inherts = require('inherts')
function PeekableQueue (contents) {
  Queue.apply(this, contents)
}
inherts(PeekableQueue, Queue)
PeekableQueue.prototype.peek = function () {
  return this.queue[0]
}

// good
class PeekableQueue extends Queue {
  peek () {
    return this.queue[0]
  }
}

// bad
Jedi.prototype.jump = function () {
  this.jumping = true
  return true
}

Jebi.prototype.setHeight = function (height) {
  this.height = height
}

// good
class Jebi {
  jump () {
    this.jumping = true
    return this
  }

  setHeight (height) {
    this.height = height
    return this
  }
}

const luke = new Jebi()
luke.jump()
  .setHeight(20)

class Jebi {
  constructor (options = {}) {
    this.name = options.name || 'no name'
  }

  getName () {
    return this.name
  }

  toString () {
    return `Jebi - ${this.getName()}`
  }
}

// bad
class Jebi {
  constructor () {}

  getName () {
    return this.name
  }
}

// bad
class Rey extends Jebi {
  constructor (...args) {
    super(...args)
  }
}

// good
class Rey extends Jebi {
  constructor (...args) {
    super(...args)
    this.name = 'Rey'
  }
}

// bad
class Foo {
  bar () { return 1 }
  bar () { return 2 }
}

// good
class Foo {
  bar () { return 1 }
}

// good
class Foo {
  bar () { return 2 }
}

```

## Modules

```js
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide')
mudule.exports = AirbnbStyleGuide.es6

// ok
import AirbinbStyleGuide from './AirbnbStyleGuide'
export default AirbnbStyleGuide.es6

// best
import { es6 } from './AirbnbStyleGuide'
export default es6

// 少用通配符导入
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide'

// good
import AirbnbStyleGuide from './AirbnbStyleGuide'

// bad
// filename es6.js
expoert { es6 as default } from './AirbnbStyleGuide'

// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide'
export default es6

// bad
import foo from 'foo'
// ... some other imports
import { name1, name2 } from 'foo'

// good
import foo, { name1, name2 } from 'foo'

// good
import foo, {
  name1,
  name2
} from 'foo'

// bad
let foo = 3
export { foo }

// good
const foo = 10
export { foo }

// 只有一个方法的时候，用默认导出方式
// bad
export function foo () {}

// good
export default function foo () {}


// import 必须放到方法的上面
// bad
import foo from 'foo'
foo.init()

import bar from 'bar'

// good
import foo from 'foo'
import bar from 'bar'

foo.init()

// 导入的方法太多的时候，用换行的方式
// bad
import { longNameA, longNameB, longNameC } from 'path'

import {
  longNameA,
  longNameB
} from 'path'

// bad
import fooSass from 'cas!sass!foo.css'
import barCss from 'style!css!bar.css'

// good
import fooSass from 'foo.scss'
import barCss from 'bar.css'
```

## Iterators and Generators

```js
const numbers = [1, 2, 3, 4]

// bad
let sum = 0
for (let num in numbers) {
  sum += num
}
sum === 10

// good
let sum = 0
numbers.forEach((num) => {
  sum += num
})
sum === 10

// best
const num = numbers.reduces((total, num) => total + num, 0)
sum === 10

// bad
const increasedByOne = []
for (let i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1)
}

// good
const increasedByOne = []
numbers.forEach((num) => {
  increasedByOne.push(num + 1)
})

// best
const increasedByOne = numbers.map(num => num + 1)
```

::: warning
不要使用 generators生成器函数， 对es5不是很好
:::

如果必须要使用的话，请确保 * 号 与 函数名间隔正确

```js
// bad
function * foo () {}

// bad
const bar = function * () {}

// bad
const baz = function *() {}

// bad
const quux = function*() {}

// bad
function*() {}

// good
function* foo () {}

// good
const foo = function* () {}
```

## Properties

```js
const luke = {
  jedi: teue,
  age: 20
}

// bad
const isJedi = luke['jedi']

// good
const isJedi = luke.jedi


function getProp (prop) {
  return luke[prop]
}

const isJedi = getProp('jedi')

// bad
const binary = Math.pow(2, 10)

// good
const binary = 2 ** 10
```

## Variables

```js
// bad
superPower = new SuperPower()

// const
const superPower = new SuperPower()

// bad
const items = getItems(),
  goSportsTeam = true,
  dragonball = 'a';

// good
const items = getItems()
const goSportsTeam = true
const dragonball = 'a'

// bad
let i, len, dragonball,
  items = getItems(),
  goSportsTeam = true;

// bad
let i
const items = getItems()
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true
const items = getItems()
let dragonball
let i
let len

// bad
function checkName (hasName) {
  const name = getName()

  if (hasName === 'test') {
    return false
  }

  if (name === 'test') {
    this.setName('')
    return false
  }

  return name
}

// good
function checkName (hasName) {
  if (hasName === 'test') {
    return false
  }
  const name = getName()

  if (name === 'test') {
    this.setName('')
    return false
  }
  return name
}

// bad
(function fn () {
  let a = b = c = 2
}())

console.log(a) // ReferenceError
console.log(b) // 1
console.log(c) // 1

// good
(function fn () {
  let a = 1
  let b = 1
  let c = 1
}())

console.log(a) // ReferenceError
console.log(b) // ReferenceError
console.log(c) // ReferenceError

// bad
const arr = [1, 2, 3, 4]
let num = 1
num++
--num

let sum = 0
let count = 0
for (let i = 0; i < arr.length; i++) {
  let item = arr[i]
  sum += item
  if (item) {
    count++
  }
}

// good
const arr = [1, 2, 3, 4]
let num = 1
num += 1
num -= 1

const sum = arr.reduce((a, b) => a + b, 0)
const count = arr.filter(Boolean).length

// bad
const foo =
  superLognsuperLognsuperLognsuperLognsuperLognName()

// bad
const foo
  = superLognsuperLognsuperLognsuperLognsuperLognName()

// good
const foo = (
  superLognsuperLognsuperLognsuperLognsuperLognName()
)

// good
const foo = 'superLognsuperLognsuperLognsuperLognsuperLognString'

// bad
var some-use-var = 371
var y = 10
y = 11

var z = 9
z = z + 1

// 未使用的变量
function get (x, y) {
  return x
}

// good
function getXPlusY (x, y) {
  return x + y
}

var x = 1
var y = x + 2

getXPlusY(x, y)
```

## Hoisting

```js
function fn () {
  console.log(notDefined)
}

function fn () {
  console.log(a)
  var a = true
}

function fn () {
  let a
  console.log(a)
  a = true
}

function fn () {
  console.log(a) // ReferenceError
  console.log(typeof a) // ReferenceError
  const a = true
}

function fn () {
  console.log(a) // undefined
  a() // TypeError

  var a = function () {
    console.log('匿名表达函数')
  }
}

function fn () {
  console.log(name) // undefined
  name() // TypeError name is not a function
  superPower() // ReferenceError superPower is not defined
  var name = function superPower () {
    console.log('Flying')
  }
}

function fn () {
  console.log(name) // undefined

  name () // TypeError name is not a function

  var name = function name () {
    console.log('name')
  }
}

function fn () {
  superPower() // Flying

  function superPower () {
    console.log('Flying')
  }
}
```

## Comparison Operators & Equality

空对象页是 true
undefined未定义为false
Null 计算结果未 false
Boolean 计算结果为false
数字+0 和 -0 和 NaN 为 false，其他为true
字符串'' 为false, 其他都是true

```js
if ([0] && []) {
  // true
  // 空数组页是一个对象也是true
}

// bad
if (isValid === true) {
  // ...
}

// good 布尔值判断
if (isVaild) {
  // ...
}

// bad
if (name) {}

// good 字符串判断
if (name !== '') {
  // ...
}

// bad
if (collection.length) {
  // ...
}

// good
if (collection.length > 0) {

}

// bad
swith (foo) {
  case 1:
    let x = 1
    break
  case 2:
    const y = 2
    break
  case 3:
    function f () {

    }
    break
  default:
    class C {}
}

// good
switch (foo) {
  case 1: {
    let x = 1
    break
  }
  case 2: {
    const y = 2
    break
  }
  case 3: {
    function f () {}
  }
  case 4:
    bar()
    break
  default: {
    class C {}
  }
}

// bad
const foo = maybe1 > maybe2
  ? 'bar'
  : value > value2 ? 'baz' : null

// better
const foo = maybe1 > maybe2
  ? 'bar'
  : maybeNull

// best
const foo  = maybe1 > maybe2 ? 'bar' : maybeNull

// bad
const foo = a ? a : b
const bar = c ? true : false
const baz = c ? false : true

// good
const foo = a || b
const bar = !!c
const baz = !c

// bad
const foo = a && b < 0 || c > 0 || d + 1 === 0

// bad
const bar = a ** b - 5 % d

// bad
if (a || b && c) {
  return d
}

// good
const foo = (a && b < 0) || c > 0 || (d + 1 === 0)

// good
const bar = (a **  b) - (5 % d)

// good
if (a || (b && c)) {
  return d
}

// good
const bar = a + b / c * d
```

## Blocks

```js
// bad
if (test)
  return false


// good
if (test) return false

// good
if (test) {
  return false
}

// bad
function foo () { return false }

// good
function bar () {
  return false
}

// bad
if (test) {
  thing1()
  thing2()
}
else {
  thing3()
}

// good
if (test) {
  thing1()
  thing2()
} else {
  thing3()
}

// bad
function foo () {
  if (x) {
    return x
  } else {
    return y
  }
}

// bad
function cats () {
  if (x) {
    return x
  } else if (y) {
    return y
  }
}

// bad
function dogs () {
  if (x) {
    return x
  } else {
    if (y) {
      return y
    }
  }
}

// good
function foo () {
  if (x) {
    return x
  }
  return y
}

// good
function cats () {
  if (x) {
    return x
  }

  if (y) {
    return y
  }
}

// good
function dogs (x) {
  if (x) {
    if (z) {
      return y
    }
  } else {
    return z
  }
}
```

## Control Statements

```js
// bad
if ((foo === 123 || bar === 'xyz') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
  thing1()
}

// bad
if (foo === 123 && bar === 'xyz') {
  thing1()
}

// bad
if (foo === 123 && bar === 'xyz') {
  thing1()
}

// bad
if (
  foo === 123 &&
  bar === 'xyz'
) {
  thing1()
}

// good
if (
  foo === 123
  & bar === 'xyz'
) {
  thing1()
}

// good
if (
  foo === 123 || bar === 'xyz'
  && doesItLookGoodWhenItBecomesThatLong()
  && isThisReallyHappening()
) {
  thing1()
}

// good
if (foo === 123 && bar === 'abc') {
  thing1()
}

// bad
!isRunning && startRunning()

// good
if (!isRunning) {
  startRunning()
}
```

## Comments

```js
// bad
// make () return a new element
// based on the passed in tag name
function make (tag) {
  // ...
  return element
}

// good
/**
 * make() return a new element
 * based on the passed-in tag name
**/
function make (tag) {
  // ...
  return element
}

// bad
const active = true // is current tag

// good
// is current tag
const active = true

// bad
function getType () {
  console.log('fetching type...')
  // set the default type to 'no type'
  const type = this.type || 'no type'
  return type
}

// good
function getType () {
  console.log('fetching type...')

  // set the default type to 'no type'
  const type = this.type || 'no type'
  return type
}

// also good
function getType () {
  // set the default type to 'no type'
  const type = this.type || 'no type'

  return type
}

// bad
//is current tab
const active = true

// good
// is current tab
const active = true

// bad
/**
 *make() return a new element
 *based on the passed-in tag name
*/
function make (tag) {
  // ...
  return element
}

// good
/**
 * make() return a new element
 * based on the passed-in tag name
**/
function make (tag) {
  return element
}

class Calculator extends Abacus {
  constructor () {
    super()

    // FIXME: shouddn't use a global here
    total = 0
  }
}

class Calcuator extends Abacus {
  constructor () {
    super()

    // TOTO: total should be configurable by an options param
    this.total = 0
  }
}
```

## Whitespace

```js
// bad
// 空了4格
function foo () {
    let name
}

// bad
// 空了1格
function bar () {
 let name
}

// good
// 空2格最好
function baz () {
  let name
}

// bad
function test(){
  console.log('test')
}

// good
function test () {
  console.log('test')
}

// bad
dog.set('attr',{
  age: '1 year',
  breed: 'Bernese Mountain Dog'
})

// good
dog.set('attr', {
  age: '1 year',
  breed: 'Bernese Mountain Dog'
})

// bad
if (isJedi) {
  fight ()
}

// good
if (isJedi) {
  fight()
}

// bad
function fight () {
  console.log('Swooosh')
}

// good
function fight() {
  console.log('Swoosh')
}

// bad
$('#items').find('.selected').height().end().find('.open').updateCount()

// bad
$('#items').
  find('.selected').
    height().
    end().
  find('.open').
    updateCount()

// good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('open')
    .updateCount()

// bad
if (foo) {
  return bar
}
return baz

// good
if (foo) {
  return bar
}

return baz

// bad
const obj = {
  foo () {
  },
  bar () {
  }
}
return obj

// good
const obj = {
  foo () {
  },

  bar() {
  }
}

return obj

// bad
const arr = [
  function foo () {
  },
  function bar () {
  }
]
return arr

// good
const arr = [
  function foo () {
  },
  function bar () {
  }
]

return arr

// bad
function bar () {

  console.log('test')

}

// bar
if (baz) {

  console.log('baz')
} else {
  console.log('foo')

}

// bad
class Foo {

  constructor (bar) {
    this.bar = bar
  }
}

// good
function bar() {
  console.log(foo)
}

// good
if (baz) {
  console.log(quux)
} else {
  console.log(foo)
}

// bad
function bar ( foo ) {
  return foo
}

// good
function bar (foo) {
  return foo
}

// bad
if ( foo ) {
  console.log('foo')
}

// good
if (foo) {
  console.log('foo')
}

// bad
const arr = [ 1, 3, 5 ]
console.log(arr[ 0 ])

// good
const arr = [1, 2, 3]
console.log(arr[1])

// bad
const foo = {clark: 'kent'}

// good
const foo = { clark: 'kent' }

// bad
const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy

// bad
$.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'))

// good
const foo = jsonData
  && jsonData.foo
  && jsonData.foo.bar
  && jsonData.foo.bar.baz
  && jsonData.foo.bar.baz.quux
  && jsonData.foo.bar.baz.quux.xyzzy

// good
$.ajax({
  method: 'POST',
  url: 'https://airbnb.com/',
  data: { name: 'John' },
})
  .done(() => console.log('Congratulations!'))
  .fail(() => console.log('You have failed this city.'))

// bad
function foo () {reutrn true}
if (foo) { bar = 0}

// good
function foo () { return true }
if (foo) { bar = 0 }

// bar
var foo = 1,bar = 2
var arr = [1 , 2]

// good
var foo = 1, bar = 2
var arr = [1, 2]

// bad
obj[foo ]
obj[ 'foo']
var x = {[ b ]: a}

// good
obj[foo]
obj['foo']
var x = { [b]: a }
obj[foo[bar]]
```
