# 工具方法

## Map 方法

```js
const myMap = function(fn, ctx) {
  const arr = Array.prototype.slice.call(this)
  const newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    newArr.push(fn.apply(ctx, arr[i], i, this))
  }
  return newArr
}

// reduce函数实现
const myMap = function(fn, ctx) {
  const arr = Array.prototype.slice.call(this)
  return arr.reduce((acc, cur, index) => {
    return [...acc, fn.apply(ctx, cur, index, this)]
  }, [])
}
```

## 带有重复项

使用递归。对于给定字符串中的每个字母，为字母创建字谜。使用 map()将字母与每部分字谜组合，然后使用 reduce()将所有字谜组合到一个数组中，最基本情况是字符串长度等于 2 或 1。

```js
const anagrams = str => {
  if(str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str]

  return str.split('').reduce((acc, letter, i) =>
    acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => latter + val)),[])
}
anagrams('abc') => ['abc', 'cba', 'cab', 'bac', 'bca', 'acb']
```

## 数组平均数

使用 reduce()将每个值添加到累加器，初始值为 0，总和除以数组长度。

```js
const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length

average([1,5,8]) => 7
```

## 大写每个单词的首字母

使用 replace()匹配每个单词的第一个字符，并使用 toUpperCase()来将其大写。

```js
const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase())
```

## 首字母大写

使用 slice（0,1）和 toUpperCase()大写第一个字母，slice（1）获取字符串的其余部分。 省略 lowerRest 参数以保持字符串的其余部分不变，或将其设置为 true 以转换为小写。（注意：这和上一个示例不是同一件事情）

```js
const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() +
  (lowerRest ? str.slice(1).toLowerCase() : str.slice(1))
```

## 检查回文

将字符串转换为 toLowerCase()，并使用 replace()从中删除非字母的字符。然后，将其转换为 tolowerCase()，将（’‘）拆分为单独字符，reverse()，join（’‘），与原始的非反转字符串进行比较，然后将其转换为 tolowerCase()。

```js
function isPalindrome(text) {
  if (text.length <= 1) {
    return true
  }
  if (text.charAt(0) != text.charAt(text.length - 1)) return false

  return isPalindrome(text.substr(1, text.length - 2))
}

// 更简洁的方式
const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '')
  return (
    s ===
    s
      .split('')
      .reverse()
      .join()
  )
}
```

## 计数数组中值的出现次数

每次遇到数组中的特定值时，使用 reduce()来递增计数器。

```js
const countOccurrences = (arr, value) =>
  arr.reduce((acc, val) => (val === value ? acc + 1 : acc + 0), 0)
```

## URL

获取当前的 URL

```js
const currentURL = _ => window.location.href
```

## Curry

使用递归。如果提供的参数（args）数量足够，则调用传递函数 f，否则返回一个 curried 函数 f。

```js
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args)
```

## Flatten 数组

扁平化数组

```js
const flatten = arr => arr.reduce((a, v) => a.concat(v), [])
```

## 深度数组扁平

使用递归，使用 reduce()来获取所有不是数组的元素，flatten 每个元素都是数组。

```js
const deepFlatten = arr =>
  arr.reduce((a, v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), [])
```

## 数组之间的区别

从 b 创建一个 Set，然后在 a 上使用 Array.filter()，只保留 b 中包含的值

```js
const diff = (a, b) => {
  const s = new Set(b)
  return a.filter(x => s.has(x))
}
```

## 两点之间的距离

使用 Math.hypot()计算两点之间的欧几里德距离。

```js
const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1)
```

## 可以按数字整除

使用模运算符（％）来检查余数是否等于 0。

```js
const isDivisible = (dividend, divisor) => dividend % divisor === 0
```

## 转义正则表达式

使用 replace()来转义特殊字符。

```js
const escapeRE = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
escapeRE('(test)') -> \\(test\\)
```

## 偶数或奇数

使用 Math.abs() 将逻辑扩展为负数，使用模（％）运算符进行检查。 如果数字是偶数，则返回 true；如果数字是奇数，则返回 false。

```js
const isEven = num => num % 2 === 0
```

## 阶乘

使用递归。如果 n 小于或等于 1，则返回 1。否则返回 n 和 n – 1 的阶乘的乘积。

```js
const factorial = n => (n <= 1 ? 1 : n * factorial(n - 1))
```

## 斐波那契数组生成器

创建一个特定长度的空数组，初始化前两个值（0 和 1）。使用 Array.reduce()向数组中添加值，后面的一个数等于前面两个数相加之和（前两个除外）。

