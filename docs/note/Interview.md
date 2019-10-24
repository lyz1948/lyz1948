# interview

## CSS

BFC 模式

BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响

触发 BFC 模式有多种方式：

- html 根元素
- float
- position 绝对定位
- overflow 不为 visible
- display 表格布局或弹性布局

主要作用：

- 清浮动
- 防止同一 BFC 容器中的相邻的 2 个元素外边距重叠问题

元素垂直居中的几种方式

- flex
- grid
- table
- 绝对定位 与 transform 结合
- 绝对定位 与 元素宽度一半的负 margin
- 伪元素选择器

隐藏元素的各种方法

- opacity
- visibility
- display

`opacity: 0`是改变元素的透明度，除了不可见外，元素渲染会占据空间，并且可以点击操作
占据空间：是
事件：可以点击
性能：只造成元素重绘，性能消耗较小
继承：支持，子元素不能通过`opacity:1`来显示

`visibility：hidden`让元素不可见，同样会被渲染与占据空间，无法触发点击事件
占据空间：是
事件：不能点击
性能：只造成元素重绘，性能消耗较小
继承：支持，子元素可以通过`visibility: visible`来取消隐藏

`dispaly: none`隐藏元素，不会占据空间，也不会渲染元素
占据空间：否
事件：不能点击
性能方面：会造成文档回流，读屏器不会读取该元素，性能消耗较大
继承：不支持

使用何种方式修改行间样式

<!-- 该元素不运行 -->

```html
<img src="myimg.jpg" style="width:600px!important;”>
```

- max-width: 360px
- transform: scale(0.6)
- setAttribute('style', 'width: 360px!important')
- animation 动画样式优先级高于!important

BFC/IFC/GFC/FFC 的概念

- BFC 模式 块级格式上下文
- IFC 内联格式上下文
- GFC 网格布局格式化上下文
- FFC 自适应格式上下文

解决移动端 1 像素问题

- 伪元素 + transform: scale(.5)
- 伪元素 + positioin + height
- background-image
- box-shadow

单行/多行文字溢出隐藏

```js
let str =
  '这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本是文本这是文本这是文本是文本这是文本这是文本是文本这是文本这是文本是文本这是文本这是文本是文本这是文本这是文本是文本这是文本这是文本是文本这是文本这是文本是文本这是文本这是文本是文本这是文本这是文本'
let box = document.getElementById('box')
H = box.offsetHeight
for (i = 0; i < str.length; i++) {
  box.innerHTML = str.substring(0, i)
  if (H < box.scrollHeight) {
    box.style.overflow = 'hidden'
    box.innerHTML = str.substring(0, i - 3) + '...'
    break
  }
}
```

## 如何解决模块循环依赖

## referer 和 origin 的区别

## 跨域

### 如何解决跨域？

## Node

### Event loop

## react

### react hooks

### React hoc 解决了什么？hoc 的方式是？

### react 主动创造还是被动？

### react16 新特性

## 浏览器

### url 到显示端经过的流程

## web worker 和 service worker 的区别以及 worker 如何与主线程交换？

## Javascript

### 节流与防抖

## canvas

### canvas 和 svg 的区别

## 移动端

### 长列表性能问题

### Safari 滑动结束才触发 scroll 事件如果解决？

### 从详情页返回列表页，有哪些方法可以定位到以前的状态？

## Http(s)

### 状态码

### https 原理

### get 和 post 的区别？post 代替 get 请求数据有什么劣势？

## 框架库比较

### vue 和 react 的异同

### vue 与 react 多次改变数据会重新渲染吗？ 为什么？

### webpack

- loader 和 plugin 的区别

- compilie 原理

- 按需加载

### babel

- babel 原理

- plugin 的作用和原理

### co, generator, async/await 的区别以及引用场景

## Vue

### Vue 依赖收集

## 前端攻击方式：xss, csrf,网络劫持

## esmodule 和 commonjs 的区别

## 实现一个 render 方法，将模板字符串替换为对象

```js
var greeting = 'My name is ${name}, age ${age}, I am a ${job.jobName}'
var employee = {
  name: 'XiaoMing',
  age: 11,
  job: {
    jobName: 'designer',
    jobLevel: 'senior',
  },
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
