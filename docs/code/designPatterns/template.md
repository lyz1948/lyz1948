# 模板方法模式

```js
var Beverage = function() {}

Beverage.prototype.boilWater = function() {
  console.log('把水煮沸')
}

Beverage.prototype.brew = function() {
  // 空方法，由子类重写
  throw new Error('子类必须重写 brew 方法')
}

Beverage.prototype.pourInCup = function() {
  // 空方法，由子类重写
  throw new Error('子类必须重写 brew 方法')
}

Beverage.prototype.addCondiments = function() {
  // 空方法，由子类重写
  throw new Error('子类必须重写 brew 方法')
}

Beverage.prototype.customerWantCondiments = function() {
  // 默认需要调料
  return true
}

Beverage.prototype.init = function() {
  this.boilWater()
  this.brew()
  this.pourInCup()
  if (this.customerWantCondiments()) {
    this.addCondiments()
  }
}

// 创建咖啡类
var Coffee = function() {}
Coffee.prototype = new Beverage()

Coffee.prototype.brew = function() {
  console.log('用沸水冲泡咖啡')
}

Coffee.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子')
}

Coffee.prototype.addCondiments = function() {
  console.log('加糖和牛奶')
}

Coffee.prototype.customerWantCondiments = function() {
  window.confirm('请问需要调料吗？')
}

var coffee = new Coffee()
coffee.init()

// 创建茶类

var Tea = function() {}
Tea.prototype = new Beverage()

Tea.prototype.brew = function() {
  console.log('用沸水泡茶')
}

Tea.prototype.pourInCup = function() {
  console.log('把茶水倒进杯子')
}

Tea.prototype.addCondiments = function() {
  console.log('加🍋')
}

var tea = new Tea()
tea.init()
```

真的需要继承吗？

```js
var Beverage = function(param) {
  var boilWater = function() {
    console.log('把水煮沸')
  }

  var brew =
    param.brew ||
    function() {
      throw new Error('必须传递 brew 方法')
    }

  var pourInCup =
    param.pourInCup ||
    function() {
      throw new Error('必须传递 pourInCup 方法')
    }

  var addCondiments =
    param.addCondiments ||
    function() {
      throw new Error('必须传递 addCondiments 方法')
    }

  var F = function() {}

  F.prototype.init = function() {
    boilWater()
    brew()
    pourInCup()
    addCondiments()
  }
  return F
}

var Coffee = Beverage({
  brew: function() {
    console.log('用沸水冲咖啡')
  },
  pourInCup: function() {
    console.log('把咖啡倒杯子')
  },
  addCondiments: function() {
    console.log('加牛奶和糖')
  },
})
var Tea = Beverage({
  brew: function() {
    console.log('用沸水泡茶')
  },
  pourInCup: function() {
    console.log('把茶倒杯子')
  },
  addCondiments: function() {
    console.log('加🍋')
  },
})

var coffee = new Coffee()
coffee.init()

var tea = new Tea()
tea.init()
```