```js
const fibnocci = n =>
  Array(n)
    .fill(0)
    .reduce((a, v, i) => a.concat(i > 1 ? a[i - 1] + a[i - 2] : i), [])
```

## 过滤数组中的非唯一值

将 Array.filter()用于仅包含唯一值的数组。

```js
const filterNonUnique = arr =>
  arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i))
```

## 获取数组最大值

使用 Math.max()与 spread 运算符（…）结合得到数组中的最大值

```js
const arrMax = arr => Math.max(...arr)
```

## 从数组中获取最小值

使用 Math.min()与 spread 运算符（…）结合得到数组中的最大值

```js
const arrMin = arr => Math.min(...arr)
```

## 获取滚动位置

如果已定义，请使用 pageXOffset 和 pageYOffset，否则使用 scrollLeft 和 scrollTop，可以省略 el 来使用 window 的默认值

```js
const getScrollPos = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.paageYOffset : el.scrollTop,
})
```

## 最大公约数（GCD）

使用递归, 基本情况是当 y 等于 0 时, 在这种情况下，返回 x。否则，返回 y 的 GCD 和 x / y 的其余部分

```js
const gcd = (x, y) => (!y ? x : gcd(y, x % y))
```

## first

返回数组第 0 个元素

```js
const arrHead = arr => arr[0]
const arrHead = arr => arr.slice(0, 1)
```

## last

截取数组排除最后一个元素

```js
const notLast = arr => arr.slice(0, -1)
```

## 填充数组

传入结束与开始的数值，填充到数组内

```js
const initArrayRange = (end, start = 0) =>
  Array.apply(
    null,
    Array(end - start).map((v, i) => i + start),
  )
```

## 用值初始化数组

使用 Array（n）创建所需长度的数组，fill(value)填充所需的值

```js
const initFillArr = (num, val = 0) => Array(num).fill(val)
```

## tail

数组最后一个元素

```js
const tail = arr => arr.slice(-1)[0]
```

## time taken

测试功能所花费的时间

```js
const timeTaken = callback => {
  console.time('timeTaken')
  const res = callback()
  console.timeEnd('timeTaken')
  return res
}
```

## pipe

管道

```js
const pipe = (...funcs) => arg => funcs.reduce((acc, func) => func(acc), arg)
pipe(btoa, x => x.toUpperCase())('Hello')
```

## powerset

```js
const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]])
```

## 范围内的随机整数

```js
const randomIntegerInRage = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min
```

## 范围内随机数

```js
const randomRange = (min, max) => Math.random() * (max - min) + min
```

## 随机化数组的顺序

```js
const shuffle = arr => arr.sort(() => Math.random() - 0.5)
```

## 数组之间的相似性

```js
const similarity = (arr, value) => arr.filter(v => value.includes(v))
```

## 数组总和

```js
const sum = arr => arr.reduce((acc, val) => acc + val, 0)
```

## 交换 2 个变量的值

```js
;[varA, varB] = [varB, varA]
```

## 砍掉数组的第一个元素

```js
const strTail = arr => (arr.length > 1 ? arr.slice(1) : arr)
```

## 除去数组中重复的值

```js
const unique = arr => [...new Set(arr)]
```

## 重定向到 URL

```js
const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url)
```

## 按字符串排序字符串

```js
const sortCharactersInString = str =>
  str
    .split('')
    .sort((a, b) => a.localeCompare(b))
    .join('')
```

## 按字符串排序数组字符串

```js
const sortCharacterInArray = arr => arr.sort((a, b) => a.localeCompare(b))
```

## 反转一个字符串

```js
const reverseStr = str => [...str].reverse().join('')
```

## RGB 到十六进制

```js
const rgbToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')
```

## 返回到顶部

```js
const scrollToTop = _ => {
  let st = document.documentElement.scrollTop || document.body.scrollTop
  if (st > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, st - st / 8)
  }
}
```

## URL 参数序列化

```js
const parseUrl = url.match(/([^?=&]+)(=([^&]*))/g).reduce((a, v) => a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), {})
```

## UUID 生成器

```js
const uuid = _ =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  )
```

## 验证数字

```js
const validateNumber = n =>
  !isNaN(parseFloat(n)) && isFinite(n) && Number(n) === n
```

## 判断正 0 负 0

```js
function isNegZero(n) {
  return n === 0 && 1 / n == -Infinity
}
```

## 多个对象合并一个对象

```js
function merge(root) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      root[key] = arguments[i][key]
    }
  }
  return root
}
```

## 使用 apply()支持可变参数

