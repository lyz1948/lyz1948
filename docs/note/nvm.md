# NVM常用命令

## install

### macOS/Linux

Linux先安装`build-essential`

```js
sudo apt-get update
sudo apt-get install build-essential
```

使用 `cURL`:

```js
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

使用 `Wget`:

```js
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

### Using nvm

安装指定版本的nodejs

```js
nvm install 8.9.0
```

查看可使用可安装的版本

```js
nvm ls-remote
```

windows使用下面的命令查看

```js
nvm ls available
```

::: tip
不同的node版本切换的时候，全局安装的包需要重新安装，
安装Node.js实例时，nvm还将安装兼容的npm版本。
每个Node版本可能会带来不同的npm版本，您可以运行npm -v来检查您当前使用的是哪一个。
全局安装的npm软件包不在不同的Node.js版本之间共享，因为这可能导致不兼容
在安装新的Node.js版本时，您可以从特定版本重新安装npm全局包
:::

```js
nvm install v9.0.0 --reinstall-packages-from=8.9
```

安装最新版本

```js
nvm install node
```

卸载指定版本

```js
nvm uninstall v8.9
```

切换版本

```js
nvm use 8.9.4
```

切换最新版本

```js
nvm use node
```

切换到最新的LTS Node.js版本

```js
nvm use node --lts
```

指定别名并切换版本

```js
nvm alias awesome-version 8.9.4 && nvm use awesome-version
```

卸载指定别名的nodejs版本

```js
nvm unalias awesome-version
```

指定默认node版本

```js
nvm alias default node
```

直接为已安装的版本运行命令而不切换节点变量

```js
nvm run v8.9.4 --version
```

在子shell上运行命令，以特定版本为目标

```js
nvm exec 8.9.4 node --version
nvm exec 8.2.0 npm list -g --depth 0
```

获取特定安装版本的Node.js可执行文件的路径

```js
nvm which v8.9.4
```

npm查看全局安装过的包

```js
npm list -g --depth 0
```