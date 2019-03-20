# docker-compose

查看docker-compose版本

```js
docker-compose version
```

创建构建容器的管理文件

```js
vim docker-compose.yml
```

```yml
version: "2"
service:
  test01:
    image: node-server
  web:
    image: node-server-web
    command: node app.js
    ports:
      - "5000:5000"
    volumes:
      - .:/code
```

在项目目录执行命令

```js
docker-compose up
```

```js
docker-compose up -d
```

停止

```js
docker-compose stop
```

查看

```js
docker-compose ps
```

运行

```js
docker-compose run
```

```js
docker-compose down --volumes
```
