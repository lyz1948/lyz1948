(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{216:function(t,n,i){},291:function(t,n,i){"use strict";i(292);var r=i(7),e=i(107),o=i(14),s=/./.toString,a=function(t){i(43)(RegExp.prototype,"toString",t,!0)};i(15)(function(){return"/a/b"!=s.call({source:"a",flags:"b"})})?a(function(){var t=r(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?e.call(t):void 0)}):"toString"!=s.name&&a(function(){return s.call(this)})},292:function(t,n,i){i(14)&&"g"!=/./g.flags&&i(42).f(RegExp.prototype,"flags",{configurable:!0,get:i(107)})},293:function(t,n,i){var r=Date.prototype,e=r.toString,o=r.getTime;new Date(NaN)+""!="Invalid Date"&&i(43)(r,"toString",function(){var t=o.call(this);return t==t?e.call(this):"Invalid Date"})},294:function(t,n,i){"use strict";var r=i(216);i.n(r).a},387:function(t,n,i){"use strict";i.r(n);i(291),i(293);var r={data:function(){return{gridRows:8,count:0,posArr:[],posAllArr:[]}},mounted:function(){var t=this;this.$nextTick(function(){t.setPosition()})},methods:{setPosition:function(){for(var t=this.gridRows,n=this.$refs.listWrap.children,i=0;i<t;i++)for(var r=0;r<t;r++)n[i*t+r].x=i,n[i*t+r].y=r,n[i*t+r].index=-1;this.setQueen(0),this.imageFlicker()},setQueen:function(t){var n=this.$refs.listWrap.children,i=this.gridRows;if(t===this.gridRows)return this.count++,void this.posAllArr.push(this.posArr.concat());for(var r=0;r<i;r++)if(-1===n[t*i+r].index){n[t*i+r].index=t,this.posArr.push(n[t*i+r]);for(var e=n[t*i+r].x,o=n[t*i+r].y,s=0;s<n.length;s++)-1!==n[s].index||n[s].x!==e&&n[s].y!==o&&n[s].x+n[s].y!==e+o&&n[s].x-n[s].y!=e-o||(n[s].index=t);this.setQueen(t+1),this.back(t),this.posArr.pop()}},back:function(t){for(var n=this.$refs.listWrap.children,i=0,r=n.length;i<r;i++)n[i].index===t&&(n[i].index=-1)},imageFlicker:function(){var t=this,n=this.$refs.listWrap.children,i=function(){for(var i=t.posAllArr[Math.floor(Math.random()*t.posAllArr.length)],r=0;r<n.length;r++)n[r].style.backgroundColor="";for(var e=0;e<i.length;e++)i[e].style.backgroundColor=t.randomHexColorCode()};i(),setInterval(function(){i()},5e3)},randomHexColorCode:function(){return"#"+(1048575*Math.random()*1e6).toString(16).slice(0,6)}}},e=(i(294),i(0)),o=Object(e.a)(r,function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"content"},[n("ul",{ref:"listWrap",staticClass:"list"},this._l(64,function(t){return n("li",{key:t,staticClass:"item grid-item"})}),0)])},[],!1,null,"b9da3f6e",null);n.default=o.exports}}]);