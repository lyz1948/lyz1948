// for 
var arr = [1, 2, '1', '2']
function unique(arr) {
	var res = []
	for(var i = 0, arrLen = arr.length; i < arrLen; i++) {
		for(var j = 0, resLen = res.length; j < resLen; j++) {
			if(arr[i] === resLen[j]) break
		}
		if(j === resLen) {
			res.push(arr[i])
		}
	}
	return res
}

function unique(arr) {
	for(var i = 0, arrLen = arr.length; i < arrLen; i++) {
		for(var j = i + 1; j < arrLen; j++) {
			if(arr[i] === arr[j]) {
				arr.splice(i, 1)
				j--
			}
		}
	}
}

// indexOf
function unique() {
	var res = []
	for(var i = 0, len = arr.length; i < len; i++) {
		var cur = arr[i]
		if(res.indexOf(cur) === -1) {
			res.push(cur)
		}
	}
	return res 
}

// sort
function unique(arr) {
	var res = []
	var sortedArr = arr.concat().sort()
	var seen 
	for(var i = 0, len = sortedArr.length; i < len; i++) {
		// 如果不是第一个或者相邻的元素不相同
		if(!i || seen != sortedArr[i]) {
			res.push(sortedArr[i])
		}
		seen = sortedArr[i]
	}
	return res
}

function unique(arr) {
	var res = []
	var seen = []
	for(var i = 0, len = arr.length; i < len; i++) {
		var val = arr[i]
		if(isSorted) {
			if(!i || seen !== val) {
				res.push(val)
			}
		}
		else if(res.indexOf(val) === -1){
			res.push(val)
		}
	}
	return res
}

function unique(arr, isSorted, iterate) {
	var res = []
	var seen = []
	for(var i = 0, len = arr.length; i < len; i++) {
		var val = arr[i]
		var computed = iterate ? iterate(val, i, arr) : val
		if(isSorted) {
			if(!i || seen !== computed) {
				res.push(val)
			}
			seen = computed
		}
		else if(iterate) {
			if(seen.indexOf(computed) === -1) {
				seen.push(computed)
				res.push(val)
			}
		}
		else if(res.indexOf(val) === -1) {
			res.push(val)
		}
	}
	return res 
}

// filter
var array = [1, 2, 1, 1, '1']
function unique(array) {
  var res = array.filter(function(item, index, array) {
    return array.indexOf(item) === index
  })
  return res
}
console.log(unique(array))

// Object
function unique(arr) {
	var obj = {}
	return arr.filter(function(item) {
		console.log(typeof item + JSON.stringify(item))
		return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
	})
}
var arr = [{value: 1}, {value: 1}, {value: 2}];
console.log(unique(arr))

// ES6 
var arr = [1, 2, 2, 1, 1, '1']

function unique(arr) {
	return Array.from(new Set(arr))
}
// or 
function unique(arr) {
	return [...new Set(arr)]
}
// or 
var unique = a => [...new Set(a)]

// or 
function unique(arr) {
	const seen = new Map()
	return arr.filter(a => !seen.has(a) && seen.set(a, 1))
}






