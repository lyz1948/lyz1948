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

**同源策略**

- Cookie、LocalStorage、indexDB
- DOM
- AJAX

3 个标签运行加载跨域请求

```html
- <img>
- <link>
- <script>
```

常见跨域场景：

1. 同域名 | yes
2. 同域名不同文件夹 | yes
3. 同域名，不同端口 | no
4. 同域名，不同协议 | no
5. 域名和域名对应 ip | no
6. 主域相同、子域名不同 | no
7. 同域名，不同二级域名 | no
8. 不同域名 | no

1.主域相同，子域不同，可以设置在两个页面都设置 document.domain = ‘xxx.com’然后,两个文档就可以进行交互。 2.主域和子域都不同，则可以使用 CDM(cross document messaging)进行跨域消息的传递。
发送消息: 使用 postmessage 方法
接受消息: 监听 message 事件

### 如何解决跨域

1. jsonp
   利用 script 标签来请求数据，不过 jsonp 请求需要对方服务器支持
   jsonp 和 ajax 相同，都是客户端发起的请求，不过 ajax 属于同源策略，jsonp 属于非同源策略
   jsonp 简单，兼容性好，不过只允许 get 请求，并且有可能会遭到 XSS 攻击

```js
function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    window[callback] = function(data) {
      resolve(data)
      document.body.removeChild(script)
    }
    // 统一处理参数
    params = { ...params, callback }
    const arr = []
    for (let key in params) {
      arr.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${arr.join('&')}`
    document.body.appendChild(script)
  })
}

jsonp({
  url: 'http://localhost:9999/test',
  params: { type: 'js' },
  callback: 'give',
}).then(res => {
  console.log(res)
})
```

```js
const Koa = require('koa')
const app = new Koa()

app.get('/test', function(req, res) {
  const { test, callback } = req.query
  res.end(`${callback}('你的jsonp请求')`)
})
```

2. cors

CORS 需要浏览器和后端同时支持，IE8/9 需要通过 XDomainRequest 实现
服务端设置 Access-Control-Allow-Origin 就可以开启 CORS

**CORS 分为简单请求和复杂请求**

- 简单请求
  GET/HEAD/POST 请求方式
  Content-Type 的值：text/plain | multipart/form-data | application/x-www-form-urlencoded

- 复杂请求
  复杂请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求,该请求是 option 方法的，通过该请求来知道服务端是否允许跨域请求。

```js
// index.html
let xhr = new XMLHttpRequest()
document.cookie = 'name=bq' // cookie不能跨域
xhr.withCredentials = true // 前端设置是否带cookie
xhr.open('PUT', 'http://localhost:9999/test', true)
xhr.setRequestHeader('name', 'bq')
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.response)
      // 得到响应头，后台需设置Access-Control-Expose-Headers
      console.log(xhr.getResponseHeader('name'))
    }
  }
}
xhr.send()
```

```js
// server1.js
const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')
const app = new Koa()
const port = 8888

app.use(serve(path.join(__dirname)))
app.listen(port)
```

```js
// server2.js
const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')

const app = new Koa()
const whitList = ['http://localhost:8888'] // 设置白名单
const port = 9999

app.use(function(req, res, next) {
  const origin = req.headers.origin
  if (whitList.includes(origin)) {
    // 设置哪个源可以访问我
    res.setHeader('Access-Control-Allow-Origin', origin)
    // 允许携带哪个头访问我
    res.setHeader('Access-Control-Allow-Headers', 'name')
    // 允许哪个方法访问我
    res.setHeader('Access-Control-Allow-Methods', 'PUT')
    // 允许携带cookie
    res.setHeader('Access-Control-Allow-Credentials', true)
    // 预检的存活时间
    res.setHeader('Access-Control-Max-Age', 6)
    // 允许返回的头
    res.setHeader('Access-Control-Expose-Headers', 'name')
    if (req.method === 'OPTIONS') {
      res.end() // OPTIONS请求不做任何处理
    }
  }
  next()
})

