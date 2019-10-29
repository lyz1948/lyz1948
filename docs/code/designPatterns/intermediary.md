# 中介者模式

```js
// 玩家对象
function Player(name, teamColor) {
  this.name = name // 角色名字
  this.teamColor = teamColor // 队伍颜色
  this.state = 'alive' // 玩家生成状态
}

// 赢家
Player.prototype.win = function() {
  console.log(this.name + ' won')
}
// 输家
Player.prototype.lose = function() {
  console.log(this.name + 'lose')
}
// 阵亡
Player.prototype.die = function() {
  this.state = 'dead'
  playerDirector.receiveMessage('playerDead', this)
}
// 移除玩家
Player.prototype.remove = function() {
  playerDirector.receiveMessage('removePlayer', this)
}
// 玩家换队
Player.prototype.changeTeam = function(color) {
  playerDirector.receiveMessage('changeTeam', this, color)
}
// 创建玩家工厂
var playerFactory = function(name, teamColor) {
  var newPlayer = new Player(name, teamColor)
  playerDirector.receiveMessage('addPlayer', newPlayer)
  return newPlayer
}

// 玩家代理
var playerDirector = (function() {
  var player = {}
  var operations = {}

  operations.addPlayer = function(player) {
    var teamColor = player.teamColor
    // 如果该颜色还没有玩家，则新建一个队伍
    players[teamColor] = players[teamColor] || []
    // 添加玩家进队伍
    players[teamColor].push(player)
  }

  operations.removePlayer = function(player) {
    var teamColor = player.teamColor
    var teamPlayers = players[teamColor] || []

    for (var i = teamPlayers.length - 1; i >= 0; i--) {
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1)
      }
    }
  }
  operations.changeTeam = function(player, newTeamColor) {
    // 从原来的队里删除
    operations.removePlayer(player)
    // 改变队伍的颜色
    player.teamColor = newTeamColor
    // 增加到新队伍当中
    operations.addPlayer(player)
  }
  operations.playerDead = function(player) {
    var teamColor = player.teamColor
    var teamPlayers = players[teamColor]

    var all_dead = true

    for (var i = 0, player; (player = teamPlayers[i++]); ) {
      if (player.state !== 'dead') {
        all_dead = false
        break
      }
    }

    if (all_dead === true) {
      for (var i = 0, palyer; (player = teamPlayers[i++]); ) {
        player.lose()
      }

      for (var color in players) {
        if (color !== teamColor) {
          var teamPlayers = players[color]
          for (var i = 0, player; (palyer = teamPlayers[i++]); ) {
            player.win()
          }
        }
      }
    }
  }
  var receiveMessage = function() {
    var message = Array.prototype.shift.call(arguments)
    operations[message].apply(this, arguments)
  }
})()

var player1 = playerFactory('皮蛋', 'red')
var player2 = playerFactory('小丫', 'red')
var player3 = playerFactory('狗蛋', 'red')
var player4 = playerFactory('二娃', 'red')

var player5 = playerFactory('黑妞', 'green')
var player6 = playerFactory('小米', 'green')
var player7 = playerFactory('二狗', 'green')
var player8 = playerFactory('开元', 'green')

player1.die()
player2.die()
player3.die()
player4.die()
```

### 中介者模式-购买商品 🌰

```js
// 手机库存
var goods = {
  'red|32G': 3,
  'red|64G': 5
  'blue|32G': 1
  'blue|64G': 14
}

var mediator = (function() {
  var colorSelect = document.getElementById('colorSelect')
  var memorySelect = document.getElementById('memorySelect')
  var numberInput = document.getElementById('numberInput')
  var colorInfo = document.getElementById('colorInfo')
  var numberInfo = document.getElementById('numberInfo')
  var memoryInfo = document.getElementById('memoryInfo')
  var nextBtn = document.getElementById('nextBtn')

  return {
    changed: function(obj) {
      var color = colorSelect.value,
          memory = memorySelect.value,
          number = numberInput.value,
          stock = goods[color + '|' + memory]

      if(obj === colorSelect) {
        colorInfo.innerHTML = color
      } else if(obj === memorySelect) {
        memoryInfo.innerHTML = memory
      } else if(obj === numberInput) {
        numberInfo.innerHTML = number
      }

      if(!color) {
        nextBtn.disabled = true
        nextBtn.innerHTML = '请选择手机颜色'
        return
      }

      if(!memory) {
        nextBtn.disabled = true
        nextBtn.innerHTML = '请选择内存大小'
        return
      }

      if((number - 0) | 0) !== number - 0) {
        nextBtn.disabled = true
        nextBtn.innerHTML = '请输入正确的购买数量'
        return
      }

      nextBtn.disabled = false
      nextBtn.innerHTML = '加入购物车'
    }
  }
})()

colorSelect.onchange = function() {
  mediator.changed(this)
}

memorySelect.onchange = function() {
  mediator.changed(this)
}

numberInput.oninput = function() {
  mediator.changed(this)
}
```
