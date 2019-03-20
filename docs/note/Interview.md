# interview

实现一个 render 方法，将模板字符串替换为对象

```js
var greeting = 'My name is ${name}, age ${age}, I am a ${job.jobName}'
var employee = {
  name: 'XiaoMing',
  age: 11,
  job: {
    jobName: 'designer',
    jobLevel: 'senior'
  }
}
var result = greeting.render(employee)
console.log(result)
```

```js
// 方案一
String.prototype.render = function(obj) {
  return this.replace(/\$\{(\w+|\w+\.\w+)\}/g, match => {
    var keys = match
      .replace('${', '')
      .replace('}', '')
      .split('.')
    return keys.reduce((acc, cv) => acc[cv], obj)
  })
}

// 方案二
String.prototype.render = function(obj) {
  // 利用了ES6的解构、对象keys新方法，在函数内部解构并自动展开变量
  eval(`var {${Object.keys(obj).join(',')}} = obj`)
  // 利用eval使字符串直接作为ES6解析
  return eval('`' + this + '`')
}

// 方案三
String.prototype.render = function(obj) {
  with (obj) {
    return eval('`' + this + '`')
  }
}
```
