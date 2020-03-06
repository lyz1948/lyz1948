# Array

- 定义一个空数组

```js
var arr = [];
var arr = new Array();
```

- 定义一个数组并赋值

```js
var arr = [1,2,'hello','hi'];
var arr = new Array('abc',1,3,4);
```

数组的下标是从0开始的，数组下标为0的值是‘bar’ 下标为1的值是‘boo’ 下标为2的值是‘baz’

``` js
var myarr = ['bar', 'boo', 'baz']

myarr.length // 3
myarr[0]     // "bar"
myarr[2]     // "baz"
```

- 定义一个数组，并设置数组的长度

```js
var arr = new Array(6);
var arr = new Array('5'); // 字符串的话是赋值，长度只有1
```

- 改变数组的长度

```js
arr.length = 1;
```

- 快速清空一个数组的内容

```js
arr = [];
```

- 数组添加内容
- 从数组的最后面添加内容，返回数组的长度

```js
arr.push('add');
```

- 从数组的最前面添加内容，返回值为数组的长度(IE6、7不支持返回值)

```js
arr.unshift('add');
```

- 从数组的后面删除最后一个，返回值为被删除的内容

```js
arr.pop();
```

- 从数组的前面删除最前一个，返回值为被删除的内容

```js
arr.shift();
```

- `splice` 删除、替换、添加

```js
var arr = ['刘备','刘邦','刘翔','白起'];
arr.splice(0,2); // 从第0个开始，删除2位  ['刘翔','白起'];

arr.splice(2,1); // 从第2个开始，删除1位  ['刘备','刘邦','白起'];

arr.splice(2,0,'宋江'); // 从第2个开始，删除0位,并插入 '宋江'   ['刘备','刘邦','宋江','刘翔','白起'];
```

- 数组去重复

```js
var arr = [1,5,2,5,2,6,9,22,90,43,9,22];

for(var i = 0; i < arr.length; i++){
  for(var j = i+1; j < arr.length; j++){
    if(arr[i] == arr[j]){
      arr.splice(j,1);
      j--;
    }
  }
}
consolr.log(arr); //1, 5, 2, 6, 9, 22, 90, 43
```

- 数组的排序 sort系统自带 (按照字符串的方式排序的)

```js
arr.sort();     // 1, 2, 22, 43, 5, 6, 9, 90
```

- 从小到大 1, 2, 5, 6, 9, 22, 43, 90

```js
arr.sort(function(n1, n2){
  return n1 - n2;
});
```

- 从大到小 90, 43, 22, 9, 6, 5, 2, 1

```js
arr.sort(function(n1, n2){
  return n2 - n1;
});

```

### 字符串数字的排序方式

- 从小到大 "6px", "150px", "225px", "431px", "900px"

```js
var arrWidth = ['225px','431px','150px','900px','6px'];
arrWidth.sort(function(a, b){
  return parseInt(a) - parseInt(b);
});
```

- 从大到小 "900px", "431px", "225px", "150px", "6px"

```js
arrWidth.sort(function(a, b){
  return parseInt(b) - parseInt(a);
});
```

- concat 数组的连接

```js
var arr1 = [1,2,3];
var arr2 = ['hi',4,5];
var arr3 = [6,'hello'];
console.log(arr2.concat(arr1,arr3)); // ["hi", 4, 5, 1, 2, 3, 6, "hello"]
console.log(arr1.concat(arr2,arr3)); // [1, 2, 3, "hi", 4, 5, 6, "hello"]
console.log(arr3.concat(arr2,arr1)); // [6, "hello", "hi", 4, 5, 1, 2, 3]
```

- reverse 数组倒序

```js
var arr = [1,2,3,4,5];
arr.reverse();
console.log(arr); // [5,4,3,2,1]

var arr = ['a','c','d','f']
arr.reverse();
console.log(arr); // ["f", "d", "c", "a"]
```

- 字符串倒序

```js
var str = 'HelloMan';
var arr = str.split('');  // 先转换为数组
var newStr = arr.reverse().join(''); // 倒序以后，在拼接，转换为字符串
console.log(newStr);  // naMolleH
```

### 随机数的一些公式，生成指定范围内的随机数

- 生成从0（包括0）往上，但是不包括1（排除1）的随机小数, 

```js
Math.random();
```

- 0 ~ 1 的随机数组

```js
Math.round(Math.random());
```

-  0 ~ 10 的随机数组

```js
Math.round( Math.random() * 10 );
```

- 5 ~ 10 的随机数组

```js
Math.floor( Math.random() * 5 + 5 );
```

- 10 ~ 20 的随机数组

```js
Math.round( Math.random()*10 + 10 );
```

- 20 ~ 100 的随机数组

```js
Math.round( Math.random()*80 + 20 );
```

### 随机数的规律

- x ~ y 之间的值

```js
var x = 10;
var y = 20;
Math.round( Math.random()*(y-x) + x );
```

- 0 ~ x 之间的值

```js
Math.round( Math.random() * x );
```

- 1 ~ x 之间的值

```js
Math.ceil( Math.random() * x );
```

** 栗子🌰 **

- 随机生成 0 - 1000 之间的 100个数字

```js
var html = '';
for(var i = 0; i < 100; i++){
  html += Math.round( Math.random() * 1000 ) + '  ';
}
var arrNum = html.split('  ');
arrNum.sort(function(a, b){
  return parseInt(a) - parseInt(b);
});
console.log(arrNum);
```
