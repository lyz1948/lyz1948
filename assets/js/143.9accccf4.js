(window.webpackJsonp=window.webpackJsonp||[]).push([[143],{487:function(s,a,t){"use strict";t.r(a);var e=t(0),r=Object(e.a)({},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"git"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#git","aria-hidden":"true"}},[s._v("#")]),s._v(" git")]),s._v(" "),t("h2",{attrs:{id:"使用姿势"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用姿势","aria-hidden":"true"}},[s._v("#")]),s._v(" 使用姿势")]),s._v(" "),t("p",[t("strong",[s._v("正确的使用Git")]),s._v("\n工作中使用Git的正确姿势")]),s._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",[s._v("git支持很多种工作流程，我们采用的一般是这样，远程创建一个主分支，本地每人创建功能分支，日常工作流程如下：")])]),s._v(" "),t("p",[s._v("1.去自己的工作分支")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout work\n")])])]),t("p",[s._v("2.提交工作分支的修改")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -a\n")])])]),t("p",[s._v("3.回到主分支")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout master\n")])])]),t("p",[s._v("4.获取远程最新的修改，此时不会产生冲突")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" pull\n")])])]),t("p",[s._v("5.回到工作分支")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout work\n")])])]),t("p",[s._v("6.用rebase合并主干的修改，如果有冲突在此时解决")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" rebase master\n")])])]),t("p",[s._v("7.回到主分支")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout master\n")])])]),t("p",[s._v("8.合并工作分支的修改，此时不会产生冲突")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" merge work\n")])])]),t("p",[s._v("9.提交到远程主干")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push\n")])])]),t("div",{staticClass:"custom-block tip"},[t("p",[s._v("如果你正在某分支上开发某个功能，该功能还未开发完成，此时需要切换到另外的分组做一些处理，而你又不想提交当前未完成的代码，想保存它但又不想增加一个脏的提交，使用"),t("code",[s._v("git stash")]),s._v(" 会把所有未提交的修改（包括暂存的和非暂存的）都保存起来，用于后续恢复当前工作目录")])]),s._v(" "),t("h2",{attrs:{id:"git-stash的使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#git-stash的使用","aria-hidden":"true"}},[s._v("#")]),s._v(" Git stash的使用")]),s._v(" "),t("p",[s._v("stash缓存当前修改")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash\n")])])]),t("p",[s._v("需要说明一点，stash是本地的，不会通过git push命令上传到git server上\n实际应用中推荐给每个stash加一个message，用于记录版本，使用git stash save取代git stash命令")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash save "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"stash-work"')]),s._v("\n")])])]),t("p",[s._v("重新应用缓存的stash")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash pop\n")])])]),t("p",[s._v("这个指令将缓存堆栈中的第一个stash删除，并将对应修改应用到当前的工作目录下\n也可以使用"),t("code",[s._v("git stash apply")]),s._v(" 将缓存堆栈中的stash多次应用到工作目录中，但并不删除stash拷贝")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash apply\n")])])]),t("p",[s._v("查看"),t("code",[s._v("stash")]),s._v("列表")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash list\n")])])]),t("p",[s._v("移除stash")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash drop "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("stash@"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("0"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])])]),t("h2",{attrs:{id:"git-message用法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#git-message用法","aria-hidden":"true"}},[s._v("#")]),s._v(" Git Message用法")]),s._v(" "),t("p",[t("strong",[s._v("Git Message的规范")]),s._v("\nCommit message 包括三个部分：Header，Body 和 Footer。完整格式如下：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("type"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("scope"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(": "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("subject"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("BLANK LINE"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("body"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("BLANK LINE"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("footer"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])])]),t("p",[t("strong",[s._v("type")]),s._v("\n类型主要包括以下几种")]),s._v(" "),t("ul",[t("li",[s._v("feat: 新功能")]),s._v(" "),t("li",[s._v("fix: 修复问题")]),s._v(" "),t("li",[s._v("docs: 修改文档")]),s._v(" "),t("li",[s._v("style: 修改代码格式，不影响代码逻辑")]),s._v(" "),t("li",[s._v("refactor: 重构代码，理论上不影响现有功能")]),s._v(" "),t("li",[s._v("perf: 提升性能")]),s._v(" "),t("li",[s._v("test: 增加修改测试用例")]),s._v(" "),t("li",[s._v("chore: 修改工具相关（包括但不限于文档、代码生成等）")])]),s._v(" "),t("p",[t("strong",[s._v("scope")]),s._v("\n修改文件的范围，比如：视图层、控制层、docs、config, plugin")]),s._v(" "),t("p",[t("strong",[s._v("subject")]),s._v("\nsubject 是 commit 目的的简短描述（用一句话清楚的描述这次提交做了什么），不超过50个字符")]),s._v(" "),t("p",[t("strong",[s._v("body")]),s._v("\n补充 subject 添加详细说明，可以分成多行，适当增加原因、目的等相关因素，也可不写")]),s._v(" "),t("p",[t("strong",[s._v("foot")]),s._v("\n当有非兼容修改(Breaking Change)时必须在这里描述清楚\n关闭issue或是链接到相关文档，如 Closes #1, Closes #2, #3")]),s._v(" "),t("p",[s._v("git commit时添加表情")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit\n\n:emoji1: :emoji2: 主题\n提交信息body内容\n\nRef "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("###>")]),s._v("\n")])])]),t("h2",{attrs:{id:"重置代码"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#重置代码","aria-hidden":"true"}},[s._v("#")]),s._v(" 重置代码")]),s._v(" "),t("p",[s._v("Git 不解决冲突，直接使用最新的代码")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git fetch "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("all\ngit reset "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("hard origin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("master\ngit fetch "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("all "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 下载但不合并")]),s._v("\ngit reset "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("hard "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 下载远程仓库最新的代码")]),s._v("\n")])])]),t("h2",{attrs:{id:"参与开源项目"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参与开源项目","aria-hidden":"true"}},[s._v("#")]),s._v(" 参与开源项目")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("fork\npull requests\ngit"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("oschina"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("net"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("progit"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("\n")])])]),t("p",[s._v("下载一个git仓库的项目")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git clone "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("url"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" 下载项目\n")])])]),t("p",[s._v("项目中初始化git仓库")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git init "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("y\n")])])]),t("p",[s._v("配置git的name 和 email")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git config "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("global user"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("name "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"设置用户名"')]),s._v("\ngit config "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("global user"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("email "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"设置邮箱"')]),s._v("\n")])])]),t("p",[s._v("查看配置的信息")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git config "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("list\n")])])]),t("p",[s._v("创建分支并切换到分支")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git checkout "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("b experiment（ experiment是分支的名字"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),t("p",[s._v("存入缓存区")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git add filename  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 添加单个文件")]),s._v("\ngit add "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 直接将修改的文件全部提交")]),s._v("\ngit add "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("A")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 添加修改的文件")]),s._v("\n")])])]),t("p",[s._v("存入版本区")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git commit "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("m "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"注释"')]),s._v("\n")])])]),t("p",[s._v("直接从工作区到版本区")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git commit "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("a "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("m "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"这里是注释内容"')]),s._v("\n")])])]),t("p",[s._v("查看状态")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git status\n")])])]),t("p",[s._v("查看日志")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git log\nenter 查看没显示完的日志\nq 退出查看日志（如果版本太多）\n")])])]),t("p",[s._v("查看各个区域文件不同状态\n工作区 -- 缓存区（工作区与缓存区对比）")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git diff\n")])])]),t("p",[s._v("缓存区--版本库(缓存区与版本库对比)")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git diff "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("cached\ngit diff "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("staged\n")])])]),t("p",[s._v("工作区--版本库")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git diff "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("master\n")])])]),t("p",[s._v("从缓存区撤销回工作区")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git reset "),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("HEAD")]),s._v(" filename\n")])])]),t("p",[s._v("撤销全部")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git reset "),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("HEAD")]),s._v("\n")])])]),t("p",[s._v("从版本区还原回工作区")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git checkout "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("filename\n")])])]),t("p",[s._v("重新提交(撤销之前提交的，然后重新把暂存区的文件从新与之前提交到暂存区的文件一起提交)")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git commit "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("m "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"注释"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("amend\n")])])]),t("p",[s._v("删除文件")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git rm filenam "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//工作区已提交到暂存区的文件，删除后，在通过命令删除暂存区的文件")]),s._v("\ngit rm "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("f filename "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//删除缓存区的文件，并且工作区一并删除")]),s._v("\ngit rm "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("cached filename "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//只删除缓存区的文件，工作区任然保留")]),s._v("\n")])])]),t("p",[s._v("删除本地仓库")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git remote rm 仓库名\n")])])]),t("p",[s._v("恢复")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git checkout "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("id")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("版本id"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" filename\n")])])]),t("p",[s._v("恢复之前版本")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git reset "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("hard id\n")])])]),t("p",[s._v("让版本回到倒数第二个")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git reset "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("hard "),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("HEAD")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),s._v("\n")])])]),t("p",[s._v("回到指定的版本")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git reset "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("hard "),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("HEAD")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("~")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n")])])]),t("p",[s._v("回到现在,可回到之前删除的版本")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git reflog\n")])])]),t("p",[s._v("查看远程仓库的名字")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git remote\ngit remote "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("v\n")])])]),t("p",[s._v("删除远程仓库与本地仓库")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git remote rm 仓库名\n")])])]),t("p",[s._v("删除gihub上的分支\norigin: 是分支内容存放的仓库名，1.0是分支名字")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git push origin "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.0")]),s._v("\n")])])]),t("p",[s._v("上传到github")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git push 仓库名 分支名\n")])])]),t("p",[s._v("强行提交")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git push "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("u nickname master "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("f\n")])])]),t("p",[s._v("下载更新并不合并")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git fetch origin master\ngit merge origin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("master\n")])])]),t("p",[s._v("下载更新自动合并")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git pull\n")])])]),t("p",[s._v("查看远程仓库与本地文件冲突的地方")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git diff master origin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("master\n")])])]),t("p",[s._v("合并")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git merge origin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("master\n")])])]),t("h3",{attrs:{id:"分支"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#分支","aria-hidden":"true"}},[s._v("#")]),s._v(" 分支")]),s._v(" "),t("p",[s._v("查看分支")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git branch\n")])])]),t("p",[s._v("查看远程分支")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git branch "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("r\n")])])]),t("p",[s._v("创建分支")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git branch 分支名\n")])])]),t("p",[s._v("切换分支")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git checkout 分支名\n")])])]),t("p",[s._v("快速创建并切换到新创建的分支")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git checkout "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("b "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("创建分支名"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])])]),t("p",[s._v("分支合并")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git merge origin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("分支名\n")])])]),t("p",[s._v("查看已合并的分支")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git branch "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("merge\n")])])]),t("p",[s._v("查看未合并的分支")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git branch "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("no"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("merge\n")])])]),t("p",[s._v("删除分支")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git branch "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("d 分支名\n")])])]),t("p",[s._v("删除远程分支")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git push origin "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("分支名\ngit branch "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("r "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("d origin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("分支名\n")])])]),t("p",[s._v("强制删除未合并的分支")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git branch "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("D")]),s._v(" 分支名\n")])])]),t("h3",{attrs:{id:"tag"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#tag","aria-hidden":"true"}},[s._v("#")]),s._v(" tag")]),s._v(" "),t("p",[s._v("查看是否打了标签")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git tag\n")])])]),t("p",[s._v("打标签")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git tag 标签号\n")])])]),t("p",[s._v("删除本地tag")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git tag "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("d "),t("span",{pre:!0,attrs:{class:"token template-string"}},[t("span",{pre:!0,attrs:{class:"token string"}},[s._v("`tagName`")])]),s._v("\n")])])]),t("p",[s._v("删除远程tag")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git push origin "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("delete")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token template-string"}},[t("span",{pre:!0,attrs:{class:"token string"}},[s._v("`tagName`")])]),s._v("\n")])])]),t("h3",{attrs:{id:"设置别名"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#设置别名","aria-hidden":"true"}},[s._v("#")]),s._v(" 设置别名")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("git config "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("global alias"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("别名 命令\n")])])])])},[],!1,null,null,null);a.default=r.exports}}]);