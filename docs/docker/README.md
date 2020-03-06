# Docker

## 免sudo使用docker

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

## 启动容器

```js
docker run -idt ubuntu
```

## 查看启动中的容器

```js
docker ps
```

## 查看所有容器（启动的和停止）

```js
docker ps -a
```

## 进入容器

```js
docker exec -it [容器id]
```

## 终止容器

```js
docker stop [容器id]
```

## 删除容器

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

## 下载镜像

```js
docker pull --help
docker pull [选项] [Docker Registry地址]<仓库名>:<标签>
```

下载ubuntu 14.04

```js
docker pull ubuntu:14.04
```

## 运行一个容器，指定Shell为 bash

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

## 查看已安装的镜像列表

```js
docker images
```

## 虚悬镜像

```js
docker images -f dangling=true
```

## 删除虚悬镜像

```js
docker rmi $(docker images -q -f dangling=true)
```

## 中间层镜像

```js
docker images -a
```

## 列出部分镜像（也就是说指定仓库名和标签）

```js
docker images ubuntu
docker images ubuntu:14.04
```

## 以特定格式显示

``` bash
docker images -q

docker images --format "{{.ID}}: {{.Repository}}"

docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
```

## Nginx 服务

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

## docker commit

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

## Dockerfile 定制镜像

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

## 直接用Git仓库进行构建

```js
docker build https://github.com/twang2218/gitlab-ce-zh.git#:8.14
```

> 这行命令指定了构建所需的 Git repo，并且指定默认的 master 分支，构建目录为 /8.14/，然后 Docker 就会自己去 git clone 这个项目、切换到指定分支、并进入到指定目录后开始构建。

## tar 压缩包构建

```js
docker build http://server/context.tar.gz
```

## 从标准输入中读取 Dockerfile 进行构建

```js
docker build - < Dockerfile
or
cat Dockerfile | docker build -
```

## 从标准输入中读取上下文压缩包进行构建

```js
docker build - < context.tar.gz
```

## 删除本地镜像

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

## 用 docker images 命令来配合

```js
docker rmi $(docker images -q nginx)
```

## Docker Hub仓库

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

## volumn

```js
docker run -it --rm -v /home/lyz/Docker:/lyz busybox sh
docker run -it --rm -v /home/lyz/Docker:/lyz -u 1000:1000 busybox sh
```

## docker加速

