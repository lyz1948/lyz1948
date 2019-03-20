# IE兼容问题

- lt 小于
- gt 大于
- lte 小于等于
- gte 大于等于

``` js
<!-- [if IE]>
//只有在IE才执行这里的代码
<![endif]-->

<!-- [if IE 6]>
//只有在IE6才执行这里的代码
<![endif]-->


<!-- [if gt IE 6]>
//大于IE6才会执行
<![endif]-->

<!-- [if ! IE 7]>
//大于IE7以上不生效
<![endif]-->
```

选择符前缀hack（注意：IE9以上不识别，内联样式内不适用）

\*html 只对IE6生效

\*+html 只对IE7生效

样式属性前缀法

\*width: 只在IE6下生效

\_width: IE6-7 下生效


IE6 fixed问题解决hack方法

``` css
*html, * html body{
  background-image: url(about:blank);
  background-attachment: fixed;


* html #menu{
  position: absolute;
  top: expression(((e=document.documentElement.scrollTop)?e:document.body.scrollTop)+100+'px');
  }
}
```

- 在IE6下浮动，如果宽度需要内容撑开

> 解决方式: 给里边的元素加浮动

- 在IE6/7下，要通过浮动并在同一行

> 解决方式: 给这2个元素都加上浮动

- 在IE6下最小高度问题，在IE6下,元素的高度小于19的时候，会被当作19像素，

> 解决方式 overflow:hidden;

- 在IE6下 border: 1px dotted 点线问题

> 解决方法：切背景平铺

- 在IE6下 解决margin 重叠

> 解决方法：要触发haslayout

- 在IE6下父级有边框的时候，子元素的margin值消失

> 解决办法：触发父级的haslayout

- 在IE6下双边距bug,在IE6下块元素浮动和横向的margin值，会被放大成2倍

> 解决方法： display: inline;

- 在IE6 7下，li本身没有浮动，但是li的内容浮动，li下边就会产生一个间隙

> 解决办法1： 给li加浮动，加宽度
解决办法2：给li加vertical-align: top;

- 当IE6下最小高度问题和li的间隙共存的时候，给li加浮动

- 当一行子元素占有的宽度之和和父级的宽度相差3px,或者有不满行的时候，最后一行的子元素下的margin在IE6下会失效

- 子元素的宽度和父级的宽度相差小于3像素时候，2个元素浮动中间有注释，或者内嵌元素

> 解决办法： 用div把注释或者内嵌元素包起来，或者调整宽度

- 当浮动元素和绝对定位元素是并列关系的时候，在IE6下绝对定位元素会消失

> 解决办法：给定位元素外面包个div

- 在IE67下，子元素有相对定位的话，父级的overflow包不住了

> 解决办法： 给父级也加相对定位

- 在IE6下，绝对定位元素的父级宽高是奇数的时候，元素的right值和bottom值会有1px的偏差

- 在IE6，7下输入类型的表单控件各有1px间隙

> 解决办法：给input 加浮动

- 在IE6，7下输入类型的表单控件加border:none; 无效

> 解决办法： 重置input背景

- 在IE6，7下输入类型的表单控件输入文字时候，背景会随文字移动

> 解决办法：把背景加给父级