app.put('/test', function(req, res) {
  console.log(req.headers)
  res.setHeader('name', 'jw') // 返回一个响应头，后台需设置
  res.end('show my code')
})

app.get('/test', function(req, res) {
  console.log(req.headers)
  res.end('show my code')
})

app.use(serve(path.join(__dirname)))
app.listen(port)
```

3. postmessage

- 页面和其打开的新窗口的数据传递
- 多窗口之间消息传递
- 页面与嵌套的iframe消息传递
- 上面三个场景的跨域数据传递

4. webSocket

5. node中间件

6. Nginx反向代理

7. window.name + iframe

8. location.hash + iframe

9. document.domain + iframe

## Node

使用 node index.js 如何能后台方式运行？

```js
node app.js &
```

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

箭头函数与普通函数的区别？

1、函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

2、不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

3、不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

4、不可以使用 new 命令，因为：

- 没有自己的 this，无法调用 call，apply。
- 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 __proto__

### 节流与防抖

节流 Throttle

```js
function throttle(fn, wait) {
  let lasttime
  return function() {
    let ctx = this
    let args = arguments
    if (Date.now() - lasttime > wait) {
      fn.apply(ctx, args)
      lasttime = Date.now()
    }
  }
}
```

防抖 debounce

```js
function debounce(fn, wait) {
  let timer

  return function() {
    let ctx = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(ctx, args)
    }, wait)
  }
}
```

Throttle 来优化 Debounce

```js
function throttle(fn, wait) {
  let inThrottle, timer, lasttime
  return function() {
    let ctx = this
    let args = arguments
    if (!inThrottle) {
      fn.apply(cxt, args)
      inThrottle = true
      lasttime = Date.now()
    } else {
      clearTimeout(timer)
      timer = setTimeout(function() {
        if (Date.now() - lasttime >= wait) {
          fn.apply(ctx, args)
          lasttime = Date.now()
        }
      }, Math.max(Date.now() - lasttime - wait, 0))
    }
  }
}
```

ES6 代码转成 ES5 代码的实现思路是什么?

- 将代码字符串解析成抽象语法树，即所谓的 AST
- 对 AST 进行处理，在这个阶段可以对 ES6 代码进行相应转换，即转成 ES5 代码
- 根据处理后的 AST 再生成代码字符串

## canvas

### canvas 和 svg 的区别

## 移动端

### 长列表性能问题

### Safari 滑动结束才触发 scroll 事件如果解决

### 从详情页返回列表页，有哪些方法可以定位到以前的状态

## Http(s)

### 状态码

- 301 资源永久移除
- 302 
- 304
- 403

### https 原理

### CDN

什么是CDN?

CDN （Content Delivery Network，即内容分发网络）指的是一组分布在各个地区的服务器。这些服务器存储着数据的副本，因此服务器可以根据哪些服务器与用户距离最近，来满足数据的请求。 CDN 提供快速服务，较少受高流量影响。

CDN 核心功能是什么?

CDN 的核心点有两个，一个是缓存，一个是回源。


### get 和 post 的区别？post 代替 get 请求数据有什么劣势

## 框架库比较

### vue 和 react 的异同

### vue 与 react 多次改变数据会重新渲染吗？ 为什么？

### webpack

webpack 如何优化构建过程时间与打包的结果体积太大？

- 不要让 loader 做太多事情， 使用exclude 排除不需要打包的文件夹 `exclude: /(node_modules|bower_components)/`
- 开启缓存 `loader: 'babel-loader?cacheDirectory=true'`
- 不要放过第三方库
- Happypack——将 loader 由单进程转为多进程
- 拆分资源
- 删除冗余代码
- 按需加载
- Gzip压缩

loader 和 plugin 的区别?

compilie 原理?

按需加载?

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
