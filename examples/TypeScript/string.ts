let name: string = 'hello'
name = 'world'
let job: string = `developer engineer`
let age: number = 20
let sentence: string = `Hi, my name is ${ name }
I'll be ${ age + 1 } years old next month.`

function* count() {
  var a = 1
  
  yield

  a++
}

const it = count()
it.next() // 1
it.next() // 2