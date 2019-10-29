# 组合模式

```js
var MacroCommand = function() {
  return {
    commandList: [],
    add: function(command) {
      this.commandList.push(command)
    },
    execute: function() {
      for (var i = 0, command; (command = this.commandList[i++]); ) {
        command.execute()
      }
    },
  }
}

var openAcCommand = {
  execute: function() {
    console.log('打开空调')
  },
}
var openTvCommand = {
  execute: function() {
    console.log('打开电视')
  },
}
var openSoundCommand = {
  execute: function() {
    console.log('打开音响')
  },
}
var macroCommand1 = MacroCommand()
macroCommand1.add(openAcCommand)
macroCommand1.add(openTvCommand)
macroCommand1.add(openSoundCommand)

var openPcCommand = {
  execute: function() {
    console.log('打开电脑')
  },
}

var openQQCommand = {
  execute: function() {
    console.log('打开QQ')
  },
}

var macroCommand2 = MacroCommand()
macroCommand2.add(openPcCommand)
macroCommand2.add(openQQCommand)

// 组合所有命令
var macroCommand = MacroCommand()
macroCommand.add(macroCommand1)
macroCommand.add(macroCommand2)

var setCommand = (function(command) {
  document.querySelector('#button').onclick = function() {
    command.execute()
  }
})(macroCommand)
```

### 组合模式-扫描文件夹 🌰

```js
// folder
var Folder = function(name) {
  this.name = name
  this.files = []
}

Folder.prototype.add = function(file) {
  this.files.push(file)
}

Folder.prototype.scan = function() {
  console.log('开始扫描文件夹：' + this.name)
  for (var i = 0, file, files = this.files; (file = files[i++]); ) {
    file.scan()
  }
}

// file
var File = function(name) {
  this.name = name
}

File.prototype.add = function() {
  throw new Error('文件下面不能添加文件')
}

File.prototype.scan = function() {
  console.log('开始扫描文件：' + this.name)
}

var folder = new Folder('web开发')
var folder1 = new Folder('Javascript')
var folder2 = new Folder('Nodejs')

var file1 = new File('JavaScript设计模式与开发实践')
var file2 = new File('Javascript高级程序设计')
var file3 = new File('重构与模式')
var file4 = new File('深入浅出Nodejs')

folder1.add(file1)
folder1.add(file2)
folder2.add(file4)

folder.add(folder1)
folder.add(folder2)
folder.add(file3)

var file5 = new File('Javascript语音精髓与编程实践')

folder.add(file5)

folder.scan()
```

### 组合模式-引用父对象

```js
var Folder = function(name) {
  this.name = name
  this.parent = null
  this.files = []
}

Folder.prototype.add = function(file) {
  this.files.push(file)
  file.parent = this
}

Folder.prototype.scan = function() {
  console.log('开始扫描文件夹：' + this.name)
  for (var i = 0, file, files = this.files; (file = files[i++]); ) {
    file.scan()
  }
}

Folder.prototype.remove = function() {
  // 根节点或树外者游离的节点
  if (!this.parent) {
    return
  }
  for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    var file = files[l]
    if (file === this) {
      files.splice(l, 1)
    }
  }
}

var folder = new Folder('web开发')
var folder1 = new Folder('Javascript')
var folder2 = new Folder('Nodejs')

var file1 = new File('JavaScript设计模式与开发实践')
var file2 = new File('Javascript高级程序设计')

folder.add(folder1)
folder.add(file1)

folder1.remove()
folder.scan()
```
