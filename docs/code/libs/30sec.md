# 30-seconds-of-js

## Adapter

**ary**
创建一个最多接受n个参数的函数，忽略任何其他参数

```js
const ary = (fn, n) => (...args) => fn(...args.slice(0, n))

const firstTwoMax = ary(Math.max, 2)

[[4, 19, 'b'], [39], [18]].map(x => firstTwoMax(...x))

```

**call**
给定一个键和一组参数，在给定上下文时调用它们

```js
const call = (key, ...args) => content => content[key](...args)

Promise.resolve([1, 2, 3])
  .then(call('map', x => 2 * x))
  .then(console.log())
```

**colectlnto**
将接受数组的函数更改为可变参数函数

```js
const collectInto = fn => (...args) => fn(args)

const Pall = collectInto(Promise.all.bind(Promise))
let p1 = Promise.resolve(1)
let p2 = Promise.resolve(2)
let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3))

Pall(p1, p2, p3).then(console.log)
```

**flip**
Flip将函数作为参数，然后将第一个参数作为最后一个参数

```js
const flip = fn => (first, ...rest) => fn(...rest, first)

let a = {name: 'hello lyz'}
let b = {age: 20}
const mergeFrom = flip(Object.assign)
let mergePerson = mergeFrom.bind(null, a)
let newB = mergePerson(b)
b = {}
let newM = Object.assign(b, a)
console.log(newB) // { age: 20, name: 'hello lyz' }
console.log(newM) // { name: 'hello lyz' }
```

**over**
创建一个函数，该函数使用它接收的参数调用每个提供的函数并返回结果

```js
const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args))
const minMax = over(Math.min, Math.max)
let res = minMax(1, 2, 3, 4, 5)
console.log(res) // [1, 5]
```

**overArgs**
创建一个函数，通过转换参数调用提供的函数

```js
const overArgs = (fn, transforms) => (...args) => fn(...args.map((val, i) => transforms[i](val)))

const square = n => n * n 
const double = n => n * 2
const fn = overArgs((x, y) => [x, y], [square, double])
console.log(fn(3, 9))
```

**pipeAsyncFunctions**
执行从左到右的功能组合

```js
const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg))

const sum = pipeAsyncFunctions(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
)

(async () => {
  console.log(await sum(5))
})
```

**pipeFunctions**
执行从左到右的功能组合, 第一个函数处理后，在传递给第二个函数处理

```js
const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))

const add5 = x => x + 5
const multiply = (x, y) => x * y
const multiplyAndAdd5 = pipeFunctions(multiply, add5)
const res = multiplyAndAdd5(5, 2) // 15
```

普通函数写法

```js
var pipeFunctions = function() {
  var fns = []

  for(var i = 0; i < arguments.length; i++) {
    fns[i] = arguments[i]
  }

  return fns.reduce(function(f, g) {
    var args = []

    for(var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i]
    }

    return g(f.apply(void 0, args))
  })
}

var pipeFunctions = function pipeFunctions() {
  for(var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key]
  }

  return fns.reduce(function(f, g) {
    return function() {
      return g(f.apply(undefined, arguments))
    }
  })
}
```

**promisify**
转换异步函数以返回promise

```js
// 箭头函数写法
const promisify = func => (...args) => new Promise((resolve, reject) => func(...args, (err, result) => (err ? reject(err) : resolve(result))))

// 普通函数写法
var promisify = function(func) {
  
  return function() {
    for(var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }

    return new Promise(function(resolve, reject) {
      return func.apply(undefined, args.concat([function (err, result) {
        return err ? reject(err) : resolve(result)
      }]))
    })
  }
}
```

**rearg**
传递一个函数，函数传递几个参数，并按顺序返回。 第二个参数是一个数组，用下标来排序第一个函数传递参数返回的顺序

```js
const rearg = (fn, indexes) => (...args) => fn(...indexes.map(i => args[i]))

var rearged = rearg(function(a, b, c) {
  return [a, b, c]
}, [2, 0, 1])

rearged('b', 'c', 'a')
```

**spreadOver**

```js
const spreadOver = fn => argsArr => fn(...argsArr)

const arrayMax = spreadOver(Math.max)
arrayMax([1, 2, 3, 4])

// 普通函数写法
function _toConsumableArray(arr) {
  if(Array.isArray(arr)) {
    for(var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  } else {
    return Array.from(arr)
  }
}

var spreadOver = function(fn) {
  return function(argsArr) {
    return fn.apply(undefined, _toConsumableArray(argsArr))
  }
}
```

**unary**

```js
const unary = fn => val => fn(val)

['1', '2', '3'].map(unary(parseInt)) // [1, 2, 3]
```

## Array

**All**

 ```js
const all = (arr, fn = Boolean) => arr.every(fn)

all([3, 2, 1], x => x > 1) // false
all([1, 2, 3])  // true
```

**allEqual**
数组内所有值的类型相同，相等
```js
const allEqual = arr => arr.every(val => val === arr[0])

allEqual([1, 2, 3, 4, 5]) // false
allEqual([1, 1, 1, 1, 1]) // true
```

**any**

```js
const any = (arr, fn = Boolean) => arr.some(fn)

any([0, 1, 3, 4], x => x >=3) // true
any([1, 2, 3, 4, 0]) // true
```

**arryaToCSV** 

```js
const arrayToCSV = (arr, delimiter = ',') =>
  arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join('\n')

arrayToCSV([['a', 'b'], ['c', 'd']]); // '"a","b"\n"c","d"'
arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // '"a";"b"\n"c";"d"'
```

**bifurcate**

根据filter值的真假来判断传递的参数数组内容插入到那个数组

```js
const bifurcate = (arr, filter) => arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc), [[], []])

bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]); // [ ['beep', 'boop', 'bar'], ['foo'] ]
```

**bifurcateBy**

根据回调函数返回的值来讲第一个参数数组内容插入到那个数组

```js
const bifurcateBy = (arr, fn) => arr.reduce((arr, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [[], []])

bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b')
```

**chunk**
切割数组为二维数组，第二个参照是数组内元素的长度
```js
const chunk = (arr, size) => Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size))

chunk([1, 2, 3, 4, 5], 2) // [[1,2] [3, 4] [5]]
```

**compact**
过滤数组非假值的值
```js
const compact = arr => arr.filter(Boolean)

compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34])
// // [ 1, 2, 3, 'a', 's', 34 ]
```

**conutBy**

```js
const countBy = (arr, fn) => arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
  acc[val] = (acc[val] || 0) + 1
  return acc
}, {})

conutBy([6.1, 4.2, 6.3], Math.floor) // {4: 1, 6: 2}

```

**conutOccurrences**

  ```js
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)

  conutOccurrence([1, 1, 2, 1, 2, 3], 1) // 3
  ```

**deepFlatten**

```js
const deepFlatten = arr = > [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))

deepFlatten([1, [2], [[3], 4], 5]) // [1, 2, 3, 4, 5]
```

**difference**
返回第一个数组中不包含在第二个数组中的元素
```js
const difference = (a, b) => {
  const s = new Set(b)

  return a.fliter(x => !s.has(x))
}

difference([1, 2, 3], [1, 2, 5])
```

**differenceBy**

```js
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(v => fn(v)))
  return a.filter(x => !s.has(fn(x)))
}

differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor) // [1.2]
differenceBy([{x: 2}, {x: 1}], [{x: 1}], v => v.x) // [{x: 2}]
```

**differenceWith**

```js
筛选出函数处理不符合的数组1的元素
const differenceWidth = (arr, val, comp) => arr.filter(a => val.findIndex(b => comp(a, b)) === -1)

differenceWidth([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b)) // [1, 1.2]
```

**drop**

```js
const drop = (arr, n = 1) => arr.slice(n)

drop([1, 2, 3]) // [2, 3]
drop([1, 2, 3], 2) // [3]
drop([1, 2, 3], 4) // []
```

**dropRight**
从数组的右侧截掉元素
```js
 const dropRight = (arr, n = 1) => arr.slice(0, -n)

 dropRight([1, 2, 3, 4]) // [1, 2, 3]
 dropRight([1, 2, 3, 4], 2) // [1, 2]
 dropRight([1, 2, 3, 4], 4) // []
```

**dropRightWhile**

```js
const dropRightWhile = (arr, func) => {
  while(arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0, -1)
  return arr 
}

  dropRightWhile([1, 2, 3, 4], n => n < 3)
  ```

**dropWhile**
  
```js
const dropWhile = (arr, func) => {
  while(arr.length > 0 && !func(arr[0])) arr = arr.slice(1)
  return arr 
} 

dropWhile([1, 2, 3, 4], n => n >= 3) // [3, 4]
```

**everyNth**
取数组中下标为nth以及nth倍数的元素
```js
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1)

everyNth([1, 2, 3, 4, 5, 6], 2) // [2, 4, 6]
```

**filterNonUnique**
过滤数组中重复的元素
```js
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i))

filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]
```

**filterNonUniqueBy**

```js
const filterNonUniqueBy = (arr, fn) => {
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)))
}

filterNonUniqueBy([
  { id: 0, value: 'a' },
  { id: 1, value: 'b' },
  { id: 2, value: 'c' },
  { id: 1, value: 'd' },
  { id: 0, value: 'e' }
],
(a, b) => a.id == b.id
)
```

**findLast**

```js
const findLast = (arr, fn) => arr.filter(fn).pop()

findLast([1, 2, 3, 4], n => n % 2 === 1) // 3
```

**findLastIndex**

```js
const findLastIndex = (arr, fn) => {
  arr
    .map((val, i) => [i, val])
    .filter(([i, val]) => fn(val, i, arr))
    .pop()[0]
}

findLastIndex([1, 2, 3, 4], n => n % 2 === 1) // 2 下标为2
```

**flatten**

```js
const flatten = (arr, depth = 1) => 
arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), [])

flatten([1, [2], 3, 4]) // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2) // [1, 2, 3, [4, 5], 6, 7, 8]
```

**forEachRight**

```js
const forEachRight = (arr, callback) =>
  arr
    .slice(0)
    .reverse()
    .forEach(callback)

forEachRight([1, 2, 3, 4], val => console.log(val)) // '4', '3', '2', '1'

```

**groupBy**

```js
const groupBy = (arr, fn) => 
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || []).concat(arr[i])
    return acc
  }, {})

groupBy([6.1, 4.3, 6.4], Math.floor) // {4: [4.3], 6: [6.1, 6.3]}
groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}
```

**head**

```js
const head = arr => arr[0]
head([1, 2, 3, 4])
```

**indexOfAll**

```js
const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])

indexOfAll([1, 2, 3, 1, 2, 3], 1) // [0, 3]
indexOfAll([1, 2, 3], 4) // []
```


**initial**
返回数组中除了最后一个元素的所有元素
```js
const initial = arr => arr.slice(0, -1)

initial([1, 2, 3]) // [1, 2]
```

**initialize2DArray**

```js
const initialize2DArray = (w, h, val = null) => 
  Array.from({length: h}).map(() => Array.from({length: w}).fill(val))

initialize2DArray(2, 2, 0) // [[0, 0], [0, 0]]
```

**initializeArrayWithRange**

```js
const initializeArrayWithRange = (end, start = 0, step = 1) => 
Array.from({length: Math.ceil((end - start + 1) / step)}, (v, i) => i * step + start)

initializeArrayWithRange(5)  // [0,1,2,3,4,5]
initializeArrayWithRange(7, 3)  // [3,4,5,6,7]
initializeArrayWithRange(9, 0, 2)  // [0,2,4,6,8]
```

