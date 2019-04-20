# Ramda

## 运算

### 比较运算

**gt** `>` 大于
判断第一个参数是否大于第二个参数

```js
var a = 20
var b = 10
R.gt(a, b) // true

var a = 'a'
var b = 'b'
R.gt(a, b) // false
```

**gte** `>=` 大于等于
判断第一个参数是否大于等于第二个参数

```js
var a = 20
var b = 20

R.gte(a, b) // true

var a = 'a'
var b = 'b'

R.gte(a, b) // false
```

**lt** `<` 小于
判断第一个参数是否小于第二个参数

```js
var a = 20
var b = 10

R.lt(a, b) // false

var a = 'a'
var b = 'b'

R.lt(a, b) // true
```

**lte** `<=` 小于等于
判断第一个参数是否小于等于第二个参数

```js
var a = 20
var b = 10

R.lte(a, b) // true

var a = 'a'
var b = 'b'

R.lte(a, b) // true
```

**equals** `=` 等于
比较两个值是否相等（支持对象的比较

```js
var a = 10
var b = 20
var c = 20

var arr1 = [1, 2, 3]
var arr2 = [1, 2, 3]

var x = 1
var y = '1'

R.equals(a)(b) // false
R.equals(b)(c) // true

R.equals(arr1)(arr2) // true

R.equals(x)(y) // false
```

**eqBy**
比较两个值传入指定函数的运算结果是否相等

```js
var a = 10
var b = -10

R.eqBy(Math.abs, a)(b)
```

### 数学运算

**add** 加法运算
返回 2 个值的和

```js
var a = 10
var b = 10

R.add(a)(b) // 20
```

**substract** 减法运算
返回第一个参数减去第二个参数的差值

```js
var a = 10
var b = 5

R.substract(a)(b) // 5
```

**multiply** 乘法运算
返回 2 个参数的积

```js
var a = 10
var b = 5

R.multiply(a)(b) // 50
```

**divide** 除法运算
返回第一个参数除以第二个参数的商

```js
var a = 100
var b = 5

R.divide(a)(b) // 20
```

### 逻辑运算

**either** "||" 或
接收 2 个函数参数，只要一个返回`true`,则返回`true`，反之则返回`false`

```js
const gt10 = x => x > 10
const even = x => x % 2 === 0

let r = R.either(gt10, even)
r(97) // true
r(8) // true
```

**both** "&&" 与
接收 2 个函数参数，必须 2 个都返回`true`,则返回`true`，反之则返回`false`

```js
const gt10 = x => x > 10
const even = x => x % 2 === 0

r = R.both(gt10, even)
r(11) // false
r(12) // true
```

**allPass**
接受参数为数组，数组内的元素为函数，所有函数必须返回`true`则返回`true`，反之则返回`false`

```js
const gt10 = x => x > 10
const even = x => x % 2 === 0

r = R.allPass([gt10, even])
r(18) // true
r(19) // false
```

## 字符串

**split** 切割，截断
按照指定分隔符截断字符串，返回数组，数组中值的每项为截断后返回的值

```js
let str = 'www-xxx-aaa-bbb-com'
R.split('-')(str) // ['www','xxx','aaa','bbb','com']
```

**test** 测试匹配
判断一个字符串是否匹配给定的正则表达式,返回布尔值

```js
let str = 'abc 123'
R.test(/\b1/)(str) // true

R.test(/^b/)(str) // false
```

**match** 测试匹配
返回匹配后的字符串数组

```js
let str = 'abcebcfbcnbc'
R.match(/[a-z]b/g)(str) // ['ab', 'eb', 'fb', 'nb']

R.match(/aa/g)(str) // []

R.match(/aaa/g)(null) // 报错
```

## 函数

**`compose`** 函数的合成

```js
const fn1 = () =>
  R.compose(
    Math.abs,
    R.add(1)
  )
```

**`pipe`** 将多个函数合成一个函数，顺序是从左到右

