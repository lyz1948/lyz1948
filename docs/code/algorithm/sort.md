# 排序

**创建一个数组列表**

```js
function ArrayList() {
  let array = []

  this.insert = function(item) {
    array.push(item)
  }

  this.toString = function() {
    return array.join()
  }
}
```

## 冒泡排序

冒泡排序比较任何两个相邻的项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名

```js
this.bubbleSort = function() {
  let len = array.length

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(j, j + 1)
      }
    }
  }
}

const swap = function(index1, index2) {
  let aux = array[index1]
  array[index1] = array[index2]
  array[index2] = aux
}
```

改进版冒泡算法

```js
this.modifiedBubbleSort = function() {
  let len = array.length

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(j, j + 1)
      }
    }
  }
}
```

## 选择排序

```js
this.selectionSort = function() {
  let len = array.length,
    indexMin

  for (let i = 0; i < len - 1; i++) {
    indexMin = i
    for (let j = i; j < len; j++) {
      if (array[indexMin] > array[j]) {
        indexMin = j
      }
      if (i != indexMin) {
        swap(i, indexMin)
      }
    }
  }
}
```

```js
var arr = [7, 2, 5, 3, 4, 8, 1]
var chooseSort = function(arr) {
  var min = arr[0]
  var idx = 0
  if (arr.length === 1) {
    return arr
  }
  for (var i = 0; i < arr.length; i++) {
    if (min > arr[i]) {
      min = arr[i]
      idx = i
    }
  }
  var ret = arr.splice(idx, 1)
  return ret.concat(chooseSort(arr))
}
chooseSort(arr)
```

选择排序同样也是一个难度为 O(n2)的算法。和冒泡排序一样，它包含有嵌套的两个循环， 这导致了二次方的复杂度

## 插入排序

插入排序每次一个数组项，以此方法构建最后的排序数组。假定第一项已经排序了，接着，它和第二项进行比较，第二项是应该待在原位还是插到第一项之前？这样，头两项就已正序排序，接着和第三项比较(它是该插入到第一、第二还是第三的位置呢？)，以此类

```js
this.insertionSort = function() {
  let len = array.length,
    j,
    temp
  for (let i = 1; i < len; i++) {
    j = i
    temp = array[i]
    while (j > 0 && array[j - 1] > temp) {
      array[j] = array[j - 1]
      j--
    }
    array[j] = temp
  }
}
```

## 归并排序

```js
this.mergeSort = function() {
  array = mergeSortRec(array)
}

const merge = function(left, right) {
  let result = []
  let il = 0
  let ir = 0

  while (il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left(il++))
    } else {
      result.push(right[ir++])
    }
  }

  while (il < left.length) {
    result.push(left[il++])
  }

  while (ir < right.length) {
    result.push(right[ir++])
  }

  return result
}

const mergeSortRec = function(array) {
  const len = array.length
  if (length === 1) {
    return array
  }
  let mid = Math.floor(len / 2)
  let left = array.slice(0, mid)
  let right = array.slice(mid, len)

  return merge(mergeSortRec(left), mergeSortRec(right))
}
```

## 快速排序

```js
this.quickSort = function() {
  quick(array, 0, array.length - 1)
}

const swapQuickSort = function(array, index1, index2) {
  var aux = array[index1]
  array[index1] = array[index2]
  array[index2] = aux
}

const partition = function(array, left, right) {
  let pivot = array[Math.floor((right + left) / 2)]
  let i = left
  let j = right

  while (i <= j) {
    while (array[i] < pivot) {
      i++
    }
    while (array[j] > pivot) {
      j--
    }
    if (i <= j) {
      swapQuickSort(array, i, j)
      i++
      j--
    }
  }
  return i
}

const quick = function(array, left, right) {
  let index

  if (array.length > 1) {
    index = partition(array, left, right)

    if (left < index - 1) {
      quick(array, left, index - 1)
    }

    if (index < right) {
      quick(array, index, right)
    }
  }
}
```

## 二分搜索

```js
this.binarySearch = function(item) {
  this.quickSort()

  let low = 0
  let high = array.length - 1
  let mid
  let element

  while (low <= high) {
    mid = Math.floor((low + high) / 2)
    element = array[mid]
    if (element < item) {
      low = mid + 1
    } else if (element > item) {
      high = mid - 1
    } else {
      return mid
    }
  }
  return -1
}
```
