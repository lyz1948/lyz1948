(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{217:function(t,i,a){},295:function(t,i,a){"use strict";var e=a(217);a.n(e).a},388:function(t,i,a){"use strict";a.r(i);var e={name:"canvasRotateImg",data:function(){return{iNum:0,cvs:null,img:null,oGc:null}},mounted:function(){this.initImage()},methods:{initImage:function(){var t=this;this.img=this.$refs.imgHook;var i=new Image;i.onload=function(){t.drawImage(t.img)},i.src=this.img.src},drawImage:function(t){var i=document.createElement("canvas");i.id="myCanvas";var a=i.getContext("2d");i.width=t.width,i.height=t.height,t.parentNode.replaceChild(i,t),a.drawImage(t,0,0),this.cvs=i,this.oGc=a},handleChange:function(){4===this.iNum&&(this.iNum=0),this.iNum++,this.fnRotate()},fnRotate:function(){var t=this.cvs,i=this.img,a=this.oGc;switch(this.iNum){case 1:t.width=i.height,t.height=i.width,a.rotate(90*Math.PI/180),a.drawImage(i,0,-i.height);break;case 2:t.width=i.width,t.height=i.height,a.rotate(180*Math.PI/180),a.drawImage(i,-i.width,-i.height);break;case 3:t.width=i.height,t.height=i.width,a.rotate(270*Math.PI/180),a.drawImage(i,-i.width,0);break;case 4:t.width=i.width,t.height=i.height,a.rotate(0),a.drawImage(i,0,0)}}}},h=(a(295),a(0)),s=Object(h.a)(e,function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"snippet-wrap"},[this._m(0),i("div",{attrs:{id:"wrap"}},[i("a",{ref:"btnHook",staticClass:"rtd",attrs:{href:"javascript:;"},on:{click:this.handleChange}}),i("img",{ref:"imgHook",attrs:{src:this.$withBase("/image.png"),alt:""}})])])},[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"top-title"},[i("h2",[this._v("旋转图片")])])}],!1,null,"faf5b0be",null);i.default=s.exports}}]);