```js
var negative = x => -1 * x
var increaseOne = x => x + 1

var r = R.pipe(
  Math.pow,
  negative,
  increaseOne
)
r(5, 6) // -15624 => -(5^6) + 1
```

**pipeK**

**pipeP**

**`converge`**
接收 2 个参数，参数一是函数
参数一： { Function }
参数二： { array<Function, Function> }

```js
let sumArr = arr => {
  let sum = 0
  arr.forEach(i => (sum += i))
  return sum
}

let lengthArr = arr => arr.length

let average = R.converge(R.divide, [sumArr, lengthArr])
average([1, 2, 3, 4, 5, 6, 7]) // 4
// sumArr = 28  lengthArr = 7
// 28 / 7 = 4
```

**`complement`**
返回一个新函数，如果原函数返回`true`，该函数返回`false`；如果原函数返回`false`，该函数返回`true`, 取反

```js
let gt10 = x => x > 10
let lte10 = R.complement(gt10)

gt10(5) // false
lte10(5) // true
```

**addIndex**
参数一： index 索引
参数二： val 值
返回值： array 数组

```js
var mapIndex = R.addIndex(R.map)
mapIndex((val, idx) => idx + '-' + val, ['a', 'b', 'c', 'd'])
// ['0-a', '1-b', '2-c', '3-d']
```

**always**
参数： string
返回值： string, 返回值是对原函数的引用

```js
let r = R.always('hello')
r() // 'hello'
```

**ap**

```js
R.ap(R.multiply(2), R.add(2), [1, 2, 4])
// [2, 4, 8, 3, 4, 6]

R.ap([R.concat('play '), R.toUpper], ['game', 'ball'])
// ['play game', 'play ball', 'PALY', 'BALL']

R.ap(R.concat, R.toUpper)('Ramda')
// RamdaRAMDA
```

**apply**
将数组转成参数序列，传入指定函数

```js
let nums = [1, 23, 52, 19, -38, 93]
R.apply(Math.min, nums) // -38
```

**applySpec**
传入对象，返回计算后的相同对象属性与值

```js
let getMetrics = R.applySpec({
  add: R.add,
  nested: {
    mult: R.multiply
  }
})
getMetrics(2, 4) // {add: 6, nested: { mult: 8 }}
```

**applyTo**

```js
let r18 = R.applyTo(18)
r18(R.identity) // 18
r18(R.add) // 19
```

**ascend** 升序

```js
let byAge = R.ascend(R.prop('age'))
let group = [
  { age: 22, name: 'john' },
  { age: 20, name: 'joy' },
  { age: 19, name: 'jeep' }
]

let groupByYoungFirst = R.sort(byAge, group)
```

**binary**
接收 2 个参数，2 个以外的参数为 undefined

```js
let threeArgs = (a, b, c) => [a, b, c]
threeArgs.length // 3
threeArgs(1, 2, 3) // [1, 2, 3]

let twoAry = R.binary(threeArgs)
twoAry(1, 2, 3) // [1, 2, undefined]
```

**bind**
绑定上下文

```js
let log = R.bind(console.log, console)
R.pipe(
  R.assoc('a', 2),
  R.tap(log),
  R.assoc('a', 3)
)({ a: 1 })
// {a: 3}
// logs {a: 2}
```

**call**

```js
```

**comparator**

```js
```

**composeK**

```js
```

**composeP**

```js
```

**construct**

```js
```

**constructN**

```js
```

**curry**

```js
let addFourNumbers = (a, b, c, d) => a + b + c + d

let curriedAddFourNumbers = R.curry(addFourNumbers)
let r = curriedAddFourNumbers(1, 2)
let m = r(3)
m(4) // 10
```

**curryN**

```js
```

**descend**

```js
```

**empty**

```js
```

**F**

```js
```

**flip**

```js
```

**identity**

```js
```

**invoker**

```js
```

**juxt**

```js
```

**lift**

```js
```

**liftN**

