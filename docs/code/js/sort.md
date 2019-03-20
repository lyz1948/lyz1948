# 排序算法

## 冒泡排序

```js
var arr = [7, 2, 5, 3, 4, 8, 1];
var maopaoSort = function(arr) {
    for(var i = 0; i < arr.length; i++) {
        for(var j = 0; j < arr.length-i; j++) {
            transposition(j, j+1)
        }
    }
    function transposition(n1, n2){
        var temp = ''
        if(arr[n1] > arr[n2]) {
            temp = arr[n1]
            arr[n1] = arr[n2]
            arr[n2] = temp
        }
    }
    return arr
}
maopaoSort(arr)
```

## 选择排序

```javascript
var arr = [7, 2, 5, 3, 4, 8, 1];
var chooseSort = function(arr) {
    var min = arr[0]
    var idx = 0
    if(arr.length === 1) {
        return arr
    }
    for(var i = 0; i < arr.length; i++) {
        if(min > arr[i]) {
            min = arr[i]
            idx = i
        }
    }
    var ret = arr.splice(idx, 1)
    return ret.concat(chooseSort(arr))
}
chooseSort(arr)
```
