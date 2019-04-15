---
title: 函数
sidebarDepth: 2
sidebar: false
---

```js
function sum(x: number, y: number): number {
  return x + y
}

let sum = function(x: number, y: number): number {
  return x + y
}
```

### 完整函数类型

```js
let sum: (x: number, y: number) => number = function(x: number, y: number): number {
  return x + y
}

let snm: (baseVal: number, increment: number) => number = function(x: number, y: number): number {
  return x + y
}
```

### 推断类型

```js
// 完整函数类型
let add = function(x: number, y: number): number {
  return x + y
}

// 按上下问归类
let myAdd: (baseVal: number, increment: number) => number = function(x, y) {
  return x + y
}
```

### 可选参数和默认参数

```js
function colors(first: string, last: string) {
  return first + ' ' + last
}

let res = colors('pink', 'olive') // ok
let res2 = colors('green') // error
let res2 = colors('yellow', 'blue', 'red') // error

function colors(first: string, last?: string) {
  return last ? (first + ' ' + last) : first
}

let res = colors('pink', 'olive') // ok
let res2 = colors('green') // ok
let res2 = colors('yellow', 'blue', 'red') // error
```

### 剩余参数

```js
function buildName(first: string, ...rest: string[]) {
  return `${first} ${rest.join('')}`
}

let employeeList = buildName('Joe', 'John', 'Jeery', 'May')

function buildNameFn: (first: string, ...rest: string[]) => string = buildName
```

### This

```js
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    return function() {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()
console.log(`card: ${pickedCard.card} of ${pickedCard.suit}`)
```

上面的函数会报错，找不到`this`，因为`createCardPicker`函数又返回了一个新函数，当把`cardPicker()`赋值给`pickedCard`后，函数里的`this`指向的是`window`,严格模式下为`undefined`

```js
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'dismonds'],
  cards: Array(52),
  createCardPicker: function() {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }
}

let cardPicker = dock.createCardPicker()
let pickedCard = cardPicker()
console.log(`card: ${pickedCard.card} of ${pickedCard.suit}`)
```

上面的`this`指向已经修正了，不过，`typescript`会给出一条警告，如果`tsconfig.json`里配置了`noImplicitThis`标记的话，它会指出`this.suits[pickedSuit]`里的this的类型为`any`

### `this` 参数

```js
function func(this: void) {

}
```

为`Card` 和 `Deck`创建接口

```js
interface Card {
  suit: string
  card: number
}

interface Deck {
  suits: string[]
  cards: number[]
  createCardPicker(this: Deck): () => Card
}

let deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function(this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickCard / 13)

      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickCard = cardPicker()

console.log(`card: ${pickedCard2.card} of ${pickedCard2.suit}`)
```

```js
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void) => void
}

class Handler {
  info: string
  onClickBind(this: void, e: Event) {
    this.info = e.message
  }
}

let uiElment: UIElement
const h = new Handler()
uiElment.addClickListener(h.onClickBind)
```

### 重载

```js
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

function pickCard(x: { suit: string; card: number }[]): number
function pickCard(x: number): { suit: string; card: number }
function pickCard(x): any {
  if (typeof x === 'object') {
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  } else if (typeof x === 'number') {
    let pickedSuit = Math.floor(x / 13)
    return { suit: suits[pickedSuit], card: x % 13 }
  }
}

let myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
]
let pickedCard1 = myDeck[pickCard(myDeck)]
console.log(`card: ${pickedCard1.card} of ${pickedCard1.suit}`)

let pickedCard2 = pickCard(20)
console.log(`card: ${pickedCard2.card} of ${pickedCard2.suit}`)
```
