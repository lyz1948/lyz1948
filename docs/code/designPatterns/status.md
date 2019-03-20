# 状态模式

```bash
var OffLightState = function(light) {
  this.light = light
}

OffLightState.prototype.buttonWasPressed = function() {
  console.log('弱光')
  this.light.setState(this.light.weakLightState)
}

var WeakLightState = function(light) {
  this.light = light
}

WeakLightState.prototype.buttonWasPressed = function() {
  console.log('强光')
  this.light.setState(this.light.strongLightState)
}

var StrongLightState = function(light) {
  this.light = light
}

StrongLightState.prototype.buttonWasPressed = function() {
  console.log('关灯')
  this.light.setState(this.light.offLightState)
}

var Light = function() {
  this.offLightState = new OffLightState(this)
  this.weakLightState = new WeakLightState(this)
  this.strongLightState = new StrongLightState(this)
  this.button = null
}

Light.prototype.init = function() {
  var button = document.createElement('button'),
      self = this
  this.button = document.body.appendChild(button)
  this.button.innerHTML = '开关'

  this.currentState = this.offLightState

  this.button.onclick = function() {
    self.currentState.buttonWasPressed()
  }
}

Light.prototype.setState = function(newStata) {
  this.currentState = newStata
}

var State = function() {}

State.prototype.buttonWasPressed = function() {
  throw new Error('父类的buttonWasPressed 方法必须重写')
}

var SuperStrongLightState = function(light) {
  this.light = light
}

SuperStrongLightState.prototype = new State()

SuperStrongLightState.prototype.buttonWasPressed = function() {
  console.log('关灯')
  this.light.setState(this.light.offLightState)
}

var light = new Light()
light.init()
```

### 状态模式-文件上传

```bash
// 上传对象
window.external.upload = function(state) {
  console.log(state)
}

// 插件
var plugin = (function() {
  var plugin = document.createElement('embed')
  plugin.style.display = 'none'

  plugin.type = 'application/txftn-webkit'

  plugin.sign = function() {
    console.log('开始扫描文件')
  }
  plugin.pause = function() {
    console.log('暂停文件上传')
  }
  plugin.uploading = function() {
    console.log('开始文件上传')
  }
  plugin.del = function() {
    console.log('删除上传文件')
  }
  plugin.done = function() {
    console.log('上传完成')
  }
  document.body.appendChild(plugin)

  return plugin
})()

var Upload = function(fileName) {
  this.plugin = plugin
  this.fileName = fileName
  this.button1 = null
  this.button2 = null
  this.signState = new SignState(this) // 设置初始状态
  this.uploadingState = new UploadingState(this)
  this.pauseState = new PauseState(this)
  this.doneState = new DoneState(this)
  this.errorState = new ErrorState(this)
  this.currentState = this.signState
}

Upload.prototype.init = function() {
  var that = this
  this.dom = document.createElement('div')
  this.dom.innerHTML =
    '<span>文件名称：'+ this.fileName +'</span>\
    <button data-action="button1">扫描中</button>\
    <button data-action="button2">删除</button>'

  document.body.appendChild(this.dom)
  this.button1 = document.querySelector('[data-action="button1"]')
  this.button2 = document.querySelector('[data-action="button2"]')

  this.bindEvent()
}

Upload.prototype.bindEvent = function() {
  var that = this
  this.button1.onclick = function() {
    that.currentState.clickHandler1()
  }
  this.button2.onclick = function() {
    that.currentState.clickHandler2()
  }
}

Upload.prototype.sign = function() {
  this.plugin.sign()
  this.currentState = this.signState
}

Upload.prototype.uploading = function() {
  this.button1.innerHTML = '正在上传，点击暂停'
  this.plugin.uploading()
  this.currentState = this.uploadingState
}

Upload.prototype.pause = function() {
  this.button1.innerHTML = '已暂停，点击继续'
  this.plugin.pause()
  this.currentState = this.pauseState
}

Upload.prototype.done = function() {
  this.button1.innerHTML = '上传完成'
  this.plugin.done()
  this.currentState = this.doneState
}

Upload.prototype.error = function() {
  this.button1.innerHTML = '上传失败'
  this.currentState = this.errorState
}

Upload.prototype.del = function() {
  this.plugin.del()
  this.dom.parentNode.removeChild(this.dom)
}

var StateFactory = (function() {
  var State = function() {}

  State.prototype.clickHandler1 = function() {
    throw new Error('子类必须重写父类的clickHandler1方法')
  }
  State.prototype.clickHandler2 = function() {
    throw new Error('子类必须重写父类的clickHandler2方法')
  }

  return function(param) {
    var F = function(uploadObj) {
      this.uploadObj = uploadObj
    }

    F.prototype = new State()

    for(var i in param) {
      F.prototype[i] = param[i]
    }
    return F
  }
})()

var SignState = StateFactory({
  clickHandler1: function() {
    console.log('扫描中，点击无效')
  },
  clickHandler2: function() {
    console.log('文件正在上传中，不能删除')
  }
})

var UploadingState = StateFactory({
  clickHandler1: function() {
    this.uploadObj.pause()
  },
  clickHandler2: function() {
    console.log('文件正在上传中，不能删除')
  }
})

var PauseState = StateFactory({
  clickHandler1: function() {
    this.uploadObj.uploading()
  },
  clickHandler2: function() {
    this.uploadObj.del()
  }
})

var DoneState = StateFactory({
  clickHandler1: function() {
    console.log('文件已上传完成，点击无效')
  },
  clickHandler2: function() {
    this.uploadObj.del()
  }
})

var ErrorState = StateFactory({
  clickHandler1: function() {
    console.log('文件已上传失败，点击无效')
  },
  clickHandler2: function() {
    this.uploadObj.del()
  }
})
```

