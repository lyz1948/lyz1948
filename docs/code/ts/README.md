# TypeScript

## 基本类型

### 布尔值

```js
let b: boolean = true
```

### 数字

```js
let decLiteral: number = 8
let hexDigt: number = 0xf00d
let binarayDigt: number = 0b1011
let octalDigt: number = 0o744
```

### 字符串

```js
let name: string = 'john'
let age: number = 20
let sentence: string = `Hello, my name is ${namge} nad my old year is ${age}`
```

### 数组

```js
let arr: number[] = [1, 2, 3, 4]
// or
let ary: Array<number> = [1, 2, 3]
```

### 元组 Tuple

```js
let x: [string, number]

x = ['hello', 112] // ok

x = [112, 'world'] // error

console.log(x[0].substr(1)) // ok
console.log(x[1].substr(1)) // Error

x[3] = 'typescript' // ok 当前赋值符合(string | number)类型

x[4] = false // error 当前赋值不在元组参数里
```

### 枚举

```js
enum Color { Red, Green, Blue, Yellow }

let c: Color = Color.Green

// or
enum Color { Red = 1, Green, Blue }
let colorName: string = Color[2]

console.log(colorName) // Green
```

### 任意值

```js
let anyVal: any = 5381
anyVal = 'myybe a string'
anyVal = true

anyVal.ifItExists() // ok
nayVal.toFixed() // ok

let list: any[] = ['abc', 123, false]

list[3] = 12
```

### 空值

```js
function warnUser(): void {
  alert('This is a warning message')
}
```

声明一个 void 类型的变量没有什么大用，因为你只能为它赋予 undefined 和 null

```js
let uneable: void = undefined
```

### Null 和 Undefined

```js
let u: undefined = undefined
let n: null = null
```

### Never

```js
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error('Something woring')
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
  while (true) {}
}
```

### Object

```js
declare function create(o: object | null): void

create({ prop: 0 }) // ok
create(null) // Ok
create(12) // Error
create('str') // Error
create(true) // Error
create(undefined) // Error
```

### 类型断言

```js
let sv: any = 'this is a string'
let slen: number = (sv as string).length

// or
let sv: any = 'this is a string'
let slen: number = (<string>sv).length
```

## 变量声明

### `var`声明

```js
var a = 42
```

函数内部定义变量

```js
function func() {
  var str = 'this is a string'

  return str
}
```

定义在函数内部

```js
function func() {
  var a = 20
  return function() {
    var b = a + 10
    return b
  }
}

var fn = func()
fn() // 30
```

可选参数 ?

```js
function fn(a: string, b?: string, c: string = 'lyz') {
  console.log(a, b, c)
}

fn('xx', 'yy', 'zz')
fn('xxx', 'yyy')
fn('xxxx')
```

spread 操作符

```js
function bar(...args) {
  console.log(...args)
}

bar(1, 2, 3)
bar(1, 2, 3, 4, 5)

function foo(a, b, c) {
  console.log(a, b, c)
}

var arr = [1, 2]
foo(...arr) // => 1, 2, undefined

var arr2 = [1, 2, 3, 4, 5]
foo(...arr2) // 1, 2, 3
```

generator 函数

```js
function* count() {
  var a = 1

  yield

  a++
}

const it = count()
it.next() // 1
it.next() // 2

function* getStockPrice(stock) {
  while (true) {
    yield Math.random() * 100
  }
}

let gp = getStockPrice()
let limitPirce = 30
let price = 100

while (price > limitPrice) {
  price = gp.next().value
  console.log(`price is ${price}`)
}

console.log('done')
```

## Class 类

```js
class Person {
  name

  info() {
    console.log(this.name)
  }
}

class Person {
  constructor(name: string) {
    this.name = name
  }

  eat() {
    console.log(this.name + 'is eatting')
  }
}

// public 关键字
class Person {
  constructor(public name: string) {
  }

  eat() {
    console.log(`${this.name} is eatting`)
  }
}

let p1 = new Person()

// extends 继承

class Employee extends Person {
  constructor(name: string, code: string) {
    super(name)
    this.code = code
  }

  code: string

  work() {
    super.eat()
    this.doWork()
  }
  private doWork() {
    console.log('start working')
  }
}
```

```js
class Person {
  name: string
  age: number
}
```

