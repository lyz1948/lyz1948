# Docker Registry

### 创建一个私有的Docker Hub

1.在服务器上运行

```js
docker run -d -p 9000:9000 --restart always --name registry registry:2
```

2.构建镜像

```js
docker build -t 118.24.18.252/node-server .
```

3.push镜像到docker hub

```js
docker push 118.24.18.252/node-server
```

在push之前需要做一些配置，否则将无法push成功
在`/etc/docker`下创建`daemon.json`

```js
{ "insecure-registries": ["118.24.18.252:9000"] }
```

修改`/lib/systemd/system/docker.service` 文件,加入一行代码

```js
EnvironmentFile=-/etc/docker/daemon.json
```

重启docker

```js
sudo service docker restart
```

使用官方api接口 查看已经push到仓库的`docker`镜像

```js
118.24.18.252:9000/v2/_catalog
```

或者先删除image在从仓库里拉取，拉取成功说明刚才push成功了
