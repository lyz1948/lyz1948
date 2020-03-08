# gitbook使用

安装gitbook

```js
npm install gitbook -g
```

安装gitbook-cli

```js
npm install gitbook-cli -g
```

初始化一本书

```js
gitbook init mybook
```

启动项目

```js
gitbook serve
```

构建发布

```js
gitbook build
```

构建指定版本号

```js
gitbook build --gitbook=1.0.0
```

列出gitbook版本

```js
gitbook ls
```

列出远程可用的gitbook版本

```js
gitbook ls-remote
```

安装对应的gitbook版本

```js
gitbook fetch 标签/版本号
```
