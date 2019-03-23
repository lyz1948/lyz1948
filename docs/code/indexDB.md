# indexDB

1.打开/创建一个 IndexDB 数据库（当该数据库不存在时，open 方法会直接创建一个名为 xiaoceDB 新数据库）

```js
var db

// 参数1位数据库名，参数2为版本号
var request = indexedDB.open('test', 1)

request.onerror = function(ev) {
  console.log('当前浏览器不支持indexDB')
}

request.onsuccess = function(ev) {
  db = ev.target.result
  console.log('db', request.result)
  console.log('IndexDB 连接成功！')
}
```

2.创建一个 `object store`（object store 对标到数据库中的“表”单位）
`onupgradeneeded` 事件会在初始化数据库/版本发生更新时被调用，我们在它的监听函数中创建 object store

```js
request.onupgradeneeded = function(ev) {
  var objStore

  if (!db.objectStoreNames.contains('test')) {
    objStore = db.createObjectStore('test', { keyPath: 'id' })
  }
}
```

3.构建一个事务来执行一些数据库操作，像增加或提取数据等
创建事务，指定表格名称和读写权限

```js
var transaction = db.transaction(['test'], 'readwrite')
console.log(transaction)
// 拿到Object Store对象
var objectStore = transaction.objectStore('test')

// 向表格写入数据
objectStore.add({ id: 1, name: 'hello world!' })
```

4.通过监听正确类型的事件以等待操作完成。

```js
transaction.oncomplete = function(ev) {
  console.log('操作成功')
}

transaction.onerror = function(ev) {
  console.log('操作失败')
}
```
