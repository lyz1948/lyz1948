# Class 类

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
