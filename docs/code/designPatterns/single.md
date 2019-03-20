# 单例模式

### 惰性单例
```bash
Singleton.getInstance = (function() {
  var instance = null
  return function(name) {
    if(!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
})()
```
### 通用单例
```bash
var getSingle = function(fn) {
  var result
  return function() {
    return result || (result = fn.apply(this, arguments))
  }
}
```
