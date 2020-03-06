# 对象

声明对象的2种方式，两种方式创建都是一样的，字面量的方式定义更简洁，比较常用

- 字面量定义对象

``` js
var myObj = {
  key: value
}
```

- 用关键字new 来构造一个对象

```js
var myObj = new Object()
myObj.key = value
```

用new关键字创建出来的都是对象

``` js
var str = 'this is a str'

typeof str  // 'string'
str instanceof String  // false

var strobj = new String('this is a string')

typeof strobj // 'object'
strobj instanceof String // true
Object.prototype.toString.call(strobj)  // [object Object]
```

获取对象中属性的值，有2种方式，`.`的方式，`对象.属性` 另外一种是用中括号`[]`，需要注意的是，中括号内的属性名需要用引号引起来，如果不用引号引起来，这时候传递进来的则是一个对象

``` js
var myobj = {
  a: 10
}

myobj.a  // 10
myobj['a'] // 10
```

``` js
var b = true
var myobj = {
  a: 21
}
var idx
if(b) {
  idx = "a"
}

console.log(myobj[idx]) // 21
```

这个例子传进来的就是一个对象，因为对象的值和myobj对象里的属性key是一样的，所以，打印出来的值是 21

``` js
var myobj = {}

myobj[true] = 'foo'
myobj[2] = 'bar'
myobj[myobj] = 'baz'

// 同下面的是一样的
myobj["true"] = 'foo'
myobj["2"] = 'bar'
myobj["[object Object]"] = 'baz'

var prefix = 'my'
var myobj = {
  [prefix + 'foo']: 'oh my god',
  [prefix + 'boo']: 'oh my goodnees'
}

myobj['myfoo'] // "oh my god"
myobj['myboo'] // "oh my goodnees"
```

#### 对象的引用

``` js
function foo() {
  console.log('foo')
}

var myFoo = foo   // 引用foo

var myobj = {
  myFoo: foo
}

console.log(foo)   // function foo() {}
console.log(muFoo) // function foo() {}
console.log(myobj.myFoo) // function foo() {}
```

上面的3个引用都是指向了同一个函数，但是要区别myFoo 和 myobj.myFoo之间是没有联系的，
myobj.myFoo是myobj里的一个对象，这个对象直接引用了foo()函数，而不是myobj引用myFoo的关系

#### 复制对象

``` js

var func () {}
var obj = {
  a: false
}
var arr = []

var myobj = {
  a: 12,
  b: obj,
  c: arr,
  d: func
}

arr.push(obj, myobj)
```

这个对象的复制将陷入死循环中

**`Object.assign`** 复制对象

``` js
var newobj = Object.assign({}, myobj)
newobj.a  // 12
newobj.b === obj // true
newobj.c === arr // true
newobj.d === func //true
```

#### 属性描述符

``` js
var myobj = {
  a: 21
}

Object.getOwnPropertyDescriptor(myobj, 'a')
// {value: 21, writable: true, enumerable: true, configurable: true}

myobj.a  // 21
```

`writable: tre`  可写的
`enumerable: true` 可列举的，可枚举的
`configurable: true` 可配置的

``` js
var myobj = {}

Object.defineProperty(myobj, 'a', {
  value: 21,
  writable: true,
  configurable: true,
  enumerable: true
})

myobj.a // 21
```

``` js
var myobj = {}

Object.defineProperty(myobj, 'a', {
  value: 21,
  writable: false, // 将对象的可写属性设置为false
  configurable: true,
  enumerable: true
})

myobj.a = 31
myobj.a  // 21
```

将对象的可写属性设置为false时，将不能修改对象的属性值

``` js

'use strict'
var myobj = {}

Object.defineProperty(myobj, 'a', {
  value: 21,
  writable: false, // 将对象的可写属性设置为false
  configurable: true,
  enumerable: true
})

myobj.a = 31 // TypeError
```

如果在严格模式下，对象属性设置为`false`时，修改对象的属性控制台将会报错`TypeError`

``` js
var myobj = {
  a: 21
}

myobj.a = 22
myobj.a // 22

Object.defineProperty(myobj, 'a', {
  value: 24,
  writable: true,
  configurable: false, // 不允许配置
  enumerable: true
})

myobj.a // 24
myobj.a = 25
myobj.a  // 25

Object.defineProperty(myobj, 'a', {
  value: 26,
  writable: true,
  configurable: true,
  enumerable: true
})  // TypeError
```

当你修改`configurable: false`时，对象的值还是可以修改的，但是如果你尝试将
`configurable`修改为`true`时，会给你一个错误提示，不论是在严格模式还是非严格模式下。因为`configurable`是单向操作的，修改为`false`之后，就不能在改回来了

``` js
var myobj = {
  a: 21
}
myobj.a // 21
delete myobj.a
myobj.a // undefined

Object.defineProperty(myobj, 'a', {
  value: 22,
  writable: true,
  configurable: false,
  enumerable: true
})

myobj.a // 22
delete myobj.a
myobj.a // 22
```

