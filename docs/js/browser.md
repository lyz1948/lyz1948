# 浏览的属性

```js
// 浏览器窗口宽度
window.outerWidth

// 浏览器窗口的高度
window.outerHeight

// 浏览器窗口内容区域的宽度（包括纵行滚动条的宽度，如果有的话）
window.innerWidth

// 浏览器窗口内容区域的高度（包括横行滚动条的高度，如果有的话）
window.innerHeight

// 屏幕的宽
screen.width

// 屏幕的高
screen.height

// 屏幕可用区域的高度（不包括菜单栏）
screen.availHeight

// 屏幕可用区域的宽度
screen.availWidth

// 浏览器窗口距离屏幕左边的距离
screenLeft

// 浏览器窗口距离屏幕顶部的距离
screenTop

// 浏览器窗口内部高度
document.documentElement.clientHeight
document.body.clientHeight

// 浏览器窗口内部宽度
document.documentElement.clientWidth
document.body.clientWidth

document.body.clientTop

document.body.clientLeft

// 获取body的宽度
document.body.offsetWidth

// 获取body的高度
document.body.offsetHeight

document.body.offsetTop

document.body.offsetLeft

offsetParent

document.body.scrollWidth
document.body.scrollHeight

event.clientX

event.screenX

event.offsetX

event.pageX

event.pageY

getBoundingClientRect().top
```

**Window上与宽高有关的属性`innerWidth/innerHeight`**
浏览器窗口的视口（viewport）宽/高度（以像素为单位），如果存在水平/垂直滚动条，则包括它

```js
var intViewportHeight = window.innerHeight;
var outViewportWidth = window.outerWidth;
```

outerWidth/outerHeight
获取整个浏览器窗口的宽/高度,包括侧边栏和镶边

```js
var outWindowHeight = window.outerHeight;
var outWindowWidth = window.outerWidth;
```

![](https://developer.mozilla.org/@api/deki/files/213/=FirefoxInnerVsOuterHeight2.png)

屏幕的宽/高度，不管窗口如何缩放都不会改变宽高
screen.width/screen.height

屏幕可利用的宽/高度，不管窗口如何缩放都不会改变宽高
screen.availHeight/screen.availWidth

浏览器窗口距离屏幕顶部/左侧的距离
window.screenTop/window.screenLeft

## document上与宽高有关的属性

padding + content 不包含滚动条的高/宽
document.body.clientWidth/document.body.clientHeight

1.如果没有内边距(padding)滚动条(scrollbar)

```
clientWidth = style.width;  
clientHeight = style.height
```

2.如果有内边距(padding)

clientWidth = style.width + style.paddingLeft + style.paddingRight;  
clientHeight = style.height + style.paddingTop + style.paddingBottom;  

3.如果有内边距(padding)和滚动条(scrollbar)

clientWidth = style.width + style.paddingLeft + style.paddingRight - 滚动条的宽;
clientHeight = style.height + style.paddingTop + style.paddingBottom - 滚动条的高;

document.body.clientTop/document.body.clientLeft

clientTop = style.borderTop
clientLeft = style.borderLeft

document.body.offsetWidth/document.body.offsetHeight

offsetWidth = style.width + style.paddingLeft + style.paddingRight + style.borderLeft + style.borderRight

offsetHeight = style.height + style.paddingTop + style.paddingBottom + style.borderTop + style.borderBottom

1.如果没有内边距(padding)滚动条(scrollbar)无边框(border)

offsetWidth = clientWidth = style.width;  
offsetHeight = clientHeight = style.height

2.如果有padding,没有滚动条(scrollbar)无边框(border)

offsetWidth = style.width + style.paddingLeft + style.paddingRight + style.borderLeft + style.borderRight;  
offsetWidth = clientWidth + style.borderLeft + style.borderRight;  
offsetHeight = style.height + style.paddingTop + style.paddingBottom + style.borderTop + style.borderLeft;  

3.如果有内边距(padding)有滚动条(scrollbar)有边框(border)
offsetWidth = style.width + style.paddingLeft + style.paddingRight + style.borderLeft + style.borderRight + 滚动条的宽;
offsetWidth = clientWidth + style.borderLeft + style.borderRight + 滚动条的宽;
offsetWidth = style.height + style.paddingTop + style.paddingbottom + style.borderTop + style.borderBottom + 滚动条的宽;

document.body.offsetTop/document.body.offsetLeft

offsetParent.top/ offsetParent.left

document.body.scrollWidth/document.body.scrollHeight 

1.body给定宽高小于浏览器的宽高时候，就是可视区的宽高

2.body给定宽高大于浏览器的宽高时候，并且内容小于给定宽高

scrollWidth = style.width + padding + margin + border

scrollHieght = style.height + padding + margin + border

3.body给定宽高大于浏览器的宽高时候，但内容大于给定宽高

scrollWidth = scrollWidth内容.width + padding + margin + border

scrollHeight = scrollHeight内容.height + padding + margin + border

### element.scrollWidth/element.scrollHeight

1.无滚动条
scrollWidth = clientWidth = style.width + paddingLeft + paddingRight

2.有滚动条
scrollWidth = style.width + paddingLeft + paddingRight - 滚动条的宽

元素滚动出可视区外的高度与宽度
document.body.scrollTop/document.body.scrollLeft

document.documentElement

``` js
console.log(document) // #document
console.log(document.documentElement) // html
console.log(document.body) // body
```

### Event 坐标属性

#### clientX/clientY

元素clientX/clientY的位置，相对于浏览器左上角(0,0)的坐标来定位，当滚动页面后，位置会改变。

#### screenX/screenY

元素screenX/screenY的位置，相对于设备屏幕的左上角(0,0)坐标

#### offsetX/offsetY

元素offsetX/offsetY的位置，相对于事件源(0,0)的坐标，就是元素的位置坐标

#### pageX/pageY

元素pageX/pageY的位置，相对于整个网页(0,0)的坐标

#### X/Y

IE的属性，相对于用CSS动态定位的最内层元素