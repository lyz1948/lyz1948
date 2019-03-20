# 项目实战记录

step1: xcode 7.0安装, 执行下面代码检查是否安装

```js
xcode-select --install
```

stpe2: homebrew安装

```js
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

安装失败的话，可以这样

```js
sudo rm -rf /usr/local/.git; cd /usr/local; git clone https://github.com/Homebrew/homebrew
```

step3: 安装watchman flow 和其他程序

```js
brew install watchman flow git gcc pkg-config cairo libpng jpeg gitlib mongodb
```

step4: 安装 nvm

step5: 安装oh-my-zsh

```js
brew install oh-my-zsh
```

step6: 最后安装react native  React 选择版本

```js
npm cache clean
npm uninstall react-native-cli -g
npm install react-native-cli@1.0.0 -g 指定脚手架版本
npm install react-native@0.35.0 && npm install react@15.4.1 指定升级react-native 和 react版本
```

安装指定版本

```js
npm install -g react-native-cli@0.1.10
```

查看安装版本

```js
react-native -v
```

1.初始化一个项目

```js
react-native init projApp
```

运行项目在ios

```js
react-native run-ios
```

图标库安装

```js
npm install react-native-vector-icons@2.0.2 --save
```

安装rnpm或者直接使用`react-native link`

```js
sudo npm install rnpm@1.7.0 -g
```

链接图标

```js
rnpm link react-native-vector-icons
react-native link react-native-vector-icons 
```

安装其他模块

```js
npm install mockjs --save
npm install lodash --save
npm install query-string --save
```

```js
onEndReached={this._fetchMoreDate} 加载滚动数据
onEndReachedThreshold={20} 距离底部20像素时候
```

安装视频组件

```js
npm install react-native-video --save
rnpm link react-native-video
```

表单提交组件

```js
npm install react-native-button --save
```

项目后端开发需要用到的工具和插件

```js
koa
koa-session
koa-logger
koa-bodyparser
koa-router
mongoose
sha1
uuid
xss
lodash
bluebird
speakeasy
```

源码版本查看：

```js
git clone 地址
cd 目录
git checkout 0.42-stable
npm install
```

## 版本升级

模块安装

```js
npm i react-native-vector-icons --save
npm i rnpm -g
rnpm link react-native-vector-icons // 旧版本link方式
react-native link react-native-vector-icons // 新版本link方式
```

版本升级

1.react-native-cli版本

```js
react-native-cli@2.0.1 -g
```

2.react-native 版本

```js
react-native init AwesomeProject --version 0.42.3
```

3.文件复制

4.依赖版本

```json
{
  "dependencies": {
    "immutable": "^3.8.1",
    "lodash": "^4.16.4",
    "query-string": "^4.2.3",
    "react": "~15.4.1",
    "react-addons-update": "^15.2.0",
    "react-native": "0.42.3",
    "react-native-audio": "^3.2.2",
    "react-native-button": "^1.7.1",
    "react-native-cli": "^1.0.0",
    "react-native-image-picker": "^0.22.12",
    "react-native-navigation-redux-helpers": "^0.5.0",
    "react-native-progress": "^3.2.0",
    "react-native-sk-countdown": "^1.0.1",
    "react-native-sound": "^0.9.1",
    "react-native-swiper": "^1.5.2",
    "react-native-vector-icons": "^4.0.0",
    "react-native-video": "git+https://github.com/react-native-community/react-native-video.git",
    "react-navigation": "^1.0.0-beta.9",
    "react-redux": "^4.4.6",
    "redux": "^3.3.1",
    "redux-actions": "^0.13.0",
    "redux-immutable": "^3.0.8",
    "redux-logger": "^2.7.4",
    "redux-promise": "^0.5.3",
    "redux-thunk": "^2.0.1",
    "sha1": "^1.1.1"
  }
}
```

5.link模块

```js
react-native link
```

6.xcode添加模块
xcode ios => RnAppDog.xcodeproj => 右键点击 Libraries => 添加文件打RnAppDog => 找到node_modules =>  react-native => Libraries => ART => ART.xcodeproj
=> Build Phases => + => libART.a

7.修改倒计时组件的代码

```js
import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'

var update = require('react-addons-update')
var countDown = require('./countDown')
```

安卓配置

```js
rm -rf /Applications/Android\ Studio.app
rm -rf ~/Library/Preference/androidStudio*
rm -rf ~/Library/Preferences/com.google.android.*
rm -rf ~/Library/Application\ Support/AndroidStudio*
rm -rf ~/Library/Logs/AndroidStudio*
rm -rf ~/Library/Caches/AndroidStudio*
rm -rf ~/.AndroidStudio*
rm -rf ~/.android
rm -rf ~/AndroidStudioProjects
rm -rf ~/.gradle
rm -rf ~/.android
rm -rf ~/Library/Android*
```
