# Vue

## 插件开发方法

### vue插件主要代码

```js
MyPlugin.install = function(Vue, options) {
  Vue.component('my-component', {
    // 组件内容
  })
  Vue.prototype.$Notice = function() {

  }
  Vue.globalMethod = function() {}

  Vue.mixin({
    mounted: function() {

    }
  })
}
```

### 插件的使用方法

```js
import Vue from 'vue'
import MyPlugin from 'MyPlugin'

Vue.use(MyPlugin)
// 或
Vue.use(MyPlugin, {})
```

### vue中央事件总线插件

```js
const install = function(Vue) {
  const Bus = new Vue({
    methods: {
      emit (event, ...args) {
        this.$emit(event, ...args)
      },
      on (event, cb) {
        this.$on(event, cb)
      },
      off (event, cb) {
        this.$off(event, cb)
      }
    }
  })

  Vue.prototype.$bus = Bus
}

export default install
```

### 总线插件使用

``` js
import Vue from 'vue'
import Bus from './vue-bus'

Vue.use(Bus)

// 派发事件
export default {
  data() {
    return {}
  },
  methods: {
    handleClick() {
      const num = Math.floor(Math.random() * 20 + 1)
      this.$bus.emit('add', num)
    }
  }
}
// 监听事件
export default {
  data() {
    return {
      num: 0
    }
  },
  methods: {
    handle() {
      this.$bus.on('add', (val) => {
        this.num = val
      })
    }
  }
}
```

### vue-ajax插件

```js
const ajax = function({options = {}}) {
  options.type = (options.type || 'GET').toUpperCase()

  const data = []
  for(let i in options.data) {
    data.push(encodeURIComponent(i) + '=' + encodeURIComponent(options.data[i]))
  }
  data = data.join('&')

  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      const status = xhr.status
      if(status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML)
      }
      else {
        options.error && options.error(xhr.status)
      }
    }
  }

  if(options.type === 'POST') {
    xhr.open('POST', options.url, true) 
    xhr.setRequestHeader('Content-Type','application/x-www.form-urlencoded')
    xhr.send(data)
  }
  else {
    xhr.open('GET', options.url + '?' + data, true)
    xhr.send(null)
  }
}

export default ajax
```

### 向上找到任意组件

```js
function findComponentUpward (ctx, compName) {
  let parent = ctx.$parent
  let name = parent.$options.name

  while (parent && (!name || [compName].indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}
```

### 向上找到所有的指定组件

```js
function findComponentsUpward (ctx, compName) {
  let parents = []
  const parent = ctx.$parent

  if (parent) {
    if (parent.$options.name === compName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, compName))
  } else {
    return []
  }
}
```

### 向下找到所有的指定组件

```js
function findComponentDownward (ctx, compName) {
  const childrens = ctx.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name

      if (name === compName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, compName)
        if (children) break
      }
    }
  }
  return children
}
```

### 找到所有的子组件

```js
function findComponentsDownward (ctx, compName) {
  return ctx.$children.reduce((components, child) => {
    if (child.$options.name === compName) components.push(child)
    const foundChilds = findComponentsDownward(child, compName)
    return components.concat(foundChilds)
  }, [])
}
```

### 找到兄弟组件

```js
function findBrothersComponents (ctx, compName, exceptMe = true) {
  let res = ctx.$parent.$children.filter(item => {
    return item.$options.name === compName
  })
  let index = res.findIndex(item => item._uid === ctx._uid)
  if (exceptMe) res.splice(index, 1)
  return res
}
```
