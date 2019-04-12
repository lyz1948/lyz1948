---
title: Class
sidebarDepth: 2
sidebar: false
---

## 类

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

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

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

### 私有属性

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