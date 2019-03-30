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
```