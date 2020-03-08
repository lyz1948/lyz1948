# 装饰器

```js
class Me {
  @write
  run() {
    console.log('run run')
  }
}

function write(target, key, description) {
  console.log('target', target)
  console.log('key', key)
  console.log('desc', description)
}

const lyz = new Me()

lyz.run()
```