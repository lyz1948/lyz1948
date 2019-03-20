# docker-machine

docker-machine 链接虚拟机docker
## Create

``` bash
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
curl $(docker-machine ip default):8000
```

然后到浏览器访问 `http://192.168.99.100:8000/` 地址，则可以访问启动了的nginx服务

### Command

开启docker-machine default是机器的名字

```bash
docker-machine start default
```

在default虚拟机里运行busybox

```bash
docker $(docker-machine config default) run busybox echo hello world
```

重新启动

```bash
docker-machine restart
```

停止

```bash
docker-machine stop default
```

停止进程

```bash
docker-machine kill
```

查看虚拟机的IP

```bash
docker-machine ip default
```

当前shell链接到虚拟机

```bash
eval $(docker-machine env)
```

查看环境变量

```bash
docker-machine env default
```

查看机器的详细信息

```bash
docker-machine inspect default
```

配置信息

```bash
docker-machine config
```

条款信息

```bash
docker-machine provision
```

进入虚拟机的docker

```bash
docker-machine ssh
```

查看虚拟机docker的状态

```bash
docker-machine status
```

升级机器

```bash
docker-machine upgrade
```

IP `http://192.168.99.100`

```bash
docker-machine ip
```

URL tcp://192.168.99.100:2376

```bash
docker-machine url
```

查看设置信息

```bash
docker-machine env -u
```

设置DOCKER的变量

```bash
eval $(docker-machine env -u)
```

查看DOCKER变量

```bash
env | grep DOCKER
```

设置开机启动名字为default的docker虚拟机

```bash
eval $(docker-machine env default)
```