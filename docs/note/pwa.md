# pwa

```js
;(function() {
  if ('serviceWorker' in navigator) {
    // 监听 service worker 的 load 事件
    window.addEventListener('load', function() {
      this.navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(function(registration) {
          // 注册成功
          console.log(
            'serviceWorker registration success with scope: ' +
              registration.scope
          )
        })
        .catch(function(err) {
          // 出错了
          console.log('serviceWorker registration failed with: ' + err)
        })
    })

    // 监听 service worker 的 install 事件
    this.addEventListener('install', function(event) {
      // 如果监听到了 service worker 已经安装成功的话，就会调用 event.waitUntil 回调函数
      event.waitUntil('cache-v1').then(function(cache) {
        // 通过 cache 缓存对象的 addAll 方法添加 precache 缓存
        return cache.addAll([
          '/',
          'index.html',
          'main.css',
          'main.js',
          'pine.jpeg'
        ])
      })
    })

    this.addEventListener('fetch', function(event) {
      event.responseWith(
        caches.match(event.request).then(function(res) {
          // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
          if (res) {
            return res
          }

          // 如果 service worker 没有返回，那就得直接请求真实远程服务
          var request = event.request.clone()
          return fetch(request).then(function(httpRes) {
            // http请求的返回已被抓到，可以处置了。

            // 请求失败了，直接返回失败的结果就好了。。
            if (!httpRes || httpRes.status !== 200) {
              return httpRes
            }

            // 请求成功的话，将请求缓存起来
            var responseClone = httpRes.clone()
            caches.open('cache-v1').then(function(cache) {
              cache.put(event.request, responseClone)
            })

            return httpRes
          })
        })
      )
    })
  }
})()
```
