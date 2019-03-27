# HTML

<Slider1 />

## 圣杯布局

```css
.main, .left, .right{position: relative; float: left;}
.wrap {padding: 0 160px 0 140px;}
.main {width: 100%;}
.left {margin-left: -100%; left: -140px; width: 120px;}
.right {margin-left: -140px; right: -160px; width: 140px;}
```

<LayoutHoly />

## 双飞翼布局

```css
.main {width: 100%;}
.main .inner {margin: 0 160px 0 140px; height: 240px;}
.left {margin-left: -100%; width: 120px; height: 240px;}
.right {margin-left: -140px; width: 140px; height: 240px;}
```

<LayoutDoubleFly />

## Flex弹性布局

<LayoutCenter />

### 居中布局

<LayoutFlex />

### 等宽分布

<LayoutAverageWidth />

### 等高分布

<LayoutAverageHeight />

### 多列平分

<LayoutRow />

## 全屏布局

### 定宽

<LayoutFullFixWidth />

### 百分百布局

<LayoutFullPrecent />

### flex+定宽布局

<LayoutFullFlex />

### flex+百分百布局

<LayoutFullFlexPrecent />

### flex+自适应布局

<LayoutFullFlexAuto />

