# Prototype

判断实例的关系

```bash
var f = new Foo()
console.log(f instanceof Foo) // true
```

判断构造函数是否是某个对象的构造原型函数的通用方法

```bash
function instanceOf(object, constructor) {
  if(object != null) {
    if(object == constructor.prototype) {
      return true
    }
    if(typeof object == 'xml') {
      return object.prototype = XML.prototype
    }

    object = object.__proto__
  }
  return false
}
```

检查对象的类型是否为 "xml" 的目的在于解决新近版本的 JavaScript 中表达 XML 对象的特异之处

### 构造器中的全局信息

在构造器中设置全局信息要小心, 这里有坑

```bash
var idCounter = 1
function Employee(name, dept) {
  this.name = name || ''
  this.dept = dept || 'general'
  this.id = this.idCounter++
}

var victoria = new Employee("Pigbert, Victoria", "pubs")
var harry = new Employee("Tschopik, Harry", "sales")
```

上面的代码没有问题，victoria 的 id 为2, harry id 为  3

但是，请注意，每次在设置原型的时候，`Employee`构造器都会被调用

```bash
var idCounter = 1

function Employee(name, dept) {
  this.name = name || ''
  this.dept = dept || ''
  this.id = idCounter++
}

function Manager (name, dept, reports) {...}
Manager.prototype = new Employee;

function WorkerBee (name, dept, projs) {...}
WorkerBee.prototype = new Employee;

function Engineer (name, projs, mach) {...}
Engineer.prototype = new WorkerBee;

function SalesPerson (name, projs, quota) {...}
SalesPerson.prototype = new WorkerBee;

var mac = new Engineer("Wood, Mac");

mac.id // 5
```

要解决上面的问题，可以在id自增的时候，判断是否传入名字

```bash
function Employee(name, dept) {
  this.name = name || ''
  this.dept = dept || ''
  if(name) {
    this.id = idCounter++
  }
}
```

继承与原型链

#### 继承属性

```js
// 让我们假设我们有一个对象 o, 其有自己的属性 a 和 b：
// {a: 1, b: 2}
// o 的 [[Prototype]] 有属性 b 和 c：
// {b: 3, c: 4}
// 最后, o.[[Prototype]].[[Prototype]] 是 null.
// 这就是原型链的末尾，即 null，
// 根据定义，null 没有[[Prototype]].
// 综上，整个原型链如下:
// {a:1, b:2} ---> {b:3, c:4} ---> null

console.log(o.a); // 1
// a是o的自身属性吗？是的，该属性的值为1

console.log(o.b); // 2
// b是o的自身属性吗？是的，该属性的值为2
// 原型上也有一个'b'属性,但是它不会被访问到.这种情况称为"属性遮蔽 (property shadowing)"

console.log(o.c); // 4
// c是o的自身属性吗？不是，那看看原型上有没有
// c是o.[[Prototype]]的属性吗？是的，该属性的值为4

console.log(o.d); // undefined
// d是o的自身属性吗？不是,那看看原型上有没有
// d是o.[[Prototype]]的属性吗？不是，那看看它的原型上有没有
// o.[[Prototype]].[[Prototype]] 为 null，停止搜索
// 没有d属性，返回undefined
```

#### 继承方法

```js
var o = {
  a: 2,
  m: function(){
    return this.a + 1;
  }
};

console.log(o.m()); // 3
// 当调用 o.m 时,'this'指向了o.

var p = Object.create(o);
// p是一个继承自 o 的对象

p.a = 4; // 创建 p 的自身属性 a
console.log(p.m()); // 5
// 调用 p.m 时, 'this'指向 p.
// 又因为 p 继承 o 的 m 函数
// 此时的'this.a' 即 p.a，即 p 的自身属性 'a'
```

#### 语法结构创建的对象

```js
var o = {a: 1};

// o 这个对象继承了Object.prototype上面的所有属性
// o 自身没有名为 hasOwnProperty 的属性
// hasOwnProperty 是 Object.prototype 的属性
// 因此 o 继承了 Object.prototype 的 hasOwnProperty
// Object.prototype 的原型为 null
// 原型链如下:
// o ---> Object.prototype ---> null

var a = ["yo", "whadup", "?"];

// 数组都继承于 Array.prototype
// (Array.prototype 中包含 indexOf, forEach等方法)
// 原型链如下:
// a ---> Array.prototype ---> Object.prototype ---> null

function f(){
  return 2;
}

// 函数都继承于Function.prototype
// (Function.prototype 中包含 call, bind等方法)
// 原型链如下:
// f ---> Function.prototype ---> Object.prototype ---> null
```

#### 构造器创建的对象

```js
function Graph() {
  this.vertices = []
  this.edges = []
}

Graph.prototype = {
  addVertex: function(v) {
    this.vertices.push(v)
  }
}

var g = new Graph()
// g是生成的对象,他的自身属性有'vertices'和'edges'.
// 在g被实例化时,g.[[Prototype]]指向了Graph.prototype.
```

