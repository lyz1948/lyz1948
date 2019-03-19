# `Class` 类

### 构造函数Constructor

``` js
class CoolGuy {
  specialTrick = nothing

  CoolGuy(trick) {
    specialTrick = trick
  }

  showOff() {
    output("Here's my trick", specialTrick)
  }
}

var John = new CoolGuy('bmw')
John.showOff()
```

### 类的继承

``` js
// 交通工具类
class Vehicle {
  engine = 1

  ignition() {
    output('turning on my engine')
  }

  drive() {
    ignition()
    output('Steering and moving forward')
  }
}

// 汽车类
class Car inherits Vehicle {
  wheels = 4

  drive() {
    inherited: drive()
    output('Rolling on all', wheels, 'whells')
  }
}

// 游船类
class SpeedBoat inherits Vehicle {
  engines = 2

  ignition() {
    output('truning on my', engines, 'engines')
  }

  pilot() {
    inherited: drive()
    output('Speeding through the water with ease')
  }
}
```

汽车与游船都属于交通工具类，同时都有引擎，汽车可能只有1个，轮船有可能有2个，这是不同的地方，但它们共同的地方是，开动之前都需要先发动引擎，还有drive是所有交通类都有的，所以单独出来，作为父类，让其他交通工具类来继承。

javascript的类是ES6才具有的，在此前的版本根本没有类的说法，那怎么样能实现继承呢？
用拷贝的方式来实现类似继承的效果。

``` js
function mixin(sourceObj, targetObj) {
  for(var key in sourceObj) {
    if(!(key in targetObj)) {
      targetObj[key] = sourceObj[key]
    }
  }

  return targetObj
}

var Vehicle = {
  engines: 1,
  ignition: function() {
    console.log('发动引擎');
  },
  drive: function() {
    this.ignition()
    console.log('驾驶前进');
  }
}

var Car = mixin(Vehicle, {
  wheels: 4,
  drive: function() {
    Vehicle.drive.call(this)
    console.log('开着' + whells + '个轮子的汽车');
  }
})

```

### 寄生继承

``` js
// 传统面向对象的写法
function Vehicle() {
  this.engines = 1
}

Vehicle.prototype.ignition = function() {
  console.log('发动我的引擎');
}

Vehicle.prototype.drive = function() {
  this.ignition()
  console.log('驾驶前进');
}

function Car() {
  var car = new Vehicle()

  car.wheels = 4

  var vehDrive = car.drive

  car.drive = function() {
    vehDrive.call(this)
    console.log('驾驶着我的'+this.wheels+'个轮子的汽车');
  }

  return car
}

var myCar = new Car()
myCar.drive()
```

### 隐私继承

``` js
var Soldier = {
  count: function() {
    this.name = '我的一名士兵'
    this.number = this.number ? this.number+1 : 1
  }
}

Soldier.count()
Soldier.name
Soldier.number // 1

var Another = {
  count: function() {
    Soldier.count.call(this)
  }
}

Another.count()
Another.name
Another.number // 1
```
