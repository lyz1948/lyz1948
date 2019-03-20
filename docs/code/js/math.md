# Math

## 归纳法

 ```js
 1 = 1²
 1 + 3 = 2²
 1 + 3 + 5 = 3²
 1 + 3 + 5 + 7 = 4²
 1 + 3 + 5 + 9 = 5²
 1 + 3 + (2n - 1) = n²
 1 + 3 + (2n - 1) + (2n + 1) = n² + (2n + 1) => (2n + 1)²
 ```

## 三角函数

勾股定理：
直角两条边的平方和等于斜边的平方

**常用三角函数**

```js
sinθ = a / h
cosθ = b / h
tanθ = a / b
```

正玄 `sin30°` 三角形中30°的角`对边`与`斜边`的比值为 `1/2`
余弦 `cos30°` 三角形中30°的角`临边`与`斜边`的比值为 `√3/2`
正切 `tan30°` 三角形中30°的角`对边`与`临边`比值为 `√3/3`

**在`js`中的写法**

```js
Math.sin()
Math.cos()
Math.tan()
```

**弧度计算**

```js
周长 / 直径(2r) = π
360° = 2π
1弧度 = 2π / 360 = 180 / π
```

**角度转弧度**
将30°角转换成弧度，对应的公式为：

```js
Math.sin(30 * Math.PI / 180)
```

**极坐标系和单位圆**
在笛卡尔直角坐标系中，任一点 (x, y) 都可以转化成极坐标表示 (r, θ)，其中

```js
r = Math.sqrt(x^2 + y^2)
θ = Math.atan2(y, x)
```

单位圆的定义是半径为单位长度的圆，圆上任意一点的横坐标就是对应角度的余弦值，任意点的纵坐标就是对应角度的正弦值
![查看效果](http://odbzr9u4f.bkt.clouddn.com/%E6%AD%A3%E7%8E%84%E6%9B%B2%E7%BA%BF%E5%8F%98%E6%8D%A2.png)

正弦曲线公式:

```js
 y = A sin(Bx + C) + D
 ```

A 控制振幅，A 值越大，波峰和波谷越大，A 值越小，波峰和波谷越小； B 值会影响周期，B 值越大，那么周期越短，B 值越小，周期越长。 C 值会影响图像左右移动，C 值为正数，图像右移，C 值为负数，图像左移。 D 值控制上下移动。

应用场景

**图像应用**
三角函数绘制Wave曲线

```js
for(let x = 0; x < width; x++) {
  const y = Math.sin(x * a) * amplitude
}
```

再结合三角函数偏移让左右成为波谷，中间成为波峰，就能得到曼妙的波纹

```js
for(let x = 0; x < width; x++) {
  const radians = x / width * Math.PI * 2
  const scale = (Math.sin(radians - Math.PI * 0.5) + 1) * 0.5
  const y = Math.sin(x * 0.02 + xSpeed) * amplitude * scale
}
```

**SlowInSlowOut**
正余弦曲线有很自然地缓入缓出的特性，并且在一个周期里面从 -1 到 1 再回到 -1，非常适合用来模拟一些物理效果。
只需使用 sin 或 cos 乘以最大角度，就可以得到在摆动最大角度之间的 SlowInSlowOut

```js
ctx.rotate(Math.cos(t / 180 * Math.PI) * Math.PI * 0.25)
```

角度控制

Math.atan2(y, x) 可以用来计算 (x, y) 和 x 轴正方向的夹角弧度值

```js
function getCurrentDegree () {
  const deltaX = mouse.x - window.innerWidth * 0.5
  const deltaY = mouse.y - window.innerHeight * 0.5
  return Math.atan2(deltaY, deltaX) * 180 / Math.PI
}
```

`compass`写三角函数例子

```js
@import "compass";

.checkbox:checked {
  ~ button {
    $per: 180 / 4;
    @for $i from 1 through 6 {
      &:nth-of-type(#{$i}) {
        $angle: $per * ($i - 1) * 1deg + 180deg;
        $x: cos($angle) * $d;
        $y: sin($angle) * $d;
        transform: translate($x, $y) rotate(0deg) ;
      }
    }
  }
}
```

反三角函数

```js
Math.asin()
Math.asin()
Math.asin()
```

平方

```js
Math.pow(5, 2) // 5 的平方
```

立方

```js
Math.pow(5, 3) // 5 的立方
```

开平方

```js
Math.sqrt(9) // 9 开平方
```

开立方

```js
Math.sqre(9, 1/3) // 9 开立方
```

随机数

```js
Math.random()
```

最小值，接受2个参数，返回最小的值

```js
Math.min()
```

最大值，接受2个参数，返回最大的值

```js
Math.max()
```

向上取整， 接受小数，转换为整数

```js
Math.ceil()
```

向下取整， 接受小数，转换为整数

```js
Math.floor()
```
