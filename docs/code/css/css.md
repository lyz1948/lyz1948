# Css

## 滚动条样式

```css
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}
::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 6px;
}
::-webkit-scrollbar-thumb:vertical {
    height: 5px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
}
::-webkit-scrollbar-thumb:horizontal {
    width: 5px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
}
```

## 清除浮动

``` css
.clear{
  clear:both;
}
.clear{
  zoom:1;
}
.clear:before, .clear:after{
  content: "";
  display: block;
  clear:both;
}
```

## select 默认样式

```css
appearance: none;
-moz-appearance: none;
-webkit-appearance: none;
```

## 屏幕横竖屏

``` css
@media screen and (orientation:portrait) {
  /* css[竖向定义样式] */
}

@media screen and (orientation:landscape) {
  /* css[横向定义样式] */
}
```

## 固定背景

```css
background-attachment: fixed;
```

## 倒影

``` css
-webkit-box-reflect: 0px -webkit-gradient(
  linear, 渐变形式
  left top, 起始位置
  left bottom, 结束位置
  form(transparent), 开始颜色
  color-stop(50%,transparent),中间过渡颜色
  to(rgba(255,255,255,.3)) 结束颜色
)
```

## 字体抗锯齿

```css
-webkit-font-smoothing: antialiased;
```

## 隐藏元素

```css
-webkit-backface-visibility: hidden;
```

## 鼠标样式

```bash
cursor: auto; 放大镜
cursor: zoom-out; 放小镜
cursor: move; 移动光标
cursor: rul(xxx.cur),pointer;
```

/* auto 自动
all-scroll 移动
col-resize 左右托大窗口
crosshair 十字星
default 默认指针
hand 手
move 移动
help 帮助
no-drop 禁止
not-allowed 静止
pointer 手形
progress 加载
text 光标
wait 等待
row-resize 上下托大窗口
vertical-text 垂直光标
zoom-in; 放大镜
zoom-out; 放小镜
move; 移动光标
url ( url ) // 图片地址
*/

## font缩写

```css
font: font-style,font-weight,font-size,line-height,font-family
```

## 单词折断

```css
word-break: normal|keep-all|break-all;
white-space: normal|pre|pre-wrap|pre-line|nowrap|pre-wrap;
white-space: pre-wrap

text-overflow: clip | ellipsis;
```

## 属性选择器

```css
[type=button]{color:blue;}
```

## 伪元素 (自己会创建元素)

-berfore 里面必须要有：content 属性
-after
first-letter
first-line

## 伪类

- a:link
- a:visited
- a:hover
- a:active
解决鼠标visited后hover无效的问题，将hover放到visited后面

区别伪元素和伪类
::: tip
div::berfore 双冒号
a:hover 单冒号
:::

## 溢出隐藏

单行文字溢出隐藏

``` css
overflow: hidden;
text-overflow: ellipsis;
white-space:nowrap;
```

多行文字溢出隐藏

// 方法1
``` css
p {
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

// 方法2

``` css
p {
  position:relative;
  line-height:1.5em;
  /* 高度为需要显示的行数*行高，比如这里我们显示两行，则为3 */
  height:3em;
  overflow:hidden;
}
p:after {
  content:"...";
  position:absolute;
  bottom:0;
  right:0;
  padding: 0 5px;
  background-color: #fff;
}
```

## 表格

- 单元格默认平分table宽度
- th 默认加粗 左右上下居中
- td 默认上下居中 居左
- table 决定整个表格宽度
- 表格里面每一列必须有宽度
- 表格同一竖列、同一行 继承最大宽、高

::: warning
**注意事项：**
不要给table th td 以外表格的加样式
:::

可横跨的列

``` css
colspan: 3;
```

可竖跨的行

``` css
rowspan: 3;
```

合并表格边框

``` css
table { border-collapse: collapse}
```

> 标签嵌套规范： p标签里不能包含块标签

## 动画

- animation:myfirst 5s linear 2s infinite alternate;
  动漫 函数名 延时 功能 延时 迭代计数 备用

``` css
@keyframes myfirst
{
  0% {background:red; left:0px; top:0px;}
  25% {background:yellow; left:200px; top:0px;}
  50% {background:blue; left:200px; top:200px;}
  75% {background:green; left:0px; top:200px;}
  100% {background:red; left:0px; top:0px;}
}
```

## 3D变换 transform

```css
transform-origin: 旋转基点 上 下 左 右
transform:scale() 缩放比例
transform:rotate() 选择角度
```

- rotate(45deg) 选择45度
- rotateX() x轴旋转
- rotateY() y轴旋转
- translateZ() z轴旋转

建立3d场景

```css
transform-style: preserve-3d;
```

- prespective 景深

```css
prespective-origin: 800px; // 景深基点
```

## transition 过度

```css
transition：1s width, 2s heigth linear;
// transition: 运动时间 运动样式 延迟时间 运动形式
```

以下几种运动形式

- ease 逐渐变慢
- linear 均速
- ease-in 加速
- ease-out 减速
- ease-in-out 先减速，后加速
- cubic-bezier (x1,y1,x2,y2) 贝塞尔曲线

## 六边形的思路

> 3个分别嵌套的div， 将最外面的div旋转120°，
将第二个div旋转-60°
将最里面的div旋转-60°，
用visibility:hidden将3个div占位置隐藏 在将第3个div用visibility:visible优先显示最里层的div，最后，将前2个div overflow:hidden

## 弧形

圆形 将4个角的弧度设置为100%

扇形 设置一个角的弧度为100%

半圆 设置2个角的弧度为100% 另外将 宽 或者 高 的值去掉一半

弧形 设置2个‘对角’的弧度为100% 另外旋转45都

> 三角形 先给盒子加上边框，然后将盒子的宽高设置为0，然后分别给4个边的边框加颜色
border-left-color border-top-color border-right-color border-bottom-color 将要显示的一边设置颜色，其他3边颜色透明
