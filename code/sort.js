var arr = [7, 4, 5, 3, 2, 8, 1]
var maopaoSort = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      transposition(j, j + 1)
    }
  }
  function transposition(n1, n2) {
    var temp = ''
    if (arr[n1] > arr[n2]) {
      temp = arr[n1]
      arr[n1] = arr[n2]
      arr[n2] = temp
    }
  }
  return arr
}
console.time('start')
console.log(maopaoSort(arr))
console.timeEnd('start')

function selectionSort(arr) {
  const len = arr.length
  let minIndex

  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    if (i !== minIndex) {
      const tmp = arr[i]
      arr[i] = arr[minIndex]
      arr[minIndex] = tmp
    }
  }
}

console.time('start')
selectionSort(arr)
console.timeEnd('start')
console.log(arr)
