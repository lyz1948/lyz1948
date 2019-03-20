# HTML 属性

### 界面元素可编辑

```css
textarea.contenteditable {
  -webkit-appearance: none;
}
```

### 识别电话号码可拨号

```html
<a href="tel:1300000000">1300000000</a>
```

### WebApp 全屏模式：

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui"
/>
```

> 注意：viewport 后面加上 minimal-ui 在 safri 体现效果

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
```

### 隐藏状态栏/设置状态栏颜色

```html
<meta
  name="apple-mobile-web-app-status-bar-style"
  content="black-translucent"
/>
```

### safri 添加到主屏界面的显示标题：

```html
<meta name="apple-mobile-web-app-title" content="应用标题" />
```

### 忽略自动识别数字为电话号码：

```html
<meta content="telephone=no" name="format-detection" />
```

忽略自动识别邮箱账号：

```html
<meta content="email=no" name="format-detection" />
```

### 常用浏览器全屏设置：

```html
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait" />

<!-- UC强制全屏 -->
<meta name="full-screen" content="yes" />

<!-- UC应用模式 -->
<meta name="browsermode" content="application" />

<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait" />

<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true" />

<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app" />

<!-- 是针对一些老的不识别viewport的浏览器，列如黑莓 -->

<meta name="HandheldFriendly" content="true" />
<!-- 微软的老式浏览器 -->

<meta name="MobileOptimized" content="320" />
```

### iphone 全屏启动,隐藏浏览器的工具栏、地址栏和底部的加载状态栏

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
```

### 浏览器顶部显示一个状态栏

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
```

### 显示加载界面

```html
<link rel="apple-touch-startup-image" href="img/aa.png" />
```

### 手机横竖屏屏幕字体样式

-webkit-text-size-adjust: 100%;

### 老浏览器不能识别 viewport 问题

```html
<meta name="HandheldFriendly" content="true" />
```

### 适配

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0,user-scalable=no,target-densitydpi=medium-dpi"
/>
```

> 主流分辨率:240*320(一般不考虑)、320*480、480*800(多)、640*960(多) 480*854 1280*720 800*1280 1080*1920

1. 页面设置固定宽度 320px，margin 居中，左右留白用背景填充
2. 通过 media，根据不同的分辨率去设置不同的样式
3. 通过 100%、flex 或 rem 等手段，等比例缩放 1rem= 1 个 html 上设置的字体大小

### rem

em 相对于字体大小 font-size:24px 1em=24px
rem 相对于根节点的字体大小的计量单位
click 事件在移动端会有 300ms 的延迟

### touch 事件

touchstart == mousedown
touchmove == mousemove
touchend == mouseup

> 行内元素 margin 和 padding 问题
> 只能识别 margin-left,margin-right,padding-left,padding-right