#### `Object.create` 创建的对象

ECMAScript 5 中引入了一个新方法：`Object.create()`。可以调用这个方法来创建一个新对象。新对象的原型就是调用 create 方法时传入的第一个参数
```js
var a = { o: 1 }
// a --> Object.prototype --> null

var b = Object.create(a)
// b --> a --> Object.prototype --> null

var c = Object.create(b)
// c --> b --> a --> Object.prototype --> null

var d = Object.create(null)
// d --> null
console.log(d.hasOwnProperty) // undefined  因为d没有继承Object.prototype
```

#### 性能

在原型链上查找属性比较耗时，对性能有副作用，这在性能要求苛刻的情况下很重要。另外，试图访问不存在的属性时会遍历整个原型链。

遍历对象的属性时，原型链上的每个可枚举属性都会被枚举出来。要检查对象是否具有自己定义的属性，而不是其原型链上的某个属性，则必须使用所有对象从Object.prototype继承的 `hasOwnProperty` 方法。下面给出一个具体的例子来说明它：

```js
console.log(g.hasOwnProperty('vertices')) // true

console.log(g.hasOwnProperty('abc')) // false

console.log(g.hasOwnProperty('addVertex')) // false

console.log(g.__proto__.hasOwnProperty('addVertex')) // true
```

hasOwnProperty 是 JavaScript 中唯一处理属性并且不会遍历原型链的方法。

#### 错误实践：扩展原生对象的原型

```bash
function A(a){
  this.varA = a;
}

// 以上函数 A 的定义中，既然 A.prototype.varA 总是会被 this.varA 遮蔽，
// 那么将 varA 加入到原型（prototype）中的目的是什么？
A.prototype = {
  varA : null,

/*
既然它没有任何作用，干嘛不将 varA 从原型（prototype）去掉 ?
也许作为一种在隐藏类中优化分配空间的考虑 ?
https://developers.google.com/speed/articles/optimizing-javascript
如果varA并不是在每个实例中都被初始化，那这样做将是有效果的。
*/

  doSomething : function(){
    // ...
  }
}

function B(a, b){
  A.call(this, a);
  this.varB = b;
}
B.prototype = Object.create(A.prototype, {
  varB : {
    value: null,
    enumerable: true,
    configurable: true,
    writable: true
  },
  doSomething : {
    value: function(){ // 重写
      A.prototype.doSomething.apply(this, arguments);
      // call super
    },
    enumerable: true,
    configurable: true,
    writable: true
  }
});
B.prototype.constructor = B;

var b = new B();
b.doSomething();
```

**prototype和Object.getPrototypeOf**
像上面的例子中，如果你执行var a1 = new A(); var a2 = new A(); 那么 a1.doSomething事实上会指向Object.getPrototypeOf(a1).doSomething，它就是你在 A.prototype.doSomething 中定义的内容。也就是说：Object.getPrototypeOf(a1).doSomething == Object.getPrototypeOf(a2).doSomething == A.prototype.doSomething。

```bash
Object.getPrototypeOf(a1).doSomething == Object.getPrototypeOf(a2).doSomething == A.prototype.doSomething。
```

```bash
var obj = new Foo()
```

上面这句代码等同于

```bash
var obj = new Object()
obj.__proto__ = Foo.prototype
Foo.call(obj)
```

当执行

```bash
obj.name()
```

它检查obj是否具有name属性。如果没有，它会查找 Object.getPrototypeOf(obj).name，如果仍旧没有，它会继续查找 Object.getPrototypeOf(Object.getPrototypeOf(obj)).name。

```js
// 雇员原型
function Employee() {
  this.name = ''
  this.dept = 'general'
}

// 管理原型
function Manager() {
  Employee.call(this)
  this.reports = []
}

Manager.prototype = Object.create(Employee.prototype)

function WorkerBee() {
  Manager.call(this)
  this.projects = []
}

WorkerBee.prototype = Object.create(Manager.prototype)

function SalesPerson() {
  WorkerBee.call(this)
  this.dept = 'sales'
  this.quota = 100
}

SalesPerson.prototype = Object.create(WorkerBee.prototype)

function Engineer() {
  WorkerBee.call(this)
  this.dept = 'engineering'
  this.machine = ''
}

Engineer.prototype = Object.create(WorkerBee.prototype)

var jim = new Employee()
console.log(jim.name) // ''
console.log(jim.dept) // 'general'

var sally = new Manager()
sally.name  // ''
sally.dept  // 'general'
sally.reports // []

var mark = new WorkerBee()
mark.name // ''
mark.dept // 'general'
mark.projects // []

var fred = new SalesPerson()
fred.name // ''
fred.dept // 'sales'
fred.projects  // []
fred.quota // 100

var john = new Engineer()
john.name // ''
john.dept // 'engineering'
john.reports // []

// 更灵活的构造器
function Employee(name, dept) {
  this.name = name || ''
  this.dept = dept || 'general'
}
```
