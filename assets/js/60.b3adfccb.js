(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{270:function(t,e,n){},354:function(t,e,n){"use strict";var s=n(270);n.n(s).a},356:function(t,e,n){"use strict";n.r(e);var s=0,a={name:"Slider5",data:function(){return{timer:null,boxWidth:625,oneWidth:25,len:0,curIndex:0,delay:6}},mounted:function(){var t=this;this.$nextTick(function(){t.len=t.getLength,t.autoSwiper()})},computed:{getLength:function(){return this.boxWidth/this.oneWidth}},methods:{handleTab:function(t){if(t!==this.curIndex){clearInterval(this.timer);for(var e=document.querySelector(".cube-box").children,n=e.length,a=0;a<n;a++)e[a].style.transition="".concat(.5*Math.abs(this.curIndex-t),"s ").concat(50*a,"ms all ease-in-out"),e[a].style.transform="translateZ(-150px) rotateX(-".concat(90*t,"deg)");this.curIndex=t,s=t,this.autoSwiper()}},autoSwiper:function(){var t=this;this.timer=setInterval(function(){s++,s%=4,t.handleTab(s)},1e3*this.delay)}},beforeDestroy:function(){clearInterval(this.timer)}},i=(n(354),n(0)),r=Object(i.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[n("h2",[t._v("CSS3 3D翻转幻灯片")]),n("ul",{staticClass:"cube-box"},t._l(t.getLength,function(e,s){return n("li",{key:s,staticClass:"item",style:"z-index:"+(s>t.len/2?t.len-s:s+1)},[n("a",{staticClass:"face",style:"background-position:"+-s*t.oneWidth+"px 0px",attrs:{href:"#"}}),n("a",{staticClass:"face",style:"background-position:"+-s*t.oneWidth+"px 0px",attrs:{href:"#"}}),n("a",{staticClass:"face",style:"background-position:"+-s*t.oneWidth+"px 0px",attrs:{href:"#"}}),n("a",{staticClass:"face",style:"background-position:"+-s*t.oneWidth+"px 0px",attrs:{href:"#"}}),n("span",{staticClass:"side side-left"}),n("span",{staticClass:"side side-right"})])}),0),n("div",{staticClass:"ctrl-box tac"},t._l(4,function(e,s){return n("span",{key:e,staticClass:"item",class:{cur:t.curIndex==s},on:{click:function(e){return t.handleTab(s)}}},[t._v(t._s(e))])}),0)])},[],!1,null,"5c029312",null);e.default=r.exports}}]);