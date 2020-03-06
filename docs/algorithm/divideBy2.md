# 进制转换

```js
const Stack = require('./Stack')

function baseConverter(decNumber, base) {
  var remStack = new Stack(),
    rem,
    baseString = '',
    digits = '0123456789ABCDEF'

  while (decNumber > 0) {
    rem = Math.floor(decNumber % base)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / base)
  }

  while (!remStack.isEmpty) {
    baseString += digits[remStack.pop()]
    console.log(baseString)
  }

  return baseString
}

console.log(baseConverter(100345, 8))
```
