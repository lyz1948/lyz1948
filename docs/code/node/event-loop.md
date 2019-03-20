# Event-loop

```js
const { readFile, readFileSync } = require('fs')

setImmediate(() => console.log('[阶段3 immediate] immediate回调 1'))
setImmediate(() => console.log('[阶段3 immediate] immediate回调 2'))
setImmediate(() => console.log('[阶段3 immediate] immediate回调 3'))

Promise.resolve().then(() => {
  console.log('[待切入下一阶段] Promise 回调 1')
  setImmediate(() => {
    console.log('[阶段3 immediate] promise 回调1 增加的 immediate 回调 4')
  })
})

readFile('../README.md', 'utf-8', data => {
  console.log('[阶段2 IO 回调] 读文件回调 1')

  readFile('../README.md', 'utf-8', data => {
    console.log('[阶段2 IO 回调] 读文件回调 2')

    setImmediate(() => {
      console.log('[阶段2 immediate] 读文件增加的回调 3')

      Promise.resolve().then(() => {
        console.log('[阶段2 promise] promise 增加的回调 4')

        process.nextTick(() => {
          console.log('[阶段2 nextTick] promise 增加的nextTick 增加的回调 5')
        })
      })
      .then(() => {
        console.log('[阶段2 promise] promise 增加的回调 5')
      })
    })

    setImmediate(() => {
      console.log('[阶段2 immediate] 读文件增加的回调 4')
    })


  })
})

setTimeout(() => {
  console.log('[阶段1 定时器] 定时器回调 1')
}, 0)

setTimeout(() => {
  console.log('[阶段1 定时器] 定时器回调 2')

  process.nextTick(() => {
    console.log('[...待切入下一阶段] nextTick 回调2')
  })
}, 0)

setTimeout(() => {
  console.log('[阶段1 定时器] 定时器回调 3')
}, 0)

setTimeout(() => {
  console.log('[阶段1 定时器] 定时器回调 4')
}, 0)

process.nextTick(() => console.log('[待切入下一阶段] nextTick 回调1'))

process.nextTick(() => {
  console.log('[待切入下一阶段] nextTick 回调2')
  process.nextTick(() => {
    console.log('[待切入下一阶段] nextTick 回调4')
  })
})

process.nextTick(() => console.log('[待切入下一阶段] nextTick 回调3'))
```
