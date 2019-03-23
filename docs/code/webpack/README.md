# webpack

## Webpack 1.0配置

### webpack基本配置

1.创建package.json

``` bash
npm init -y
```

2.安装程序所需的包

```bash
npm i webpack babel-loader babel-core ejs-loader html-loader style-loader css-loader url-loader image-webpack-loader postcss-loader autoprefixer less-loader sass-loader html-webpack-plugin --save-dev
```

3.创建webpack.config.js, app.js

```js
module.exports = {
  entry: {                       // 编译入口配置
    app: './app.js'          // app/app.js 入口文件
  },
  output: {                      // 编译后输出配置
    path: __dirname + '/dist',   //__dirname指当前目录，生成./dist文件
    filename: '[name].build.js',
    publicPath: '/dist'              // 资源路径，如：css的背景图片等路径
  },
}
```

4.运行打包命令

``` bash
webpack --config webpack.config.js
```

::: tip
也可以将命令直接写入package.json中, 直接运行 npm start
:::

```bash
"start": "webpack --config webpack.config.js"
```

5.打包成功，目录下多出一个dist目录

### webpack进阶

使用babel编译js文件

``` bash
# 对es6的支持
npm install babel-preset-es2015 --save-dev

# 如果你想用es7的功能
npm install babel-preset-stage-0 --save-dev
```

config中添加配置

``` js
module: {
  loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',   // babel-loader
      exclude: /node_modules/,  // 不编译的文件夹
      query: {
        presets: ['es2015', 'stage-0', 'env']
      }
    }
  ]
}
```

### 3.0

安装工具与依赖包

```js
npm i webpack --save-dev
```

运行命令

```js
$ webpack --config webpack.config.js
或
$ webpack
```

> `--config webpack.config.js` 指定 webpack 的配置文件
因为默认配置文件是 `webpack.config.js` 所以是可以省略掉的，如果配置文件名字不是`webpack.config.js` 就必须加上

运行命令配置的package.json的scripts中

``` js
{
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
}
```

然后运行

```js
npm run build
```

#### 加载预处理器

```js
npm i style-loader css-loader --save-dev
```

### 加载图片

```js
npm install --save-dev file-loader
```

### 使用插件 html-webpack-plugin

```js
npm i --save-dev html-webpack-plugin
```

### 清空目录

```js
npm i clean-webpack-plugin --save-dev
```

### 开发环境配置sourceMap

```js
module.exports = {
  devtool: 'inline-source-map',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

### 热加载 webpack-dev-server

```js
npm i --save-dev webpack-dev-server
```

package.json文件添加命令

```js
{
  ...
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --open"
  },
  ...
}
```

### 生产环境

自动生产方式

```js
webpack -p
```

`webpack -p` 相当于 `webpack --optimize-minimize --define process.env.NODE_ENV="'production'"`这个命令，便可以自动构建生产版本的应用，这个命令会完成以下步骤：

- 使用UglifyJsPlugin插件来压缩代码
- 运行 LoaderOptionsPlugin 插件，这个插件是用来迁移的
- 设置 NodeJS 的环境变量，触发某些 package 包以不同方式编译

> webpack -p设置的process.env.NODE_ENV环境变量，是用于编译后的代码的，只有在打包后的代码中，这一环境变量才是有效的。如果在 webpack 配置文件中引用此环境变量，得到的是 undefined

解决方式使用 cross-env

```js
npm i --save-dev cross-env
```

** package.json **

```js
{
  ...
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack -p",
    "start": "webpack-dev-server --open"
  },
  ...
}
```

### 多配置文件

```js
{
  ...
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack -p",
    "start": "webpack-dev-server --open",
    "build:dev": "webpack-dev-server --open --config webpack.dev.js",
    "build:prod": "webpack --progress --config webpack.prod.js"
  }
}
```