**initializeArrayWithRangeRight**

```js
const initializeArrayWithRangeRight = (end, start = 0, step = 1) => 
  Array.from({length: Math.ceil((end + 1 - start) / step)}).map(
  (v, i, arr) => (arr.length - i - 1) * step + start
)

initializeArrayWithRangeRight(5)  // [5,4,3,2,1,0]
initializeArrayWithRangeRight(7, 3)  // [7,6,5,4,3]
initializeArrayWithRangeRight(9, 0, 2)  // [8,6,4,2,0]
```

**initializeArrayWithValues**

```js
const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val)

initializeArrayWithValues(5, 2) // [2, 2, 2, 2, 2]
```

**initializeNDArray**

```js
const initializeNDArray = (val, ...args) => 
  args.length === 0
    ? val 
    : Array.from({length: args[0]}).map(() => initializeNDArray(val, ...args.slice(1)))

initializeNDArray(1, 3); // [1,1,1]
initializeNDArray(5, 2, 2, 2); // [ [[5,5],[5,5]],[[5,5],[5,5]] ]
```

**intersection**

 ```js
 const intersection = (a,  b) => {
   const s = new Set(b)
   return a.filter(x => s.has(x))
 }

 intersection([1, 2, 3], [4, 3, 2]) // [2, 3]
 ```

**intersectionBy**

```js
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn))
  return a.filter(x => s.has(fn(x)))
}

intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor) // [2.1]
```

**intersectionWith**

```js
const intersectionWith = (a, b, comp) => a.filter(x => b.findIndex(y => comp(x, y)) !== -1)

intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)); // [1.5, 3, 0]
```

**isSorted**

```js
const isSorted = arr => {
  let direction = -(arr[0] - arr[1])
  for(let [i , val] of arr.entries()) {
    direction = !direction ? -(arr[i-1] - arr[i]) : direction
    if(i === arr.length - 1) return !direction ? 0 : direction
    else if((val - arr[i + 1]) * direction > 0) return 0 
  }
}

isSorted([0, 1, 2, 2])  // 1
isSorted([4, 3, 2])  // -1
isSorted([4, 3, 5])  // 0
```

**join**

```js
const join = (arr, separator = ',', end = separator) =>
  arr.reduce(
    (acc, val, i) =>
      i === arr.length - 2
        ? acc + val + end
        : i === arr.length - 1
          ? acc + val
          : acc + val + separator
  ''
)

join(['pen', 'pineapple', 'apple', 'pen'], ',', '&')  // "pen,pineapple,apple&pen"
join(['pen', 'pineapple', 'apple', 'pen'], ',')  // "pen,pineapple,apple,pen"
join(['pen', 'pineapple', 'apple', 'pen'])  // "pen,pineapple,apple,pen"
```

**JSONtoCSV**

```js
const JSONtoCSV = (arr, columns, delimiter = ',') =>
  [
    columns.join(delimiter),
    ...arr.map(obj =>
      columns.reduce(
        (acc, key) => `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
        ''
      )
    )
  ].join('\n')

JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'])  // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ' '); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
```

**last**

```js
const last = arr => arr[arr.length - 1]

last([1, 2, 3]) // 3
```

**longestItem**

```js
const longestItem = (val, ...vals) =>
  [val, ...vals].reduce((a, x) => (x.length > a.length ? x : a))

longestItem('this', 'is', 'a', 'testcase')  // 'testcase'
longestItem(...['a', 'ab', 'abc'])  // 'abc'
longestItem(...['a', 'ab', 'abc'], 'abcd')  // 'abcd'
longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5])  // [1, 2, 3, 4, 5]
longestItem([1, 2, 3], 'foobar')  // 'foobar'
```

**mapObject**

```js
const mapObject = (arr, fn) =>
  (a => (
    (a = [arr, arr.map(fn)]), a[0].reduce((acc, val, idx) => ((acc[val] = a[1][idx]), acc), {})
  ))()

const squareIt = arr => mapObject(arr, a => a * a);
squareIt([1, 2, 3]); // { 1: 1, 2: 4, 3: 9 }
// [1, 2, 3, 1, 4, 9]
```

**maxN**

```js
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n)

maxN([1, 2, 3])  // [3]
maxN([1, 2, 3], 2)  // [3,2]
```

**minN**

```js
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n)

minN([1, 2, 3])  // [1]
minN([1, 2, 3], 2)  // [1,2]
```

**none**

```js
const none = (arr, fn = Boolean) => !arr.some(fn)

none([0, 1, 3, 0], x => x == 2) // true
none([0, 0, 0]) // true
```

**nthElement**

```js
const nthElement = (arr, n = 0) => (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0]

nthElement(['a', 'b', 'c'], 1) // 'b'
nthElement(['a', 'b', 'b'], -3) // 'a'
```

**offset**

```js
const offset = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, offset)]

offset([1, 2, 3, 4, 5], 2)  // [3, 4, 5, 1, 2]
offset([1, 2, 3, 4, 5], -2)  // [4, 5, 1, 2, 3]
```

**partition**

```js
const partition = (arr, fn) => 
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val)
      return acc
    },
    [[], []]
  )
const users = [{ user: 'barney', age: 36, active: false }, { user: 'fred', age: 40, active: true }]
partition(users, o => o.active)
// [[{ 'user': 'fred',    'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false }]]
```

**permutations**

```js
const permutations = arr => {
  if(arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [item, ...val])
      ),
    []
  )
}

permutations([1, 33, 5])  // [ [ 1, 33, 5 ], [ 1, 5, 33 ], [ 33, 1, 5 ], [ 33, 5, 1 ], [ 5, 1, 33 ], [ 5, 33, 1 ] ]
```

**pull**

```js
const pull = (arr, ...args) => {
  let argsState = Array.isArray(args[0] ? args[0] : args)
  let pulled = arr.filter((v, i) => !argsState.includes(v))
  arr.length = 0
  pulled.forEach((v) => arr.push(v))
}

let myArray = ['a', 'b', 'c', 'a', 'b', 'c']
pull(myArray, 'a', 'c')  // myArray = [ 'b', 'b' ]
```

**pullAtIndex**

```js
const pullAtIndex = (arr, pullArr) => {
  let removed = []
  let pulled = arr
    .map((v, i) => pullArr.includes(i) ? removed.push(v) : v)
    .filter((v, i) => !pullArr.includes(i))
  arr.length = 0
  pulled.forEach((v) => arr.push(v))
  return removed 
}

let myArray = ['a', 'b', 'c', 'd']
let pulled = pullAtIndex(myArray, [1, 3])  // myArray = [ 'a', 'c' ] , pulled = [ 'b', 'd' ]

```

**pullAtValue**

```js
const pullAtValue = (arr, pullArr) => {
  let removed = [],
    pushToRemove = arr.forEach((v, i) => pullArr.includes(v) ? removed.push(v) : v),
    mutateTo = arr.filter((v, i) => !pullArr.includes(v))

  arr.length = 0
  mutateTo.forEach(v => arr.push(v))
  return removed
}

let myArray = ['a', 'b', 'c', 'd']
let pulled = pullAtValue(myArray, ['b', 'd'])  // myArray = [ 'a', 'c' ] , pulled = [ 'b', 'd' ]
```

**pullBy**

```js
const pullBy = (arr, ...args) => {
  const len = args.length > 1 ? args[args.length -1] : undefined
  fn = typeof fn == 'function' ? (args.pop(), fn) : undefined
  let argsState = Array.isArray(args[0]) ? args[0] : args 
  let pulled = arr.filter(v => !argsState.includes(fn(v)))
  arr.length = 0
  pulled.forEach(v => arr.push(v))
}

var myArray = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }]
pullBy(myArray, [{ x: 1 }, { x: 3 }], o => o.x)  // myArray = [{ x: 2 }]
```

**reducedFilter**

```js
const reducedFilter = (data, keys, fn) => {
  data.filter(fn).map(el => {
    keys.reduces((acc, key) => {
      acc[key] = el[key]
      return acc
    }, {})
  })
}

const data = [
  {
    id: 1,
    name: 'john',
    age: 24
  },
  {
    id: 2,
    name: 'mike',
    age: 50
  }
];

reducedFilter(data, ['id', 'name'], item => item.age > 24)  // [{ id: 2, name: 'mike'}]
```

**reduceSuccessive**

```js
const reduceSuccessive = (arr, fn, acc) => 
  arr.reduce((res, val, i, arr) => (res.push(fn(res.slice(-1)[0], val, i, arr)), res), [acc])

reduceSuccessive([1, 2, 3, 4, 5, 6], (acc, val) => acc + val, 0) // [0, 1, 3, 6, 10, 15, 21]
```

**reduceWhich**

```js
const reduceWhich = (arr, comparator = (a, b) => a - b) => 
arr.reduce(a, b) => (comparator(a, b) >= 0 ? b : a)

reduceWhich([1, 3, 2])  // 1
reduceWhich([1, 3, 2], (a, b) => b - a)  // 3
reduceWhich(
  [{ name: 'Tom', age: 12 }, { name: 'Jack', age: 18 }, { name: 'Lucy', age: 9 }],
  (a, b) => a.age - b.age
)  // {name: "Lucy", age: 9}
```

**reject**

```js
const reject = (pred, arr) => arr.filter((...args) => !pred(...args))

reject(x => x % 2 === 0, [1, 2, 3, 4, 5, 6, 7])  // [1, 3, 5, 7]
reject(word => word.length > 4, ['Apple', 'Pear', 'Kiwi', 'Banana'])  // ['Pear', 'Kiwi']
```

**remove**

```js
const remove = (arr, func) => 
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1)
      return acc.concat(val)
    }, [])
    : []

remove([1, 2, 3, 4, 5], x => x % 2 === 0) // [2, 4]
```

**sample**

```js
const sample = arr[Math.floor(Math.random() * arr.length)]

sample([3, 7, 9, 11]) 
```

**sampleSize**

```js
const sampleSize = ([...arr], n = 1) => {
  let len = arr.length
  while(len) {
    let i = Math.floor(Math.random() * len--)
    [arr[i], arr[len]] = [arr[len], arr[i]]
  }
  return arr.slice(0, n)
}

sampleSize([1, 2, 3], 2); // [3,1]
sampleSize([1, 2, 3], 4); // [2,3,1]
```

**shank**

```js
const shank = (arr, index = 0, delCount =  0, ...elements) => 
  arr
      .slice(0, index)
      .concat(elements)
      .concat(arr.slice(index + delCount))

const names = ['alpha', 'bravo', 'charlie']
const namesAndDelta = shank(names, 1, 0, 'delta')  // [ 'alpha', 'delta', 'bravo', 'charlie' ]
const namesNoBravo = shank(names, 1, 1)  // [ 'alpha', 'charlie' ]
console.log(names)  // ['alpha', 'bravo', 'charlie']
```

**shuffle**

```js
const shuffle = ([...arr] ) => {
  let m = arr.length
  while(m) {
    let i = Math.floor(Math.random() * m--)
    [arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}

const foo = [1, 2, 3];
shuffle(foo)  // [2, 3, 1], foo = [1, 2, 3]
```

**similarity**

```js
const similarity = (arr, values) => arr.fliter(v => values.includes(v))

similarity([1, 2, 3], [1, 2, 4])  // [1, 2]
```

**sortedIndex**

```js
const sortedIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1]
  const index = arr.findIndex(el => (isDescending ? n >= el : n <= el))
  return index === -1 ? arr.length : index
}

sortedIndex([1, 2, 3, 5], 4)
```

**sortedIndexBy**

```js
const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length -1])
  const val = fn(n)
  const index = arr.findIndex(el => (isDescending ? val >= fn(el) : val <= fn(el)))
  return index === -1 ? arr.length : index
}

sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x)
```

**sortedLastIndex**

```js
const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1]
  const index = arr.reverse().findIndex(el => (isDescending ? n <= el : n >= el))
  return index === -1 ? 0 : arr.length - index
}
sortedLastIndex([10, 20, 30, 30, 40], 30) // 4
```

**sortedLastIndexBy**

```js
const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1])
  const val = fn(n)
  const index = arr.map(fn).reverse().findIndex(el => (isDescending ? val <= el : val >= el))
  return index === -1 ? 0 : arr.length - index
}

sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x)  // 1
```

**stableSort**

```js
const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({item, index}))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({item}) => item)

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const stable = stableSort(arr, () => 0)  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

**symmetricDifference**

```js
const symmetricDifference = (a, b) => {
  const sA = new Set(a)
  const sB = new Set(b)

  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))]
}

symmetricDifference([1, 2, 3], [1, 2, 4])  // [3, 4]
```

**symmetricDifferenceBy**

```js
const symmetricDifferenceBy = (a, b, fn) => {
  const sA = new Set(a.map(v = fn(v)))
  const sB = new Set(b.map(v = fn(v)))

  return [...a.filter(x => !sB.has(fn(x))), ...b.filter(x => !sA.has(fn(x)))]
}

symmetricDifferenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)  // [ 1.2, 3.4 ]
```

**symmetricDifferenceWith**

```js
const symmetricDifferenceWith = (arr, val, comp) => [
  ...arr.filter(a => val.findIndex(b => comp(a, b)) === -1),
  ...val.filter(a => arr.findIndex(b => comp(a, b)) === -1)
]

symmetricDifferenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
)  // [1, 1.2, 3.9]
```

**tail**

```js
const tail = arr => (arr.length > 1 ? arr.slice(1) : arr)

tail([1, 2, 3])  // [2,3]
tail([1])  // [1]
```

**take**

```js
const take = (arr, n = 1) => arr.slice(0, n)

take([1, 2, 3], 4) // [1, 2, 3]
take([1, 2, 3, 4], 0) // []
```

**takeRight**

```js
const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length)

takeRight([1, 2, 3], 2)  // [ 2, 3 ]
takeRight([1, 2, 3])  // [3]
```

**takeRightWhile**

```js
const takeRightWhile = (arr, fnuc) => arr.reduceRight((acc, el) => (fn(el) ? acc : [el, ...acc]), [])

takeRightWhile([1, 2, 3, 4], n => n < 3)
```

**takeWhile**

```js
const takeWhile = (arr, func) => {
  for(const [i, val] of arr.entries()) if(func(val)) return arr.slice(0, i)
  return arr
}

takeWhile([1, 6, 9, 3, 2], n => n >= 7) // [1, 6]
```

**toHash**

```js
const toHash = (object, key) => {
  Array.prototype.reduce.call(
    object,
    (acc, data, index) => (acc[!key ? index : data[key]] = data, acc),
    {}
  )
}

toHash([4, 3, 2, 1]); // { 0: 4, 1: 3, 2: 2, 3: 1 }
toHash([{ a: 'label' }], 'a'); // { label: { a: 'label' } }

let users = [{ id: 1, first: 'Jon' }, { id: 2, first: 'Joe' }, { id: 3, first: 'Moe' }];
let managers = [{ manager: 1, employees: [2, 3] }];

managers.forEach(
  manager =>
    (manager.employees = manager.employees.map(function(id) {
      return this[id];
    }, toHash(users, 'id')))
);
managers; // [ { manager:1, employees: [ { id: 2, first: "Joe" }, { id: 3, first: "Moe" } ] } ]
```

**union**

```js
const union = (a, b) => Array.from(new Set([...a, ...b]))

union([1, 2, 3], [4, 3, 2]) // [1, 2, 3, 4]
```

**unionBy**

```js
const unionBy = (a, b, fn) => {
  const s = new Set(a.map(fn))

  return Array.from(new Set([...a, ...b.filter(x => !s.has(fn(x)))]))
}

unionBy([2.1], [1.2, 2.3], Math.floor)  // [2.1, 1.2]
```

**unionWith**

```js
const unionWith = (a, b, comp) => 
  Array.from(new Set([...a, ...b.filter(x => a.findIndex(y => comp(x, y)) === -1)]))

unionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b))  // [1, 1.2, 1.5, 3, 0, 3.9]
```

**uniqueElements**

```js
const uniqueElements = arr => [..new Set(arr)]

uniqueElements([1, 2, 2, 3, 4, 4, 5])  // [1, 2, 3, 4, 5]
```

**uniqueElementsBy**

```js
const uniqueElementsBy = (arr, fn) => 
  arr.reduce((acc, val) => {
    if(!acc.some(x => fn(val, x))) acc.push(val)
    return acc
  }, [])


uniqueElementsBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
)  // [ { id: 0, value: 'a' }, { id: 1, value: 'b' }, { id: 2, value: 'c' } ]
```

**uniqueElementsByRight**

```js
const uniqueElementsByRight = (arr, fn) => 
  arr.reduceRight((acc, v) => {
    if(!acc.some(x => fn(x, v))) acc.push(v)
    return acc
  }, [])

uniqueElementsByRight(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'e' }, { id: 1, value: 'd' }, { id: 2, value: 'c' } ]
```

**uniqueSymmetricDifference**

```js
const uniqueSymmetricDifference = (a, b) => [
  ...new Set([...a.filter(x => !b.includes(x)), ...b.filter(x => !a.includes(x))])
]

uniqueSymmetricDifference([1, 2, 3], [1, 2, 4])  // [3, 4]
uniqueSymmetricDifference([1, 2, 2], [1, 3, 1])  // [2, 3]
```

**unzip**

```js
const unzip = arr => 
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc)
    Array.form({length: Math.max(...arr.map(x => x.length))})
    .map(x => [])
  )

unzip([['a', 1, true], ['b', 2, false]])  // [['a', 'b'], [1, 2], [true, false]]
unzip([['a', 1, true], ['b', 2]])  // [['a', 'b'], [1, 2], [true]]
```

**unzipWith**

```js
const unzipWith = (arr, fn) => 
  arr
    .reduce(
      (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
      Array.form({
        length: Math.max(...arr.map(x => x.length))
      }).map(x => [])

    ).map(val => fn(...val))
unzipWith([[1, 10, 100], [2, 20, 200]], (...args) => args.reduce((acc, v) => acc + v, 0)); // [3, 30, 300]
```

**without**

```js
const without = (arr, ...args) => arr.filter(x => !args.includes(x))

without([2, 1, 2, 3], 1, 2)  // [3]
```

**xProd**

```js
const xProd = (a, b) => a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), [])

xProd([1, 2], ['a', 'b']) // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```

**zip**

```js
const zip = (...array) => {
  const maxLength = Math.max(...array.map(x => x.length))
  return Array.form({length: maxLength}).map(_, i) => {
    return Array.form({length: array.length}, (_, k) => array[k][i])
  }
}
zip(['a', 'b'], [1, 2], [true, false]) // [['a', 1, true], ['b', 2, false]]
zip(['a'], [1, 2], [true, false])  // [['a', 1, true], [undefined, 2, false]]
```

**zipObject**

```js
const zipObject = (props, values) => 
  props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {})

zipObject(['a', 'b', 'c'], [1, 2])  // {a: 1, b: 2, c: undefined}
zipObject(['a', 'b'], [1, 2, 3])  // {a: 1, b: 2}
```

**zipWith**

```js
const zipWith = (...array) => {
  const fn = typeof array[array.length - 1] === 'function' ? array.pop() : undefined
  return Array.from(
    { length: Math.max(...array.map(a => a.length)) },
    (_, i) => (fn ? fn(...array.map(a => a[i])) : array.map(a => a[i]))
  )
}

zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c); // [111,222]
zipWith(
  [1, 2, 3],
  [10, 20],
  [100, 200],
  (a, b, c) => (a != null ? a : 'a') + (b != null ? b : 'b') + (c != null ? c : 'c')
)  // [111, 222, '3bc']
```

## Browser

**arrayToHtmlList**

```js
const arrayToHtmlListv = (arr, listId) => 
  (el => (
    (el => document.querySelector('#' + listId)),
    (el.innerHTML += arr.map(item => `<li>${item}</li>`).join(''))
  ))()

arrayToHtmlList(['list1', 'list2'], 'myList')
```

**bottomVisible**
`window.scrollY || document.documentElement.scrollTop`
```js
const bottomVisible = () =>  document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)
```

**copyToClipboard**

```js
const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str 
  el.setAttribute('readonly', '')
  el.style.position = 'absolutee'
  el.style.left = '-9999px'
  document.body.applidChild(el)

  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if(selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}
copyToClipboard('内容已拷贝成功!')
```

**counter**
```js
const counter = (selector, start, end, step = 1, duration = 2000) => {
    let current = start,
      _step = (end - start) * step < 0 ? -step : step,
      timer = setInterval(() => {
        current += _step
        document.querySelector(selector).innerHTML = current
        if(current >= end) document.querySelector(selector).innerHTML = end 
        if(current >= end) clearInterval(timer)
      }, Math.abs(Math.floor(duration / (end - start))))
    return timer 
  }
```

**createElement**

```js
const createElement = str => {
    const el = document.createElement('div')
    el.innerHTML = str
    return el.firstElementChild
  }

  const el = createElement(
    `<div class="container">
      <p>Hello!</p>
    </div>`
  )
  document.querySelector('#createElement').appendChild(el)
  console.log(el.className) // 'container'
```

**createEventHub**

```js
const createEventHub = () => ({
  hub: document.createElement(null),
  emit(event, data){
    (this.hub[event] || []).forEach(handler => handler(data))
  },
  on(event, handler) {
    if(!this.hub[event]) this.hub[event] = []
    this.hub[event].push(handler)
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler)
    if(i > -1) this.hub[event].slice(i, 1)
  }
})

const handler = data => console.log(data)
const hub = createEventHub()
let incrememt = 1

hub.on('message', handler)
hub.on('message', () => console.log('Message event fired'))
hub.on('incrememt', () => incrememt++)

hub.emit('message', 'hello world')
hub.emit('message', { hello: 'world' })
hub.emit('incrememt')

hub.off('message', handler)
```

**currentURL**

```js
const currentURL = () => window.location.href
```

**detectDeviceType**

```js
const detectDeviceType => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop'
```

**elementContains**

```js
const elementContains = (parent, child) => parent !== child && parent.contains(child)

elementContains(document.querySelector('head'), document.querySelector('title')); // true
elementContains(document.querySelector('body'), document.querySelector('body')); // false
```

**elementIsVisibleInViewport**

```js
const elementIsVisibleInViewport = (el, partiallyVisibale = false) => {
  const {left, top, right, bottom } = el.getBoundingClientRect()
  const { innerHeight, innerWidth } = window

  return partiallyVisibale
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && 
      ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth

elementIsVisibleInViewport()
}
```

**getImages**

```js
const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName('img)].map(img => img.getAttribute('src))
  return includeDuplicates ? images : [...new Set(images)]
}

getImages(document, true)  // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false)  // ['image1.jpg', 'image2.png', '...']
```

**getScrollPosition**

```js
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
})
getScrollPosition()

```

**getStyle**

```js
const getStyle = (el, name) => getComputedStyle(el)[name]

getStyle(document.querySelector('p'), 'background-color'); // rgb(255, 0, 0)
```

**hasClass**