```js
```

**memoize**
返回一个函数，会缓存每一次的运行结果

```js
let productArr = arr => {
  let product = 1
  arr.forEach(i => (product *= i))
  return product
}
let count = 0
let factorial = R.memoize(n => {
  count += 1
  return productArr(R.range(1, n + 1))
})
factorial(5) // 120
factorial(5) // 120
factorial(5) // 120
count // 1
```

**memoizeWith**

```js
```

**nAry**

```js
```

**nthArg**

```js
```

**o**

```js
```

**of**

```js
```

**once**

```js
```

**partial**
允许多参数的函数接受一个数组，指定最左边的部分参数

```js
let multiply = (a, b) => a * b
let double = R.partial(multiply, [2])
double(2) // 4

let greet = (salutation, titile, firstName, lastName) =>
  salutation + ',' + title + ' ' + firstName + ' ' + lastName

let sayHello = R.partial(greet, ['Hello'])
let sayHelloToMs = R.partial(sayHello, ['Ms.'])
sayHelloToMs('Jane', 'Jones') // 'Hello, Ms. Jane Jones'
```

**partialRight**
与`partial`相似，但数组指定的参数为最右边的参数

```js
let greet = (salutation, titile, firstName, lastName) =>
  salutation + ',' + title + ' ' + firstName + ' ' + lastName

let greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones'])

greetMsJaneJones('Hello') // 'Hello, Ms. Jane Jones'
```

**T**

```js
```

**tap**
将一个值传入指定函数，并返回该值

```js
let sayX = x => console.log('x is' + x)
R.tap(sayX)(10) // 10

R.pipe(
  R.assoc('a', 2),
  R.tap(console.log),
  R.assoc('a', 3)
)({ a: 1 })
```

**zipWith**
将两个数组对应位置的值，一起作为参数传入某个函数

```js
let r = (x, y) => {
  console.log('x', x)
  console.log('y', y)
}

R.zipWith(r, [1, 2, 3])(['a', 'b', 'c'])
// [f(1, 'a'), f(2, 'b'), f(3, 'c')]
```

**tryCatch**

```js
```

**unapply**

```js
```

**uncurryN**

```js
```

**useWith**
接受一个函数`fn`和一个函数数组`fnList`作为参数，返回`fn`的柯里化版本。该新函数的参数，先分别经过对应的`fnList`成员处理，再传入`fn`执行

```js
let decreaseOne = x => x **1**
let increaseOne = x => x + 1

R.useWith(Math.pow, [decreaseOne, increaseOne])(3, 4) // 32
R.useWith(Math.pow, [decreaseOne, increaseOne])(3)(4) // 32
```

**函数执行**

## 数组

数组的特征
**contains**
数组中如果包含某传入的参数，返回 true

```js
R.contains(1)([1, 2, 3]) // true
R.contains(0)([1, 2, 3]) // false
R.contains({ name: 'lay' })([{ name: 'lay' }]) // true
R.contains([22])([[22]]) // true
```

**all**
所有成员都符合指定函数时，返回`true`, 否则返回`false`

```js
let equals10 = R.equals(10)

R.all(equals10([10, 10, 10, 10])) // true
R.all(equals10([10, 1, 10, 10])) // false
```

**any**
只要有一个成员满足条件，就返回 true

```js
let lessThan0 = R.flip(R.lt)(0)
let lessThan2 = R.flip(R.lt)(2)

R.any(lessThan0)([1, 2]) // false
R.any(lessThan2)([1, 2]) // true
```

**none**
没有成员满足条件时，返回 true

```js
let isEven = n => n % 2 === 0

R.none(isEven)([1, 3, 5, 7, 9]) // true
R.none(isEven)([1, 3, 5, 7, 8]) // false
```

**数组截取与添加**
**head**
返回数组的第一个成员

```js
R.head(['a', 'b', 'c']) // 'a'
R.head([]) // undefined
R.head('123') // '1'
R.head('') // ''
```

