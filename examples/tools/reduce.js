// reduce 用法
/*
 accumulator  累加的值
 currentValue 当前元素的值
 currentIndex   当前元素下标
 array      调用数组
*/

// 累加
var arr = [1, 2, 3, 4]

var sum = (prev, next) => {prev + next}

arr.reduce(sum, 0)


// 扁平数组
var arr = [1, 2, [3, 4]]

var flatten = arr.reduce(function(a, b) {
  return a.concat(b)
}, [])

// es6写法
var flatten = arr.reduce((a, b) => a.concat(b), [])

console.log(flatten)

var flatten = arr.reduce((acc, cur) => acc + cur, 0)

// 计算数组中每个元素出现的次数

var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']

var countNames = names.reduce(function(allNames, name) {
  if(name in allNames) {
    allNames[name]++
  }
  else {
    allNames[name] = 1
  }

  return allNames
}, [])

console.log(countNames)

// 使用ES6... 和 初始值绑定包含在对象数组中的数组
var friends = [{
  name: 'Anna',
  books: ['Bible', 'Harry Potter'],
  age: 21
}, {
  name: 'Bob',
  books: ['War and peace', 'Romeo and Juliet'],
  age: 26
}, {
  name: 'Alice',
  books: ['The Lord of the Rings', 'The Shining'],
  age: 18
}];


var allBooks = friends.reduce(function(prev, cur) {
  return [...prev, cur.books]
}, ['AlphaBet'])