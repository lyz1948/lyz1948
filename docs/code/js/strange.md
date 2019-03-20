# 骚操作与骚问题

**对象值互换**
不能用第三个变量

数字调换

```js
var a = 5
var b = 8

a = a + b // 13
b = a - b // 13 - 8 = 5
a = a - b // 13 - 5 = 8

console.log(a) // 8
console.log(b) // 5
```

字符串调换

```js
var a = 'hello'
var b = 'man'

a = [a, b]
b = a[0]
a = a[1]

console.log(a) // man
console.log(b) // hello
```

```js
var likeAry = function(n) {
  var ary = []
  ary.length = n + 1
  var str = ary.join('m')
  var ret = []

  str.replace(/m/g, function() {
    ret.unshift(n--)
  })

  return ret
}
```
