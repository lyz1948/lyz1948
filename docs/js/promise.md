# Promise 相关知识

## 实现一个mergePromise函数

```js
const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

const getData1 = () => sleep(2000).then(() => {
  console.log('1')
  return 1
})
const getData2 = () => sleep(2000).then(() => {
  console.log('2')
  return 2
})
const getData3 = () => sleep(1000).then(() => {
  console.log('3')
  return 3
})

mergePromise([getData1, getData2, getData3]).then(res => {
  console.log('done')
  console.log(res)
})

function mergePromise(promiseArray) {
  // 存放返回的数据结果
  const result = []
  const promise = Promise.resolve()
  promiseArray.forEach(req => {
    promise = promise.then(req).then(res => {
      result.push(res)
      return result
    })
  })
  return promise
}
```

## 异步加载图片的方法

```js
const loadImageAsync = url => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject(new Error("Load image failed!"))
    }
    img.src = url
  })
}
```