**last**
返回数组的最后一个成员

```js
R.last(['a', 'b', 'c']) // 'c'
R.last([]) // undefined
R.last('123') // '3'
R.last('') // ''
```

**tail**
返回第一个成员以外的所有成员组成的新数组

```js
R.tail([1, 2, 3]) // [2, 3]
R.tail([1, 2]) // [2]
R.tail([1]) // []
R.tail([]) // []

R.tail('abc') // 'bc'
R.tail('ab') // 'b'
R.tail('a') // ''
R.tail('') // ''
```

**init**
返回最后一个成员以外的所有成员组成的新数组

```js
R.init([1, 2, 3]) // [1, 2]
R.init([1, 2]) // [1]
R.init([1]) // []
R.init([]) // []

R.init('abc') // 'ab'
R.init('ab') // 'a'
R.init('a') // ''
R.init('') // ''
```

**nth**
取出指定位置的成员

```js
let list = ['foo', 'bar', 'baz', 'abc']
R.nth(1)(list) // 'bar'
R.nth(-1)(list) // 'abc'
R.nth(-100)(list) // undefined

R.nth(2)('abc') // 'c'
R.nth(3)('abc') // ''
```

数组过滤

**filter**
过滤出符合条件的成员

```js
var isEven = n => n % 2 === 0
R.filter(isEven)([1, 2, 3, 4]) // [2 4]
```

**reject**
过滤出所有不满足条件的成员

```js
var isOdd = n => n % 2 === 1
R.reject(isOdd)([1, 2, 3, 4])[(2, 4)]
```

**talkWhile**
一旦满足条件，后面的成员都会被过滤

```js
var isNotFour = x => x !== 4
R.takeWhile(isNotFour)(1, 2, 3, 4, 5, 4, 3, 2, 1) //[1, 2, 3]
```

**dropWhile**
一旦满足条件，取出剩余的所有成员

```js
var lteTwo = x => x <= 2
R.dropWhile(lteTwo)([1, 2, 3, 4, 3, 2, 1]) // [3, 4, 3, 2, 1]
```

**without**
返回指定值意外的成员

```js
R.without([1, 2])([1, 2, 3, 4]) // [3, 4]
```

单数组运算

**countBy**
对每个成员执行指定函数以后，返回一个对象，表示各种执行结果分别包含多少成员。

```js
let numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.3]
R.countBy(Math.floor)(numbers) // {'1': 3, '2': 2, '3': 1}

let letters = ['a', 'b', 'A', 'a', 'B', 'c']
R.countBy(R.toLower)(letters) // {'a': 3, 'b': 2, 'c': 1}
```

**splitAt**
在给定位置，将原数组分成两个部分

```js
R.splitAt(1)([1, 2, 3]) // [[1], [2, 3]]
R.splitAt(5)('hello world') // ['hello', ' world']
R.splitAt(-1)('foobar') // ['fooba', 'r']
```

**splitEvery**
按照指定的个数，将原数组分成多个部分

```js
R.splitEvery(3)([1, 2, 3, 4, 5, 6, 7]) // [[1, 2, 3], [4, 5, 6], [7]]

R.splitEvery(3)('foobarbaz') // ['foo', 'bar', 'baz']
```

**splitWhen**
以第一个满足指定函数的成员为界，将数组分成两个部分

```js
R.splitWhen(R.equal(2))([1, 2, 3, 4]) // [[1], [2, 3, 4]]
```

**aperture**
每个成员与其后给定数量的成员分成一组，这些组构成一个新的数组

```js
R.qperture(2)([1, 2, 4, 5, 6]) // [[1, 2], [2, 4], [4, 5], [5, 6]]
```

-partition
根据是否满足指定函数，将成员分区

```js
R.partition(R.contains('s'))(['sss', 'aaa', 'bbb', 'is'])
// [['sss', 'is'], ['aaa', 'bbb']]
```

**indexOf**
某个值在数组中第一次出现的位置

