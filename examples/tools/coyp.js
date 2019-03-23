// 数据的浅拷贝
var arr = ['old', '1', 2]
var newArr = arr.concat()

newArr[0] = 'new'

console.log(arr) // ['old', '1', 2]
console.log(newArr) // ['new', '1', 2]

// 如果是嵌套数组的话，拷贝会改变原数组的值
var newArr2 = arr.slice()
var arr = [{old: 'old'}, ['old']];
var new_arr = arr.concat();

arr[0].old = 'new';
arr[1][0] = 'new';

console.log(arr) // [{old: 'new'}, ['new']]
console.log(new_arr) // [{old: 'new'}, ['new']]

// 数组的深拷贝
var arr = ['obj', 'abc', 1, ['obj2', 'yzx'], {name: 'hello'}]
var newArr = JSON.parse(JSON.stringify(arr))
// 上面的方法很简单粗暴，但是无法拷贝函数

var shortCopy = function(obj) {
	if(typeof obj !== 'object') return 
	var newObj = obj instanceof Array ? [] : {}
	for(var key in obj) {
		if(obj.hasOwnProperty(key)) {
			newObj[key] = obj[key]
		}
	}
	return newObj
}

// 深拷贝
var deepCopy = function(obj) {
	if(typeof obj !== 'object') return 
  var newObj = obj instanceof Array ? [] : {}
	for(var key in obj) {
		if(obj.hasOwnProperty(key)) {
			newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
		}
	}
	return newObj
}

