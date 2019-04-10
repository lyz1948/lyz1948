interface StringArray {
  [index: number]: string
}

let mystr: StringArray
mystr = ['joe', 'bob']

let str = mystr[0]
console.log(str)