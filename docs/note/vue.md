# Vue 开发实用方法

## 全局组件

在`components`目录下新建一个`global`文件夹, 存放全局组件, 以及一个`index.js`文件

```js
touch components/index.js
mkdir components/global
mkdir Header
touch Header/index.js
touch Header/index.vue
```

`components/index.js`

```js
import Vue from 'vue'

// 自动加载 global 目录下的 .js 结尾的文件
const componentsContext = require.context('./global', true, /\.js$/)

componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  /**
  * 兼容 import export 和 require module.export 两种规范
  */
  const ctrl = componentConfig.default || componentConfig
  // 针对导出多个文件
  if (!ctrl.name) {
    Object.keys(ctrl).forEach(comp => {
      Vue.component(ctrl[comp].name, ctrl[comp])
    })
  } else {
    Vue.component(ctrl.name, ctrl)
  }
})
```

`Header/index.js`

```js
import Header from './index.vue'
export default Header
```

`Header/index.vue`

```js
<script>
export default {
  name: 'VHeader',
  data() {
    return {}
  },
  props: {},
  ...
}
</script>
```

在`main.js`中引入全局组件

```js
// global components
import './components/index'
```

现在在任何地方都可以直接使用`Header`组件了，而不需要每次引入, 组件的名即是在组件里·`name`定义的名字，本例是`VHeader`

## 全局过滤器

```js
import * as filters from './filters'
Object.keys(filters).map(key => {
  Vue.filter(key, filters[key])
})
```