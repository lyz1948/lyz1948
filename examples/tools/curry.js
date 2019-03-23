// var props = curry(function(key, obj) {
//  return obj[key]
// })
// var person = [{name: 'john'}, {name: 'jean'}]
// var name = person.map(props('name'))

// var curry = function(fn) {
//  var args = [].slice.call(arguments, 1)
//  console.log(args)
//  return function() {
//    var newArgs = args.concat([].slice.call(arguments))
//    return fn.apply(this, newArgs)
//  }
// }

// function add(a, b) {
//  return a + b
// }
// var addCurry = curry(add, 4, 6)
// var res = addCurry()
// // or
// var addCurry = curry(add, 4)
// var res = addCurry(6)
// // or
// var addCurry = curry()
// var res = addCurry(4, 6)


function sub_curry(fn) {
  var args = [].slice.call(arguments, 1)
  return function() {
    return fn.apply(this, args.concat([].slice.call(arguments)))
  }
}

function curry(fn, length) {
  length = length || fn.length
  var slice = Array.prototype.slice

  return function() {
    if (arguments.length < length) {
      var combined = [fn].concat(slice.call(arguments))
      return curry(sub_curry.apply(this, combined), length - arguments.length)
    } else {
      return fn.apply(this, arguments)
    }
  }
}

var func = curry(function(a, b, c) {
  return [a, b, c]
})

func('a', 'b', 'c')
func('a')('b', 'c')
func('a')('b')('c')

function sub_curry(fn) {
  return function() {
    return fn()
  }
}

function curry(fn, length) {
  length = length || 4
  return function() {
    if(length > 1) {
      return curry(sub_curry(fn), --length)
    }
    else {
      return fn()
    }
  }
}

