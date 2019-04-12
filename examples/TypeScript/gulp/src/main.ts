class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: {x: number, y: number;}) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor (public scale: number) { }
}

let grid1 = new Grid(2);  // 1x scale
let grid2 = new Grid(3);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

abstract class Department {
  constructor(public name: string) { }

  printName(): void {
    console.log('Department name: ' + this.name)
  }

  abstract printMeeting(): void // 该方法必须有子类自行实现

  // abstract generateReports(): void
}

class AccountDepartment extends Department {
  constructor() {
    super('Accounting and auditing')
  }
  printMeeting(): void {
    console.log('子类 printMetting')
  }
  generateReports(): void {
    console.log('子类 Generating accounting reports')
  }
}

let department: Department
// department = new Department() // error 不能创建抽象类型的实例
department = new AccountDepartment()
department.printName()
department.printMeeting()
department.generateReports() // error 该方法在抽象类中不存在

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