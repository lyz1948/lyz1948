function Vector(x, y) {
  this.x = x
  this.y = y
}

Vector.prototype.plus = function(vector) {
  return new Vector(this.x + vector.x, this.y + vector.y)
}

Vector.prototype.minus = function(vector) {
  return new Vector(this.x - vector.x, this.y - vector.y)
}

function Grid(width, height) {
  this.space = new Array(width * height)
  this.width = width
  this.height = height
}

Grid.prototype.isInside = function(vector) {
  return (
    vector.x > 0 &&
    vector.x < this.width &&
    vector.y > 0 &&
    vector.y < this.height
  )
}

Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y]
}

Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value
}

Grid.prototype.forEach = function(fn, ctx) {
  for (let y = 0; y < this.height; y++) {
    for (let x = 0; x < this.width; x++) {
      const value = this.space[x + y * this.width]
      if (value != null) {
        fn.call(ctx, value, new Vector(x, y))
      }
    }
  }
}

// 方向坐标
const directions = {
  n: new Vector(0, -1),
  ne: new Vector(1, -1),
  e: new Vector(1, 0),
  se: new Vector(1, 1),
  s: new Vector(0, 1),
  sw: new Vector(-1, 1),
  w: new Vector(-1, 0),
  nw: new Vector(-1, -1),
}

const directionNames = 'n ne e se s sw w nw'.split(' ')

// 随机方位函数
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

// 墙 函数
function Wall() {}

// 弹跳小动物
function BouncingCritter() {
  // 生成随机方向
  this.direction = randomElement(directionNames)
}

BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != ' ') {
    this.direction = view.find(' ') || 's'
    return { type: 'move', direction: this.direction }
  }
}

// 元素转换为字符
function elementFromChar(legend, ch) {
  if (ch == ' ') return null
  let element = new legend[ch]()
  element.originChar = ch
  return element
}

// 字符转换元素
function charFromElement(element) {
  if (element == null) return ' '
  else return element.originChar
}

function World(map, legend) {
  const grid = new Grid(map[0].length, map.length)
  this.grid = grid
  this.legend = legend

  map.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      grid.set(new Vector(x, y), elementFromChar(legend, line[x]))
    }
  })
}

World.prototype.toString = function() {
  let output = ''

  for (let y = 0; y < this.grid.height; y++) {
    for (let x = 0; x < this.grid.width; x++) {
      const element = this.grid.get(new Vector(x, y))
      output += charFromElement(element)
    }
    output += '\n'
  }

  return output
}

World.prototype.turn = function() {
  let acted = []
  this.grid.forEach(function(critter, vector) {
    if (critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter)
      this.letAct(critter, vector)
    }
  }, this)
}

World.prototype.letAct = function(critter, vector) {
  // 获取当前运动类型
  let action = critter.act(new View(this, vector))
  if (action && action.type == 'move') {
    // 检查当前传过来的方向是否包含已定义的方向对象中
    const dest = this.checkDestination(action, vector)
    if (dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null)
      this.grid.set(dest, critter)
    }
  }
}

// 检查方向
World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    const dest = vector.plus(directions[action.direction])
    if (this.grid.isInside(dest)) {
      return dest
    }
  }
}

function View(world, vector) {
  this.world = world
  this.vector = vector
}

View.prototype.look = function(dir) {
  const target = this.vector.plus(directions[dir])
  if (this.world.grid.isInside(target)) {
    return charFromElement(this.world.grid.get(target))
  } else {
    return '#'
  }
}

View.prototype.find = function(ch) {
  const found = this.findAll(ch)
  if (found.length == 0) return null
  return randomElement(found)
}

View.prototype.findAll = function(ch) {
  const found = []
  for (let dir in directions) {
    if (this.look(dir) == ch) {
      found.push(dir)
    }
  }
  return found
}

// 方向
function dirPlus(dir, n) {
  const index = directionNames.indexOf(dir)
  return directionNames[(index + n + 8) % 8]
}

function WallFollower() {
  this.dir = 's'
}

WallFollower.prototype.act = function(view) {
  let start = this.dir
  if (view.look(dirPlus(this.dir, -3)) != ' ') {
    start = this.dir = dirPlus(this.dir, -2)
  }

  while (view.look(this.dir) != ' ') {
    this.dir = dirPlus(this.dir, 1)
    if (this.dir == start) break
  }

  return { type: 'move', direction: this.dir }
}

let actionTypes = Object.create(null)

actionTypes.grow = function(critter) {
  critter.energy += 0.5
  return true
}

// 动物爬行
actionTypes.move = function(critter, vector, action) {
  const dest = this.checkDestination(action, vector)
  if (dest == null || critter.energy <= 1 || this.grid.get(dest) != null) {
    return false
  }
  critter.energy -= 1
  this.grid.set(vector, null)
  this.grid.set(dest, critter)
  return true
}

// 动物进食
actionTypes.eat = function(critter, vector, action) {
  const dest = this.checkDestination(action, vector)
  const atDest = dest != null && this.grid.get(dest)
  if (!atDest || atDest.energy == null) return false
  critter.energy += atDest.energy
  this.grid.set(dest, null)
  return true
}

