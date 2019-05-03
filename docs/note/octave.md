# Octave

## Install

[Octave 官网](http://wiki.octave.org/Octave_for_GNU/Linux) 查看安装方式

**macOS 平台**

```js
brew install octave
```

**Docker**

```js
docker pull mtmiller/octave
docker run mtmiller/octave octave --version
```

### 加减运算

加法

```js
5 + 8
```

减法

```js
10 - 2
```

乘法

```js
6 * 7
```

### 比较运算

等于

```js
1 == 2 % false
```

在 octave 里的 `%` 是注释符

不等于

```js
1 ~= 2 % true
```

不等操作符是`~`，而不是`!`

注释符 `%`

```js
1 == 2 % false
```

与

```js
1 && 2 % and
```

或

```js
1 || 0 % OR
xor(1, 0)
```

赋值

```js
a = 42
a // 42

b = 'hello'
b // hello

c = 2 >= 1
c // 1

a = pi

a // 3.1416
```

对于更复杂的命令，使用`disp`来打印

```js
disp(a)
a // 3.1416

disp(sprintf('2 decimals: %0.2f', a))
// 2 decimals: 3.14

disp(sprintf('6 decimals: %0.6f', a))
// 6 decimals: 3.141593
```

`2 decimals:`是字符串， `%0.2f`是代替 a 的值需要放这里, `0.2f`只显示小数点的后 2 位数字

`format long` 命令显示默认的位数， 对应的命令`format short`显示少量的位数，默认是输出小数点后少量的数字

加个'`;`'可阻止输入后打印出赋值的结果

```js
a = 42
```

隐藏命令行前面的`octave`文字与版本号

```js
PS('>> ')
```

### 向量和矩阵

3 行 2 列的矩阵

```js
A = [1 2; 3 4; 10 20]

A =
  1   2
  3   4
  10  20
```

列向量

```js
v = [1; 2; 3]
```

**3 行一列的向量**
从 1 开始，步长为 0.1，一直增长到 2

```js
v = 1:0.1:2
v = 1:6
```

另外一些生成矩阵的方法

```js
C = ones(2, 3)
```

`ones()`函数来生成一个矩阵，上面的的例子生成了一个 2 行 3 列的矩阵，矩阵里的值都为 1。我们还可以这样

```js
C = 3*ones(2, 3)

C =
  3   3   3
  3   3   3
```

等同于下面这样的操作

```js
C = [3 3 3; 3 3 3]
```

```js
v = once(1, 3)

x = zeros(1, 3)

x = rand(1, 3)
```

`zeros()` 生成 1 行 3 列的值为 0 的矩阵
`rand()` 生成 1 行 3 列的值为 0~1 的随机值的的矩阵

高斯平局分布

```js
w = randn(1, 3)
```

`randn()`生成了 1 行 3 列的 3 个值，它们服从高斯分布，均值为 0。标准差或者方差为 1

```js
w = -6 + sqrt(10) * randn(1, 10000)
hist(w)
hist(w, 20)
```

w 是一个以根号 10 乘以高斯随机变量生成的矩阵, 均值为-6 的高斯分布直方图，这个高斯随机变量的方差为 10， 其标准差是根号 10，约等于 3.1
我们可以用`hist(w)` 函数来生成`w`直方图

`eye()`函数表示生成单位矩阵

```js
H = eye(4)
```

`help` 帮助函数

```js
help eye

help rand

help help
```

## 移动数据

```js
A = [1 2; 3 4; 5 6]

r = size(A)
// 3  2

size(r)
// 1  2

size(A, 1)
// 3

size(A, 2)
// 2
```

`size(A)` 接受一个矩阵，返回矩阵的行列数
`size(A, 1)` 返回 A 矩阵的第一维的大小，A 矩阵的行数，这里是 3
`size(A, 2)` 返回 A 矩阵的第一维的大小，A 矩阵的列数，这里是 2

`length()` 返回向量的大小

```js
v = [1 2 3 4]
length(v) // 4

length(A) // 3
```

A 是 3 行 2 列的矩阵，这里使用`length()` 得到了 3

### 读入文件数据

先切换到文件目录，再使用`load()`函数引入文件

```js
load filename
load('filename')
```

`who()` 查看已存在的变量

```js
A    H    V    a    ans  b    c    h    r    v    w    x
```

`whos()` 显示更详细的信息

```js
   Attr Name        Size                     Bytes  Class
   ==== ====        ====                     =====  =====
        A           3x2                         48  double
        H           4x4                         32  double
        V           1x1                          8  double
        a           1x1                          8  double
        ans         1x1                          8  double
        b           1x2                          2  char
        c           2x3                         48  double
        h           1x6                         24  double
        r           1x2                         16  double
        v           3x1                         24  double
        w           1x100                      800  double
        x           1x3                         24  double
```

`clear` 删除某个变量或文件

```js
clear A

   Attr Name        Size                     Bytes  Class
   ==== ====        ====                     =====  =====
        H           4x4                         32  double
        V           1x1                          8  double
        a           1x1                          8  double
        ans         1x1                          8  double
        b           1x2                          2  char
        c           2x3                         48  double
        h           1x6                         24  double
        r           1x2                         16  double
        v           3x1                         24  double
        w           1x100                      800  double
        x           1x3                         24  double
```