```js
function smallest(arr) {
  return Math.min.apply(Math, arr)
}

function largest(arr) {
  return Math.max.apply(Math, arr)
}
```

## 缓存 DOM

```js
function getElements(name) {
  if (!getElements.cache) getElements.cache = {}
  return (getElements.cache[name] =
    getElements.cache[name] || document.getElementsByTagName(name))
}
```

## 格式化时间

```js
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime,
}
```

## 格式化时间(给定格式)

```js
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length),
    )
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str),
      )
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

// 格式化时间
export function formatTime(time, option) {
  time = time * 1000
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000

  if (diff < 30) {
    return 'now'
  }
  if (diff < 3600) {
    return Math.ceil(diff / 60) + 'minutes ago'
  }
  if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + 'hours ago'
  }
  if (diff < 3600 * 24 * 2) {
    return 'one day ago'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function parseTime(time, fmt) {
  if (arguments.length === 0) {
    return null
  }

  const fmt = fmt || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }

  const fmtObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }

  const time_str = fmt.replace(/{y|m|d|h|i|s|a+}/g, (res, key) => {
    let val = fmtObj[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][val - 1]
    }
    if (res.length > 0 && val < 10) {
      val = '0' + value
    }
    return val || 0
  })
  return time_str
}
```

## 数组方法封装

```js
// 删除数组的元素
Array.prototype.remove = function(val) {
  if (val != null && this.length > 0) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) {
        this.splice(i, 1)
        break
      }
    }
  }
}
// 删除指定索引处元素
Array.prototype.del = function(dx) {
  if (isNaN(dx) || dx > this.length || dx < 0) {
    return this
  } else {
    this.splice(dx, 1)
  }
}
// 向数组末尾追加一个元素
Array.prototype.add = function(val) {
  if (val != null) {
    return this.push(val)
  }
}
// 清空数组
Array.prototype.clear = function() {
  return this.splice(0, this.length)
}
// 交换两个元素的值
Array.prototype.swap = function(index1, index2) {
  if (
    index1 < this.length &&
    index2 < this.length &&
    index1 >= 0 &&
    index2 >= 0
  ) {
    return (this[index1] = this.splice(index2, 1, this[index1])[0])
  }
}
// 数组上移
Array.prototype.up = function(index) {
  if (index != null && index >= 0 && index < this.length) {
    if (index == 0) {
      return
    }
    this.swap(index, index - 1)
  }
}
// 数组下移
Array.prototype.down = function(index) {
  if (index != null && index >= 0 && index < this.length) {
    if (index == this.length - 1) {
      return
    }
    this.swap(index, index + 1)
  }
}
// 数组元素变为第一个元素
Array.prototype.dips = function(index) {
  if (index != null && index >= 0 && index < this.length) {
    if (index == 0) {
      return
    }
    this.swap(index, 0)
  }
}
//数组元素变为最后一个元素
Array.prototype.floats = function(index) {
  if (index != null && index >= 0 && index < this.length) {
    if (index == this.length - 1) {
      return
    }
    this.swap(index, this.length - 1)
  }
}
Array.prototype.find = function(val) {
  if (this.length > 0) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) {
        return i
      }
    }
  }
}
```

## toString 判断类型

```js
var isType = function(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) == '[object ' + type + ']'
  }
}

const isType = type => obj =>
  Object.prototype.toString.call(obj) === `[object ${type}]`

var isString = isType('String')
var isArray = isType('Array')
var isNumber = isType('Number')
var isObject = isType('Object')
var isRegExp = isType('RegExp')

// 循环语句创建判断类型对象
var Type = {}
for (var i = 0, type; (type = ['String', 'Array', 'Number'][i++]); ) {
  ;(function(type) {
    Type['is' + type] = function(obj) {
      return Object.prototype.toString.call(obj) === '[object' + type + ']'
    }
  })(type)
}

Type.isString('abc')
Type.isNumber('123')
Type.isArray([1, 2, 4])
```

## 延续局部变量

解决 http 请求数据丢失问题

```js
var report = (function() {
  var imgs = []

  return function(src) {
    var img = new Image()
    imgs.push(img)
    img.src = src
  }
})()
```

## bind 函数

```js
Function.prototype.bind = function() {
  // 保存原函数
  var self = this
  // 需要绑定的 this 上下文
  var context = [].shift.call(arguments)
  // 剩余的参数转成数组
  var args = [].slice.call(arguments)
  // 返回一个新的函数
  return function() {
    // 执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this
    // 并且组合两次分别传入的参数，作为新函数的参数
    return self.apply(context, [].concat.call(args, [].slice.call(arguments)))
  }
}
```

