(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{431:function(s,a,t){"use strict";t.r(a);var e=t(0),r=Object(e.a)({},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"docker-registry"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker-registry","aria-hidden":"true"}},[s._v("#")]),s._v(" Docker Registry")]),s._v(" "),t("h3",{attrs:{id:"创建一个私有的docker-hub"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建一个私有的docker-hub","aria-hidden":"true"}},[s._v("#")]),s._v(" 创建一个私有的Docker Hub")]),s._v(" "),t("p",[s._v("1.在服务器上运行")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("docker run "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("d "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9000")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9000")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("restart always "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("name registry registry"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n")])])]),t("p",[s._v("2.构建镜像")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("docker build "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("t "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("118.24")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".18")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".252")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("node"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("server "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n")])])]),t("p",[s._v("3.push镜像到docker hub")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("docker push "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("118.24")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".18")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".252")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("node"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("server\n")])])]),t("p",[s._v("在push之前需要做一些配置，否则将无法push成功\n在"),t("code",[s._v("/etc/docker")]),s._v("下创建"),t("code",[s._v("daemon.json")])]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"insecure-registries"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"118.24.18.252:9000"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("修改"),t("code",[s._v("/lib/systemd/system/docker.service")]),s._v(" 文件,加入一行代码")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("EnvironmentFile"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("etc"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("daemon"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("json\n")])])]),t("p",[s._v("重启docker")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("sudo service docker restart\n")])])]),t("p",[s._v("使用官方api接口 查看已经push到仓库的"),t("code",[s._v("docker")]),s._v("镜像")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("118.24")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".18")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".252")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9000")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("v2"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("_catalog\n")])])]),t("p",[s._v("或者先删除image在从仓库里拉取，拉取成功说明刚才push成功了")])])},[],!1,null,null,null);a.default=r.exports}}]);