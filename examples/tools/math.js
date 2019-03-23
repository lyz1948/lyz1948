// 获取数组最大值


// 原始方法

var arr = [1, 23, 43, 98, 123, 32]

var res = arr[0]

for(var i = 1; i < arr.length; i++) {
  res = Math.max(res, arr[i])
}
var maxNum = res 

// reduce

function max(prev, next) {
  return Math.max(prev, next)
}

var maxNum = arr.reduce(max)

// 排序

arr.sort(function(a, b) {
  return a - b
})

var maxNum = arr[arr.length - 1]

// eval 

var maxNum = eval("Math.max(" + arr + ")")


// apply

var maxNum = Math.max.apply(null, arr)


// ES6 ...

var maxNum = Math.max(...arr)


console.log(maxNum)