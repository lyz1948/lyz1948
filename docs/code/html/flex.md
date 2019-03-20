# flex

## 父容器

设置子容器沿主轴排列：justify-content

1.位置排序

- flex-start：起始端对齐
- flex-end：末尾段对齐
- center：居中对齐

2.分列排列
space-around：子容器沿主轴均匀分布，位于首尾两端的子容器到父容器的距离是子容器间距的一半。
space-between：子容器沿主轴均匀分布，位于首尾两端的子容器与父容器相切

3.align-items

- align-items 属性用于定义如何沿着交叉轴方向分配子容器的间距。
- flex-start：起始端对齐
- flex-end：末尾段对齐
- center：居中对齐
- baseline：基线对齐，这里的 baseline 默认是指首行文字，即 first baseline，所有子容器向基线对齐，交叉轴起点到元素基线距离最大的子容器将会与交叉轴起始端相切以确定基线。
- stretch：子容器沿交叉轴方向的尺寸拉伸至与父容器一致

## 子容器

单独设置子容器如何沿交叉轴排列：align-self

- flex-start：起始端对齐
- flex-end：末尾段对齐
- center：居中对齐
- baseline：基线对齐
- stretch：拉伸对齐

## 轴

1. 主轴  → 水平方向
2. 交叉轴  垂直方向

主轴的起始端由 flex-start 表示，末尾段由 flex-end 表示。不同的主轴方向对应的起始端、末尾段的位置也不相同。

- 向右：flex-direction: row (默认)
- 向下：flex-direction: column
- 向左：flex-direction: row-reverse
- 向上：flex-direction: column-reverse

主轴沿逆时针方向旋转 90° 就得到了交叉轴，交叉轴的起始端和末尾段也由 flex-start 和 flex-end 表示。

## flex 进阶概念

### 父容器

设置换行方式：flex-wrap

- nowrap：不换行
- wrap：换行
- wrap-reverse：逆序换行
轴向与换行组合设置：flex-flow

flow 即流向，也就是子容器沿着哪个方向流动，流动到终点是否允许换行，比如 flex-flow: row wrap，flex-flow 是一个复合属性，相当于 flex-direction 与 flex-wrap 的组合，可选的取值如下

- row、column 等，可单独设置主轴方向

- wrap、nowrap 等，可单独设置换行方式

- row nowrap、column wrap 等，也可两者同时设置

多行沿交叉轴对齐：align-content
1.当子容器多行排列时，设置行与行之间的对齐方式。

- flex-start：起始端对齐
- flex-end：末尾段对齐
- center：居中对齐
- space-around：等边距均匀分布
- space-between：等间距均匀分布(首位的行到与父级无间距)
- stretch：拉伸对齐

### 子容器

设置基准大小：flex-basis
flex-basis 表示在不伸缩的情况下子容器的原始尺寸。主轴为横向时代表宽度，主轴为纵向时代表高度。

- 设置扩展比例：flex-grow
子容器弹性伸展的比例。如图，剩余空间按 1:2 的比例分配给子容器。

- 设置收缩比例：flex-shrink
子容器弹性收缩的比例。如图，超出的部分按 1:2 的比例从给子容器中减去。

- 设置排列顺序：order

#### 属性说明
display: flex;

flex-direction: row; //从左向右
flex-direction: row-reverse; //从右向左
flex-direction: column; //从上往下
flex-direction: column-reverse; //从下往上

display: flex; 默认从左到右不换行
flex-wrap:wrap; //换行
flex-wrap:wrap-reverse; //反向换行

方向() 是否换行及方式
flex-flow: <'flex-direction'>||<'flex-wrap'>

flex-flow:initial; //默认
flex-flow:column wrap; // 竖排 换行
flex-flow:row-reverse wrap //从右向左 反向换行

order
order: <interger>
initial:0; 默认是0 值越大的在最右边

flex-basis
flex-basis:main-size | <width>
设置flex item 的初始宽/高

flex-grow 最重要的一个属性
flex-grow:<number>
initial:0; 初始为0
（flex-basis + flow-grow/sum(flow-grow) * remain)

flex-shrink
flex-shrink:<number>
initial:1; 初始为1
（flex-shrink + flow-shrink/sum(flow-shrink) * remain)

flex (最重要的属性)
flex: <'flex-grow'> || <'flex-shrink'>||<'flex-basis'>
initial: 0 1 main-siez

对齐属性
justify-content
align-items
align-self
align-content

justify-content
justify-content: flex-start | flex-end | center | space-between | space-around

align-items
align-items: flex-start|flex-end|center|baseline|stretch

align-self
align-self:auto|flex-start|flex-end|center|baseline|stretch
设置单个flex item在cross-axis方向上的对齐方式

align-content
align-content:flex-start|flex-end|center|space-between|space-around|stretch
设置cross-axis方向上行对齐方式