阿里云镜像地址：`https://dev.aliyun.com/search.html`
参考学习地址：[传送门](https://yeasy.gitbooks.io/docker_practice/)

## docker无法下载镜像

报错信息

``` html
Error response from daemon: Get https://registry-1.docker.io/v2/: net/http: request canceled while waiting for connection
(Client.Timeout exceeded while awaiting headers)
```

> google了很久，尝试了很多方式都没有成功，最后问题是这样解决的
修改DNS Servers的地址为 8.8.8.8
Mac在网络 => 打开网络偏好设置 => DNS

![](https://i.stack.imgur.com/uFgjq.png)

创建一个overlay 的 network网络

```js
docker network create -d overlay network-demo
docker network ls
```

开启一个mysql服务的容器，容器名字`mysql` 环境变量配置以及挂载类型，指定连接的网络为network-demo

```js
docker service create --name mysql --env MYSQL_DB_PASSWORD=root --env MYSQL_DATABASE=wordpress --network network-demo --mount type=volume,source=mysql-data,destination=/var/lib/mysql mysql
```

开启一个wordpress服务容器，将本地80端口指向容器80端口，配置环境变量以及指定network网络

```js
docker service create --name wordpress -p 80:80 --env WORDPRESS_DB_PASSWORD=root --env WORDPRESS_DB_HOST=mysql --network network-demo wordpress
```

```js
docker service create --name whoami -p 8000:8000 --network net-demo -d jwilder/whoami
docker service ls
docker ps
curl 127.0.0.1:8000
```

查看service容器的真正IP地址

```js
uslookup task.whoami
```

## Docker Service

创建一个docker service

```js
docker service create --name service-demo busybox sh -c "while true; do sleep 3600; done"
```

查看service信息

```js
docker service ls
```

修复服务数量

```js
docker service scale service-demo=5
```

删除service服务

```js
docker service rm [service name]
```

## Docker Swarm

docker-machine方式创建 docker swarm
创建一个swarm管理的容器

```js
docker-machine create -d virtualbox swarm-manage
```

创建一个swarm worker1容器

```js
docker-machine create -d virtualbox swarm-worker1
```

进入swarm-manage

```js
docker-machine ssh swarm-manage
```

查看初始化帮助命令

```js
docker swarm init --help
```

初始化`docker swarm` --advertise-addr= 容器ip, 容器ip可以通过 `ip a`查看

```js
docker swarm init --advertise-addr=192.168.99.101
```

初始化完成后，会得到下面一条命令, 复制该命令，退出当前的swarm-manage容器，进入另外一个需要管理的容器

```js
docker swarm join --token SWMTKN-1-199ngxu0zorrrvz2vd6ddh5pe4rjnvebieuvuxwiwy0gln0vye-2fchlf18ilor533frgs40u4cy 192.168.99.101:2377
```

进入另外一个虚拟机容器

```js
docker-machine ssh swarm-worker1
```

执行命令

```js
docker swarm join --token SWMTKN-1-199ngxu0zorrrvz2vd6ddh5pe4rjnvebieuvuxwiwy0gln0vye-2fchlf18ilor533frgs40u4cy 192.168.99.101:2377
```

在切换到swarm-manage虚拟机容器, 查看子节点

```js
docker-machine ssh swarm-manage
docker node ls
```

使用`docker info` 查看swarm的信息

```js
docker@swarm-manage:~docker info
Swarm: active
 NodeID: kll7b248h4n0s2v5p6s6c9uvi
 Is Manager: true
 ClusterID: 9k90cn8q5v7hb0xtqt43zfjiw
 Managers: 1
 Nodes: 3
```

现在我们来拉取一些镜像

```js
docker -H 192.168.99.101:2376 pull redis
docker -H 192.168.99.102:2376 pull mysql

```

```js
docker@swarm-manage:~docker node ls
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
kll7b248h4n0s2v5p6s6c9uvi *   swarm-manage        Ready               Active              Leader              18.05.0-ce
boqu6lj57panhvzaln1menk2q     swarm-worker1       Ready               Active                                  18.05.0-ce
```

## Docker Compose

-f 参数指定执行文件

```js
docker-compose -f docker-compose.yml up
```

默认执行文件为 `docker-compose.yml`

```js
docker-compose up
```

后台执行

```js
docker-compose up -d
```

```js
docker-compose images
```

进入docker-compose构建的容器

```js
docker-compose exec mysql bash
```

负载均衡

```js
docker-compose up --sacle web=3 -d
```

```js
version: '3'

services:

  wordpress:
    image: wordpress
    ports:
      - 8088:80
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_PASSWORD: root
    networks:
      - my-bridge

  mysql:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: wordpress
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - my-bridge

  volumes:
    mysql-data:

  networks:
    my-bridge:
      driver: bridge
```

## 安装wordpress

运行mysql

```js
docker run -d --name mysql -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=wordpress mysql
```

运行wordpress

```js

docker run -e WORDPRESS_DB_HOST=mysql:3306 --link mysql -p 8088:80 wordpress

```

## Docker 存储

创建一个数据卷

```js
docker volume create my-vol
```

查看已创建卷

```js
docker volume ls
```

查看卷详细信息

```js
docker volume inspect my-vol
```

删除卷

```js
docker volume rm my-vol
```

myvol目录映射到docker容器的app目录

```js
docker run -dit --name devtest -v myvol:/app nginx

```

将当前目录映射到虚拟机的`/usr/share/nginx/html` 目录

```js
docker run -dp 80:80 --name myngxin -v $(pwd):/usr/share/nginx/html nginx
```

查看devtest容器信息

```js
docker inspect devtest
```

```js
docker container stop devtest
```

```js
docker container rm devtest
```

```js
docker container rm myvol
```

## 多机通讯

下载解压 etcd-v3.0.12-linux-amd64

```js
./etcdctl cluster-health
```

## Linux Network NameSpace

```js
查看network namespace 列表
```js
sudo ip netns list
```

## 添加

```js
sudo ip netns add [netns]
```

## 删除

```js
sudo ip netns delete [netns]
```

## 查看

```js
sudo ip netns exec [netns] ip a
```

## ip link

```js
sudo ip netns exec [netns] ip link

sudo ip netns exec [netns] ip link set dev lo up

sudo ip link add veth-test1 type veth peer name veth-test2

sudo ip link set veth-test1 netns test1

sudo ip link set veth-test2 netns test2

sudo ip netns exec test1 ip addr add 192.168.1.1/24 dev veth-test1

sudo ip netns exec test2 ip addr add 192.168.1.2/24 dev veth-test2

sudo ip netns exec test1 ip link set dev veth-test1 up

sudo ip netns exec test2 ip link set dev veth-test2 up

sudo ip netns exec test1 ping 192.168.1.2

sudo ip netns exec test2 ping 192.168.1.1
```

log

```js
docker log 容器id
```

## Dockerfile

使用`Dockerfile` 打包一个`stress` tools

```js
FROM ubuntu
RUN apt-get update && apt-get install -y stress
ENTRYPOINT ["/usr/bin/stress"]
CMD []
```


```js
stress --vm 1

stress --vm 1 -v
```

**memory**

设定虚拟机内存200M --memory-swap在不设置的情况下默认同memory大小

```js
docker run --memory=200M lzy1948/stress-tool --vm 1 -v
```

vm-bytes超出设定的memory 和memory-swap总量将自动退出

```js
docker run --memory=200M lzy1948/stress-tool --vm 1 -v --vm-bytes 500M
```

设定cpu权重为5

```js
docker run --cpu-share=5 --name test1 lzy1948/stress-tool --cpu 1
```

设定cpu权重为10

```js
docker run --cpu-share=10 --name test2 lzy1948/stress-tool --cpu 1
```

创建一个data-container容器，运行另外一个容器并链接到data-container容器

```js
docker create -v $PWD/data:/var/volData --name data-container ubuntu

docker run -it --volumes-from data-container ubuntu /bin/bash

docker tag docker/nginx lzy1948/nginx:v1

docker push lzy1948/nginx:v1
```

## Docker 网络相关

```js
sudo yum install bridge-utils

brctl
```

link

```js
sudo docker run -d --name test1 busybox /bin/sh -c "while true; do sleep 3600; done"

docker exec -it test1 /bin/sh

docker ip a

sudo docker run -d --name test2 --link test1 busybox /bin/sh -c "while true; do sleep 3600; done"

docker exec -it test2 /bin/sh

ping [test1 ip]
ping test1
```

查看网络列表

```js
docker network ls
```

查看容器的IP地址

```js
docker network inspect bridge
docker network inspect [test-network]
```


创建一个网络

```js
docker network create mynetwork-test
```

创建一个容器并链接到创建的网络

```js
docker run -d --network mynetwork-test --name test-network ubuntu:14.04
```

将容器连接到网络

```js
# test1 连接到mynetwork-test
docker network connect mynetwork-test test1
```

格式化查看容器的网络配置

```js
docker inspect --format='{{json .NetworkSettings.Networks}}' test-network
```

从网络中移除已链接的容器

```js
docker network disconnect bridge [id|name]
```

demo

```js
docker network create test-network

docker run -dit --name ubuntu-test01 ubuntu:14.04

docker run -dit --name ubuntu-test02 ubuntu:14.04

docker network connect test-network ubuntu-test01

docker network connect test-network ubuntu-test02

docker network inspect test-network

docker exec -it ubuntu-test01 bash

ping ubuntu-test02
```

```js
docker run -d --name test1 --network none busybox /bin/sh -c "while true; do sleep 3600; done"
```

## Docker 构建一个nodejs服务

创建一个目录

```js
mkdir docker-node && cd docker-node
```

创建文件

```js
touch app.js
touch package.json
touch Dockerfile
```

写入内容
Dockerfile

```js
FROM node:6.10.2-alpine
ADD . /server/www/
WORKDIR /server/www/
RUN cd /server/www && npm install
EXPOSE 3001
CMD ["node","server.js"]
```

package.json

```js
{
  "name": "docker-node",
  "private": true,
  "version": "1.0.0",
  "description": "Node.js with docker",
  "author": "you@email.com",
  "dependencies": {
    "express": "3.2.4"
  }
}
```

app.js

```js
var express = require('express');
var PORT = 3001;
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World\n');
});

app.listen(PORT)
console.log('Running on http://127.0.0.1:' + PORT);
```

构建镜像
在当前目录构建一个名为node-hello的image

```js
docker build -t node-hello .
```

查看构建完成后的镜像

```js
docker images
```

运行node-hello镜像

```js
docker run -d -p 5000:5000 node-hello
```

查询DNS

```js
nslookup www.ykpine.com
```