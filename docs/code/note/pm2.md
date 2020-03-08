# pm2

## 安装pm2

```js
npm install pm2 -g
// or
yarn add pm2 -g
```

## 启动一个项目

```js
pm2 start app.js
```

## 查看启动项目

```js
pm2 ls
```

## 停止项目

```js
pm2 stop app
```

## 部署配置文件

### 静态网站部署配置
创建配置文件`ecosystem.json`

```js
{
  "apps": [
    {
      "name": "website",  // 项目的名字
      "script": "app.js", // 入口的文件
      "env": {
          "COMMON_VARIABLE": "true"
      },
      "env_production": {
        "NODE_ENV": "production"
      }
    }
  ],
  "deploy": {
    "production": {
      "user": "username", // 服务器上发布应用的user
      "host": ["xxx.xxx.xxx.xxx"], // 可用配置多个服务ip
      "port" : "12345",  // 端口号
      "ref": "origin/master",
      "repo": "git@gitee.com:xxxx/website.git",
      "path":  "/home/username/www/website/production", // 服务器存放文件的地址
      "ssh_options": "StrictHostKeyChecking=no",
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### 动态网站部署配置

```js
{
  "apps": [
    {
      "name": "website",  // 项目的名字
      "script": "app.js", // 入口的文件
      "env": {
          "COMMON_VARIABLE": "true"
      },
      "env_production": {
        "NODE_ENV": "production"
      }
    }
  ],
  "deploy": {
    "production": {
      "user": "username", // 服务器上发布应用的user
      "host": ["xxx.xxx.xxx.xxx"], // 可用配置多个服务ip
      "port" : "12345",  // 端口号
      "ref": "origin/master",
      "repo": "git@gitee.com:xxxx/website.git",
      "path":  "/home/username/www/website/production", // 服务器存放文件的地址
      "ssh_options": "StrictHostKeyChecking=no",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env production",
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
}
```

执行代码，自动部署

```js
pm2 deploy ecosystem.json production setup
```

::: warning
提交代码到远程仓库，确保服务器可以有访问仓库的权限, 确保服务存放项目的文件夹有读写的权限
:::

### 一键部署项目操作流程

1.首先，在服务器上创建一个存放网站的目录，并修改权限

```js
mkdir www && cd www
mkdir website
sudo chmod 777 website
```

2.在本地要部署的网站文件夹内创建一个ecosystem.json文件

```js
{
  "apps": [
    {
      "name": "网站名字",
      "script": "执行启动程序的js文件名，例如：app.js",
      "env": {
          "COMMON_VARIABLE": "true"
      },
      "env_production": {
        "NODE_ENV": "production"
      }
    }
  ],
  "deploy": {
    "production": {
      "user": "imooc_manage", // 服务器上发布应用的user
      "host": ["这里上服务器的ip地址"], // 可用配置多个服务ip
      "port" : "端口号",
      “ref": "origin/master",  //
      "repo": "仓库地址",
      "path":  "/www/website/production", // 服务器存放文件的地址
      "ssh_options": "StrictHostKeyChecking=no",
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
}
```

3.执行部署命令

```js
pm2 deploy ecosystem.json production setup
pm2 deploy ecosystem.json production
```

执行上面的命令可能会报无法找到pm2的错误
解决方法, 进入服务器根目录 编辑bashrc 文件，注释以下几行代码

```js
case $
 *)return ;;
esac
```

4.添加Nginx配置文件，参考nginx相关配置

5.iptables 添加对应的规则，参考iptables相关配置

### 后期网站的维护

1、更改内容
2、提交到仓库
3、执行pm2命令

### PM2发布需要数据库的项目

1.绑定域名

2.生产环境配置数据库地址为 $ 'mongodb://数据库用户名:密码@ip地址:端口号/数据库名'

3.创建ecosystem.json发布脚本文件

```js
{
  apps: [
    {
      "name": "movie",
      "script": "执行启动程序的js文件名，例如：app.js",
      "env": {
          "COMMON_VARIABLE": "true"
      },
      "env_production": {
        "NODE_ENV": "production"
      }
    }
  ],
  "deploy": {
    "production": {
      "user": "imooc_manage" // 服务器上发布应用的user
      "host": ["这里上服务器的ip地址"] // 可用配置多个服务ip
      "port" : "端口号",
      “ref": "origin/master"  //
      "repo": "仓库地址",
      "path":  "/www/movie/production" // 服务器存放文件的地址
      "ssh_options": "StrictHostKeyChecking=no",
      “post-deploy”： “npm install --registry=https://registry.npm.taobao.org && 压缩编译命令 && pm2 startOrReStart ecosystem.json --env production”
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
}
```

4.服务器上创建对应ecosystem.json的path路径的文件夹

```js
sudo mkdir movie
```

5.修改文件夹的操作权限

```js
sudo chmod -R 777 movie
```

6.添加nginx的配置文件

7.初始化目录层次

```js
pm2 deploy ecosystem.json production setup
```

8.发布

```js
pm2 deploy ecosystem.json production
```

9.更新防火墙，加入允许端口号