### 模拟上传测试代码

```bash
var uploadObj = new Upload('JavaScript设计模式与开发实践')

uploadObj.init()

window.external.upload = function() {
  uploadObj[state]()
}

window.external.upload('sign')

setTimeout(function() {
  window.external.upload('uploading')
}, 1000)

setTimeout(function() {
  window.external.upload('done')
}, 3000)
```

JavaScript状态机 模式灯泡开关状态🌰
```bash
var Light = function() {
  this.currentState = FSM.off // 初始化状态
  this.button = null
}

Light.prototype.init = function() {
  var button = document.createElement('button')
  var self = this
  button.innerHTML = '已关灯'
  this.button = document.body.appendChild(button)

  this.button.onclick = function() {
    self.currentState.buttonWasPressed.call(self)
  }
}

var FSM = {
  off: {
    buttonWasPressed: function() {
      console.log('关灯')
      this.button.innerHTML = '下一次点击开灯'
      this.currentState = FSM.on
    }
  },
  on: {
    buttonWasPressed: function() {
      console.log('开灯')
      this.button.innerHTML = '下一次点击关灯'
      this.currentState = FSM.off
    }
  }
}

var light = new Light()
light.init()
```

```bash
var delegate = function(client, delegation) {
  return {
    buttonWasPressed: function() {
      return delegation.buttonWasPressed.apply(client, arguments)
    }
  }
}

var FSM = {
  off: {
    buttonWasPressed: function() {
      console.log('关灯')
      this.button.innerHTML = '下一次按我是开灯'
      this.currentState = this.onState
    }
  },
  on: {
    buttonWasPressed: function() {
      console.log('开灯')
      this.button.innerHTML = '下一次按我是关灯'
      this.currentState = this.offState
    }
  }
}

var Light = function() {
  this.offState = delegate(this, FSM.off)
  this.onState = delegate(this, FSM.on)
  this.currentState = this.offState
  this.button = null
}

Light.prototype.init = function() {
  var button = document.createElement('button')
  var self = this
  button.innerHTML = '已关灯'
  this.button = document.body.appendChild(button)
  this.button.onclick = function() {
    self.currentState.buttonWasPressed()
  }
}

var light = new Light()
light.init()
```
