# docker

### 免sudo 使用docker

1.如果还没有 docker group 就添加一个

```bash
sudo groupadd docker
```

2.将用户加入该 group 内。然后退出并重新登录就生效啦

```bash
sudo gpasswd -a ${USER} docker
```

3.重启 docker 服务

```bash
sudo service docker restart
```

4.切换当前会话到新 group 或者重启 X 会话

```bash
newgrp - docker
```

### 启动容器

```js
docker run -idt ubuntu
```

### 查看启动中的容器

```js
docker ps
```

### 查看所有容器（启动的和停止）

```js
docker ps -a
```

### 进入容器

```js
docker exec -it [容器id]
```

### 终止容器

```js
docker stop [容器id]
```

### 删除容器

- 需要先停止容器

```js
docker rm [容器id]
```

- 直接删除运行中的容器

```js
docker rm -f [容器id]
```

清理所有处于终止状态的容器

```js
docker rm $(docker ps -a -q)
docker rm $(docker container ls -f "status=exited" -q)
```

### 下载镜像

```js
docker pull --help
docker pull [选项] [Docker Registry地址]<仓库名>:<标签>
```

下载ubuntu 14.04

```js
docker pull ubuntu:14.04
```

### 运行一个容器，指定Shell为 bash

```js
docker run -it --rm ubuntu:14.04 bash
```

- docker run 运行容器的命令
- it 这是2个参数的组合命令
- -i 交互操作
- -t 终端
- -rm 容器退出后随即删除
- ubuntu:14.04 指用ubuntu:14.04镜像为基础启动容器
- bash 这里是指定运行Shell的bash

查看当前系统的版本

``` bash
cat /etc/os-release
```

退出

```js
exit
```

### 查看已安装的镜像列表

```js
docker images
```

### 虚悬镜像

```js
docker images -f dangling=true
```

### 删除虚悬镜像

```js
docker rmi $(docker images -q -f dangling=true)
```

### 中间层镜像

```js
docker images -a
```

### 列出部分镜像（也就是说指定仓库名和标签）

```js
docker images ubuntu
docker images ubuntu:14.04
```

### 以特定格式显示

``` bash
docker images -q

docker images --format "{{.ID}}: {{.Repository}}"

docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
```

### Nginx 服务

启动一个 nginx 服务

``` bash
docker run -d -p 80:80 --name webserver nginx
docker run --name webserver -d -p 80:80 nginx
```

停止 nginx 服务

```js
docker stop webserver
```

删除 nginx 服务

``` bash
docker rm webserver
```

### docker commit

创建一个webserver服务

```js
docker run --name webserver -d -p 80:80 nginx
```

进入容器

```js
docker exec -it webserver bash
```

修改内容

```js
echo '<h1>Hello, Docker!!</h1>' > /usr/share/nginx/html/index.html
```

### Dockerfile 定制镜像

1.创建Dockerfile文件

2.写入内如

```js
FROM nginx
RUN echo 'Hello, Docker!!' > /usr/share/nginx/html/index.html
```

3.构建镜像

```js
docker build [options] <context url>
docker build -t nginx:v1 .
```

注意后面加了 ‘.’ 意思是在当前目录

### 直接用Git仓库进行构建

```js
docker build https://github.com/twang2218/gitlab-ce-zh.git#:8.14
```

> 这行命令指定了构建所需的 Git repo，并且指定默认的 master 分支，构建目录为 /8.14/，然后 Docker 就会自己去 git clone 这个项目、切换到指定分支、并进入到指定目录后开始构建。

### tar 压缩包构建

```js
docker build http://server/context.tar.gz
```

### 从标准输入中读取 Dockerfile 进行构建

```js
docker build - < Dockerfile
or
cat Dockerfile | docker build -
```

### 从标准输入中读取上下文压缩包进行构建

```js
docker build - < context.tar.gz
```

### 删除本地镜像

```js
docker rmi [ ] <镜像1>[<镜像2> ...]
```

```js
docker images
::: tip
REPOSITORY|TAG|IMAGE|ID|CREATED|SIZE
ubuntu|<none>|b969ab9f929b|4|months|ago|188 MB
:::
docker rmi b96
```

### 用 docker images 命令来配合

```js
docker rmi $(docker images -q nginx)
```

### Docker Hub仓库

登陆

```js
docker login
```

输入用户名和密码

```js
docker search ubuntu
```

在没有登陆的情况下，也可以直接搜索docker hub仓库的镜像

``` bash
docker run -d --net=host --restart=always \
-e HUMPBACK_LISTEN_PORT=8000 \
-v /opt/app/humpback-web/dbFiles:/humpback-web/dbFiles \
--name humpback-web \
humpbacks/humpback-web:1.0.0
```

### volumn

```js
docker run -it --rm -v /home/lyz/Docker:/lyz busybox sh
docker run -it --rm -v /home/lyz/Docker:/lyz -u 1000:1000 busybox sh
```

### docker加速

阿里云镜像地址：`https://dev.aliyun.com/search.html`
参考学习地址：[传送门](https://yeasy.gitbooks.io/docker_practice/)

### docker无法下载镜像

报错信息

``` html
Error response from daemon: Get https://registry-1.docker.io/v2/: net/http: request canceled while waiting for connection
(Client.Timeout exceeded while awaiting headers)
```

> google了很久，尝试了很多方式都没有成功，最后问题是这样解决的
修改DNS Servers的地址为 8.8.8.8
Mac在网络 => 打开网络偏好设置 => DNS

![](https://i.stack.imgur.com/uFgjq.png)