## 缓存函数

```js
var mult = (function() {
  var cache = {}
  return function() {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    var a = 1
    for (var i = 0, l = arguments.length; i < l; i++) {
      a *= arguments[i]
    }

    return (cache[args] = a)
  }
})()

var mult = (function() {
  var cache = {}

  var calculate = function() {
    var a = 1
    for (var i = 0, l = arguments.length; i < l; i++) {
      a = a * arguments[i]
    }
    return a
  }

  return function() {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return (cache[args] = calculate.apply(null, arguments))
  }
})()

function cached(fn) {
  var cache = Object.create(null)
  return function cachedFn(str) {
    var hit = cache[str]

    return hit || (cache[str] = fn(str))
  }
}
```

## 鼠标滚轮事件

```js
var scrollFn = function(ev) {
  // detail只取±3，wheelDelta只取±120 其中正数表示为向上，负数表示向下。
  var ev = ev || event
  var dir = 0
  var val1 = ''
  var val2 = ''
  if (ev.wheelDelta) {
    // IE/Opera/Chorme/safari
    val1 = ev.wheelDelta
  } else if (ev.datail) {
    // Firefox
    val2 = ev.detail
  }
}
if (document.addEventListener) {
  document.addEventListener('DOMMouseScroll', scrollFn, false)
}
window.onmousewheel = document.onmousewheel = scrollFn
```

## 判断浏览器类型

```js
function userBrowser() {
  var ua = navigator.userAgent.toLowerCase()
  if (/msie/i.test(ua) && !/opera/.test(ua)) {
    alert('IE')
    return
  } else if (/firefox/i.test(ua)) {
    alert('Firefox')
    return
  } else if (/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua)) {
    alert('Chrome')
    return
  } else if (/opera/i.test(ua)) {
    alert('Opera')
    return
  } else if (
    /webkit/i.test(ua) &&
    !(/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua))
  ) {
    alert('Safari')
    return
  } else {
    alert('unKnow')
  }
}
```

## 函数节流

```js
const throttle = (fn, wait) => {
  let inThrottle
  let lastFn
  let lastTime
  return function() {
    const context = this
    const args = arguments

    if (!inThrottle) {
      fn.apply(context, args)
      inThrottle = true
      lastTime = Date.now()
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime) || 0))
    }
  }
}
```

## 防抖函数

```js
const debounce = (fn, ms = 0) => {
  let timeoutId
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}
```

## join 方法

```js
function fakeJoin(arr, connector) {
  var str = ''
  for (var i = 0; i < arr.length; i++) {
    if (i > 0) {
      str += connector
    }
    if (arr[i] !== undefined) {
      str += arr[i]
    }
  }
  return str
}

var a = new Array(3)
fakeJoin(a, '-')
```

## 随机字符串

```js
var randomStr = function() {
  var len = 32
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  var max = chars.length
  var str = ''
  for (var i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * max))
  }
  return str
}
```

## 倒序字符串

```js
var reverseStr = function(str) {
  return str
    .split('')
    .reverse()
    .join('')
}
```

## 随机颜色

```js
var randomColor = (function() {
  function randomVal(val) {
    return Math.floor(Math.random() * val + 1)
  }

  return function() {
    return (
      'rgb(' +
      randomVal(255) +
      ',' +
      randomVal(255) +
      ',' +
      randomVal(255) +
      ')'
    )
  }
})()

function randomColor() {
  return (
    '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
  )
}
```

## 浅拷贝

对象浅拷贝

```js
function copy(sourceObj, targetObj) {
  for (var key in sourceObj) {
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key]
    }
  }
  return targetObj
}

// 对象浅拷贝
function shortCopy(obj) {
  if (typeof obj !== 'object') return
  let result = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]
    }
  }
  return result
}
```

对象深拷贝

```js
function deepCopy(sourceObj, targetObj) {
  for (var key in sourceObj) {
    if (!(key in targetObj)) {
      targetObj[key] =
        typeof sourceObj[key] === 'object'
          ? deepCopy(sourceObj[key])
          : sourceObj[key]
    }
  }
  return targetObj
}
```

```js
// 对象深拷贝
function deepCopy(obj) {
  if (typeof obj !== 'object') return
  let result = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return result
}
```

## 状态切换

```js
var fnToggle = function() {
  var ary = []
  return function(id) {
    if (ary.indexOf(id) >= 0) {
      return false
    } else {
      ary.push(id)
      return true
    }
  }
}
var toggle = fnToggle()
toggle(1) // true
toggle(1) // false
toggle(2) // true
```

