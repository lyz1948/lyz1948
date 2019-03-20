# Docker

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

### Docker Service

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

### Docker Swarm

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

### Docker Compose

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

### 安装wordpress

运行mysql

```js
docker run -d --name mysql -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=wordpress mysql
```

运行wordpress

```js

docker run -e WORDPRESS_DB_HOST=mysql:3306 --link mysql -p 8088:80 wordpress

```

### Docker 存储

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

### 多机通讯

下载解压 etcd-v3.0.12-linux-amd64

```js
./etcdctl cluster-health
```

### Linux Network NameSpace

```js
查看network namespace 列表
```js
sudo ip netns list
```

### 添加

```js
sudo ip netns add [netns]
```

### 删除

```js
sudo ip netns delete [netns]
```

### 查看

```js
sudo ip netns exec [netns] ip a
```

### ip link

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

### Dockerfile

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

### Docker 网络相关

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

### Docker 构建一个nodejs服务

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