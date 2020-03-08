# mongodb

## Install

### MacOS

- 方式一： homebrew 安装

```js
brew update
brew install mongodb
```

安装目录在`/usr/local/Celler/mongodb/3.6.3/`

### ubuntu上安装MongoDB(3.4版本)

[直达飞机](https://docs.mongodb.com/v3.4/tutorial/install-mongodb-on-ubuntu/)

```js
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
```

```js
echo "deb [ arch=amd64 ] http://mirros.aliyun.com/mongodb/atp/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
```

```js
sudo apt-get update
```

```js
sudo apt-get install -y mongodb-org
```

如果安装很慢的话，可以修改镜像源来解决下载慢的问题

```js
sudo vi /etc/apt/apt.conf
```

修改mongodb 源配置文件的镜像源为aliyun

```js
sudo vi /etc/apt/sources.list.d/mongodb-org/3.4.list
```

添加阿里云镜像源

```js
http://mirros.aliyun.com/mongodb/atp/ubuntu trusty/mongodb-org/3.4
```

## Use

新建一个存放数据的目录

```js
sudo mkdir -p /data/db
```

添加环境变量到`~/.bash_profile` 中, 用`vim` 或者其他编辑器打开`.bash_profile`

```js
vim ~/.bash_profile
```

写入以下命令

```js
export PATH=/usr/local/Cellar/mongodb/3.6.3/bin:${PATH}
```

`mongodb/3.6.3/` 是mongodb的版本

让配置马上生效

```js
source ~/.bash_profile
```

修改`mongodb`配置文件

```js
# Store data in /usr/local/var/mongodb instead of the default /data/db
dbpath = /data/db

# Append logs to /usr/local/var/log/mongodb/mongo.log
logpath = /usr/local/var/log/mongodb/mongo.log
logappend = true


# Only accept local connections
bind_ip = 127.0.0.1
```

修改`/data/db`的权限

```js
sudo chmod 777 /data/db
```

启动`mongodb`

```js
mongod
```

进入数据库

```js
mongo
```

## 启动与停止

启动MongoDB

```js
sudo service mongod start
```

停止MongoDB

```js
sudo service mongod stop
```

重启MongoDB

```js
sudo service mongod restart
```

卸载MongoDB

```js
sudo service mongod stop

sudo apt-get purge mongodb-org*

sudo rm -r /var/log/mongodb

sudo rm -r /var/lib/mongodb
```

查看启动状态

```js
cat /var/log/mongodb/mongod.log
```

进入数据库

```js
mongo
```

如果出现下面的错误

```js
Failed global initialization: BadValue Invalid or no user locale set. Please ensure LANG and/or LC_* environment variables are set correctly.
```

在命令行输入

```js
export LC_ALL=C
```

修改MongoDB默认端口号

```js
sudo vi /etc/mongod.conf
```

修改port为其他端口号, 修改后，启动方式为

```js
mongo --port 19999
```

### MongoDB数据导入导出

导出数据库数据
-h 数据库的ip地址与端口号
-d 数据库名字
-o 导出的数据名字
-u 数据库密码

```js
mongodump -h 127.0.0.1:27017 -d [数据库名字] -p [数据库密码] -o [导出后的数据库名字]
```

导出的数据库先压缩一下，然通过scp上传到服务器

```js
tar zcvf [压缩后文件名字] [需压缩文件名字]
scp -P [端口号] [文件] username@ip:/home/username/dbbackup/
```

登录到服务器后，解压刚上传的tar包

```js
tar xvf [tar包]
```

接下来导入数据
-d 是要导入数据的数据库名字

```js
mongorestore --host 127.0.0.1:19999 -d [要导入] [要导入的数据的文件]
```

上面是导出整个数据的操作，如果只需要到出某张表的话
-d movie 数据库名字
-c users 指定数据库的表名字
-q 查询参数
-o ./movie-users.json 导出的文件名称和位置

```js
mongoexport -d movie -c users -q '{"name": $ne: null }' -o ./movie-users.json
```

导入表单
-d movie 数据库的名字
-c users 数据库的表名 ./movie-users.json 导入的文件

```js
mongoimport --host 127.0.0.1:19999 -d movie -c users ./movie-users.json
```

清空某个数据库
movie 是数据库名字

```js
mongo --host 127.0.0.1:19999 movie --eval "db.dropDatabase()"
```

### 配置管理员账户

1. 切换到管理员账户，创建一个新管理员

```js
use admin

db.createUser({
  user: '用户名',
  pwd: '密码',
  roles: [{
    role: 'userAdminAnyDatabase',
    db: 'admin'
  }]
})
```

1. 授权

```js
db.auth('用户名', '密码')
```

如果返回1则说明成功

### 为某个数据库配置管理员

1. 先切换到管理员账户

```js
user admin

db.auth('用户名', '密码')

user 数据库名字

db.createUser({
  user: '用户名',
  pwd: '密码',
  roles: [
    role: 'readWrite',
    db: '数据库名字'
  ]
})
```

可以在建立一个备份的管理员账户，只拥有读到权限
添加完成后，修改一下配置信息

```js
sudo vi /etc/mongod.conf
```

修改的地方

```js
security
  authorization: 'enabled'
```

1. 重启MongoDB

```js
sudo service mongod restart
 ```

1. 进入数据库

```js
mongo --port 19999
```

1. 先登录管理员账户

```js
use admin

db.auth('用户名', '密码')
```

#### 直接登录某个数据库

```js
mongo 127.0.0.1:19999/imooc-movie -u 'username' -p 'password'
```

### 数据库备份

1.建立一个脚本

```js
mkdir tasks && cd tasks
sudo vim movie.backup.sh
```

2.编辑脚本执行操作到命令

```js
#!/bin/sh

backUpFolder= /home/imooc_manage/backup/movie
date_now= `date + %Y_%m_%d_%H%M`
backFileName= movie_$date_noe

cd $backUpFolder
mkdir -p $backFileName

mongodump -h 127.0.0.1:19999 -d 数据库 -u 用户名 -p 密码 -o $backFileName

tar acvf $backFileName.tar.gz $backFileName

rm -rf $backFileName
```

3.执行脚本

```js
sudo sh ./tasks/movie.backup.sh
```

4.定时备份

切换到根目录

```js
cd
```

进入系统配置文件

```js
crontab -e
```

命令可用写入多条，每条单独一行

```js
m     h     dom     mon     dow     command
分钟  小时     *      *       *        sh /home/yk_manage/tasks/movie.backup.sh
```