```js
const hasClass = (el, cls) => el.classList.contains(cls)

hasClass(document.querySelector('p.special'), 'special')  // true
```

**hashBrowser**

```js
const hashBrowser = val =>
crypto.subtle.digest('SHA-256', new TextEncoder('utf-8').encode(val)).then(h => {
  let hexes = [],
    view = new DataView(h)
  for (let i = 0; i < view.byteLength; i += 4)
    hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
  return hexes.join('')
})

hashBrowser(JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })).then(console.log)  // '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'
```

**hide**

```js
const hide = els => els.forEach(el => (e.style.display = 'none'))

hide(document.querySelectorAll('p'))  
```

**httpsRedirect**

```js
const httpsRedirect = () => {
  if(location.protocol !== 'https') location.replace('https' + location.href.split('//')[1])
}

httpsRedirect()
```

**insertAfter**

```js
const insertAfter = (el, htmlStr) => el.insertAdjacenHTML('afterend', htmlStr)

insertAfter(document.querySelector('#myId'), '<p>After</p>')
```

**insertBefore**

```js
const insertBefore = (el, htmlStr) => el.insertAdjacenHTML('beforebegin', htmlStr)
insertAfter(document.querySelector('#myId'), '<p>Before</p>')
```

**isBrowserTabFocused**

```js
const isBrowserTabFocused = () => !document.hidden

isBrowserTabFocused() // true 
```

**nodeListToArray**

```js
const nodeListToArray = nodeList => [...nodeList]

nodeListToArray(document.childNodes)
```

**observerMutations**

```js
const observerMUtations = (element, callback, options) => {
  const observer = new MutationObserver(mutations => mutations.forEach(m => callback(m)))
  observer.observe(
    element,
    Object.assign(
      {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        cahracterData: true,
        characterDataOldValue: true,
        subtree: true
      },
      options
    )
  )
  return observer
}

const obs = observeMutations(document, console.log)  // Logs all mutations that happen on the page
obs.disconnect()  // Disconnects the observer and stops logging mutations on the page
```

**off**

```js
const off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts)

const fn = () => console.log('!')
document.body.addEventListener('click', fn)
off(document.body, 'click', fn)
```

**on**

```js
const on = (el, evt, fn, opts = {}) => {
  const delegatorFn = e => e.target.matches(opts.terget) && fn.call(e.target, e)
  el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false)
  if(opts.target) return delegatorFn
}

const fn = () => console.log('!')
on(document.body, 'click', fn)
on(document.body, 'click', fn, {target: 'p'})
on(document.body, 'click', fn, {options: true})
```

**onUserInputChange**

```js
const onUserInputChange = callback => {
  let type = 'mouse',
    lastTime = 0
  const mouseoverHandler = () => {
    const now = performance.now()
    if(now - lastTime < 20) 
    (type = 'mouse'), callback(type), document.removeEventListener('mouseover', mouseoverHandler)
    lastTime = now
  }
  document.addEventListener('touchstart', () => {
    if(type === 'touch') return 
    (type = 'touch'), callback(type), document.addEventListener('mouseover', mouseoverHandler)
  })
}

onUserInputChange(type => {
  console.log('The user is now using', type, 'as an input method.')
})
```

**prefix**

```js
const prefix = prop => {
  const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1)
  const prefixes = ['', 'webkit', 'moz', 'ms', 'o']
  const i = prefixes.findIndex(
    prefix => typeof document.body.style[prefix ? prefix + capitalizedProp : prop] !== undefined
  )
  
  return i !== -1 ? (i === 0 ? prop : prefixes[i] + capitalizedProp) : null
}

prefix('appearance')
```

**recordAnimationFrames**

```js
const recordAnimationFrames = (callback, autoStart = false) => {
  let running = true, raf
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }
  const start = () => {
    running = true
    run()
  }
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback()
      if(running) run()
    })
  }
  if(autoStart) start()
  return { start, stop }
}

const cb = () => console.log('Animation frame fired')
const recorder = recordAnimationFrames(cb) // logs 'Animation frame fired' on each animation frame
recorder.stop() // stops logging
recorder.start() // starts again
const recorder2 = recordAnimationFrames(cb, false) // `start` needs to be explicitly called to begin recording frames
```

**redirect**

```js
const redirect = (url, asLink = true) => {
   asLink ? (window.location.href = url) : window.location.replace(url)
 }
```

**runAsync**

```js
const runAsync = fn  => {
  const worker = new Worker(
    URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
      type: 'application/javascript; charset=utf-8'
    })
  )
  return new Promise((resolve, reject) => {
    worker.onmessage = ({data}) => {
      resolve(data), worker.terminate()
    }
    worker.onerror = err => {
      reject(err), worker.terminate()
    }
  })
}

const longRunningFunction = () => {
  let result = 0;
  for (let i = 0; i < 1000; i++)
    for (let j = 0; j < 700; j++) for (let k = 0; k < 300; k++) result = result + i + j + k;

  return result;
};
/*
  NOTE: Since the function is running in a different context, closures are not supported.
  The function supplied to `runAsync` gets stringified, so everything becomes literal.
  All variables and functions must be defined inside.
*/
runAsync(longRunningFunction).then(console.log) // 209685000000
runAsync(() => 10 ** 3).then(console.log) // 1000
let outsideVariable = 50
runAsync(() => typeof outsideVariable).then(console.log) // 'undefined'

```

**scrollToTop**

```js
const scrollToTop = () => {
  const st = document.documentElement.scrollTop || document.body.scrollTop
  if(st > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, st - st / 8)
  }
}
```

**setStyle**

```js
const setStyle = (el, name, val) => (el.style[name] = val)

setStyle(document.querySelector('p'), 'font-size', '20px')
```

**smoothScroll**

```js
const smoothScroll = element  => {
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  })
}

smoothScroll('#fooBar')  // scrolls smoothly to the element with the id fooBar
smoothScroll('.fooBar')  // scrolls smoothly to the first element with a class of fooBar
```

**toggleClass**

```js
const toggleClass = (el, cls) => el.classList.toggle(cls)
```

**triggerEvent**

```js
const triggerEvent = (el, eventType, detail) => {
  el.dispatchEvent(new CustomEvent(eventType, {detail}))
}
```

**UUIDGeneratorBrowser**

```js
const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
```

## Date

**dayOfYear**

```js
const dayOfYear = date => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)

dayOfYear()
```

**formatDuration**

```js
const formatDuration = ms => {
  if(ms < 0) ms = -ms 
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  }
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
    .join(', ')
}
formatDuration(1001)
```

**getColonTimeFromDate**

```js
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8)

getColonTimeFromDate(new Date()) // "22:09:18"
```

**getDaysDiffBetweenDates**

```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24)
getDaysDiffBetweenDates(new Date('2018-11-4'), new Date('2018-11-11'))  // 7
```

**getMeridiemSuffixOfInteger**

```js
const getMeridiemSuffixOfInteger = num => 
  num === 0 || num === 24
    ? 12 + 'am'
    : num === 12
      ? 12 + 'pm'
      : num < 12
        ? (num % 12) + 'am'
        : (num % 12) + 'pm'

getMeridiemSuffixOfInteger(12) // "12pm"
getMeridiemSuffixOfInteger(0) // "12am"
getMeridiemSuffixOfInteger(12) // "12pm"
getMeridiemSuffixOfInteger(11) // "11am"
getMeridiemSuffixOfInteger(13) // "1pm" 
```

**isAfterDate**

```js
const isAfterDate = (dateA, dateB) => dateA > dateB

isAfterDate(new Date(2001, 9, 11), new Date(2012, 1, 1))
```

**isBeforeDate**

```js
const isBeforeDate = (dateA, dateB) => dateA < dateB
```

**isSameDate**

```js
const isSameDate = (dateA, dateB) => dateA.toISOString() === dateB.toISOString()
isSameDate(new Date(2018, 10, 20), new Date(2018, 10, 20))  // true
```

**maxDate**

```js
const maxDate = (...dates) => new Date(Math.max.apply(null, ...dates))

const array = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9)
];
maxDate(array)  // 2018-03-11T22:00:00.000Z
```

**minDate**

```js
const minDate = (...dates) => new Date(Math.min.apply(null, ...dates))
```

**tomorrow**

```js
const tomorrow = (long = false) => {
  let t = new Date()
  t.setDate(t.getDate() + 1)
  const ret = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
  return !long ? ret : ret + 'T00:00:00'
}

tomorrow() // "2018-11-06"
```

## Function

**attempt**

```js
const attempt = (fn, ...args) => {
  try{
    return fn(...args)
  } catch(e) {
    return e instanceof Error ? e : new Error(e)
  }
}

var elements = attempt(function(selector) {
  return document.querySelectorAll(selector);
}, '>_>')
if (elements instanceof Error) elements = []  // elements = []
```

**bind**

```js
const bind = (fn, ctx, ...boundArgs) => (...args) => fn.apply(ctx, [...boundArgs, ...args])

function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation
}

const fred = {user: 'freddy'}
const fredBound = bind(greet, fred)
console.log(fredBound('hello', '!!'))
```

**bindKey**

```js
const bindKey = (ctx, fn,  ...boundArgs) => (...args) => ctx[fn].apply(ctx, [...boundArgs, ...args])

const fred = {
  user: 'freddy',
  greet: function(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation
  }
}

const fredBound = bindKey(fred, 'greet')
console.log(fredBound('hello', '!!'))
```

**chainAsync**

```js
const chainAsync = fns => {
  let cur = 0
  const next = () => fns[cur++](next)
  next()
}

chainAsync([
  next => {
    console.log('0 seconds')
    setTimeout(next, 1000)
  },
  next => {
    console.log('1 seconds')
  }
])
```

**compose**

```js
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const add5 = x => x + 5
const multiply = (x, y) => x * y
const multiplyAndAdd5 = compose(add5, multiply)
multiplyAndAdd5(5, 6) // 35
```

**composeRight**

```js
const composeRight = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))

const add = (x, y) => x + y
const square = x => x * x
const addAndSquare = composeRight(add, square)
addAndSquare(1, 4) // 25
```

**converge**

```js
const converge = (converger, fns) => (...args) => converger(...fns.map(fn => fn.apply(null, args)))

const average = converge((a, b) => a / b, [
  arr => arr.reduce((a, v) => a + v, 0),
  arr => arr.length
])
average([1, 2, 3, 4, 5, 6, 7]) // 4
```

**curry**

```js
const curry = (fn, arity = fn.length, ...args) => arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args)

curry(Math.pow)(2)(10)  // 1024
curry(Math.min, 3)(10)(50)(2)  // 2
```

**debounce**

```js
const debounce = (fn, ms = 0) => {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), ms)
  }
}

window.addEventListener(
  'resize',
  debounce(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 500)
)  // Will log the window dimensions at most every 500ms
```

**defer**

```js
const defer = (fn, ...args) => setTimeout(fn, 1, ...args)

defer(console.log, 'a'), console.log('b')  // logs 'b' then 'a'
```

**delay**

```js
const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args)

delay(
  function(text) {
    console.log(text)
  },
  1000,
  'later'
)  // Logs 'later' after one second.
```

**functionName**

```js
const functionName = fn => (console.debug(fn), fn)

functionName(Math.min) // min
```

**hz**

```js
const hz = (fn, iterations = 100) => {
  const before = performance.now()
  for(let i = 0; i < iterations; i++) fn()
  return (1000 * iterations) / (performance.now() - before)
}

const numbers = Array(10000).fill().map((_, i) => i)

const sumReduce = () => numbers.reduce((acc, val) => acc + val, 0)
const sumForLoop = () => {
  let sum = 0
  for(let i = 0; i < numbers.length; i++) sum += number[i]
  return sum
}

Math.round(hz(sumReduce))
Math.round(hz(sumForLoop))
```

