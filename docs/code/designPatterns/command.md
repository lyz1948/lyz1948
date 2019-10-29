# 命令模式

```js
// 设置命令
var setCommand = function(button, command) {
  button.onclick = function() {
    command.execute()
  }
}

// 命令
var MenuBar = {
  refresh: function() {
    console.log('刷新菜单')
  },
}

// 命令接收者
var RefreshMenuBarCommand = function(receiver) {
  this.receiver = receiver
}

RefreshMenuBarCommand.prototype.execute = function() {
  this.receiver.refresh()
}

var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar)

setCommand(button1, refreshMenuBarCommand)
```

用闭包实现命令模式

```js
var setCommand = function(button, func) {
  button.onclick = functioin() {
    func()
  }
}

var Menu = {
  refresh: function() {
    console.log('刷新菜单')
  }
}

var RefreshMenuBarCommand = function(receiver) {
  return function() {
    reciever.refresh()
  }
}

var refreshMenuBarCommand = RefreshMenuBarCommand(Menu)

setCommand(button, refreshMenuBarCommand)
```

### 撤销命令

```js
var MoveCommand = function(receiver, pos) {
  this.receiver = receiver
  this.pos = pos
  this.oldPos = null
}

MoveCommand.prototype.execute = function() {
  this.receiver.start('left', this.pos, 1000, 'strongEaseOut')
  this.oldPos = this.receiver.dom.getBoundingClientRect()[
    this.receiver.propertyName
  ]
}

MoveCommand.prototype.undo = function() {
  this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut')
}

var moveCommand
var ball = document.querySelector('#ball')
var pos = document.querySelector('#pos')
var moveBtn = document.querySelector('#moveBtn')
var cancelBtn = document.querySelector('#cancelBtn')

moveBtn.onclick = function() {
  var animate = new Animate(ball)
  moveCommand = new MoveCommand(animate, pos.value)
  moveCommand.execute()
}

cancelBtn.onclick = function() {
  moveCommand.undo()
}
```

### 命令模式-撤销和重做

```js
var Ryu = {
  attack: function() {
    console.log('攻击')
  },
  defense: function() {
    console.log('防御')
  },
  jump: function() {
    console.log('跳跃')
  },
  crouch: function() {
    console.log('蹲下')
  },
}

var makeCommand = function(receiver, state) {
  return function() {
    receiver[state]
  }
}

var commands = {
  '119': 'jump', // W
  '115': 'crouch', // S
  '97': 'defense', // A
  '100': 'attack', // D
}

var commandStack = []

document.onkeypress = function(ev) {
  var keyCode = ev.keyCode,
    command = makeCommand(Ryu, commands[keyCode])

  if (command) {
    command() // 执行命令
    commandStack.push(command) // 将刚才执行的命令保存到堆栈
  }
}

document.getElementById('replay').onclick = function() {
  var command
  while ((command = commandStack.shift())) {
    command()
  }
}
```

### 宏命令

```js
var closeDoorCommand = {
  execute: function() {
    console.log('关门')
  },
}
var openPcCommand = {
  execute: function() {
    console.log('打开电脑')
  },
}
var openQQCommand = {
  execute: function() {
    console.log('登录QQ')
  },
}

var MacroCommand = function() {
  return {
    commandList: [],
    add: function(command) {
      this.commandList.push(command)
    },
    execute: function() {
      for (var i = 0, command; (command = this.commandList[i++]); ) {
        command()
      }
    },
  }
}

var macroCommand = MacroCommand()
macroCommand.add(closeDoorCommand)
macroCommand.add(openPcCommand)
macroCommand.add(openQQCommand)

macroCommand.execute()
```
