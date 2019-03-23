


// findIndex 

function findIndex(arr, fn, ctx) {
	for(var i = 0, len = arr.length; i < len; i++) {

		if(fn.call(ctx, arr[i], i, arr)) return i
	}

	return -1 
}

var arr = [1, 2, 3, 2, 4]
findIndex(arr, function(item, i, arr) {
	if(item == 3) return true
})


// findLastIndex

function findLastIndex(arr, fn, ctx) {
	for (var i = arr.length - 1; i >= 0; i--) {
		if(fn.call(ctx, arr[i], i, arr)) return i
	}

	return -1
}

findLastIndex(arr, function(item, i, arr) {
	if(item == 2) return true
})

// 优化合并 findIndex 与 findLastIndex

function createIndexFinder(dir) {
	return function(arr, fn, ctx) {
		var length = arr.length 
		var index = dir > 0 ? 0 : length - 1
		for(; index >= 0 && index < length; index += dir) {
			if(fn.call(ctx, arr[index], index, arr)) return index 
		}
		return -1
	}
}

var findIndex = createIndexFinder(1)
var findLastIndex = createIndexFinder(-1)

var res = findLastIndex(arr, function(item, i, arr) {
	if(item == 2) return true
})

console.log(res) 

// sortedIndex

function sortedIndex(arr, obj) {
	var low = 0
	var high = arr.length 
	while(low < high) {
		var mid = Math.floor((low + high) / 2)

		if(arr[mid] < obj) {
			low = mid + 1
		}
		else {
			high = mid
		}
	}
	return high
}


// 第二版
function cb(fn, context) {
  return function(obj) {
    return fn ? fn.call(context, obj) : obj;
  }
}

function sortedIndex(array, obj, iteratee, context) {

  iteratee = cb(iteratee, context)

  var low = 0,
    high = array.length;
  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    console.log(iteratee(array[mid]) )
    if (iteratee(array[mid]) < iteratee(obj)) low = mid + 1;
    else high = mid;
  }
  return high;
};

// stooges 配角 比如 三个臭皮匠 The Three Stooges
var stooges = [{ name: 'stooge1', age: 10 }, { name: 'stooge2', age: 30 }];

var result = sortedIndex(stooges, { name: 'stooge3', age: 20 }, function(stooge) {
  return stooge.age
});



// indexOf and lastIndexOf

function createIndexOfFinder(dir) {
	return function(arr, item) {
		var length = arr.length
		var index = dir > 0 ? 0 : length - 1

		for( ; index >= 0 && index < length; index += dir) {
			if(arr[index] == item) return index 
		}
		return -1 
	}
} 

var indexOf = createIndexOfFinder(1)
var lastIndexOf = createIndexOfFinder(-1)

result = lastIndexOf([1, 2, 3, 2, 4], 1)

console.log(result) 

// fromIndex 

function createIndexOfFinder(dir) {

  return function(array, item, idx) {
    var length = array.length;
    var i = 0;

    if (typeof idx == "number") {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(length + idx, 0);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    }

    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }
    return -1;
  }
}

var indexOf = createIndexOfFinder(1);
var lastIndexOf = createIndexOfFinder(-1);
