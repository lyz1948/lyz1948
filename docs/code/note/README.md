# 工作日记

升级 Mojave 后打开 iTerm 变慢的解决办法
打开 iTrem 的 Preferences -> General，把 GPU rendering 选项前的勾去掉就解决了

linux 系统 vue 项目无法热更新问题

```js
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## puppeteer

**puppeteer** 无法安装问题
执行下面这条命令

```js
set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
```

然后在重新安装

```js
npm i puppeteer
```

## 苹果手机访问本地服务问题

在同一 wifi 下，手机访问不了电脑本地服务，修改本地服务的地址为`0.0.0.0`, webpack 项目修改`config`配置文件

```js
{
  module.export = {
    dev: {
      host: '0.0.0.0'
    }
  }
}
```

## html2canvas 解决跨域

```js
html2canvas(document.getElementById('cantainer'), { useCORS: true }).then(
  canvas => {
    document.body.appendChild(canvas)
  }
)
```

## 只具备内网的服务器通过 yum 安装软件

在一些内网的服务器上，安装软件的方法，从其他机器上拷贝`/var/cache/yum/`文件到对应的目录下
如：

```js
rsync -ave 'ssh -p 22' /var/cache/yum/ 192.168.99.100:/var/cache/yum
```

执行

```js
yum -C update // 只从缓存更新
yum -C install nginx // 只从缓存安装
```

要清空 yum 缓存

```js
yum clean headers
```

要删除缓存中的所有包，使用下面的命令

```js
yum clean package
```

## 解决 `git commit -a`出错的问题

在 mac 中，如果使用 `git commit –amend`，会出现如下错误：

error: There was a problem with the editor ‘vi’.
Please supply the message using either -m or -F option.

原因是 vi 有问题，需要为 git 换一个默认的编辑器，比如 vim，如下进行配置即正常了。
使用下面的命令即可解决

```js
git config --global core.editor "vim"
```

## vue-cli 生成的工程中引入了 jquery

首先在 package.json 里的 dependencies 加入"jquery" : "^3.1.0"，然后 install
或者

```js
npm install jquery@3.1.0 --save-dev
```

在 webpack.base.conf.js 里加入

```js
var webpack = require('webpack')
```

在 module.exports 的最后加入

```js
plugins: [
  new webpack.optimize.CommonsChunkPlugin('common.js'),
  new webpack.ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery'
  })
]
```

最后在 main.js 引入就 ok 了

```js
import from 'jquery'
```

## cmder 配置

- 解决中文乱码
  set LANG=zh_CN.UTF-8
- 多一个字符
  chcp 65001
- 添加到右键菜单
  Cmder.exe /REGISTER ALL

## node-sass 安装失败

```bash
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/3
// 全局安装
npm install node-sass -g -d
// 项目安装
npm install node-sass --save-dev -d
```

## npm镜像设置的3种方式

1.通过 config 命令

```bash
npm config set registry https://registry.npm.taobao.org

// 验证设置是否成功
npm info underscore
```

2.命令行指定

```bash
npm --registry https://registry.npm.taobao.org info underscore
```

3.编辑 ~/.npmrc 加入下面内容

```bash
registry = https://registry.npm.taobao.org
```

## 修改服务端口配置

1 打开 sshd_config 的配置文件,修改以下内容

```bash
sudo vim /etc/ssh/sshd_config

端口号
Port 19999
是否允许空密码登录
PermitEmptyPasswords no
是否允许root用户登录
PermitRootLogin no
是否允许没有密钥登录
PasswordAuthenthication no
```

## git配置2个账号

1 生成密匙

```bash
ssh-keygen -t rsa -C "helloman@qq.com" -f "rsa_github_helloman"
```

** 再生成另外一个密匙 **

```bash
ssh-keygen -t rsa -C "himan@qq.com" -f "rsa_github_himan"
```

> 注意：密匙要放在.ssh 的目录下面

2 修改.ssh/config 文件

```bash
Host helloman.github.com
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/rsa_github_helloman