## 类的继承

```js
class Fruit {
  constructor(name: string) {
    this.name = name
  }
  buy(price: number = 0) {
    console.log(`this ${this.name} sale ${price} $`)
  }
}

class Apple extends Fruit {
  constructor(name: string) {
    super(name)
  }
  place() {
    console.log('产地富士康')
  }
}

const apple = new Apple('iphone')
apple.place()
apple.buy(2000)
apple.place()
```

```js
class Animal {
  name: string
  constructor(theName: string) {
    this.name = theName
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distanceInMeters = 10) {
    console.log('🐍')
    super.move(distanceInMeters)
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distanceInMeters = 40) {
    console.log('🐴')
    super.move(distanceInMeters)
  }
}

let sam = new Snake('Sammy the Python')
let tom: Animal = new Horse('Tommy the Palomino')

sam.move()
tom.move(34)
```

### 默认 public

```js
class Animal {
  public name: string
  public constructor(theName: string) {
    this.name = theName
  }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}
```

### 私有属性 private

```js
class Animal {
  private name: string
  constructor(theName: string) {
    this.name = theName
  }
}

const laifu = new Animal('Dog')
console.log(laifu.name) // 无法访问私有属性
```

### protected

```js
class Person {
  protected name: string
  protected constructor(name: string) {
    this.name = name
  }
}

class Employee extends Person {
  private department: string
  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and i work in ${this.department}`
  }
}

let joe = new Employee('Joe', 'Sales')
let lee = new Person('Lee')
```

### 存取器

```js
let passcode = 'typescript'

class Employee {
  private fullname: string

  get getFullName(): string {
    return this.fullname
  }

  set setName(newName: string) {
    if (passcode && passcode === 'typescript') {
      this.fullname = newName
    } else {
      console.log('no permission')
    }
  }
}

let employee = new Employee()
employee.fullName = "Bob Smith"
if (employee.fullName) {
  alert(employee.fullName)
}
```

### 静态属性

```js
class Grid {
  static origin = {x: 0, y: 0}
  calculateDistanceFromOrigin(point: {x: number; y: number;}) {
      let xDist = (point.x - Grid.origin.x)
      let yDist = (point.y - Grid.origin.y)
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
  }
  constructor (public scale: number) { }
}

let grid1 = new Grid(2.0)  // 2x scale
let grid2 = new Grid(3.0)  // 3x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}))
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}))
```

### 抽象类

```js
abstract class Animal {
  abstract makeSound(): void
  move(): void {
    console.log('roaming the earth')
  }
}

abstract class Department {
  constructor(public name: string) { }

  printName(): void {
    console.log('Department name: ' + this.name)
  }

  abstract printMeeting(): void // 改方法必须有子类自行实现
}

class AccountDepartment extents Department {
  constructor() {
    super('Accounting and auditing')
  }
  printMeeting(): void {
    console.log('子类 printMetting')
  }
  generateReport(): void {
    console.log('子类 Generating accounting reports')
  }
}

let department: Department
department = new Department() // error 不能创建抽象类型的实例
department = new AccountDepartment()
department.printName()
department.printMeeting()
department.generateReport()
```

### 构造函数

```js
class Greeter {
  static standarGreeting = 'Hello, there'
  greeting: string

  greet() {
    if (this.greeting) {
      return `Hello, ${this.greeting}`
    } else {
      return Greeter.standarGreeting
    }
  }
}

let greeter: Greeter
greeter = new Greeter()
console.log(greeter.greet())

let greeterMaker: typeof Greeter = Greeter
greeterMaker.standarGreeting = 'Hi, there!'

let greeter1: Greeter = new greeterMaker()
console.log(greeter1.greet())
```

### 类当接口

```js
class Point {
  x: number
  y: number
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 }
```

## Interface 接口

```js
interface  IPerson {
  name: string
  age: number
  job?: string
}

class Person {
  constructor(public config: IPerson) {

  }
}

var p = new Person({
  name: 'limin',
  age: 20,
  job: 'develop' // 不允许，接口没有定义
})

// 接口定义的方法，所有继承的类都必须实现该方法
interface Aminal {
  eat()
}

class Cat extends Animal {
  eat() {
    console.log('cat eat fish')
  }
}