// 动物繁殖
actionTypes.reproduce = function(critter, vector, action) {
  let baby = elementFromChar(this.legend, critter.originChar)
  let dest = this.checkDestination(action, vector)

  if (
    dest == null ||
    critter.energy <= 2 * baby.energy ||
    this.grid.get(dest) != null
  )
    return false

  critter.energy -= 2 * baby.energy
  this.grid.set(dest, baby)
  return true
}

function LifelikeWorld(map, legend) {
  World.call(this, map, legend)
}

LifelikeWorld.prototype = Object.create(World.prototype)

LifelikeWorld.prototype.letAct = function(critter, vector) {
  const action = critter.act(new View(this, vector))
  const handled =
    action &&
    action.type in actionTypes &&
    actionTypes[action.type].call(this, critter, vector, action)
  if (!handled) {
    critter.energy -= 0.2
    if (critter.energy <= 0) {
      this.grid.set(vector, null)
    }
  }
}

// 植物 构造函数
function Plant() {
  // 初始化随机能量值 3 ～ 7区间
  this.energy = 3 + Math.random() * 4
}

Plant.prototype.act = function(context) {
  // 如果植物的能量达到 15 且周边有空闲区域，会进行繁殖并将后代放置到空间中
  if (this.energy > 15) {
    const space = context.find(' ')
    if (space) {
      return { type: 'reproduce', direction: space }
    }
    // 如果不能繁殖则会不断成长至20
    if (this.energy < 20) {
      return { type: 'grow' }
    }
  }
}

// 食草动物 构造函数
function PlantEater() {
  this.energy = 20
}

PlantEater.prototype.act = function(context) {
  const space = context.find(' ')

  // 如果能量超过 60 并且有空间，则会进行繁殖
  if (this.energy > 60 && space) {
    return { type: 'reproduce', direction: space }
  }

  // * 表示植物
  const plant = context.find('*')
  // 如果有植物会吃植物
  if (plant) {
    return { type: 'eat', direction: plant }
  }

  // 如果有空间，继续爬行
  if (space) {
    return { type: 'move', direction: space }
  }
}

// 聪明的食草动物
function smartPlantEater() {
  this.energy = 30
  this.direction = 'e'
}

smartPlantEater.prototype.act = function(context) {
  const space = context.find(' ')
  if (this.energy > 90 && space) {
    return { type: 'reproduce', direction: space }
  }

  const plants = context.findAll('*')
  if (plants.length > 1) {
    return { type: 'eat', direction: randomElement(plants) }
  }

  if (context.look(this.direction) != ' ' && space) {
    this.direction = space
    return { type: 'move', direction: this.direction }
  }
}

// 老虎 构造函数
function Tiger() {
  this.energy = 100
  this.direction = 'w'
  // 追踪过去6个回合看到的猎物数量
  this.preySeen = []
}

Tiger.prototype.act = function(context) {
  // 猎物数量的平均值
  let seenPerTurn =
    this.preySeen.reduce((a, b) => {
      return a + b
    }, 0) / this.preySeen.length

  // 猎物
  const prey = context.findAll('O')
  this.preySeen.push(prey.length)

  if (this.preySeen.length > 6) {
    this.preySeen.shift()
  }

  // 只有看到猎物数量大于 1/4 的时候才进食
  if (prey.length && seenPerTurn > 0.25) {
    return { type: 'eat', direction: randomElement(prey) }
  }

  const space = context.find(' ')
  if (this.energy > 400 && space) {
    return { type: 'reproduce', direction: space }
  }

  if (context.look(this.direction) != ' ' && space) {
    this.direction = space
  }

  return { type: 'move', direction: this.direction }
}

const plan = [
  '############################',
  '#####                 ######',
  '##   ***                **##',
  '#   *##**         **  O  *##',
  '#    ***     O    ##**    *#',
  '#       O         ##***    #',
  '#                 ##**     #',
  '#   O       #*             #',
  '#*          #**       O    #',
  '#***        ##**    O    **#',
  '##****     ###***       *###',
  '############################',
]

const plan2 = [
  '####################################################',
  '#                 ####         ****              ###',
  '#   *  @  ##                 ########       OO    ##',
  '#   *    ##        O O                 ****       *#',
  '#       ##*                        ##########     *#',
  '#      ##***  *         ****                     **#',
  '#* **  #  *  ***      #########                  **#',
  '#* **  #      *               #   *              **#',
  '#     ##              #   O   #  ***          ######',
  '#*            @       #       #   *        O  #    #',
  '#*                    #  ######                 ** #',
  '###          ****          ***                  ** #',
  '#       O                        @         O       #',
  '#   *     ##  ##  ##  ##               ###      *  #',
  '#   **         #              *       #####  O     #',
  '##  **  O   O  #  #    ***  ***        ###      ** #',
  '###               #   *****                    ****#',
  '####################################################',
]

const world = new LifelikeWorld(plan2, {
  '#': Wall,
  '*': Plant,
  '@': Tiger,
  'O': smartPlantEater,
})

console.time('start')
for (let i = 0; i < 200; i++) {
  world.turn()
}
console.log(world.toString())
console.timeEnd('start')