## 元音字母

```js
function vowels(str) {
  var matches

  if (str) {
    matches = str.match(/[aeiou]/g)

    if (matches) {
      return matches
    }
  }
}
vowels('Hello World') // ["e", "o", "o"]

function vowels(str) {
  var matches

  if (str && (matches = str.match(/[aeiou]/g))) {
    return matches
  }
}
vowels('Hello World') // ["e", "o", "o"]

const vowels = str => str && str.match(/[aeiou]/g)
```

```js
var basketModule = (function() {
  var basket = []
  return {
    addItem: function(value) {
      basket.push(value)
    },
    getItemCount: function() {
      return basket.length
    },
    getTotal: function() {
      var q = this.getItemCount()
      var p = 0
      while (q--) {
        p += basket[q].price
      }
      return p
    },
  }
})()

basketModule.addItem({ item: 'beef', price: 38 })
basketModule.addItem({ item: 'tomato', price: 2.8 })
basketModule.addItem({ item: 'potato', price: 1.5 })

basketModule.getItemCount()
basketModule.getTotal()
```

## 动态创建代理

```js
var mult = function() {
  var a = 1
  for (var i = 0, l = arguments.length; i < l; i++) {
    a *= arguments[i]
  }
  return a
}
var plus = function() {
  var a = 1
  for (var i = 0, l = arguments.length; i < l; i++) {
    a += arguments[i]
  }
  return a
}

var createProxyFactory = function(fn) {
  var cache = {}
  return function() {
    var args = Array.prototype.join.call(arguments, '')
    for (args in cache) {
      return cache[args]
    }
    return (cache[args] = fn.apply(this, arguments))
  }
}

var createProxyFactory = fn => {
  const cache = {}
  const args = Array.prototype.join.call(arguments, '')
  return cache[args] ? cache[args] : (cache[args] = fn.apply(this, arguments))
}

var proxyMult = createProxyFactory(mult)
proxyMult(1, 4, 2, 3)
```

## 解析 url 参数

```js
export function urlParse() {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach(item => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
```

## 绝对值

```js
function abs(x) {
  if (x >= 0) {
    return x
  } else {
    return -x
  }
}
```

## 计算阶层

```js
function factorial(n) {
  var product = 1
  while (n > 1) {
    product *= n
    n--
  }
  return product
}

function factorial(n) {
  var i,
    product = 1
  for (i = 2; i <= n; i++) {
    product *= i
  }
  return product
}
```

## indexOf

```js
function indexOf(arr, item){
  if(arr.indexOf){
    return arr.indexOf(item)
  } else {
    var s = 0,
      len = arr.length,
      index != null;

      for(; s < len; s++){
        if(arr[s] == item) {
          index = s;
        }
    }
  }
  return (index != null)? index : -1;
}
```

## DOM 加载

```js
var onLoad = (function() {
  var loaded = false
  var added = false
  var arr = []

  function init() {
    if (loaded) return
    loaded = true
    for (var i = 0; i < arr.length; i++) arr[i]()
    arr = null
  }

  return function(fn) {
    if (loaded) return fn()
    arr.push(fn)
    if (added) return
    //开始加载
    //chrome
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', init, false)
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState == 'complete') {
          init()
        }
      })
    }
    //其他连defer都不支持的
    window.onload = init
    added = true
  }
})()
```

## ajax

```js
//ajax、表单之类的
function json2url(json) {
  var a = []
  for (var i in json) {
    var v = json[i] + ''
    v = v.replace(/\n/g, '<br/>')
    v = encodeURIComponent(v)
    a.push(i + '=' + v)
  }
  return a.join('&')
}

function ajax(url, opt) {
  opt = opt || {}
  opt.data = opt.data || {}
  opt.data.t = opt.data.t || new Date().getTime()
  opt.method = opt.method || 'get'

  var xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP')

  if (opt.method == 'post') {
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    try {
      xhr.send(opt.data ? json2url(opt.data) : null)
    } catch (e) {}
  } else {
    url += '?' + json2url(opt.data)
    xhr.open('GET', url, true)
    try {
      xhr.send()
    } catch (e) {}
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        opt.fnSucc && opt.fnSucc(xhr.responseText)
      } else {
        opt.fnFaild && opt.fnFaild(xhr.status)
      }
    }
  }
}
```

## Cookie