class Dog extends Animal {
  eat() {
    console.log('dog eat bone')
  }
}
```

**只读属性**
只读属性只有第一次赋值的时候允许

```js
interface Position {
  readonly x: number,
  readonly y: number
}

const pos: Position = { x: 1, y: 2 }
pos.x = 10 // error

let num: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a

ro[0] = 10 // error
ro.push(5) // error
num = ro // error
```

类型断言

```js
interface squareConfig {
  color?: string
  width?: number
}

function createSquare(config: squareConfig) : { color: string, area: number } {

}

let square = createSquare({ colour: 'red', area: 100 })
```

参数传递的时候输入错误，会报错，使用类型断言判断

```js
let mySquare = createSquare({ width: 100, height: 200 } as squareConfig)
```

任意数量的属性

```js
interface SquareConfig {
  color?: string
  width?: number
  [propName: string]: any
}
```

### 函数类型

```js
interface searchFn {
  (source: string, subString: string): boolean;
}

let search: searchFn
search = function(source: string, subString: string) {
  let res = source.search(subString)
  return res > -1
}
```

函数类型的类型检查不需要与接口里定义的名字匹配

```js
let search: searchFn
search = function(src: string, sub: string): boolean {
  const res = src.search(sub)
  return res > -1
}
```

可索引的类型

```js
interface StringArray {
  [index: number]: string;
}

let mystr: StringArray
mystr = ['joe', 'bob']

let str = mystr[0]
```

类类型

```js
interface IClock {
  currentData: Date
  setTime(d: Date)
}

class Class implements IClock {
  currentDate: Date
  setTime(d: Date) {
    this.currentDate = d
  }

  constructor(h: number, m: number) { }
}
```

### 命名空间

```js
;(function(something) {
  something.foo = 123
})(something || (something = {}))

console.log(something)
// { foo: 123 }
;(function(something) {
  something.bar = 456
})(something || (something = {}))

console.log(something) // { foo: 123, bar: 456 }
```

上面的 IIFE 函数得到的结果，不是我们想要的

```js
namespace Utility {
  export function log(msg) {
    console.log(msg)
  }
  export function error(msg) {
    console.log(msg)
  }
}

Utility.log('Call me')
Utility.error('maybe')
```

### 类型兼容性

结构化类型系统的基本规则：如果 x 要兼容 y， 那么 y 至少具有与 x 相同的属性

```js
interface Named {
  name: string;
}

let x: Named

let y = { name: 'Peppa', location: 'Seattle' }
x = y
```

要检查 y 能否赋值个 x，编译器检查 x 中的每个属性，看是否能在 y 中也能找到对应的属性

检查函数参数时使用相同的规则：

```js
function greet(n: Named) {
  console.log(n.name)
}

greet(y)
```

### 类型推断

```js
let a = 3
```

变量 a 没有设置指定类型，typescript 会自动推断为数字类型，这种推断只发生在初始化变量和成员，在设置默认参数值和决定函数返回值时

最佳通用类型

```js
let x = [0, 1, null]
```

这里有 2 种类型选择，即`number`和`null`， 计算通用类型算法会考虑所有候选类型，并给出一个兼容所有的类型的值

```js
let zoo = [new Rhino(), new Elephant(), new Snake()]
```

我们期望程序推断 zoo 为 Animal[]类型，但是，数组里并没有 Animal 对象类型，因此不能自动推断出这个类型

```js
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()]
```

### 上下文类型

```js
window.onmousedown = mouseEvent => {
  // error
  console.log(mouseEvent.button)
}

window.onmousedown = (mouseEvent: any) => {
  // ok
  console.log(mouseEvent.button)
}
```

上下文归类会在很多情况下用到，通常包含函数参数，赋值表达式的右边，类型断言，对象成员和数组字面量和返回值语句。

```js
function createAnimal(): Animal {
  return [new Rhino(), new Elephant(), new Snake()]
}
```

`createAnimal`函数有 4 个候选类型： `Animal`, `Rhino`, `Elephant` 和 `Snake`, 当然，`Animal`会别作为最佳通用类型

## 函数

```js
function sum(x: number, y: number): number {
  return x + y
}

let sum = function(x: number, y: number): number {
  return x + y
}
```

### 完整函数类型

```js
let sum: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y
}

