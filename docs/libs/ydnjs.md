# You don't know js

**don't do this**

字符串转数字 `>>`

```js
let r = '10' >> 0
console.log(typeof r) // number

r = 'abc' >> 0
console.log(r) // 0
```

平方数

```js
const r = 2 ** 10
```

条件判断

```js
var a = '10'
// 不要这样写，条件判断不成立
if (a == ture) {
}
// 不要这样写，条件判断不成立
if (a === true) {
}
// 可以这样写
if (a) {
}
// 这样的写法更好
if (!!a) {
}
// 这样显示转换也很好
if (Boolean(a)) {
}
```

```js
var i = 1

Number.prototype.valueOf = function() {
  return i++
}

var a = new Number(10)

if (a == 1 && a == 2) {
  console.log('代码会进入到这里来！')
}
```

用 typeof 来判断元素是否存在

```js
if (debug) {
  console.log('debug is starting')
}

if (typeof debug !== 'undefined') {
  console.log('debug is starting')
}

;(function() {
  var fn = function() {}

  function doSome() {
    var helper = typeof fn !== 'undefined' ? fn : function() {}
    var help = helper()
  }
  doSome()
})()(function() {
  var helper = fn || function() {}
  var help = helper()
})()
```

```js
'0' == null;  // false
'0' == undefined;  // false
'0' == false;   // true -- 坑
'0' == NaN;  // false
'0' == 0;  // true
'0' == '';  // false

false == null; // false
false == undefined; // false
false == NaN; // false
false == 0; // true --坑
false == ''; // true
false == []; // true
false == {}; // false

'' == null; // false
'' == undefined; // false
'' == NaN; // false
'' == 0; // true --坑
'' == []; // true --坑
'' == {}; // false

0 == null; // false
0 == undefined; // false
0 == NaN; // false
0 == []; // true -- 坑
0 == {}; // false

[] == ![]; // true -- 坑
0 == '\n'; // true -- 坑

2 == [2]; // true
'' == [null]; // true

2 == [2]的转化过程；2 == '2' ==> 2 == 2;

以下7个判断都返回true，7个坑
'0' == false;
false == 0;
false == '';
false = [];
'' == 0;
'' == [];
0 == [];

[] + {}; // "[object Object]"
{} + []; // 0
```

• 如果两边的值中有 true 或者 false，千万不要使用 ==。
• 如果两边的值中有 []、 "" 或者 0，尽量不要使用 ==。
这时最好用 === 来避免不经意的强制类型转换。这两个原则可以让我们避开几乎所有强制
类型转换的坑。

**IIFE**

```js
var a = 2(function IIFE(global) {
  var a = 3
  console.log(a) // 3
  console.log(gloal.a)
})(window)

var a = 2(function(def) {
  def(window)
})(function def(global) {
  var a = 3
  console.log(a)
  console.log(global.a)
})

// 垃圾回收
function process(data) {
  // do something
}

var myData = {}

process(myData)

var btn = document.getElementById('button')
btn.addEventListener(
  'click',
  function() {
    console.log('button is clicked')
  },
  false
)

// addEventListener会使myData无法被垃圾回收机制回收

function process(data) {}
// 在这个块中定义的内容可以销毁了！
{
  var myData = {}
  process(myData)
}

var btn = document.getElementById('button')
btn.addEventListener(
  'click',
  function() {
    console.log('button is clicked')
  },
  false
)
```
