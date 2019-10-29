# 适配器模式

```js
var googleMap = {
  show: function() {
    console.log('开始渲染谷歌地图')
  }
}

var baiduMap = {
  show: function() {
    console.log('开始渲染百度地图')
  }
}

var renderMap = function(map) {
  if(map.show instanceOf Function) {
    map.show()
  }
}

renderMap(googleMap)
renderMap(baiduMap)
```

程序正常执行，如果第三方接口并是不是我们控制之内，如果百度地图没有`show`方法呢?
下面我们通过适配器模式来解决

```js
var googleMap = {
  show: function() {
    console.log('开始渲染谷歌地图')
  },
}

var baiduMap = {
  display: function() {
    console.log('开始渲染百度地图')
  },
}

var baiduMapAdapter = {
  show: function() {
    return baiduMap.display()
  },
}

renderMap(googleMap)
renderMap(baiduMap)
```