let snm: (baseVal: number, increment: number) => number = function(
  x: number,
  y: number
): number {
  return x + y
}
```

### 推断类型

```js
// 完整函数类型
let add = function(x: number, y: number): number {
  return x + y
}

// 按上下问归类
let myAdd: (baseVal: number, increment: number) => number = function(x, y) {
  return x + y
}
```

### 可选参数和默认参数

```js
function colors(first: string, last: string) {
  return first + ' ' + last
}

let res = colors('pink', 'olive') // ok
let res2 = colors('green') // error
let res2 = colors('yellow', 'blue', 'red') // error

function colors(first: string, last?: string) {
  return last ? first + ' ' + last : first
}

let res = colors('pink', 'olive') // ok
let res2 = colors('green') // ok
let res2 = colors('yellow', 'blue', 'red') // error
```

### 剩余参数

```js
function buildName(first: string, ...rest: string[]) {
  return `${first} ${rest.join('')}`
}

let employeeList = buildName('Joe', 'John', 'Jeery', 'May')

function buildNameFn: (first: string, ...rest: string[]) => string = buildName
```

### This

```js
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    return function() {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()
console.log(`card: ${pickedCard.card} of ${pickedCard.suit}`)
```

上面的函数会报错，找不到`this`，因为`createCardPicker`函数又返回了一个新函数，当把`cardPicker()`赋值给`pickedCard`后，函数里的`this`指向的是`window`,严格模式下为`undefined`

```js
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'dismonds'],
  cards: Array(52),
  createCardPicker: function() {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }
}

let cardPicker = dock.createCardPicker()
let pickedCard = cardPicker()
console.log(`card: ${pickedCard.card} of ${pickedCard.suit}`)
```

上面的`this`指向已经修正了，不过，`typescript`会给出一条警告，如果`tsconfig.json`里配置了`noImplicitThis`标记的话，它会指出`this.suits[pickedSuit]`里的 this 的类型为`any`

### `this` 参数

```js
function func(this: void) {

}
```

为`Card` 和 `Deck`创建接口

```js
interface Card {
  suit: string
  card: number
}

interface Deck {
  suits: string[]
  cards: number[]
  createCardPicker(this: Deck): () => Card
}

let deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function(this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickCard / 13)

      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickCard = cardPicker()

console.log(`card: ${pickedCard2.card} of ${pickedCard2.suit}`)
```

```js
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void) => void
}

class Handler {
  info: string
  onClickBind(this: void, e: Event) {
    this.info = e.message
  }
}

let uiElment: UIElement
const h = new Handler()
uiElment.addClickListener(h.onClickBind)
```

### 重载

```js
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

function pickCard(x: { suit: string; card: number }[]): number
function pickCard(x: number): { suit: string; card: number }
function pickCard(x): any {
  if (typeof x === 'object') {
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  } else if (typeof x === 'number') {
    let pickedSuit = Math.floor(x / 13)
    return { suit: suits[pickedSuit], card: x % 13 }
  }
}

let myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
]
let pickedCard1 = myDeck[pickCard(myDeck)]
console.log(`card: ${pickedCard1.card} of ${pickedCard1.suit}`)

let pickedCard2 = pickCard(20)
console.log(`card: ${pickedCard2.card} of ${pickedCard2.suit}`)
```

### 函数类型比较

```js
let x = (a: number) => 0
let y = (b: number, s: string) => 0

y = x // ok
x = y // error
```

x 赋值给 y 是成功的，只要 x 的每个参数能在 y 里找到对应的类型参数就可以，参数名字相同与否并无关系，只要类型相同即可。
但 y 赋值给 x 的时候出错了，因为 y 里的第二个参数，在 x 里并没有找到对应的类型参数

返回值判断

```js
let x = () => ({ name: 'Peppa' })
let y = () => ({ name: 'Peppa', location: 'England' })

x = y // ok
y = x // error
```

系统强制源函数的返回类型必须是目标函数返回值类型的子类型

### 函数参数的双向协变

```js
enum EventType { Mouse, Keyboard }

interface Event { timestamp: number }
interface MouseEvent extends Event { x: number, y: number }
interface KeyEvent extends Event { keyCode: number }

function listenEvent(eventType: EventType, handler: (n: Event) => void) {

})

// 不健全的，但用的很普遍
listenEvent(eventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y) )