```js
function setCookie(name, value, iDay) {
  if (iDay && typeof Number(iDay) == 'number') {
    var oDate = new Date()
    oDate.setDate(oDate.getDate() + iDay)
    document.cookie = name + '=' + value + ';expires=' + oDate + ';path=/'
  } else {
    document.cookie = name + '=' + value
  }
}

function getCookie(name) {
  var arr = document.cookie.split(';')
  var i = 0

  for (i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split('=')
    if (arr2[0] == name) {
      return arr2[1]
    }
  }
  return ''
}

function removeCookie(name) {
  setCookie(name, 'a', -1)
}
```

## localStorage

- saveLocalStorage

```js
export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}
```

- getLocalStorage

```js
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
}
```

## 选择函数

```js
function $$(select, context) {
  var context = context || document
  var elements = context.querySelectAll(select)
  return Array.prototype.slice.call(elements)
}
```

## 自动居中

```js
var autoCenter = function(el) {
  var docEl = document.documentElement
  var vW = docEl.clientWidth
  var vH = docEl.clientHeight
  var elW = el.offsetWidth
  var elH = el.offsetHeight

  el.style.left = (vW - elW) / 2 + 'px'
  el.style.top = (vH - elH) / 2 + 'px'
}
```

## 碰撞检测方法 1

```js
function collisionTest(obj1, obj2) {
  var obj1T = obj1.offsetTop
  var obj1R = obj1.offsetLeft + obj1.offsetWidth
  var obj1B = obj1.offsetTop + obj1.offsetHeight
  var obj1L = obj1.offsetLeft

  var obj2T = obj2.offsetTop
  var obj2R = obj2.offsetLeft + obj2.offsetWidth
  var obj2B = obj2.offsetTop + obj2.offsetHeight
  var obj2L = obj2.offsetLeft

  if (obj2T > obj1B || obj2R < obj1L || obj2B < obj1T || obj2L > obj1R) {
    return false
  } else {
    return true
  }
}
```

## 碰撞检测方法 2

```js
function collisionTest(x1,y1,x2,y2){

  var a = x1 - x2;
  var b = y1 - y2;
  var c = Math.sqrt(a*a + b*b);

  if(c < 2个物体的宽或者高的总和){
    return true;
  }else{
    return false;
  }
}
```

## 获取非行间样式

```js
function getStyle(obj, attr) {
  return obj.currentStyle
    ? obj.currentStyle[attr]
    : getComputedStyle(obj, false)[attr]
}
```

## 浏览器前缀

```js
let domStyle = document.createElement('div').style

;(function vendor(obj, name, value) {
  const vendors = ['Webkit', 'Moz', 'ms', 'O', 'standard']
  const caseName = name.charAt(0).toUpperCase() + name.substring(1)
  for (key in vendors) {
    if (domStyle[vendors[key]] !== 'undefined') {
      return key
    }
    return false
  }
})()

const prefixStyle = style => {
  if (vendor === false) return false
  if (vendor === 'standard') return style
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
```

## 获取 class 元素

```js
function getByClass(oParent, sClass) {
  var aResult = []
  var aEle = oParent.getElementsByTagName('*')
  var re = new RegExp('\\b' + sClass + '\\b')
  for (var i = 0 i < aEle.length i++) {
    if (re.test(aEle[i].className)) {
      aResult.push(aEle[i])
    }
  }
  return aResult
}
```

## 获取样式和设置样式

```js
function css(obj, attr, value) {
  if (arguments.length == 2) {
    obj.style[attr] = value
  } else {
    return obj.style[attr]
  }
}
```

## 获取对象的位置

```js
function getPos(obj) {
  var pos = {
    left: 0,
    top: 0,
  }
  while (obj) {
    pos.left += obj.offsetLeft || 0
    pos.top += obj.offsetTop || 0
    obj = obj.offsetParent
  }
  return pos
}
```

## 判断字符串是否有数字

```js
function detectNum(str) {
  var n = 0,
    len = str.length

  for (var i = 0; i < len; i++) {
    n = str.charCodeAt(i)
    if (n < 48 || n > 57) return false
  }
  return true
}
```

## 判断输入非数字

```js
document.onkeydown = function(ev) {
  ev = ev || window.event
  if (ev.keyCode < 48 || ev.keyCode > 57) {
    return false
  }
}
```

## 获取最小值的索引

```js
function getMin(arr) {
  var min = -Infinity,
    len = arr.length,
    idx = -1

  for (var i = 0; i < len; i++) {
    if (min > arr[i]) {
      min = arr[i]
      idx = i
    }
  }
  return idx
}
```

## 获取最小高度的对象的索引

