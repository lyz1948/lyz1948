// typeof
// JavaScript 共六种数据类型，分别是：
// Undefined、Null、Boolean、Number、String、Object
console.log(typeof 'abc') // string
function fn() {}
console.log(typeof fn) // function
var date = new Date()
console.log(typeof date) // object
var re = new RegExp()
console.log(typeof re) // object
var err = new Error()
console.log(typeof err) // object
console.log(typeof new String('abc')) // object
// 日期类型，错误类型，正则，函数，new关键字的字符串等都是object,如何区分？
// Object.prototype.toString 来区分
var toString = Object.prototype.toString

console.log(toString.call(undefined))  // [object Undefined]
console.log(toString.call(null))  // [object Null]
console.log(toString.call(date)) // [object Date]
// 用 Object.prototype.toString 方法识别出更多类型
var number = 1 // [object Number]
var string = 'xyz' // [object String]
var boolean = true // [object Boolean]
var unDef = undefined // [object Undefined]
var nul = null // [objcet Null]
var array = [1, 2, 3] // [object Array]
var date = new Date() // [object Date]
var error = new Error() // [object Error]
var reg = /^\s/g // [object RegExp]
var fn = function fn() {} // [object Function]

function getType() {
	for(var i = 0; i < arguments.length; i++) {
		console.log(Object.prototype.toString.call(arguments[i]))
	}
}
getType(number, string, boolean, unDef, nul, array, date, error, reg, fn)

console.log(Object.prototype.toString.call(Math)) // [object Object]
console.log(Object.prototype.toString.call(JSON)) // [object JSON]

function func() {
	console.log(Object.prototype.toString.call(arguments))
}
func() // [object Arguments]
var class2type = {}
'Boolean Number String Function Array Date RegExp Object Error Null Undefined'.split(' ').map(function(item) {
	class2type['[object ' + item + ']'] = item.toLowerCase()
})

function type(obj) {
	return typeof obj === 'object' || typeof obj === 'function' 
	? class2type[Object.prototype.toString.call(obj)] || 'object' 
	: typeof obj
}

var Type = {}
for(var i = 0, type; type = ['Boolean' 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error', 'Null', 'Undefined'][i++];) {
	(function(type) {
		Type['is' + type] = function(obj) {
			return Object.prototype.toString.call(obj) === '[object ' + type + ']'
		}
	})(type)
}
Type.isArray([]) // true
Type.isString('string') // true

// 改进代码
var class2type = {}

'Boolean Number String Function Array Date RegExp Object Error Null Undefined'.split(' ').map(function(item) {
	class2type['[object ' + item + ']'] = item.toLowerCase()
})
function type(obj) {
	// obj == null or obj == undefined
	if(obj == null) {
		return obj + ''
	}
	return typeof obj === 'object' || typeof obj === 'function'
		? class2type[Object.prototype.toString.call(obj)] || 'object'
		: typeof obj 
}

// isFunction
function isFunction(obj) {
	return type(obj) === 'function'
}

// isArray 
var isArray = Array.isArray || function (obj) {
	return type(obj) === 'array'
}

// plainObject 纯粹对象
var class2type = {}

// Object.prototype.toString
var toString = class2type.toString
// Object.prototype.hasOwnProperty
var hasOwn = class2type.hasOwnProperty

function isPlainObj(obj) {
	var proto, Ctor
	// 排除明显不是Obj的对象
	if(!obj || toString.call(obj) !== "[object Object]") {
		return false
	}
	/*
		getPrototypeOf es5 方法，获取 obj 的原型
		以 new Object 创建的对象为例的话
		obj.__proto__ === Object.prototype
	*/
	proto = Object.getPrototypeOf(obj)
	// 没有原型的对象是纯粹对象，Object.create(null) 得到的值为true
	if(!proto) {
		return true
	}

	/**
   * 以下判断通过 new Object 方式创建的对象
   * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
   * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
   */

   Ctor = hasOwn.call(proto, 'constructor') && proto.constructor

   // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
   return typeof Ctor === 'function' && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object)
   // hasOwn.toString.call(Ctor)，这个方法不是 Object.prototype.toString
   // console.log(hasOwn.toString.call(Ctor) == Object.prototype.toString.call(Ctor)) // false
}

// EmptyObject
function isEmptyObj(obj) {
	var name 
	for(name i obj) {
		return false
	}
	return true
}

// is Object
function isObject(obj) {
	return obj !== null && typeof obj === 'object'
}

console.log(isEmptyObj({})) // true
console.log(isEmptyObj([])) // true
console.log(isEmptyObj(null)) // true
console.log(isEmptyObj(undefined)) // true
console.log(isEmptyObj('')) // true
console.log(isEmptyObj(2)) // true
console.log(isEmptyObj(true)) // true

// is Window
function isWindow(obj) {
	return obj !== null && obj === obj.window
}

// isArrayLike
function isArrayLike(obj) {
	// obj必须有Length属性
	var length = !!obj && 'length' in obj && obj.length
	var typeRes = type(obj)

	if(typeRes === 'function' || isWindow(obj)) {
		return false
	}

	return typeRes === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length -1) in obj
}