(window.webpackJsonp=window.webpackJsonp||[]).push([[121],{457:function(a,t,n){"use strict";n.r(t);var s=n(0),e=Object(s.a)({},function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[n("h1",{attrs:{id:"作用域"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#作用域","aria-hidden":"true"}},[a._v("#")]),a._v(" 作用域")]),a._v(" "),n("p",[a._v("预解析")]),a._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[a._v("解析流程")]),a._v(" "),n("p",[a._v("预解析：\n查找关键字：如var functioin 参数等\n当关键字var 和 function 重名的时候只保留function\n2 逐行解读代码：\n读代码的是从上到下，从左到右的顺序，遇到表达式如：+ - * ／ % = 时候会进行赋值操作")])]),a._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[a._v("alert")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v("\n")])])]),n("div",{staticClass:"custom-block tip"},[n("p",[a._v("以上代码执行的顺序")]),a._v(" "),n("ol",[n("li",[a._v("预解析:\na = undefined")]),a._v(" "),n("li",[a._v("逐行解读代码:\nalert(a)  // undefined")])])]),a._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("function")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("fn1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("alert")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("3")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("fn1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("alert")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),n("div",{staticClass:"custom-block tip"},[n("p",[a._v("1: 预解析\na = undefined\nfn1 = function fn1() { alert(a) var a = 3}\n2: 读代码\na = 2  把2赋值给a\nfn1() 函数调用,函数是一个局部作用域，调用时候会执行内部的域解析域代码执行\n1: 预解析 a = undefined\n2: 读代码 => alert(a) // undefined => a = 3\nalert(a)  // 2")])]),a._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("function")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("fn1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("alert")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n  a "),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("3")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("fn1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("alert")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),n("div",{staticClass:"custom-block tip"},[n("p",[a._v("1: 预解析\na = undefined\nfn1 = function fn1() { alert(a)  a = 3 }\n2: 读代码\na = 2  把2赋值给a\nfn1() 函数调用,函数是一个局部作用域，调用时候会执行内部的域解析域代码执行\n1: 预解析(没有找到任何关键字var fn)\n2: 读代码 => alert(a) // 2  子级作用域会找到父级的a\na = 3  把外面的a修改为 3\nalert(a)  // 3")])]),a._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("function")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("fn1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[a._v("a")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("alert")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n  a "),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[a._v("3")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("fn1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("alert")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),n("div",{staticClass:"custom-block tip"},[n("p",[a._v("1: 预解析\na = undefined\nfn1 = function fn1(a) { alert(a)  a = 3 }\n2: 读代码\na = 2\nfn1() => a = undefined => alert(a) => //undefined => a = 3\n函数调用时候没有传参数，等于var a;  a = 3  只是赋值给fn1函数内的参数a,并不会修改全局定义的a\nalert(a) // 2")])])])},[],!1,null,null,null);t.default=e.exports}}]);