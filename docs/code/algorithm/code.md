# 算法编程

## 每日温度上升问题

```js
function dailyTemperatures(arr) {
  const len = arr.length
  const stack = []
  const res = (new Array(len)).fill(0)

  for (let i = 0; i < len; i++) {
    while(stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      const top = stack.pop()
      res[i] = i - top
    }
    stack.push(i)
  }
  return res
}
```
