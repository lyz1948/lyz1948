(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{218:function(t,e,n){},296:function(t,e,n){"use strict";var i=n(218);n.n(i).a},389:function(t,e,n){"use strict";n.r(e);var i,r=[],a={mounted:function(){this.createLi(),this.findSame()},methods:{refresh:function(){this.createLi(),this.findSame()},createLi:function(){var t=document.getElementsByClassName("matrix-box")[0],e=document.createElement("ul");t.innerHTML="",e.style.width="560px",e.style.height="560px";for(var n=0;n<64;n++){var i=document.createElement("li"),a=70*Math.floor(8*Math.random());i.style.width="70px",i.style.height="70px",i.style["background-position"]=a+"px 70px",i.className="box"+a,r.push(n),e.appendChild(i)}t.appendChild(e)},toggleMatrix:function(t){for(var e=0,n=i.length;e<n;e++)i[e].innerHTML=t[e]},onMatrix:function(t,e){var n=[],i=0;return function r(){for(var a=0,s=t.length;a<s;a++)a%e===i&&n.push(t[a]);++i<e&&r()}(),n},findSame:function(){i=document.querySelectorAll("li");var t=[],e=function(e){for(var i=0,r=e[0],a=0,s=e.length;a<s;a++){if(r.className==e[a].className&&a%8!=0)i++;else{if(i>=2)for(var o=0;o<=i;o++)n(e[a-1-o])&&t.unshift(e[a-1-o]);i=0}r=e[a]}};function n(e){for(var n=0;n<t.length;n++)if(e==t[n])return!1;return!0}e(i),e(this.onMatrix(i,8));for(var r=0;r<i.length;r++)i[r].style.opacity="0.2";for(var a=0;a<t.length;a++)t[a].style.opacity=1;return t}}},s=(n(296),n(0)),o=Object(s.a)(a,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"snippet-wrap"},[this._m(0),e("div",{staticClass:"refresh",on:{click:this.refresh}},[e("span",[this._v("刷新")])]),e("div",{staticClass:"matrix-box"})])},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"top-title"},[e("h2",[this._v("行列矩阵")])])}],!1,null,null,null);e.default=o.exports}}]);