```js
function getMinHeight(obj) {
  var iH = Infinity
  var idx = 0

  for (var i = 0; i < obj.length; i++) {
    if (iH > obj[i].offsetHeight) {
      iH = obj[i].offsetHeight
      idx = i
    }
  }
  return idx
}
```

## 选中文字方法

```js
function selectText() {
  if (document.selection) {
    return document.selection.createRange().text
  } else {
    return window.getSelection().toString()
  }
}
```

## indexOf 方法

```js
function indexOf(arr, item) {
  if (arr.indexOf) {
    return arr.indexOf(item)
  } else {
    var s = 0,
      len = arr.length,
      index = -1
    for (; s < len; s++) {
      if (arr[s] == item) {
        index = s
      }
    }
    return index
  }
}
```

## hasClass 是否有 class 属性

```js
function hasClass(obj, sClass) {
  return obj.className.match(new RegExp('(\\s|^)' + sClass + '(\\s|$)'))
}
```

## removeClass 删除 class 属性

```js
function removeClass(obj, sClass) {
  if (hasclass(obj, sClass)) {
    var re = new RegExp('(\\s|^)' + sClass + '(\\s|$)')
    obj.className = obj.className.replace(re, '')
  }
}
```

## 添加 class 属性

```js
function addClass(obj, sClass) {
  if (!hasClass(obj, sClass)) {
    obj.className += ' ' + sClass
  }
}
```

## toggleClass

```js
function toggleClass(obj, sClass) {
  if (hasClass(obj, sClass)) {
    removeClass(obj, sClass)
  } else {
    addClass(obj, sClass)
  }
}
```

## 点击导航页面跳转后高亮当前

```js
function highLink(obj) {
  var urlstr = location.href
  var urlstatus = false
  $(obj).each(function() {
    if (
      (urlstr + '/').indexOf($(this).attr('href')) > -1 &&
      $(this).attr('href') != ''
    ) {
      $(this).addClass('cur')
      urlstatus = true
    } else {
      $(this).removeClass('cur')
    }
  })
  if (!urlstatus) {
    $(obj)
      .eq(0)
      .addClass('cur')
  }
}
```

## ctrl + enter 键

```js
var enterDown = function(fn) {
  document.onkeydown = function(ev) {
    var ev = ev || window.event
    if (ev.keyCode === 13 && ev.ctrlKey) {
      fn()
    }
  }
}
```

## 拖拽

```js
function drag(obj, obj2) {
  obj.onmousedown = function(ev) {
    var ev = ev || window.event
    var disX = ev.clientX - obj.offsetLeft
    var disY = ev.clientY - obj.offsetTop

    document.onmousemove = function(ev) {
      var ev = ev || event
      var L = ev.clientX - disX
      var T = ev.clientY - disY

      if (obj2) {
        L = limits(L, 0, obj2.offsetWidth - obj.offsetWidth)
        T = limits(T, 0, obj2.offsetHeight - obj.offsetHeight)
      } else {
        L = limits(L, 0, document.documentElement.clientWidth - obj.offsetWidth)
        T = limits(
          T,
          0,
          document.documentElement.clientHeight - obj.offsetHeight,
        )
      }

      obj.style.left = L + 'px'
      obj.style.top = T + 'px'
    }
    document.onmouseup = function() {
      document.onmousemove = null
      document.onmouseup = null
    }
    return false
  }
}
```

## 限制范围

```js
function limits(iNow, iMin, iMax) {
  return iNow > iMax
    ? iMax
    : iNow < iMin
      ? iMin
      : iNow
  
}
```

## 得到当前对象的左右序号

```js
function getMaxNum(index, obj) {
  var arr = [index]
  var a = (b = index)
  var len = Math.max(index, arr.length - 1 - obj.length)

  for (var i = 0; i < len; i++) {
    if (a > 0) {
      arr.push(--a)
    } else if (b < obj.length - 1) {
      arr.push(++b)
    }
  }
  return arr
}
```

## 进入全屏

```js
function requestFullScreen() {
  var doc = document.documentElement
  if (doc.requestFullscreen) {
    doc.requestFullscreen()
  } else if (doc.mozRequestFullScreen) {
    doc.mozRequestFullScreen()
  } else if (doc.webkitRequestFullScreen) {
    doc.webkitRequestFullScreen()
  }
}
```

## 退出全屏

```js
function exitFullscreen() {
  var doc = document
  if (doc.exitFullscreen) {
    doc.exitFullscreen()
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen()
  } else if (doc.webkitCancelFullScreen) {
    doc.webkitCancelFullScreen()
  }
}
```

