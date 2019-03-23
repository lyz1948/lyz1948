// 数组扁平化

var arr = [1, 2, [3, 4]]
var res = flatten(arr)
// console.log(res) // [1, 2, 3, 4]

function flatten(arr) {
  var result = []

  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      retult = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }

    return result
  }
}

// toString方法

function flatten(arr) {
  return arr.toString().split(',').map(function(item) {
    return +item // 隐式转换 '1' => 1
  })
}


// reduce

function flatten(arr) {
  return arr.reduce(function(prev, cur) {
    return prev.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}


// ES6
function flatten(arr) {
  return [].concat(...arr) // 只能扁平一层
}

var arr = [1, [3, 4, [5, 6]]]

function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

// console.log(flatten(arr))


// undescore

/**
 * 数组扁平化
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow 是否只扁平一层
 * @param  {boolean} strict  是否严格处理元素，下面有解释
 * @param  {Array} output  这是为了方便递归而传递的参数
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */

function flatten(input, shallow, strict, output) {

  // 递归使用的时候会用到output
  output = output || []

  var idx = output.length

  for (var i = 0, len = input.length; i < len; i++) {

    var value = input[i]

    // 如果是数组，就进行处理
    if (Array.isArray(value)) {
      // 如果是只扁平一层，遍历该数组，依此填入 output
      if (shallow) {
        var j = 0,
          len = value.length
        while (j < len) output[idx++] = value[j++]
      }
      // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
      else {
        flatten(value, shallow, strict, output)
        idx = output.length
        
      }
    }
    // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
    else if (!strict) {
      output[idx++] = value
    }
  }

  return output
}

console.log(flatten(arr, true, false))