当你把`configurable`的值置为`false`时，将无法删除此属性

#### Prevent Extensions 阻止对象扩展

``` js
var myobj = {
  a: 22
}

Object.preventExtensions(myobj)

myobj.b = 33
myobj.b // undefined

```

`preventExtensions`将无法给对象添加属性

#### Get

``` js
var myobj = {
  a: 22
}

myobj.a // 22

myobj.b // undefined

var myobj2 = {
  a: undefined
}

myobj2.a // undefined
myobj2.b // undefined
```

``` js
var myobj = {
  // define a getter for `a`
  get a() {
    return 2;
  }
};

Object.defineProperty(myobj,  // target
  "b",  // property name
  {     // descriptor
    // define a getter for `b`
    get: function(){ return this.a * 2 },

    // make sure `b` shows up as an object property
    enumerable: true
  }
);

myobj.a; // 2

myobj.b; // 4
```

``` js
var myobj = {
  get a() {
    return 22
  }
}

myobj.a = 33
myobj.a  // 22
```

对象的`get a()` 只能获取

``` js
var myobj = {
  get a() {
    return this._a_
  },

  set a(val) {
    this._a_ = val * 2
  }
}

myobj.a =  22
myobj.a // 44
```

### 判断属性是否属于该对象

``` js
var myobj = {
  a: 22
}

'a' in myobj // true
'b' in myobj // false

myobj.hasOwnProperty('a') // true
myobj.hasOwnProperty('b') // false
```

``` js
var myobj = {}

Object.defineProperty(myobj, 'a', {
  value: 22,
  enumerable: true
})

Object.defineProperty(myobj, 'b', {
  value: 33,
  enumerable: false
})

myobj.b = 34
myobj.b // 34

'b' in myobj // true
myobj.hasOwnProperty('b') // true


for(var k in myobj) {
  console.log(k, myobj[k]) // 'a' 22
}
```

当enumerable值为false的时候，我们将无法通过遍历获取对象的key 和 value

``` js
var myobj = {}

Object.defineProperty(myobj, 'a', {
  enumerable: true,
  value: 22
})

Object.defineProperty(myobj, 'b', {
  enumerable: false,
  value: 33
})

myobj.propertyIsEnumerable('a') // true
myobj.propertyIsEnumerable('b') // false

Object.keys(myobj) // ['a']
Object.getOwnPropertyNames(myobj) // ['a', 'b']

```

`for` 和 `for-in` 和 `for-of`的使用

``` js
for(var i = 0; i < 5; i++) {
  console.log(i)
}

for(var k in myobj) {
  console.log(k, myobj[k])
}

for(var v of [1, 2, 5]) {
  console.log(v);
}
```

``` js
var arr = [1, 2, 4]
var it = arr[Symbol.iterator]()

it.next() // {value: 1, done: false}
it.next() // {value: 2, done: false}
it.next() // {value: 4, done: false}
it.next() // {value: undefined, done: true}
```

``` js
var myobj = {
  a: 2,
  b: 3
}

Object.defineProperty(myobj, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function() {
    var o = this
    var idx = 0
    var ks = Object.keys(o)
    return {
      next: function() {
        return {
          value: o[ks[idx++]],
          done: (idx > ks.length)
        }
      }
    }
  }
})

// iterate `myobj` manually
var it = myobj[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }

// iterate `myobj` with `for..of`
for (var v of myobj) {
  console.log( v );
}
// 2
// 3
```

插入随机小数

``` js
var random = {
  [Symbol.iterator]: function() {
    return {
      next: function() {
        return {
          value: Math.random()
        }
      }
    }
  }
}

var randoms_pool = []
for(var n of randoms) {
  randoms_pool.push(n)

  if(randoms_pool.length === 50) break
}

```

### 继承

子类继承父类都属性和功能

#### 属性继承

调用父类的构造函数call

``` js
function Master (school, skill) {
  this.school = school
  this.skill = skill
}
Master.prototype.showMenpai = function() {
  alert(this.school +','+ this.skill)
}

function Student(school, skill, level) {
  Master.call(this, school, skill)
  this.level = level
}

var mb = new Student('昆仑派', '龙抓手')

```

#### 方法继承 `for...in`

``` js
extend(Master.showMenpai, Student.showMenpai)

Student.prototype.showMenpai = function() {}

var sb = new Student('昆仑派', '龙抓手', 1)

function extend(new, old) {
  for(attr in old) {
    new[attr] = old[attr]
  }
}
```

#### 类式继承

``` js
function Father() {
  this.anme = [1, 2, 3]
}
Father.prototype.showInfo = function() {
  alert(this.name)
}

function Children() {
  Father.call(this)
}

var F = function() {}
F.prototype = Father.prototype


Children.prototype = new F()

var child = new Children()
child.name.push(4)

```

#### 原型继承

``` js
  var objA() {
    name: 'hello'
  }
  var b = cloneObj(objA)
  b.name = 'world'

  function cloneObj(obj) {
    var F = function() {}
    F.prototype = obj
    return new F
  }
```
