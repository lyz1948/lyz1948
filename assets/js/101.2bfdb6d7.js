(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{428:function(s,t,a){"use strict";a.r(t);var e=a(0),r=Object(e.a)({},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"docker-network"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker-network","aria-hidden":"true"}},[s._v("#")]),s._v(" Docker Network")]),s._v(" "),a("p",[s._v("查看网络列表")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("docker network ls\n")])])]),a("p",[s._v("查看网络详细信息")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("docker network inspect bridge\n")])])]),a("p",[s._v("创建一个网络")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("docker network create network"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("test\n")])])]),a("p",[s._v("删除一个网络")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("docker network rm "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("network name "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" network id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])])]),a("p",[s._v("容器链接到网络")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("docker run "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("dp "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5000")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("net network"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("test "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("name test01 node"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("server\n")])])]),a("p",[s._v("查看链接容器后的网络信息")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("docker network inspect network"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("test\n")])])]),a("p",[s._v("进入容器")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("docker exec test01 bash\n查看"),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("IP")]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token string"}},[s._v("``")])]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token string"}},[s._v("`\n\n\n`")])]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token string"}},[s._v("``")])]),s._v("js\ncat "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("etc"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("hosts\n查看"),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("IP")]),s._v("对应\n")])])]),a("p",[s._v("容器的信息")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("curl test01"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5000")]),s._v("\n")])])]),a("p",[s._v("一键开启多个容器并链接到创建的网络的.sh 文件")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bin"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bash\n\n# 构建容器\ndocker build "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("t lzy1948"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("node"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("server\n\n# 创建网络\ndocker network create nodeserver\n\n# 运行 test01 容器\ndocker run "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("d "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("net nodeserver "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9200")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9200")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9300")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9300")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("name test01 node"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("server\n\n# 运行 test02 容器\ndocker run "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("d "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("net nodeserver "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5000")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("name test02 node"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("server\n")])])])])},[],!1,null,null,null);t.default=r.exports}}]);