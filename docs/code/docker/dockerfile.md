# Dockfile

Dockerfile语法

```js
FROM #
WORKDIR #
ADD #
COPY #
ENV #设置常亮
RUN # 执行命令并创建新是image layer
CMD # 设置容器启动后默认执行的命令和参数
ENTRYPOINT #设置容器启动时运行命令
VOLUME # 存储
EXPOSE #
LABEL #
```

Shell 格式

```js
RUN apt-get install -y vim
COM echo "Hello World"
ENTRYPOINT echo "Hello Docker"
```

Exec 格式

```js
RUN ["apt-get", "install", "-y", "vim"]
CMD ["/bin/echo", "Hello World"]
ENTRYPOINT ["/bin/echo", "Hello Docker"]
```

#### 构建一个镜像

创建一个Dockerfile的文件
vim Dockerfile

写入内容

``` js
FROM debian:jessie
RUN buildDeps='gcc libc6-dev make' \
&& apt-get update \
&& apt-get install -y $buildDeps \
&& wget -O redis.tar.gz "http://download.redis.io/releases/r
edis-3.2.5.tar.gz" \
&& mkdir -p /usr/src/redis \
&& tar -xzf redis.tar.gz -C /usr/src/redis --strip-component
s=1 \
&& make -C /usr/src/redis \
&& make -C /usr/src/redis install \
&& rm -rf /var/lib/apt/lists/* \
&& rm redis.tar.gz \
&& rm -r /usr/src/redis \
&& apt-get purge -y --auto-remove $buildDeps
```


- 清场 --auto-remove
`--auto-remove $buildDeps` 清理掉无关的文件

- 打包生成

``` js
docker build [选项] <上下文路径/URL/->
$ docker build -t nodeBase:v1
```

### ONBUILD命令

ONBUILD命令在构建的时候并不会执行，只有当前的镜像为基础镜像，并去构建下级镜像的时候才执行

举例子：
我们有几个Nodejs的项目，我们通过Dockerfile来制作镜像，每个都依赖node:slim的镜像，我们的Dockerfile文件这样写

``` js
FROM node:slim
RUN mkdir /app
WORKDIR /app
COPY ./package.json /app
RUN ["npm", "install"]
COPY . /app
CMD ["npm", "start"]
```

接着，复制几份到其他node项目
下面问题来了，我们发现Dockdrfile有错误，那么我们开始逐个修改
现在， 我们把Dockfile分离出来，把所有项目都依赖的作为通用的，给其他Dockfile作为底层构建指令

``` js
FROM node:slim
RUN mkdir /app
WORKDIR /app
COPY ./package.json /app
CMD ["npm", "start"]
```

ny-node 是作为基础镜像

``` js
FROM ny-node
COPY ./package.json /app
RUN ["npm", "install"]
COPY . /app
```

这样，其他项目都基于nodeBase基础镜像，继承基础镜像的更新
但是，这样亦然没有解决问题，我们在install的时候，需要加些参数，所以我们还要修改，把`RUN ["npm", "install"]`提出来

- ONBUILD出场
基础镜像 nodeBase

``` js
FROM node:slim
RUN mkdir /app
WORKDIR /app
ONBUILD COPY ./package.json /app
ONBUILD RUN ["npm", "install"]
ONBUILD COPY . /app/
CMD ["npm", "start"]
```

其他镜像

``` js
FROM nodeBase
```

## Dockerfile创建node服务

1.首先创建一个目录

```js
mkdir app
```

2.在目录下创建 3 个文件

```js
cd app
touch Dockerfile
touch app.js
touch package.json
```

`package.json`文件也可以通过`npm init` 或 `npm init -y` 生成

文件里写入下面的内容
Dockerfile

```js
FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node index.js
EXPOSE 3456
```

`app.js` 文件

```js
const Koa = require('koa')
cosnt app = new Koa()
cosnt port = 3456

app.get('/', function() {
  res.send('Hello Nodejs')
})

app.listen(port, function() {
  console.log('Server is running at http://localhost' + port)
})
```

package.json

```js
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "koa": "^2.3.0",
  }
}
```

运行构建命令

```js
docker build -t node-server .
```

等待构建完成，执行

```js
docker run -p 3456:3456 node-server
```
