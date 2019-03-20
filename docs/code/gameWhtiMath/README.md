# 游戏开发的数学与物理

## 1.物体运动

### 水平方向直行运动

```js
// 初始化数据
var x = 0 // 物体初始位置
var v = 3  // 物体在x方向的速度

var moveTo = function(obj) {
  const render = () => {
    if(x < 500) {
      x += v
    }
    obj.style.left = x + 'px'
    timer = requestAnimationFrame(render)
  }
  cancelAnimationFrame(timer)
  var timer = requestAnimationFrame(render)
  return x
}
```

### 水平方向往返运动

```js
// 初始化数据
var x = 0 // 物体初始位置
var v = 3  // 物体在x方向的速度
var target = 500 // 目标点

var moveTo = function(obj) {
  const render = () => {

    if(x < target) {
      x += v
    }
    if(x > target - obj.clientWidth) { // 物体碰到右壁
      v = -v    // 弹回
      x = target - obj.clientWidth // 重新设定目标
    }
    if(x < 0) {
      v = -v
      x = 0
    }
    obj.style.left = x + 'px'
    timer = requestAnimationFrame(render)
  }
  cancelAnimationFrame(timer)
  var timer = requestAnimationFrame(render)
  return x
}

```

## 2.键盘控制物体运动呢


## 3.物体任意方向运动

v 运动速度
x x轴方向
y y轴方向

θ 物体速度与物体运动方向的夹角

Vx = a * v
Vy = b * v
这􏲯的 a、b 􏳪􏰰常数，􏵡􏰰􏱅例􏵢数,􏱅􏱖系数 a 􏱘􏰿 v 􏰱加 1 时，vx 􏰱加 a

速度 = 移动距离/时间
移动距离是位置变化量`Δx` `Δ`是变化量

位置与速度的关系公式：

```js
v = Δx / Δt
```

􏳠假设加速度为`a`, 速度变化量为`Δv` 公式为

```js
a = Δv/Δt
```

每单位时间速度的变化量是加速度，那么上面公式变形一下可以得到

```js
Δx = v * Δt
Δv = a * Δt
```

时间Δt的单位为帧，运动一次的时间为1帧，即Δt = 1

```js
Δx = v
Δv = a
```

x 是变化量，假设当前的x为Xn, 则上一次为Xn-1, 那么x计算得出

```js
x = Xn - Xn-1
```

同理，V的变化量就是

```js
v = Vn - Vn-1
```

那么公式可以表示为：

```js
Xn - Xn-1 = v
Vn - Vn-1 = a
```

然后将Xn-1 与 Vn-1移到右边得到：

```js
Xn  = Xn-1 + v
Vn  = Vn-1 + a
```


## 随机飞溅运动

随机速度

```js

```

## 圆周运动

```js
x = Math.cos(θ)
y = Math.sin(θ)
```

在一个原点为中心半圆（半径为1的圆）上，根据θ就可以表示一个点的位置，θ随着时间的递增，就会形成以圆点为中心半径为1的圆周运动

```js
x = r * Math.cos(θ) + X0
y = r * Math.sin(θ) + Y0
```

增加角度, 每次增加30度

```js
fAngle += 2 * Math.PI / 120
```

角度公式

```js
ω = θ / t
```

如何得出多长时间`T`走完一周？更加上面获取角度的公式可以得出

```js
ω = 2 * PI / T
```

2 * PI 等于 360 度

```js
θ = 2 * PI * (t / T)
```

当一个物体被施加力的时候，该物体会产生与所施加力成比例的速度，公式如下：

```js
F = m * a
```

`F` 被施加的力
`m` 物体的质量
`a` 物体参数的速度
这就是著名的**运动方程式**（牛顿第二定律）

```js
a = F / m
```

位置、速度、加速度之间的公式关系

```js
v = dx / dt
a = dv / dt
```

可以得到下面的公式

```js
a = d / dt * (dx / dt)
  = d²x / dt²
```