Host himan.github.com
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/rsa_github_himan
```

3 修改仓库地址

```bash
git@github.com:lvqinbo/lvqinbo.github.io.git
改成
git@helloman.com:lvqinbo/lvqinbo.github.io.git
```

## Git下载慢的问题解决方法

** 浅克隆 **

> 克隆仓库的时候加上 --depth=1
> 例如： git clone --depth=1 https://github.com/atom-minimap/minimap.git

## Homebrew安装失败解决方法

1 先下载
2 进入目录 Liblariy/Caches/Homebrew
3 清理 brew prune
4 复制文件到此 git clone homebrew 的仓库地址
5 在执行命令 npm install

## iterm2 闪退问题

这个时候，shell 已经无法使用了。。。
iterm打开提示：argpath=/usr/local/bin/zsh error=No such file or directory
需要的操作是把/bin/zsh 复制到/usr/local/bin/zsh

** 具体实现：**
1 在 finder 中用 command+shift+G，调出前往文件夹，输入/bin/zsh，复制
2 再 command+shift+G，进入/usr/local，新建 bin，进入，粘贴 zsh 文件即可重新打开 iterm2

## zsh 无法使用 node 命令的问题

> 疑点应该是我用 nvm 安装的 node, 然而，nvm 的配置文件放在 bash_profile 里面，而 zsh 的配置文件在 zshrc，所以，切换 zsh 的时候无法使用其他命令
> zshrc 文件下加入一下代码

1 切换到用户所在目录 cd
2 vim 打开 zshrc 的文件 vim .zshrc
3 写入内容

```bash
export NVM_DIR="/Users/admin/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

## 命令行指定sublime打开文件

** 如果是在默认 shell 下 **

1 创建别名：

```bash
sudo ln -s "/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/subl
```

2 配置环境变量：

```basg
vim ~/.bash_profile
```

3 输入下面的内容并保存退出:

```bash
alias subl="open -a /Applications/Sublime Text.app"
PATH=/usr/local/bin:$PATH
```

4 执行命令

```bash
source ~/.bash_profile.
```

5 执行执行 subl . 用 sublime 打开当前目录文件
** 使用 zsh 的可以使用以下命令 **

- zshrc 下加入一下代码

```bash
alias subl="'/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl'"
alias nano="subl"
export EDITOR="subl"
```

Windows系统

```bash
doskey subl="C:\Program Files\Sublime Text 3\sublime_text.exe" $*
```

subl="" 引号里面的路径是你 sublime 安装的路径

## sublime 一键部署项目

1 Tools => Build System => New Build System
2 写入以下内容

```bash
{
  "cmd": ["/Users/lyz/bin/blog.sh"],
  "working_dir": "$file_path",
  "selector": "text.html.markdown"
}
```

3 在 Users/lyz/bin 目录下建立 blog.sh 的文件，并加入要执行命令的内容

```bash
#!/usr/bin/env bash

git commit -a -m "update" && git push
```

> "cmd": ["/Users/lyz/bin/blog.sh"] 这句话的意思是执行 bin 目录下的 blog.sh 的 bash 命令
> working_dir 是指定文件夹的地址
> selector 是指运行指定类型的文件为 markdown 类型的
> #!/usr/bin/env bash 这句是制定运行命令的方式为 bash
> git commit -a -m "update" && git push 这句的意思是提交代码并 push 到远程仓库(需要配置 ssh 免密码登陆)

在 sublime 里保存好文件后，执行 cmd + b 执行编译，如果未给 bolg.sh 添加执行权限的话，编译会失败，命令行进入到 Users/lyz/bin 目录下，执行 chmod +x blog.sh 添加执行权限即可

## 缩进设置

修改.vimrc文件
TAB替换为空格

```js
:set ts=4
:set expandtab
:%retab!
```