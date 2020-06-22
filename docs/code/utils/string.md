# 字符串相关的工具方法

## 回文

判断一个字符串是否是回文的方法

方法一

```js
const isPalindrome = str => {
  if (str.length <= 1) return true

  if (str.charAt(0) !== str.charAt(str.length - 1)) return false

  return isPalindrome(str.substr(1, str.length - 2))
}
```

方法二

```js
const isPalindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/, '')
  return s === s.split('').reverse().join('')
}
```

方法三

```js
const isPalindrome = str => {
  const len = str.length

  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - i - 1]) return false
  }
}
```

## 字符串排序

按照字符串 a-z 排序

```js
const sortCharactersInString = str =>
  str
    .split('')
    .sort((a, b) => a.localeCompare(b))
    .join('')
```

按照数字排序

```js
const sortCharacterInArray = str =>
  str
    .split('')
    .sort((a, b) => a.localeCompare(b))
    .join('')
```

## 反转一个字符串

```js
const reverseStr = str => [...str].reverse().join('')
```

## 随机字符串

```js
var randomStr = function() {
  const len = 32
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  const max = chars.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * max))
  }
  return str
}
```

## 判断字符串是否有数字

```js
function detectNum(str) {
  let n = 0
  let len = str.length

  for (let i = 0; i < len; i++) {
    n = str.charCodeAt(i)
    if (n < 48 || n > 57) return false
  }
  return true
}
```

## 检查字符串中是否包含指定的值

```js
function stringContainer(str, val) {
  return str.indexOf(val) > -1
}
```

## 首字母大写

```js
const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() +
  (lowerRest ? str.slice(1).toLowerCase() : str.slice(1))
```
