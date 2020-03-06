# 策略模式

策略模式计算奖金

```js
var strategies = {
  S: function(salary) {
    return salary * 4
  },
  B: function(salary) {
    return salary * 3
  },
  A: function(salary) {
    return salary * 2
  },
}
var calculateBouns = function(level, salary) {
  return strategies[level](salary)
}
calculateBouns('S', 10000)
```

下面这样的写法，你还看得出是策略模式吗？

```js
var S = function(salary) {
  return salary * 4
}
var B = function(salary) {
  return salary * 3
}
var A = function(salary) {
  return salary * 2
}

var calculateBouns = function(func, salary) {
  return func(salary)
}
calculateBouns(S, 10000)
```

##### 策略模式表单校验

策略对象

```js
var strategies = {
  isNonEmpty: function(value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength: function(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile: function(value, errorMsg) {
    let reg = /^1[3|5|8][0-9]{9}$/
    if (!reg.test(value)) {
      return errorMsg
    }
  },
}
```

Validator 类

```js
var validataFunc = function() {
  // 创建validator对象
  var validator = new Validator()

  // 添加校验规则
  validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空')
  validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位')
  validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确')

  // 获取校验结果
  var errorMsg = validator.start()

  // 返回结果
  return errorMsg
}

var Validator = function() {
  // 保存校验规则
  this.cache = []
}

Validator.prototype.add = function(dom, rule, errorMsg) {
  // 把strategy和参数分开
  var ary = rule.split(':')
  this.cache.push(function() {
    var strategy = ary.shift()
    ary.unshift(dom.value)
    ary.push(errorMsg)
    return strategies[strategy].apply(dom, ary)
  })
}

Validator.prototype.start = function() {
  for (var i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
    var errorMsg = validatorFunc()
    // 如果有错误消息，说明没通过，返回错误信息
    if (errorMsg) {
      return errorMsg
    }
  }
}
```

校验多个值

```js
Validator.prototype.add = function(dom, rules) {
  var self = this

  for (var i = 0, rule; (rule = rules[i++]); ) {
    ;(function(rule) {
      var strategyAry = rule.strategy.split(':')
      var errorMsg = rule.errorMsg

      self.cache.push(function() {
        var strategy = strategyAry.shift()
        strategyAry.unshift(dom.value)
        strategyAry.push(errorMsg)
        return strategies[strategy].apply(dom, strategyAry)
      })
    })(rule)
  }
}

var registerForm = document.getElementById('registerForm')

var validataFunc = function() {
  var validator = new Validator()

  validator.add(registerForm.userName, [
    { strategy: 'isNonEmpty', errorMsg: '用户名不能为空' },
    { strategy: 'minLength:6', errorMsg: '用户名长度不能小于6位' },
  ])

  validator.add(registerForm.password, [
    { strategy: 'minLength:6', errorMsg: '密码长度不能小于6位' },
  ])

  validator.add(registerForm.phoneNumber, [
    { strategy: 'isMobile', errorMsg: '手机号码格式不正确' },
  ])

  var errorMsg = validator.start()
  return errorMsg
}

registerForm.onsubmit = function() {
  var errorMsg = validataFunc()

  if (errorMsg) {
    return false
  }
}
```
