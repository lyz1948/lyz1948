# EventEmitter

```js
const { readFile } = require('fs')
const EventEmitter = require('events')

class EE extends EventEmitter  {}

const yy = new EE()

// 2 =>
yy.on('event', () => {
  console.log('event 事件')
})

// 6 =>
setTimeout(() => {
  console.log('0 毫秒后到期执行定时器')
}, 0)

// 10 =>
setTimeout(() => {
  console.log('100 毫秒后到期执行定时器')
}, 100)

// 11 =>
setTimeout(() => {
  console.log('200 毫秒后到期执行定时器')
}, 200)

//  9 =>
readFile('./README.md', 'utf-8', data => {
  console.log('完成文件 1 读操作的回调')
})

// 7 =>
readFile('../README.md', 'utf-8', data => {
  console.log('完成文件 2 读操作的回调')
})

// 8 =>
setImmediate(() => {
  console.log('immediate 立即回调函数')
})

// 1 =>
process.nextTick(() => {
  console.log('process nextTick 回调')
})

Promise.resolve()
  .then(() => {
    // 2 =>
    yy.emit('event')

    process.nextTick(() => {
      // 5 =>
      console.log('process nextTick 的第二次回调')
    })
    // 3 =>
    console.log('Promise 的第 1 次回调')
  })
  .then(() => {
    // 4 =>
    console.log('Promise 的第 2 次回调')
  })
```
