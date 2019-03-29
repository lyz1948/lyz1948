# interview

## 如何解决模块循环依赖

## referer和origin的区别

## 跨域

### 如何解决跨域？

## Node

### Event loop

## react

### react hooks

### React hoc解决了什么？hoc的方式是？

### react主动创造还是被动？

### react16新特性

## 浏览器

### url到显示端经过的流程

## web worker和service worker的区别以及worker如何与主线程交换？

## Javascript

### 节流与防抖

## canvas

### canvas和svg的区别

## 移动端

### 长列表性能问题

### Safari滑动结束才触发scroll事件如果解决？

### 从详情页返回列表页，有哪些方法可以定位到以前的状态？

## Http(s)

### 状态码

### https原理

### get和post的区别？post代替get请求数据有什么劣势？

## 框架库比较

### vue和react的异同

### vue与react多次改变数据会重新渲染吗？ 为什么？

### webpack

- loader和plugin的区别

- compilie原理

- 按需加载

### babel

- babel原理

- plugin的作用和原理

### co, generator, async/await的区别以及引用场景

## Vue

### Vue依赖收集

## 前端攻击方式：xss, csrf,网络劫持

## esmodule和commonjs的区别

## 实现一个 render 方法，将模板字符串替换为对象

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
