# docker-machine

docker-machine 链接虚拟机 docker

## Create

```js
// 创建名为`default`的 docker-machine
docker-machine create -d virtualbox default

// 设置环境变量
eval $(docker-machine env default)

// 启动docker-machine
docker-machine start default

// 查看`default`的ip
docker-machine ip default

// 启动nginx服务
docker run -dp 8000:80 nginx

// curl 查看 nginx启动情况
curl $(docker-machine ip defaucdlt):8000
```

然后到浏览器访问 `http://192.168.99.100:8000/` 地址，则可以访问启动了的 nginx 服务

### Command

开启 docker-machine default (default是机器的名字)

```js
docker-machine start default
```

在 default 虚拟机里运行 busybox

```js
docker $(docker-machine config default) run busybox echo hello world
```

重新启动

```js
docker-machine restart
```

停止

```js
docker-machine stop default
```

停止进程

```js
docker-machine kill
```

查看虚拟机的 IP

```js
docker-machine ip default
```

当前 shell 链接到虚拟机

```js
eval $(docker-machine env)
```

查看环境变量

```js
docker-machine env default
```

查看机器的详细信息

```js
docker-machine inspect default
```

配置信息

```js
docker-machine config
```

条款信息

```js
docker-machine provision
```

进入虚拟机的 docker

```js
docker-machine ssh
```

查看虚拟机 docker 的状态

```js
docker-machine status
```

升级机器

```js
docker-machine upgrade
```

IP `http://192.168.99.100`

```js
docker-machine ip
```

URL tcp://192.168.99.100:2376

```js
docker-machine url
```

查看设置信息

```js
docker-machine env -u
```

设置 DOCKER 的变量

```js
eval $(docker-machine env -u)
```

查看 DOCKER 变量

```js
env | grep DOCKER
```

设置开机启动名字为 default 的 docker 虚拟机

```js
eval $(docker-machine env default)
```
