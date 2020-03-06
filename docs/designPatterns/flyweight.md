# 享元模式

```js
var Model = function(sex) {
  this.sex = sex
}

Model.prototype.takePhoto = function() {
  console.log('sex= ' + this.sex + 'underwear= ' + this.underwear)
}

var maleModel = new Model('male')
var femaleModel = new Model('female')

for (var i = 1; i <= 50; i++) {
  maleModel.underwear = 'underwear' + i
  maleModel.takePhoto()
}

for (var i = 1; i <= 50; i++) {
  femaleModel.underwear = 'underwear' + i
  femaleModel.takePhoto()
}
```

#### 享元模式-上传 🌰

```js
var Upload = function(uploadType) {
  this.uploadType = uploadType
}

Upload.prototype.delFile = function(id) {
  uploadManager.setExternalState(id, this)

  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom)
  }

  if (window.confirm('确定要删除该文件吗？' + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom)
  }
}

// 对象实例化工厂
var uploadFactory = (function() {
  var createFlyWeightObjs = {}

  return {
    create: function(uploadType) {
      if (createFlyWeightObjs[uploadType]) {
        return createFlyWeightObjs[uploadType]
      }
      return (createFlyWeightObjs[uploadType] = new Upload(uploadType))
    },
  }
})()

// 管理器封装外部状态

var uploadManager = (function() {
  var uploadDatabase = {}

  return {
    add: function(id, uploadType, fileName, fileSize) {
      var flyWeightObj = uploadFactory.create(uploadType)
      var dom = document.createElement('div')
      dom.innerHTML =
        '<span>文件名称:' +
        fileName +
        ', 文件大小: ' +
        fileSize +
        '</span>' +
        '<button class="delFile">删除</button>'

      document.querySelector('.delFile').onclick = function() {
        flyWeightObj.delFile(id)
      }
      document.body.appendChild(dom)

      uploadDatabase[id] = {
        fileName: fileName,
        fileSize: fileSize,
        dom: dom,
      }
      return flyWeightObj
    },
    setExternalState: function(id, flyWeightObj) {
      var uploadData = uploadDatabase[id]
      for (var i in uploadData) {
        flyWeightObj[i] = uploadData[i]
      }
    },
  }
})()

var id = 0

window.startUpload = function(uploadType, files) {
  for (var i = 0, file; (file = files[i++]); ) {
    var uploadObj = uploadManager.add(
      ++id,
      uploadType,
      file.fileName,
      file.fileSize,
    )
  }
}

startUpload('plugin', [
  {
    fileName: 'a.txt',
    fileSize: 2000,
  },
  {
    fileName: 'b.txt',
    fileSize: 4000,
  },
  {
    fileName: 'c.txt',
    fileSize: 5000,
  },
])

startUpload('flash', [
  {
    fileName: 'x.txt',
    fileSize: 2000,
  },
  {
    fileName: 'y.txt',
    fileSize: 4000,
  },
  {
    fileName: 'z.txt',
    fileSize: 5000,
  },
])
```

### 对象池

```js
var toolTipFactory = (function() {
  var toolTipPool = []

  return {
    create: function() {
      if (toolTipPool.length === 0) {
        var div = document.createElement('div')
        document.body.appendChild(div)
        return div
      } else {
        return toolTipPool.shift()
      }
    },
    recover: function(tooltipDom) {
      // 对象池回收dom
      return toolTipPool.push(tooltipDom)
    },
  }
})()

var ary = []
for (var i = 0, str; (str = ['银行', '邮局'][i++]); ) {
  var toolTip = toolTipFactory.create()
  toolTip.innerHTML = str
  ary.push(toolTip)
}

for (var i = 0, toolTip; (toolTip = ary[i++]); ) {
  toolTipFactory.recover(toolTip)
}
```

### 通用对象池

```js
var objectPoolFactory = function(createFn) {
  var objectPool = []

  return {
    create: function() {
      var obj =
        objectPool.length === 0
          ? createFn.apply(this, arguments)
          : objectPool.shift()

      return obj
    },
    recover: function(obj) {
      objectPool.push(obj)
    },
  }
}

var iframeFactory = objectPoolFactory(function() {
  var iframe = document.createElement('iframe')
  document.body.appendChild(iframe)

  iframe.onload = function() {
    iframe.onload = null // 防止重复加载
    iframeFactory.recover(iframe) //  iframe 加载完后回收节点
  }
  return iframe
})
```