**memoize**

```js
const memoize = fn => {
  const cache = new Map()
  const cached = return function(val) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val)
  }
  cached.cache = cache
  return cached
}
// See the `anagrams` snippet.
const anagramsCached = memoize(anagrams)
anagramsCached('javascript')  // takes a long time
anagramsCached('javascript')  // returns virtually instantly since it's now cached
console.log(anagramsCached.cache)  // The cached anagrams map
```

**negate**

```js
const negate = func => (...args) => !func(...args)

[1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 === 0)) // [1, 3, 5]
```

**once**

```js
const once = fn => {
  let called = false
  return function(...args) {
    if(called) return
    called = true
    return fn.apply(this, args)
  }
}

const startApp = function(event) {
  console.log(this, event)
}

document.body.addEventListener('click', once(startApp))
```

**partial**

```js
const partial = (func, ...partials) => (...args) => func(...partials, ...args)

const greet = (greeting, name) => greeting + ' ' + name
const greetHello = partial(greet, 'Hello')
greetHello('John') // Hello John
```

**partialRight**

```js
const partialRight = (func, ...partials) => (...args) => func(...args, ...partials)

const greet = (greeting, name) => greeting + ' ' + name
const greetHello = partial(greet, 'Hello')
greetHello('John') // John Hello
```

**runPromisesInSeries**

```js
const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve())

const delay = d => new Promise(r => setTimeout(r, d))
runPromisesInSeries([() => delay(1000), () => delay(2000), () => console.log('a')])
```

**sleep**

```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function sleepWork() {
  console.log('before sleep')
  await sleep(3000)
  console.log('after 3s logs')
}
```

**throttle**

```js
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime
  return function() {
    let ctx = this
    let args = arguments
    if(!inThrottle) {
      fn.apply(ctx, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(function() {
        if(Date.now() - lastTime >= wait) {
          fn.apply(ctx, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}

window.addEventListener(
  'resize',
  throttle(function() {
    console.log('width: ', window.innerWidth)
    console.log('height: ', window.innerHeight)
  }, 1000)
)
```

**times**

```js
const times = (n, fn, ctx = undefined) => {
  let i = 0
  while(fn.call(ctx, i) !== false && ++i < n) {}
}

let output = ''
times(5, i => (output += i))
console.log(output)  // 01234
```

**uncurry**

```js
const uncurry = (fn, n = 1) => (...args) => {
  const next = acc => args => args.reduce((x, y) => x(y), acc)
  if(n > args.length ? throw new RangeError('args too few'))
  return next(fn)(args.slice(0, n))
}

const add = x => y => z => x + y + z
const uncurriedAdd = uncurry(add, 3)
uncurriedAdd(1, 2, 3)  // 6
```

**unfold**

```js
const unfold = (fn, seed) => {
  let result = []
  let val = [null, seed]
  while( ( val = fn(val[1]) ) ) result.push(val[0])
  return result
}
const fn = n => (n > 50 ? false : [-n, n + 10])
unfold(fn, 10) // [-10, -20, -30, -40, -50]
```

**when**

```js
const when = (pred, whenTrue) => n => (pred(n) ? whenTrue(n) : n)

const doubleEventNumber = when(x => x % 2 === 0, x => x * 2)
doubleEventNumber(2)  // 4
doubleEventNumber(1)  // 1
```

## Math

**approximatelyEqual**

```js
const approximatelyEqual = (v1, v2, essilon = 0.001) => Math.abs(v1 - v2) < epsilon

approximatelyEqual(Math.PI / 2.0, 1.5708)  // true
```

**average**

```js
const average = (...nums) => nums.reduce((acc, val) => acc + val, 0) / nums.length

average(...[1, 2, 3])  // 2
average(1, 2, 3)  // 2
```

**averageBy**

```js
const averageBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0) /
  arr.length

averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)  // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')  // 5
```

**binomialCoefficient**

```js
const binomialCoefficient =  (n, k) => {
  if(Number.isNaN(n) || Number.isNaN(k)) return NaN
  if((k < 0) || (k > n)) return 0
  if(k === 0 || k === n) return 1
  if(k === 1 || k = n - 1) return n
  if(n - k < k) k = n - k
  let res = n
  for(let j = 2; j <= k; j++) res *= (n - j + 1) / j
  return Math.round(res)
}

binomialCoefficient(8, 2)  // 28
```

**clampNumber**
3个数比较，取中间的数

```js
const clampNumber = (num, a, b) => Math.max((Math.min(num, Math.max(a, b))), Math.min(a, b))

clampNumber(2, 3, 5)  // 3
clampNumber(1, -1, -5)  // -1
```

**degressToRads**
将角度从度数转换为弧度

```js
const degressToRads = deg => (deg * Math.PI) / 180.0

degreesToRads(90.0) // ~1.5708
```

**radsToDegrees**
将角度从弧度转换为度数

```js
const radsToDegress = rad => (rad * 180.0) / Math.PI

radsToDegrees(Math.PI / 2)  // 90
```

**digitize**
数字转为数组

```js
const digitize = num => [...`${num}`].map(i => parseInt(i))
```

**distance**
返回两点之间的距离

```js
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0)

distance(1, 1, 2, 3)  // 2.23606797749979
```

**factorial**
递归

```js
const factorial = n =>
  n < 0
    ? (() => { throw new TypeError('negative numbers arw not allowed!')})()
    : n <= 1
      ? 1
      : n * factorial(n - 1)

factorial(5) // 120
```

**fibonacci**
斐波那契

```js
const fibonacci = n =>
  Array.from({length: n}).reduce((acc, val, i) => i > 1 ? acc[i - 1] + acc[i - 2] : i, [])

fibonacci(6) // [0, 1, 1, 2, 3, 5]
```

**gcd**
计算两个或多个数字/数组之间的最大公约数

```js
const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y))
  return [...arr].reduce((acc, val) => _gcd(acc, val))
}

gcd(8, 36)  // 4
gcd(...[12, 8, 32])  // 4
```

**geometricProgression**

```js
const geometricProgression = (end, start = 1, step = 2) => {
  Array.form({length: Math.floor(Math.log(end / start) / Math.log(step)) + 1}).map((v, i) => start * step ** i)
}

geometricProgression(256)  // [1, 2, 4, 8, 16, 32, 64, 128, 256]
geometricProgression(256, 3)  // [3, 6, 12, 24, 48, 96, 192]
geometricProgression(256, 1, 4)  // [1, 4, 16, 64, 256]
```

**hammingDistance**
计算2个值之间的海明距离

```js
const hammingDistance = (num1, num2) => ((num1 ^ num2).toString().match(/1/g) || '').length

hammingDistance(2, 3)  // 1
```

**inRange**
判断一个数字是否在给定参数的2个参数的范围内

```js
const inRange = (n, start, end = null) => {
  if(end && start > end) [start, end] = [end, start]
  return end === null ? n >= 0 && n < start : n >= start && n <= end
}

inRange(3, 2, 5)  // true
inRange(3, 4)  // true
inRange(2, 3, 5)  // false
inRange(3, 2)  // false
```

**isDivisible**
检查第一个数字参数是否可被第二个数字整除

```js
const isDivisible = (dividend, divisor) => dividend % divisor === 0

isDivisible(6, 3) // true
```

**isEven**
如果给定的数字是偶数，则返回true，否则返回false

```js
const isEven = num => num % 2 === 0

isEven(6) // true
isEven(11) // false
```

**isPrime**
检查提供的整数是否为素数

```js
const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num))
  for(let i = 2; i <= boundary; i++) if(num % 2 === 0) return false
  return num >= 2
}

isPrime(9) // true
```

**lcm**
返回两个或多个数字的最小公倍数

```js
const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y))
  cosnt _lcm = (x, y) => (x * y) / gcd(x, y)
  return [...arr].reduce((a, b) => _lcm(a, b))
}

lcm(12, 7)  // 84
lcm(...[1, 3, 4, 5])  // 60
```

**luhnCheck**

```js
const luhnCheck = num => {
  let arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x))
  let lastDigt = arr.splice(0, 1)[0]
  let sum = arr.reduce((arr, val, i) => (i % 2 !== 0 ? acc + val : acc + (val * 2) % 9) || 9, 0)
  sum += lastDigt
  return sum % 10 === 0
}

luhnCheck('4485275742308327')  // true
luhnCheck(6011329933655299)  //  false
luhnCheck(123456789)  // false
```

**maxBy**
获取数组中最大值

```js
const maxBy = (arr, fn) => Math.max(...arr.map(typeof fn === 'function' ? fn : val[fn]))

maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)  // 8
maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')  // 8
```

**minBy**
获取数组中最小值

```js
const minBy = (arr, fn) => Math.min(...arr.map(typeof fn === 'function' ? fn : val[fn]))

minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)  // 2
minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')  // 2
```

**median**
获取数组中间值

```js
const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b)
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid -1] + nums[mid]) / 2
}
median([5, 6, 50, 1, -5])  // 5
```

**percentile**

```js
const percentile = (arr, val) =>
  (100 * arr.reduce((acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0) ,0)) / arr.length

percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55
```

**powerset**
返回给定数字数组的幂

```js
const powerset = arr => arr.reduce((acc, val) => acc.concat(acc.map(r => [val].concat(r))), [[]])

powerset([1, 2]) // [[], [1], [2], [2, 1]]
```

**primes**

```js
const primes = num => {
  let arr = Array.from({length: num -1}).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({length: sqroot - 1}).map((x, i) => i + 2)
  numsTillSqroot.forEach( x => (arr = arr.filter(y => y % x !== 0 || y === x)) )
  return arr
}
primes(12) // [2, 3, 5, 7, 11]
```

**randomIntArrayInRange**
返回指定范围内的n个随机整数的数组

```js
const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from({length: n}, () => Math.floor(Math.random() * (max - min + 1)) + min)

randomIntArrayInRange(10, 30, 10) // [24, 25, 11, 19, 21, 13, 27, 27, 30, 10]
```

**randomIntegerInRange**
返回指定范围内的随机整数

```js
const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

randomIntegerInRange(1, 10) // 6
```

**randomNumberInRange**
返回指定范围内的随机数

```js
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min

randomNumberInRange(1, 10) // 7.135856134039288
```

**round**
将数字舍入到指定的数字位数

```js
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)

round(1.005, 2)  // 1.01
```

**sdbm**
将输入字符串哈希为整数

```js
const sdbm = str => {
  let arr = str.split('')
  arr.reduce(
    (hashCode, curVal) =>
    (hashCode = curVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode),
    0
  )
}

sdbm('HelloMan') // 2971367048
```

**standardDeviation**
返回数组数组的标准偏差

```js
const standardDeviation = (arr, usePopulation = false) => {
  let mean = arr.reduce((acc, val) => acc + val, 0) / arr.length
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  )
}

standardDeviation([10, 2, 38, 23, 38, 23, 21])  // 13.284434142114991 (sample)
standardDeviation([10, 2, 38, 23, 38, 23, 21], true)  // 12.29899614287479 (population)
```

**sum**
返回两个或更多数字/数组的总和

```js
const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0)

sum(2, 3, 5) // 10
sum(...[2, 3, 5]) // 10
```

**sumBy**
使用提供的函数将每个元素映射到值后，返回数组的总和

```js
const sumBy = (arr, fn) => arr.map(typeof fn === 'function' ? fn : val[fn]).reduce((acc, val) => acc + val, 0)

sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)  // 20
sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')  // 20
```