// 不受欢迎的可靠的替代方案
listenEvent(eventType.Mouse, (e: Event) => console.log( (<MouseEvent>e).x + ',' + (<MouseEvent>e).y ))

listenEvent(eventType.Mouse, <(e: Event) => void> ((e: MouseEvent) => console.log(e.x + ',' + e.y)))

// 仍然不允许(明显错误)类型安全强制为完全不兼容的类型
listenEvent(EventType.Mouse, (e: number) => console.log(e))
```

## 泛型

```js
class Person {
  constructor(public name: string) {
    console.log('go')
  }
  intro() {
    console.log(this.name)
  }
}

class Employee extends Person {
  constructor(public name: string, code: string) {
    super(name)
    this.code = code
  }
  code: string
  work() {
    super.intro()
    this.doWork()
  }

  private doWork() {
    console.log('i am working')
  }
}

let workers: Array<Person> = []
workers[0] = new Person('zhaoyun')
workers[1] = new Employee('liuxiang')
workers[2] = 10 // 不允许放非person类的其他任何内容
```

### 创建一个泛型

```js
function identity<T>(arg: T): T {
  return arg
}

let output = identity < string > 'str'
let output = identity('str')
```

我们不需要使用`<>`来明确传入的类型，编译器会帮我们检查，根据传入类型在设置 T 的类型。如果编译器不能自动推断类型的话，在明确传入 T 的类型

```js
function identity<T>(args: T): T {
  return args
}

function logIdentity<T>(args: T): T {
  console.log(args.length) // 这里会报错
  return args
}
```

如果我们在不指定 args 类型的情况下，直接使用 args.length 会有问题，因为可能是数字或其他没有 length 属性的类型

```js
function logIdentity<T>(args: Array<T>): Array<T> {
  console.log(args.length)
}

function identity<T>(args: T): T {
  return args
}

let myIdentity: <T>(args: T) => T = identity

// 使用不同的泛型参数名
let myIdentity: <U>(args: U) => U = identity

// 使用带有调用签名的对象字面量
let myIdentity: { <T>(args: T): T } = identity
```

用泛型创建接口

```js
interface identityFn {
  <T>(args: T): T;
}

function identity<T>(args: T): T {
  return args
}

const myIdentity: identityFn = identity
```

把泛型参数当做接口的参数

```js
interface identityFn<T> {
  (args: T): T;
}

const myIdentity: identityFn<number> = identity
```

### 泛型类

```js
class Queue {
  private data = []
  push = item => this.data.push(item)
  pop = () => this.data.shift()
}
```

在上述代码中存在一个问题，它允许你推入任何类型至队列中，推出的时候也是任意类型，如下所示，但一个人推入一个 string 类型至队列中，但是使用者可能会认为队列里只有 number 类型

```js
class Queue {
  private data = []
  push = item => this.data.push(item)
  pop = () => this.data.shift()
}

const queue = new Queue()

queue.push(1)
queue.push('2') // push了不同类型，这将导致使用错误

// 一个使用者，走入了误区
console.log(queue.pop().toPrecision(1));
console.log(queue.pop().toPrecision(1)); // RUNTIME ERROR
```

```js
class QueueNumber {
  private data = []
  push = (item: number) => this.data.push(item)
  pop = (): number => this.data.shift()
}

const queue = new QueueNumber()

queue.push(10)
queue.push('20') // 提示无法push一个非数字类型的元素
```

上面的方式，解决了不允许 push 不同非 number 类型的元素到数组，如果我们希望创建字符串队列的时候，那就需要从新修改代码，这不符合开放封闭原则

```js
class Queue<T> {
  private data :T[] = []
  push = (item: T) => this.data.push(item)
  pop = (): T | undefined => this.data.shift()
}

const queue = new Queue<number>()

queue.push(10)
queue.push('9') // 只能push 数字类型的元素
```

```js
function reverse<T>(items: T[]): T[] {
  const res = []
  for (let i = items.length - 1; i >= 0; i--) {
    res.push(items[i])
  }
  return res
}

const arr = [1, 2, 3]
let reverseArr = reverse(arr)

reverseArr[0] = '1' // ❎
reverseArr = ['1', '3'] // ❌

reverseArr[0] = 1
reverseArr = [1, 3, 4]