```js
R.indexOf(2)([1, 2, 3, 4]) // 1
R.indexOf(8)([1, 2, 3, 4]) // -1
```

**lastIndexOf**
某个值在数组中最后一次出现的位置

```js
R.lastIndexOf(2)([1, 2, 3, 4, 2, 4, 3]) // 4
R.lastIndexOf(8)([1, 2, 3, 4]) // -1
```

**map**
数组的每个成员依次执行某个函数

```js
let double = x => x * 2
R.map(double)([1, 2, 3]) // [2, 4, 6]
```

**mapIndexed**
与 map 类似，区别是遍历函数可以额外获得两个参数：索引位置和原数组

```js
let mapIndexed = R.addIndex(R.map)
mapIndexed((val, idx) => idx + '-' + val, ['a', 'b', 'c', 'd'])
```

**forEach**
数组的每个成员依次执行某个函数，总是返回原数组

```js
let printPlusFive = x => console.log(x + 5)
R.forEach(printPlusFive, [1, 2, 3]) // [1, 2, 3]
// 6 7 8
```

**reduce**
数组成员依次执行指定函数，每一次的运算结果都会进入一个累积变量

```js
let mySubtract = function(a, b) {
  return a **b**
}
R.reduce(mySubtract, 0)([1, 2, 3, 4]) // -10
```

**reduceRight**
与`reduce`类似，区别是数组成员从左到右执行

```js
R.reduce(subtract, 0)([1, 2, 3, 4]) // -2
```

```js
let printXPlusFive = x => console.log(x + 5)
R.forEach(printXPlusFive, [1, 2, 3]) // [1, 2, 3]
// logs 6 7 8
```

**reduceWhile**
与`reduce`类似，区别是有一个判断函数，一旦数组成员不符合条件，就停止累积

```js
let isOdd = (acc, x) => x % 2 === 1
let xs = [1, 3, 5, 7, 50, 555, 900]
R.reduceWhile(isOdd, R.add, 0)(xs) // 16

let ys = [2, 4, 6]
R.reduceWhile(isOdd, R.add, 111)(ys) // 111
```

**sort**
按照给定函数，对数组进行排序

```js
let diff = (a, b) => a ** (b ** R.sort(diff)([8, 4, 6, 3, 5])) // [3, 4, 5, 6, 8]
```

**sortWith**
按照给定的一组函数，进行多重排序

```js
let alice = {
  name: 'alice',
  age: 40
}

let bob = {
  name: 'bob',
  age: 30
}

let lily = {
  name: 'lily',
  age: 40
}

let people = [lily, bob, alice]
let ageNameSort = R.sortWith([
  R.descend(R.prop('age'))
  R.ascend(R.prop('name'))
])

ageNameSort(people) // [alice, lily, bob]
```

**adjust**
对指定位置的成员执行给定的函数

```js
R.adjust(R.add(100), 1)([1, 2, 3]) // [1, 102, 3]
```

**ap**
数组成员分别执行一组函数，将结果合成为一个新数组

```js
R.ap([R.multiply(2), R.add(3)])(1, 2, 3) // [2, 4, 6, 4, 5, 6]

R.ap([R.concat('tastty'), R.toUpper])(['pizza', 'salad'])
// ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
```

**flatten**
将嵌套数组铺平

```js
R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

**groupWith**
将数组成员依次按照指定条件两两比较，并按照结果将所有成员放入子数组

```js
R.groupWith(R.equals)([0, 1, 1, 2, 3, 5, 8, 13, 21])
// [[0], [1, 1], [2], [3], [5], [8], [13], [21]]

R.groupWith((a, b) => a % 2 === b % 2)([0, 1, 1, 2, 3, 5, 8, 13, 21])
// [[0], [1, 1], [2], [3, 5], [8], [13, 21]]

R.groupWith(R.eqBy(isVowel), 'aestiou')
// ['ae', 'st', 'iou']
```
