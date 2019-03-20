# Docker Network

查看网络列表

```js
docker network ls
```

查看网络详细信息

```js
docker network inspect bridge
```

创建一个网络

```js
docker network create network-test
```

删除一个网络

```js
docker network rm [network name | network id]
```

容器链接到网络

```js
docker run -dp 5000:5000 --net network-test --name test01 node-server
```

查看链接容器后的网络信息

```js
docker network inspect network-test
```

进入容器

```js
docker exec test01 bash
查看IP```


```js
cat /etc/hosts
查看IP对应```
容器的信息

```js
curl test01:5000
```

一键开启多个容器并链接到创建的网络的.sh 文件

```js
/bin/bash

# 构建容器
docker build -t lzy1948/node-server

# 创建网络
docker network create nodeserver

# 运行 test01 容器
docker run -d --net nodeserver -p 9200:9200 -p 9300:9300 --name test01 node-server

# 运行 test02 容器
docker run -d --net nodeserver -p 5000:5000 --name test02 node-server
```