## 手机横竖判断

```js
if (window.orientation != 0) {
  var obj = document.getElementById('orientation')
  alert('横屏内容太少啦，请使用竖屏观看！')
  obj.style.display = 'block'
}

window.onorientationchange = function() {
  var obj = document.getElementById('orientation')

  if (window.orientation == 0) {
    obj.style.display = 'none'
  } else {
    alert('横屏内容太少啦，请使用竖屏观看！')
    obj.style.display = 'block'
  }
}
```

## 屏幕适配方案

```js
;(function(win, doc) {
  var docEl = doc.documentElement,
    resizeEvt =
      'onorientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth
      if (!clientWidth) return
      if (clientWidth >= 600) {
        docEl.style.fontSize = '100px'
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 375) + 'px'
      }
    }
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(window, document)

;(function(win) {
  var doc = win.document
  var docEl = doc.documentElement
  var tid

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width
    if (width > 540) {
      // 最大宽度
      width = 540
    }
    var rem = width / 10 // 将屏幕宽度分成10份， 1份为1rem
    docEl.style.fontSize = rem + 'px'
  }

  win.addEventListener(
    'resize',
    function() {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    },
    false,
  )
  win.addEventListener(
    'pageshow',
    function(e) {
      if (e.persisted) {
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300)
      }
    },
    false,
  )

  refreshRem()
})(window)

var docEl = document.documentElement,
  //当设备的方向变化（设备横向持或纵向持）此事件被触发。绑定此事件时，
  //注意现在当浏览器不支持orientationChange事件的时候我们绑定了resize 事件。
  //总来的来就是监听当前窗口的变化，一旦有变化就需要重新设置根字体的值
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function() {
    //设置根字体大小
    docEl.style.fontSize = 20 * (docEl.clientWidth / 320) + 'px'
  }

//绑定浏览器缩放与加载时间
window.addEventListener(resizeEvt, recalc, false)
document.addEventListener('DOMContentLoaded', recalc, false)
```

## polyfill 方法

### 检查是否是数组

```js
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
}
```

### 检查 NaN 的安全性

```js
if (!number.isNaN) {
  number.isNaN = function(n) {
    return typeof n === 'number' && window.isNaN(n)
  }
}
// 或者
if (!number.isNaN) {
  number.isNaN = function(n) {
    return n !== n
  }
}
```

### 判断正 0 还是-0

```js
function isNegZero(n) {
  n = Number(n)
  return n === 0 && 1 / n === -Infinity
}
```

### Object.is 方法

```js
if (!Object.is) {
  Object.is = function(v1, v2) {
    // 判断是否-0
    if (v1 === 0 && v2 === 0) {
      return 1 / v1 === 1 / v2
    }
    // 判断是否NaN
    if (v1 !== v1) {
      return v2 !== v2
    }
    // 其他情况
    return v1 === v2
  }
}

if (!Object.is) {
  Object.is = function(v1, v2) {
    // SameValue algorithm
    if (v1 === v2) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return v1 !== 0 || 1 / v1 === 1 / v2
    } else {
      // Step 6.a: NaN == NaN
      return v1 !== v1 && v2 !== v2
    }
  }
}
```

### Date.now()方法

```js
if (!Date.now) {
  Date.now = function() {
    return new Date().getTime()
  }
}
```

```js
function onlyOne() {
  var sum = 0

  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      //跳过假值，和处理0一样，但是避免了NaN
      sum += arguments[i]
    }
  }
  return sum == 1
}

var a = true
var b = false

onlyOne(a, b) // true
onlyOne(a, b, b, b, b) // true
onlyOne(a, a, b, b, b) // false

function onlyTwo() {
  var sum = 0

  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      //跳过假值，和处理0一样，但是避免了NaN
      sum += arguments[i]
    }
  }
  return sum == 2
}
```

### Ajax 方法

```js
const ajax = function({options = {}}) {
  options.type = (options.type || 'GET').toUpperCase()

  const data = []
  for(let i in options.data) {
    data.push(encodeURIComponent(i) + '=' + encodeURIComponent(options.data[i]))
  }
  data = data.join('&')

  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      const status = xhr.status
      if(status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML)
      }
      else {
        options.error && options.error(xhr.status)
      }
    }
  }

  if(options.type === 'POST') {
    xhr.open('POST', options.url, true)
    xhr.setRequestHeader('Content-Type','application/x-www.form-urlencoded')
    xhr.send(data)
  }
  else {
    xhr.open('GET', options.url + '?' + data, true)
    xhr.send(null)
  }
}

export default ajax
```