class Utils {
  reverse<T>(items: T[]): T[] {
    const res = []
    for (let i = items.length - 1; i >= 0; i--) {
      res.push(items[i])
    }
    return res
  }
}
```

```js
const getJson = <T>(config: {
  url: string,
  headers?: {
    [key: string]: string
  }
}): Promise<T> => {
  const opts = {
    methods: 'GET',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(config.headers || {})
  }
  return fetch(config.url, opts).then < T > (res => res.json())
}
```

```js
export interface FetchData<T = any> {
  code: number
  result: T
  message: string
}

export function getUserInfo<T>() {
  return axios.get<FetchData<T>>('/path')
  .then(res => res.data)
  .catch(err => console.error(err))
}

interface User {
  name: string
  age: number
}

async function getUser() {
  const user = await getUserInfo<User>()
}
```

```js
class GenericFn<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericFn<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) {
  return x + y
}
```

使用 GenericNumber 类的方式非常的直观，限制该方法只能传入数字类型，同理，我们也可以传入字符串

```js
let myGenericString = new GenericFn<string>()
myGenericString.zeroValue = ''
myGenericString.add = function(x, y) {
  return x + y
}
console.log(myGenericString.add(myGenericString.zeroValue, 'hello'))
```

### 泛型的约束

```js
interface Lengthwise {
  length: number
}

function logIdentity<T extends Lengthwise>(args: T)： T {
  console.log(args.length)
  return arg
}

logIdentity(42) // 不允许， 数字类型没有length属性
logIdentity({
  length: 5,
  value: 'abc'
})
```

在泛型约束中使用类型参数

```js
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

let x = { a: 1, b: 2, c: 3 }

getProperty(x: 'b') // right
getProperty(x: 's') // error
```

使用类类型

```js
function factoryFn(c: { new(): T }): T {
  return new c()
}

class Beekeeper {
  hasMask: boolean
}

class Zookeeper {
  nametag: string
}

class Animal {
  numLegs: number
}

class Bee extends Animal {
  keeper: Beekeeper
}

class Lion extends Animal {
  keeper: Zookeeper
}

function createIntance<A extends Animal>(c: new () => A): A {
  return new c()
}

createIntance(Lion).keeper.nametag
createIntance(Bee).keeper.hasMask
```

## 枚举类型

## 数字枚举

```js
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
```

`Direction`是一个枚举类型，定义了`Up`的值为 1，其他的并没有定义，枚举类型会自动为其他成员赋值。`Up`的值为 1，`Down`的值为 2，`Left`的值为 3，`Right`的值为 4

```js
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

如果删除 Up 的值，那么现在 Up 的值为 0,其他值根据顺序依次递增

```js
enum Response {
  No = 0
  Yes = 1
}

function respond(recipient: string, message: Response): void {
  // ...
}

respond('princess carolin', Response.Yes)
```

### 字符串枚举

```js
eunm Direction {
  Up: 'UP',
  Down: 'DOWN',
  Left: 'LEFT',
  Right: 'RIGHT'
}
```

### 计算和常量成员

```js
enum E { x }

enum E1 { X, Y Z }

enum E2 {
  A = 1, B, C
}


enum FileAccess {
  // 常量成员
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // 计算成员
  G = 'abcd'.length
}
```

### 联合枚举成员的类型

```js
enum ShapeKind {
  Circle,
  Square
}

interface Circle {
  kind: ShapeKind.Circle
  radius: number
}

interface Square {
  kind: ShapeKind.Square
  sideLength: number
}

let c: Circle = {
  kind: ShapeKind.Square,
  // error
  radius: 25
}
```

### 运行时枚举

```js
enum E {
  X, Y, Z
}

function fn(obj: { X: number }) {
  return obj.X
}

fn(E)
```

### 反向映射

```js
enum Enum {
  A
}

let a = Enum.A
let nameOfA = Enum[a]

```

### 常量枚举

```js
const enum Enum {
  A = 1,
  B = A * 2
}

const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right
]

// 编译后生成的代码
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */]

```

### 外部枚举

```js
declare enum Enum {
  A = 1,
  B,
  C = 2
}
```

外部枚举和内部枚举的区别，正常情况下，没有初始化的方法成员被当成常数成员，而非常量成员没有初始化方法被当做需要计算的成员
