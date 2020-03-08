# Vue 中央事件总线插件

## bus 插件写法

```js
const install = function(Vue) {
  const Bus = new Vue({
    method: {
      emit(event, ...args) {
        this.$emit(event, ...args)
      },
      on(event, cb) {
        this.$on(event, cb)
      },
      off(event, cb) {
        this.$off(event, cb)
      }
    }
  })
  Vue.prototype.$bus = Bus
}

export default install
```

## 使用方法

```js
import Vue from 'vue'
import MyPlugin from 'MyPlugin'

Vue.use(MyPlugin)
// or
Vue.use(MyPlugin, {})
```
