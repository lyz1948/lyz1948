---
title: 泛型
sidebarDepth: 2
sidebar: false
---

## 泛型

### 创建一个泛型

```js
function identity<T>(arg: T): T {
  return arg
}

let output = identity<string>('str')
let output = identity('str')
```

我们不需要使用`<>`来明确传入的类型，编译器会帮我们检查，根据传入类型在设置T的类型。如果编译器不能自动推断类型的话，在明确传入T的类型

```js
function identity<T>(args: T): T {
  return args
}

function logIdentity<T>(args: T): T {
  console.log(args.length) // 这里会报错
  return args
}
```

如果我们在不指定args类型的情况下，直接使用args.length会有问题，因为可能是数字或其他没有length属性的类型

```js
function logIdentity<T>(args: Array<T>): Array<T> {
  console.log(args.length)
}

function identity<T>(args: T): T {
  return args
}

let myIdentity: <T>(args: T) => T = identity

// 使用不同的泛型参数名
let myIdentity: <U>(args: U) => U = identity

// 使用带有调用签名的对象字面量
let myIdentity: { <T>(args: T): T } = identity
```

用泛型创建接口

```js
interface identityFn {
  <T>(args: T): T
}

function identity<T>(args: T): T {
  return args
}

const myIdentity: identityFn = identity
```

把泛型参数当做接口的参数

```js
interface identityFn<T> {
  (args: T): T
}

const myIdentity: identityFn<number> = identity
```

### 泛型类

```js
class Queue {
  private data = []
  push = item => this.data.push(item)
  pop = () => this.data.shift()
}
```

在上述代码中存在一个问题，它允许你推入任何类型至队列中，推出的时候也是任意类型，如下所示，但一个人推入一个 string 类型至队列中，但是使用者可能会认为队列里只有 number 类型

```js
class Queue {
  private data = []
  push = item => this.data.push(item)
  pop = () => this.data.shift()
}

const queue = new Queue()

queue.push(1)
queue.push('2') // push了不同类型，这将导致使用错误

// 一个使用者，走入了误区
console.log(queue.pop().toPrecision(1));
console.log(queue.pop().toPrecision(1)); // RUNTIME ERROR
```

```js
class QueueNumber {
  private data = []
  push = (item: number) => this.data.push(item)
  pop = (): number => this.data.shift()
}

const queue = new QueueNumber()

queue.push(10)
queue.push('20') // 提示无法push一个非数字类型的元素
```

上面的方式，解决了不允许push不同非number类型的元素到数组，如果我们希望创建字符串队列的时候，那就需要从新修改代码，这不符合开放封闭原则

```js
class Queue<T> {
  private data :T[] = []
  push = (item: T) => this.data.push(item)
  pop = (): T | undefined => this.data.shift()
}

const queue = new Queue<number>()

queue.push(10)
queue.push('9') // 只能push 数字类型的元素
```

```js
function reverse<T>(items: T[]): T[] {
  const res = []
  for (let i = items.length - 1; i >=0; i--) {
    res.push(items[i])
  }
  return res
}

const arr = [1, 2, 3]
let reverseArr = reverse(arr)

reverseArr[0] = '1' // ❎
reverseArr = ['1', '3'] // ❌

reverseArr[0] = 1
reverseArr = [1, 3, 4]

class Utils {
  reverse<T>(items: T[]): T[] {
    const res = []
    for (let i = items.length - 1; i >= 0; i--) {
      res.push(items[i])
    }
    return res
  }
}
```

```js
const getJson = <T>(config: {
  url: string;
  headers?: {
    [key: string]: string
  }
}): Promise<T> => {
  const opts = {
    methods: 'GET',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(config.headers || {})
  }
  return fetch(config.url, opts).then<T>(res => res.json())
}
```

```js
export interface FetchData<T = any> {
  code: number
  result: T
  message: string
}

export function getUserInfo<T>() {
  return axios.get<FetchData<T>>('/path')
  .then(res => res.data)
  .catch(err => console.error(err))
}

interface User {
  name: string
  age: number
}

async function getUser() {
  const user = await getUserInfo<User>()
}
```

```js
class GenericFn<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericFn<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) {
  return x + y
}
```

使用GenericNumber类的方式非常的直观，限制该方法只能传入数字类型，同理，我们也可以传入字符串

```js
let myGenericString = new GenericFn<string>()
myGenericString.zeroValue = ''
myGenericString.add = function(x, y) {
  return x + y
}
console.log(myGenericString.add(myGenericString.zeroValue, 'hello'))
```

### 泛型的约束

```js
interface Lengthwise {
  length: number
}

function logIdentity<T extends Lengthwise>(args: T)： T {
  console.log(args.length)
  return arg
}

logIdentity(42) // 不允许， 数字类型没有length属性
logIdentity({
  length: 5,
  value: 'abc'
})
```

在泛型约束中使用类型参数

```js
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

let x = { a: 1, b: 2, c: 3 }

getProperty(x: 'b') // right
getProperty(x: 's') // error
```

使用类类型

```js
function factoryFn(c: { new(): T }): T {
  return new c()
}

class Beekeeper {
  hasMask: boolean
}

class Zookeeper {
  nametag: string
}

class Animal {
  numLegs: number
}

class Bee extends Animal {
  keeper: Beekeeper
}

class Lion extends Animal {
  keeper: Zookeeper
}

function createIntance<A extends Animal>(c: new () => A): A {
  return new c()
}

createIntance(Lion).keeper.nametag
createIntance(Bee).keeper.hasMask
```