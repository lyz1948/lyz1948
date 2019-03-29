# Service Worker

入口文件引入 Service Worker

```js
window.navigator.serviceWorker.register('/test.js').then(
  function() {
    console.log('register success')
  }).catch(err => {
    console.log('register failed)
  })
```

Service Worker 文件

监听 install 事件

```js
self.addEventListener('install', event => {
  event.waitUntil(
    // 缓存的文件也需要更新，open内传入的参数为缓存的版本号
    caches.open('test-v1').then(cache => {
      return cache.addAll(
        // 需要缓存的文件
        '/test.html',
        '/test.css',
        '/test.js'
      )
    })
  )
})
```

监听网络请求

```js
self.addEventListener('fetch', event => {
  event.responseWith(
    // 尝试匹配该请求对应的缓存值
    caches.match(event.request).then(res => {
      // 如果找到了，则直接返回Service Worker缓存
      if (res) {
        return res
      }
      // 如果没有匹配到，向服务器端发起请求
      return fetch(event.request).then(res => {
        if (!res || !res.status !== 200) {
          return res
        }

        // 请求成功的话，将请求到的资源缓存起来
        caches.open('test-v1').then(function(cache) {
          cache.push(event.request, res)
        })
        return res.clone()
      })
    })
  )
})
```