**sumPower**
返回从开始到结束的所有数字的幂的总和

```js
const sumPower = (end, power = 2, start = 1) => 
  Array(end - 1 + start)
    .fill(0)
    .map((x, i) => (i + start) ** power)
    .reduce((acc, val) => acc + val, 0)

sumPower(10) // 385
sumPower(10, 3) // 3025
sumPower(10, 3, 5) // 2925
```

**toSafeInteger**
将值转换为安全整数

```js
const toSafeInteger = num => 
  Math.round(Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE.INTEGER))

toSafeInteger('3.2')  // 3
toSafeInteger(Infinity)  // 9007199254740991
```

## Node

**atob**

```js
const atob = str => Buffer.from(str, 'base64').toString('binary')

atob('aGVsbG9tYW4=') // 'helloman'
```

**btoa**

```js
const btoa = str => Buffer.from(str, 'binary').toString('base64')

btoa('helloman') // aGVsbG9tYW4=
```

**colorize**
在文本中添加特殊字符以在控制台中以彩色打印（与console.log（）结合使用）

```js
const colorize = (...args) => ({
  black: `\x1b[30m${args.join(' ')}`,
  red: `\x1b[31m${args.join(' ')}`,
  green: `\x1b[32m${args.join(' ')}`,
  yellow: `\x1b[33m${args.join(' ')}`,
  blue: `\x1b[34m${args.join(' ')}`,
  magenta: `\x1b[35m${args.join(' ')}`,
  cyan: `\x1b[36m${args.join(' ')}`,
  white: `\x1b[37m${args.join(' ')}`,
  bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
  bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
  bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
  bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
  bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
  bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
  bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
  bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`
})

console.log(colorize('foo').red)  // 'foo' (red letters)
console.log(colorize('foo', 'bar').bgBlue)  // 'foo bar' (blue background)
console.log(colorize(colorize('foo').yellow, colorize('foo').green).bgWhite)  // 'foo bar' (first word in yellow letters, second word in green letters, white background for both)
```

**hasFlags**
检查当前进程的参数是否包含指定的标志

```js
const hasFlags = (...flags) =>
  flags.every(flag => process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag))

// node myScript.js -s --test --cool=true
hasFlags('-s')  // true
hasFlags('--test', 'cool=true', '-s')  // true
hasFlags('special')  // false
```

**hashNode**

```js
const crypto = require('crypto')
const hashNode = val =>
  new Promise(resolve =>
    setTimeout(() =>
      resolve(
        crypto
          .createHash('sha256')
          .update(val)
          .digest('hex')
      ),
      0
    )
  )
hashNode(JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })).then(console.log)
// '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'
```

**isDuplexStream**
检查给定参数是否为双工（可读写）流

```js
const isDuplexStream = val =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._read === 'function' &&
  typeof val._readableState === 'object' &&
  typeof val._write === 'function' &&
  typeof val._writableState === 'object'

const Stream = require('stream')
isDuplexStream(new Stream.Duplex())  // true
```

**isReadableStream**
检查给定参数是否为可读流

```js
const isReadableStream = val =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._read === 'function' &&
  typeof val._readableState === 'object'

const fs = require('fs')
isReadableStream(fs.createReadStream('test.txt'))  // true
```

**isStream**
检查给定的参数是否是流

```js
const isStream = val => val !== null && typeof val === 'object' && typeof val.pipe === 'function'

const fs = require('fs')
isStream(fs.createReadStream('test.txt'))  // true
```

**isTravisCI**
检查当前环境是否为Travis CI

```js
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env

isTravisCI() // false
```

**isWritableStream**
检查给定的参数是否是可写流

```js
const isWritableStream = val => 
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._write === 'function' &&
  typeof val._writableState === 'object'

const fs = require('fs') 
isWritableStream(fs.createWriteStream('test.txt'))  // true
```

**JSONToFile**
将JSON对象写入文件

```js
const fs = require('fs')
const JSONToFile = (obj, filename) => 
  fs.writeFile(`${filename}.json`, JSON.stringify(obj, null, 2))

SONToFile({ test: 'is passed' }, 'testJsonFile')  // writes the object to 'testJsonFile.json'
```

**readFileLines**

```js
const fs = require('fs')
const readFileLines = filename =>
  fs
    .readFileSync(filename)
    .toString('UTF8')
    .split('\n')

/*
contents of test.txt :
  line1
  line2
  line3
  ___________________________
*/
let arr = readFileLines('test.txt')
console.log(arr)  // ['line1', 'line2', 'line3']
```

**untildify**
将波形路径转换为绝对路径

```js
const untildify = str => str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`)

untildify('~/node'); // '/Users/aUser/node'
```

**UUIDGeneratorNode**
在Node.JS中生成UUID

```js
const crypto = require('crypto')
const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  )

UUIDGeneratorNode()
```

## Object

**bindAll**

```js
const bindAll = (obj, ...fns) =>
  fns.forEach(
    fn => (
      (f = obj[fn]),
      (obj[fn] = function() {
        return fn.apply(obj)
      })
    )
  )
```

**deepClone**
创建对象的深层克隆

```js
const deepClone = obj => {
  const clone = Object.assign({}, obj)
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  )
  return Array.isArray(obj) ? (clone.length == obj.length) && Array.from(clone) : clone
}
```

**deepFreeze**

```js
const deepFreeze = obj =>
  Object.keys(obj).forEach(
    prop =>
      !(obj[prop] instanceof Object) || Object.isFrozen(obj[prop]) ? null : deepFreeze(obj[prop])
  ) || Object.freeze(obj)

const obj = deepFreeze([1, [23, 34]])
obj[0] = 0 // not allow
obj[1][1] = 2 // not allow as well
```

**defaults**

```js
const defaults = (obj, ...defs) => Object.assign({}, obj, ...defs.reverse(), obj)

defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 })  // { a: 1, b: 2 }
```

**dig**

```js
const dig = (obj, target) =>
  target in obj
  ? obj[target]
  : Object.values(obj).reduce((acc, val) => {
    if(acc !== undefined) return acc
    if(typeof val === 'object') return dig(val, target)
  }, undefined)

const data = {
  level1: {
    level2: {
      level3: 'some data'
    }
  }
};
dig(data, 'level3')  // 'some data'
dig(data, 'level4')  // undefined
```

**equals**
在两个值之间执行深度比较以确定它们是否相等

```js
const equals = (a, b) => {
  if(a === b) return true
  if(a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  if(!a || !b || (typeof a !== 'object' || typeof b !== 'object')) return a === b
  if(a === null || a === undefined || b ===  null || b === undefined) return false
  if(a.prototype !== b.prototype) return false
  let keys = Object.keys(a)
  if(keys.length !== Object.keys(b).length) return false
  return kyes.every(k => equals(a[k], b[k]))
}

equals({ a: [2, { e: 3 }], b: [4], c: 'foo' }, { a: [2, { e: 3 }], b: [4], c: 'foo' })  // true
```

**findKey**
返回满足提供的测试函数的第一个键。否则返回undefined。

```js
const findKey = (obj, fn) => Object.keys(obj).find(key => fn(obj[key], key, obj))

findKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  o => o['active']
)  // 'barney'
```

**findLastKey**

```js
const findLastKey = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .find(key => fn(obj[key], key, obj))

findLastKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  o => o['active']
) // pebbles
```

**flattenObject**


```js
const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, key) => {
    const pre = prefix.length ? prefix + '.' : ''
    if(typeof obj[key] === 'object') Object.assign(acc, flattenObject(obj[key], pre + key))
    else acc[pre + key] = obj[key]
    return acc
  }, {})

flattenObject({ a: { b: { c: 1 } }, d: 1 })  // { 'a.b.c': 1, d: 1 }
```

**forOwn**

```js
const forOwn = (obj, fn) => Object.keys(obj).forEach(key => fn(obj[key], key, obj))

forOwn({ foo: 'bar', a: 1 }, v => console.log(v))  // 'bar', 1
```

**forOwnRightb**
从右侧遍历对象依次传入函数

```js
const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(ke => fn(obj[key], key, obj))
    
forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v))  // 1, 'bar'
```

**functions**

```js
const functions = (obj, inherited = false) =>
  (
    inherited
    ? [...Object.keys(obj), ...Object.keys(Object.getOwnPrototypeOf(obj))]
    : Object.keys(obj)
  ).filter(key => typeof obj[key] === 'function')

function Foo() {
  this.a = () => 1
  this.b = () => 2
}
Foo.prototype.c = () => 3
functions(new Foo())  // ['a', 'b']
functions(new Foo(), true)  // ['a', 'b', 'c']
```

**invertKeyValues**

```js
const invertKeyValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    const val = fn ? fn(obj[key]) : obj[key]
    acc[val] = acc[val] || []
    acc[val].push(key)
    return acc
  }, {})

invertKeyValues({ a: 1, b: 2, c: 1 }) // { 1: [ 'a', 'c' ], 2: [ 'b' ] }
invertKeyValues({ a: 1, b: 2, c: 1 }, value => 'group' + value) // { group1: [ 'a', 'c' ], group2: [ 'b' ] }
```

**lowercaseKeys**

```js
const lowercaseKeys = obj =>
  Object.keys(obj).reduce((acc, val) => {
    acc[val.toLOwerCase()] = obj[val]
    return acc
  })

const myObj = { Name: 'Adam', sUrnAME: 'Smith' }
const myObjLower = lowercaseKeys(myObj)  // {name: 'Adam', surname: 'Smith'}
```

**mapKeys**

```js
const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[fn(obj[key], key, obj)] = obj[key]
    return acc
  }, {})
mapKeys({ a: 1, b: 2 }, (val, key) => key + val)　// { a1: 1, b2: 2 }
```

**mapValues**

```js
const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key] = fn(obj[key], key, obj)
    return acc
  })
const users = {
  fred: { user: 'fred', age: 40 },
  pebbles: { user: 'pebbles', age: 1 }
}
mapValues(users, u => u.age)  // { fred: 40, pebbles: 1 }
```

**matches**

```js
const matches = (obj, source) =>
  Object.keys(source).ever(key => obj.hasOwnProperty(key) && source[key] === obj[key])

matches({ age: 25, hair: 'long', beard: true }, { hair: 'long', beard: true })  // true
matches({ hair: 'long', beard: true }, { age: 25, hair: 'long', beard: true })  // false
```

**matchesWith**

```js
const matchesWith = (obj, source, fn) =>
  Object.keys(source).every(
    key => 
      obj.hasOwnProperty(key) &&　fn
        ? fn(obj[key], source[key], key, obj, source)
        : obj[key] === source[key]
  )

const isGreeting = val => /^h(?:i|ello)$/.test(val)
matchesWith(
  { greeting: 'hello' },
  { greeting: 'hi' },
  (oV, sV) => isGreeting(oV) && isGreeting(sV)
)  // true
```

**merge**

```js
const merge = (...objs) =>
  [...objs].reduce((acc, obj) =>
    Object.keys(obj).reduce((a, k) => {
      acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k].concat(obj[k]) : obj[k])
      return acc
    }, {})
  ,{})
const object = {
  a: [{ x: 2 }, { y: 4 }],
  b: 1
}
const other = {
  a: { z: 3 },
  b: [2, 3],
  c: 'foo'
}
merge(object, other)  // { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }
```

**nest**

```js
const nest = (items, id = null, link = 'parent_id') =>
  items
    .filter(it => it[link] == id)
    .map(it => ({...it, children: nest(items, it.id)} ))

const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 }
]
const nestedComments = nest(comments) // [{ id: 1, parent_id: null, children: [...] }]
```

**objectFromPairs**

```js
const objectFromPairs = arr => arr.reduce((a, [key, val]) => ((a[key] = val), a), {})

objectFromPairs([['a', 1], ['b', 2]])  // {a: 1, b: 2}
```

**objectToPairs**

```js
const objectToPairs = obj => Object.keys(obj).map(k => [k, obj[key]])

objectToPairs({ a: 1, b: 2 })  // [ ['a', 1], ['b', 2] ]
```

**omit**

```js
const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {})

omit({ a: 1, b: '2', c: 3 }, ['b'])  // { 'a': 1, 'c': 3 }
```

**omitBy**

```js
const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {})

omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number')  // { b: '2' }
```

**orderBy**

```js
const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if(acc === 0) {
        const [p1, p2] = orders && orders[i] == 'desc' ？ [b[prop], a[prop]] : [a[prop], b[prop]]
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
        return acc
      }
    , 0}
  )

const users = [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }, { name: 'fred', age: 40 }]
orderBy(users, ['name', 'age'], ['asc', 'desc'])  // [{name: 'barney', age: 36}, {name: 'fred', age: 48}, {name: 'fred', age: 40}]
orderBy(users, ['name', 'age'])  // [{name: 'barney', age: 36}, {name: 'fred', age: 40}, {name: 'fred', age: 48}]
```

**pick**

```js
const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc))

pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }
```

**pickBy**

```js
const pickBy = (obj, fn) =>
  Object.keys(obj)
    .filret(k => fn(obj[key], key, obj))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {})

pickBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number') // { 'a': 1, 'c': 3 }
```

**renameKeys**

```js
const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{[keysMap[key] || key] : obj[key]}
    }),
    {}
  )
const obj = { name: 'Bobo', job: 'Front-End Master', shoeSize: 100 }
renameKeys({ name: 'firstName', job: 'passion' }, obj)  // { firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 }
```

**shallowClone**

```js
const shallowClone = obj => Object.assign({}, obj)

const a = { x: true, y: 1 }
const b = shallowClone(a)  // a !== b
```

**size**

```js
const size = val =>
  Array.isArray(val)
    ? val.length
    : typeof val === 'object'
      ? val.size || val.length || Object.keys(val).length
      : typeof val === 'string'
        ? new Blob([val]).size
        : 0

size([1, 2, 3, 4, 5])  // 5
size('size')  // 4
size({ one: 1, two: 2, three: 3 })  // 3
```

**transform**

```js
const transform = (obj, fn, acc) =>
  Object.keys(obj).reduce((a, k) => fn(a, obj[k], k, obj), acc)

transform(
  { a: 1, b: 2, c: 1 },
  (r, v, k) => {
    (r[v] || (r[v] = [])).push(k)
    return r
  },
  {}
)  // { '1': ['a', 'c'], '2': ['b'] }
```

**truthCheckCollection**

```js
const truthCheckCollection = (collection, pre) => collection.every(obj => obj[pre])

truthCheckCollection([{ user: 'Tinky-Winky', sex: 'male' }, { user: 'Dipsy', sex: 'male' }], 'sex'); // true
```

**unflattenObject**

```js
const unflattenObject = obj =>
  Object.keys(obj).reduct((acc, k) => {
    if(k.indexOf('.') !== -1) {
      const keys = k.split('.')
      Object.assign(
        acc,
        JSON.parse(
          '{' +
            keys.map((v, i) => (i !== keys.length -1 ? `"${v}": {` + : `"${v}"`)).join('') + obj[key] +
          '}'.repeat(keys.length)
        )
      )
    } else acc[k] = obj[k]
    return acc
  }, {})
unflattenObject({ 'a.b.c': 1, d: 1 })  // { a: { b: { c: 1 } }, d: 1 }
```

## String

**byteSize**

```js
const byteSize = str => new Blob([str]).size

byteSize('☺') // 3
byteSize('hello world') // 11
```

**capitalize**

```js
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase()  : rest.join(''))

capitalize('fooBar')  // 'FooBar'
capitalize('fooBar', true)  // 'Foobar'
```

**capitalizeEveryWord**

```js
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, chat => chat.toUpperCase())

capitalizeEveryWord('hello world!')  // 'Hello World!'
```

**CSVToArray**

```js
const CSVToArray = (data, delimiter = ',', omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
    .split('\n')
    .map(v => v.split(delimiter))

CSVToArray('a,b\nc,d')  // [['a','b'],['c','d']]
CSVToArray('a;b\nc;d', ';')  // [['a','b'],['c','d']]
CSVToArray('col1,col2\na,b\nc,d', ',', true)  // [['a','b'],['c','d']]
```

**CSVToJSON**

```js
const CSVToJSON = (data, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter)
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(v => {
      const values = v.split(delimiter)
      return titles.reduce((obj, title, index) => ((obj[title] = values[index]), obj), {})
    })
}

CSVToJSON('col1,col2\na,b\nc,d')  // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]
CSVToJSON('col1;col2\na;b\nc;d', ';')  // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]
```

**decapitalize**

```js
const decapitalize = ([first, ...rest], upperRest = false) =>
  first.toLowerCase() + (upperRest ? rest.join('')toUpperCase() : rest.join())

decapitalize('FooBar')  // 'fooBar'
decapitalize('FooBar', true)  // 'fOOBAR'
```

**escapeHTML**

```js
const escapeHTML = str =>
  str.replace(
    /[&<>'""]/g,
    tag =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  )
escapeHTML('<a href="#">Me & you</a>')  // '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
```

**escapeRegExp**

```js
const escapeRegExp = str => str.replace(/[.*+?^$|{}()[\]\\]/g, '\\$&')

escapeRegExp('(test)')  // \\(test\\)
```

**fromCamelCase**

```js
const fromCamelCase = (str, separator = '_') =>
  str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase()

fromCamelCase('someDatabaseFieldName', ' ')  // 'some database field name'
fromCamelCase('someLabelThatNeedsToBeCamelized', '-')  // 'some-label-that-needs-to-be-camelized'
fromCamelCase('someJavascriptProperty', '_')  // 'some_javascript_property'
```


**indentString**

```js
const indentString = (str, count, indent = ' ') => str.replace(/^/gm, indent.repeat(count))

indentString('Lorem\nIpsum', 2)  // '  Lorem\n  Ipsum'
indentString('Lorem\nIpsum', 2, '_')  // '__Lorem\n__Ipsum'
```

**isAbsoluteURL**

```js
const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str)

isAbsoluteURL('https://google.com')  // true
isAbsoluteURL('ftp://www.myserver.net')  // true
isAbsoluteURL('/foo/bar')  // false
```

**isAnagram**

```js
const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join()
  return normalize(str1) === normalize(str2)
}

isAnagram('iceman', 'cinema')  // true
```

**isLowerCase**

```js
const isLowerCase = str => str === str.toLowerCase()

isLowerCase('abc') // true
isLowerCase('abc&@#') // true
isLowerCase('abA6') // false
```

**isUpperCase**

```js
const isUpperCase = str => str === str.toUpperCase()

isUpperCase('ABC')  // true
isLowerCase('A3@$')  // true
isLowerCase('aB4')  // false
```

**mapSting**

```js
const mapString = (str, fn) =>
  str
    .split('')
    .map((v, i) => fn(v, i, str))
    .join('')

mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'
```

**mask**

```js
const mask = (cc, num = 4,  mask = '*') => `${cc}`.slice(-num).padStart(`${cc}`.length, mask)

mask(1234567890)  // '******7890'
mask(1234567890, 3)  // '*******890'
mask(1234567890, -4, '$')  // '$$$$567890'
```

**pad**

```js
const pad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char)

pad('cat', 8)  // '  cat   '
pad(String(42), 6, '0')  // '004200'
pad('foobar', 3)  // 'foobar'
```

**palindrome**

```js
const palindrome = str => {
  const s = str.toLowerCase()replace(/[\W_]/g, '')
  return s === [...s].reverse().join('')
}

palindrome('taco cat')  // true
```

**pluralize**

```js
const pluralize = (val, word, plural = word + 's') => {
  const _pluralize = (num, word, plural = word + 's') =>
    [1, -1].includes(Number(num)) ? word : plural
  if(typeof val === 'object') return (num, word) => _pluralize(num, word, val[word])
  return _pluralize(val, word, plural)
}

pluralize(0, 'apple')  // 'apples'
pluralize(1, 'apple')  // 'apple'
pluralize(2, 'apple')  // 'apples'
pluralize(2, 'person', 'people')  // 'people'

const PLURALS = {
  person: 'people',
  radius: 'radii'
}
const autoPluralize = pluralize(PLURALS)
autoPluralize(2, 'person')  // 'people'
```

**removeNonASCII**

```js
const removeNonASCII = str => str.replace(/[^\x20-\x7E]/g, '')

removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ')  // 'lorem-ipsum'
```

**reverseString**

```js
const reverseString = str => [...str].reverse().join()

reverseString('foobar')  // 'raboof'
```

**sortCharactersInString**

```js
const sortCharactersInString = str => [...str].sort((a, b) => a.localeCompare(b)).join('')

sortCharactersInString('cabbage')  // 'aabbceg'
```

**splitLines**

```js
const splitLines = str => str.split(/\r?\n/)

splitLines('This\nis a\nmultiline\nstring.\n')  // ['This', 'is a', 'multiline', 'string.' , '']
```


**stringPermutations**

```js
const stringPermutations = str => {
  if(str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str]
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat( stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val) ),
      []
    )
}

stringPermutations('abc')  // ['abc','acb','bac','bca','cab','cba']
```
**stripHTMLTags**

```js
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '')

stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>')  // 'lorem ipsum'
```

**toCamelCase**

```js
const toCamelCase = str => {
  const s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}

toCamelCase('some_database_field_name')  // 'someDatabaseFieldName'
toCamelCase('Some label that needs to be camelized')  // 'someLabelThatNeedsToBeCamelized'
toCamelCase('some-javascript-property')  // 'someJavascriptProperty'
toCamelCase('some-mixed_string with spaces_underscores-and-hyphens')  // 'someMixedStringWithSpacesUnderscoresAndHyphens'
```

**toKebabCase**

```js
const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    join('-')

toKebabCase('camelCase')  // 'camel-case'
toKebabCase('some text')  // 'some-text'
toKebabCase('some-mixed_string With spaces_underscores-and-hyphens')  // 'some-mixed-string-with-spaces-underscores-and-hyphens'
toKebabCase('AllThe-small Things')  // "all-the-small-things"
toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML')  // "i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-xml-and-html"
```

**toSnakeCase**

```js
const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_')
toSnakeCase('camelCase')  // 'camel_case'
toSnakeCase('some text')  // 'some_text'
toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens')  // 'some_mixed_string_with_spaces_underscores_and_hyphens'
toSnakeCase('AllThe-small Things')  // "all_the_smal_things"
toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML')  // "i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html"
```

**toTitleCase**

```js
const toTitleCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ')

toTitleCase('some_database_field_name')  // 'Some Database Field Name'
toTitleCase('Some label that needs to be title-cased')  // 'Some Label That Needs To Be Title Cased'
toTitleCase('some-package-name')  // 'Some Package Name'
toTitleCase('some-mixed_string with spaces_underscores-and-hyphens')  // 'Some Mixed String With Spaces Underscores And Hyphens'
```

**truncateString**

```js
const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3: num) + '...' : str

truncateString('boomerang', 7)  // 'boom...'
```

**unescapeHTML**

```js
const unescapeHTML = str =>
  str
    .replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
      }[tag] || tag)
    )
unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;')  // '<a href="#">Me & you</a>'
```

**URLJoin**

```js
const URLJoin = (...args) =>
  args
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?')

URLJoin('http://www.ykpine.com', 'a', '/b/cd', '?foo=123', '?bar=foo')
```

**words**

```js
const words = (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean)

words('I love javaScript!!')  // ["I", "love", "javaScript"]
words('python, javaScript & coffee')  // ["python", "javaScript", "coffee"]
```

## Type

**getType**

```js
const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase()

getType(new Set([2, 4])) // 'set'
getType('abc') // string
getType([]) // array
getType({a: 1}) // object
```

**is**

```js
const is = (type, val) => ![, null].includes(val) && v.constructor === type

is(Array, [1])  // true
is(ArrayBuffer, new ArrayBuffer())  // true
is(Map, new Map())  // true
is(RegExp, /./g)  // true
is(Set, new Set())  // true
is(WeakMap, new WeakMap())  // true
is(WeakSet, new WeakSet())  // true
is(String, '')  // true
is(String, new String(''))  // true
is(Number, 1)  // true
is(Number, new Number(1))  // true
is(Boolean, true)  // true
is(Boolean, new Boolean(true))  // true
```

**isArrayLike**

```js
const isArrayLike = obj => obj !== null && typeof obj[Symbol.interator] === 'function'

isArrayLike(document.querySelectorAll('.className'))  // true
isArrayLike('abc')  // true
isArrayLike(null)  // false
```

**isBoolean**

```js
const isBoolean = val => typeof val === 'boolean'

isBoolean(null) // false
isBOolean(false) // true
```

**isEmpty**

```js
const isEmpty = val => val == null || !(Object.keys(val) || val).length

isEmpty(new Map())  // true
isEmpty(new Set())  // true
isEmpty([])  // true
isEmpty({})  // true
isEmpty('')  // true
isEmpty([1, 2])  // false
isEmpty({ a: 1, b: 2 })  // false
isEmpty('text')  // false
isEmpty(123)  // true - type is not considered a collection
isEmpty(true)  // true - type is not considered a collection
```

**isFunction**

```js
const isFunction = val => typeof val === 'function'

isFunction('x')  // false
isFunction(x => x)  // true
```

**isNil**

```js
const isNil = val => val === undefined || val === null

isNil(null); // true
isNil(undefined); // true
```

**isNull**

```js
const isNull = val => val === null

isNull(null) // true
```

**isNumber**

```js
const isNumber = val => typeof val === 'number'

isNumber('1')  // false
isNumber(1)  // trues
```

**isObject**

```js
const isObject = obj => obj === Object(obj)

isObject([1, 2, 3, 4])  // true
isObject([])  // true
isObject(['Hello!'])  // true
isObject({ a: 1 })  // true
isObject({})  // true
isObject(true)  // false
```

**isObjectLike**

```js
const isObjectLike = obj => obj !== null && typeof obj === 'object'

isObjectLike({})  // true
isObjectLike([1, 2, 3])  // true
isObjectLike(x => x)  // false
isObjectLike(null)  // false
```

**isPlainObject**

```js
const isPlainObject = val => !!val && typeof val === 'object' && val.constructor === Object

isPlainObject({ a: 1 })  // true
isPlainObject(new Map())  // false
```

**isPrimitive**

```js
const isPrimitive = obj => Object(obj) !== obj

isPrimitive(null)  // true
isPrimitive(50)  // true
isPrimitive('Hello!')  // true
isPrimitive(false)  // true
isPrimitive(Symbol())  // true
isPrimitive([])  // false
```

**isPromiseLike**

```js
const isPromiseLike = obj =>
  obj !== null && 
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function'

isPromiseLike({
  then: function() {
    return ''
  }
})  // true
isPromiseLike(null)  // false
isPromiseLike({})  // false
```

**isString**

```js
const isString = str => typeof str === 'string'

isString('1') // true
```

**isSymbol**

```js
const isSymbol = val => typeof val === 'symbol'

isSymbol(Symbol('x'))  // true
```

**isUndefined**

```js
const isUndefined = val => val === undefined

isUndefined(undefined)  // true
```

**isValidJSON**

```js
const isValidJSON = obj => {
  try {
    JSON.parse(obj)
    return true
  } catch(e) {
    return false
  }
}

isValidJSON('{"name":"Adam","age":20}')  // true
isValidJSON('{"name":"Adam",age:"20"}')  // false
isValidJSON(null)  // true
```

## Utility

**castArray**

```js
const castArray = val => (Array.isArray(val) ? val : [val])

castArray('foo')  // ['foo']
castArray([1])  // [1]
```

**cloneRegExp**

```js
const cloneRegExp = regexp => new RegExp(regexp.source, regexp.flags)

const regExp = /lorem ipsum/gi 
const regExp2 = cloneRegExp(regExp)  // /lorem ipsum/gi
```

**coalesce**

```js
const coalesce = (...args) => args.find(_ => ![undefined, null].includes(_))

coalesce(null, undefined, '', NaN, 'Waldo') // ""
```

**coalesceFactory**

```js
const coalesceFactory = vaild => (...args) => args.find(vaild)

const customCoalesce = coalesceFactory(_ => ![undefined, null, '', NaN].includes(_))

customCoalesce(undefined, null, '', NaN, 'hello') // hello
```

**extendHex**

```js
const extendHex = shortHex =>
  '#' +
    shortHex
      .slice(shortHex.startsWith('#') ? 1 : 0)
      .split('')
      .map(x => x + x)
      .join('')
extendHex('#03f'); // '#0033ff'
extendHex('05a'); // '#0055aa'
```

**getURLParameters**

```js
const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a),
    {}
  )

getURLParameters('http://url.com/page?name=Adam&surname=Smith')  // {name: 'Adam', surname: 'Smith'}
getURLParameters('google.com')  // {}
```


**hexToRGB**

```js
const hexToRGB = hex => {
  let alpha = false,
    h = hex.slice(hex.startsWith('#') ? 1 : 0)
  if (h.length === 3) h = [...h].map(x => x + x).join('');
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    (h >>> (alpha ? 24 : 16)) +
    ', ' +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : '') +
    ')'
  )
}

hexToRGB('#27ae60ff')  // 'rgba(39, 174, 96, 255)'
hexToRGB('27ae60')  // 'rgb(39, 174, 96)'
hexToRGB('#fff')  // 'rgb(255, 255, 255)'
```

**httpGet**

```js
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.onload = () => callback(request.responseText)
  request.onerror = () => err(request)
  request.send()
}

httpGet(
  'https://jsonplaceholder.typicode.com/posts/1',
  console.log
)  /*
Logs: {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
*/
```

**httpPost**

```js
const httpPost = (url, data, callback, err = console.error) => {
  const xml = new XMLHttpRequest()
  xml.open('POST', url, true)
  xml.setRequestHeader('Content-type', 'application/json; charset=utf-8')
  xml.onload = () => callback(xml.responseText)
  xml.onerror = () => err(xml)
  xml.send(data)
}

const newPost = {
  userId: 1,
  id: 1337,
  title: 'Foo',
  body: 'bar bar bar'
};
const data = JSON.stringify(newPost);
httpPost(
  'https://jsonplaceholder.typicode.com/posts',
  data,
  console.log
)  /*
Logs: {
  "userId": 1,
  "id": 1337,
  "title": "Foo",
  "body": "bar bar bar"
}
*/
httpPost(
  'https://jsonplaceholder.typicode.com/posts',
  null, // does not send a body
  console.log
)  /*
Logs: {
  "id": 101
}
*/
```

**isBrowser**

```js
const isBrowser = () => ![typeof window, typeof document].includes('undefined')

isBrowser()  // true (browser)
isBrowser()  // false (Node)
```

**mostPerformant**

```js
const mostPerformant = (fns, interations = 10000) => {

  const times = fns.map(fn => {
    const before = preformance.now()

    for(let i = 0; i < interations; i++) fn()
    return preformance.now() - before
  })
  return times.indexOf(Math.min(...times))
}

mostPerformant([
  () => {
    // Loops through the entire array before returning `false`
    [1, 2, 3, 4, 5, 6, 7, 8, 9, '10'].every(el => typeof el === 'number')
  },
  () => {
    // Only needs to reach index `1` before returning false
    [1, '2', 3, 4, 5, 6, 7, 8, 9, 10].every(el => typeof el === 'number')
  }
])  // 1
```

**nthArg**

```js
const nthArg = n => (...args) => args.slice(n)[0]

const third = nthArg(2)
third(1, 2, 3)  // 3
third(1, 2)  // undefined
const last = nthArg(-1)
last(1, 2, 3, 4, 5)  // 5
```

**parseCookie**

```js
const parseCookie = (str, separator = ';') =>
  str
    .split(separator)
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    }, {})
parseCookie('foo=bar; equation=E%3Dmc%5E2')  // { foo: 'bar', equation: 'E=mc^2' }
```

**prettyBytes**

```js
const prettyBytes = (num, precision = 3, addSpace = true) => {
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0]
  const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1)
  const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision))
  return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent]
}

prettyBytes(1000)  // "1 KB"
prettyBytes(-27145424323.5821, 5)  // "-27.145 GB"
prettyBytes(123456789, 3, false)  // "123MB"
```

**randomHexColorCode**

```js
const randomHexColorCode = () => {
  const r = (Math.random() * 0xffff * 100000).toString(16)
  return '#' + r.slice(0, 6)
}
randomHexColorCode() // "#3f2167"
```

**RGBToHex**
```js
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')

RGBToHex(255, 165, 1)  // 'ffa501'
```

**serializeCookie**

```js
const serializeCookie = (name, val) => `${encodeURIComponent(name)}=${encodeURIComponent(val)}`

serializeCookie('foo', 'bar')  // 'foo=bar'
```

**timeTaken**

```js
const timeTaken = callback => {
  console.time('timetoken')
  const r = callback()
  console.timeEnd('timetoken')
  return r
}

timeTaken(() => Math.pow(2, 10))  // 1024, (logged): timeTaken: 0.02099609375ms
```

**toCurrency**

```js
const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(n)

toCurrency(123456.789, 'EUR')  // €123,456.79  | currency: Euro | currencyLangFormat: Local
toCurrency(123456.789, 'USD', 'en-us')  // $123,456.79  | currency: US Dollar | currencyLangFormat: English (United States)
toCurrency(123456.789, 'USD', 'fa')  // ۱۲۳٬۴۵۶٫۷۹ ؜$ | currency: US Dollar | currencyLangFormat: Farsi
toCurrency(322342436423.2435, 'JPY')  // ¥322,342,436,423 | currency: Japanese Yen | currencyLangFormat: Local
toCurrency(322342436423.2435, 'JPY', 'fi')  // 322 342 436 423 ¥ | currency: Japanese Yen | currencyLangFormat: Finnish
```

**toDecimalMark**

```js
const toDecimalMark = num => num.toLocaleString('en-US')

toDecimalMark(12305030388.9087)  // "12,305,030,388.909"
```

**toOrdinalSuffix**

```js
const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3]
}

toOrdinalSuffix('123')  // "123rd"
```

**validateNumber**

```js
const validateNumber = num => !isNaN(parseFloat(num)) && isFinite(n) && Number(n) === n

validateNumber(123) // true
validateNumber('123') // true
validateNumber('abc') // false
```

**yesNo**

```js
const yesNo = (val, def = false) =>
  /^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def

yesNo('Y')  // true
yesNo('yes')  // true
yesNo('No')  // false
yesNo('Foo', true)  // true
```
