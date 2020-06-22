class Stack {
  constructor() {
    this.items = []
  }

  push(v) {
    this.items.push(v)
  }

  pop() {
    return this.items.pop()
  }

  clear() {
    this.items = []
  }

  get isEmpty() {
    return this.items.length === 0
  }

  get head() {
    return this.items[0]
  }

  get tail() {
    return this.items[this.items.length - 1]
  }

  toString() {
    return this.items.length ? this.items.toString() : []
  }
}

// 进制转换

function dividBy(decNumber, base) {
  const digist = '0123456789ABCDEF'
  let stack = new Stack()
  let rem
  let result = ''

  while (decNumber > 0) {
    rem = Math.floor(decNumber % base)
    stack.push(rem)
    decNumber = Math.floor(decNumber / base)
  }

  while (!stack.isEmpty) {
    result += digist[stack.pop()]
  }

  return result
}

console.log(dividBy(255, 16))
