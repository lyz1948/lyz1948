# Interface 接口

接口定义

```js
interface  IPerson {
  name: string
  age: number
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

interface  IPerson {
  name: string
  age: number
  job?: string // 可选属性
}

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
let ro: ReadonlyArray<number> = num

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
