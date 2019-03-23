# React

### React 安装
- 手动安装
```bash
$ npm install webpack webpack-dev-server babel-core babel-loader babel-preset-react -D

$ npm install react react-dom -S
```
or use yarn

```bash
$ yarn add webpack webpack-dev-server babel-core babel-loader babel-preset-react -D

$ yarn add react react-dom -S
```

手动配置`webpack.config.js`配置文件
```bash
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPLugin = require('extract-text-webpack-plugin')

module.exports = {
  devServer: {

  },
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/app.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react']
        }
      }
    ]
  }
}
```


- CLI安装
```bash
$ npm install create-react-app -g
$ create-react-app projectName
$ cd projectName
$ npm start
```

or use Yarn
```bash
$ yarn add create-react-app -g
$ create-react-app projectName
$ cd projectName
$ yarn start
```

`app.jsx` 文件
```bash
import React from 'react'
import ReactDOM from 'react-dom'

reactDOM.render(
  <h1>Hello React!</h1>,
  document.getElementById('root')
)
```

#### 组件
```bash
class Page extends React.Component {
  render() {
    return (
      <div>
        Hello React! I am a Component
      </div>
    )
  }
}

ReactDOM.render(
  <Page/>,
  document.getElementById('app')
)
```


#### 动态数据
```bash
let name = 'lyz'

class Page extends React.Component {
  render() {
    return (
      <div>
        Hello!  I am { name }
      </div>
    )
  }
}
```

#### 注释
```bash
let name = 'lyz'

class Page extends React.Component {
  render() {
    return (
      <div>
        {/* 这里是动态插入数据 */}
        Hello!  I am { name }
        <img /*
          这里是属性注释
        */ src='bg.png'>
      </div>
    )
  }
}
```

#### Props
```bash
class Child extends React.Component {
  render() {
    return (
      <div>
        Hello React! I am a {this.props.name}
      </div>
    )
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: 'lyz'}
  }
  render() {
    return (
      <Child name={this.state.name}/>
    )
  }
}
```

### 子组件修改值
> 可以看到Child组件显示了父组件的name。当父组件状态更新了，子组件同步更新。子组件更改父组件状态需要使用回调函数

```bash
class Child extends React.Component {
  updateName() {
    this.props.changeName('abc')
  }

  render() {
    return (
      <div>
        Hello React! I am a {this.props.name}
        <br/>
        <button onClick={this.updateName.bind(this)}>点我改变名字</button>
      </div>
    )
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: 'lyz'}
  }

  _changeName(name) {
    this.setState({
      name
    })
  }
  render() {
    return (
      <Child name={this.state.name} changeName={this._changeName.bind(this)}/>
    )
  }
}
```




