# Nginx

## 安装

### CentOs

编辑 /etc/yum.repos.d/nginx.repo 文件

```js
sudo vi /etc/yum.repos.d/nginx.repo
```

加入下面代码

```js
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1
```

执行安装命令

```js
yum install nginx
```

查看版本

```js
nginx -v
```

查看编译的配置信息

```js
nginx -V
```

查看rpm包

```js
rpm -ql | nginx
```

查看配置是否OK

```js
nginx -t -c /etc/nginx/nginx.conf
```

关闭network中headers的显示信息

```bash
server_tokens off;
```

重启Nginx

```js
nginx -s reload -c /etc/nginx/nginx.conf

systemctl restart nginx.service
```

查看Nginx占用端口

```js
netstat -luntp|grep nginx
```

查看进程

```js
ps -ef | grep nginx
```

### Ubuntu

```js
sudo apt-get install nginx
```

启动/停止Nginx

```js
sudo service nginx start
sudo service nginx stop
sudo service nginx restart
```

## Nginx配置

修改nginx.conf 配置文件 将以下2行取消注释

``` bash
include /etc/nginx/conf.d/*.conf;
include /etc/nginx/sites-enabled/*;
```

### 静态网站基本配置

修改配置，在／etc/nginx/conf.d 目录下，新建文件

```bash
sudo vi ykpine-com-8081.conf
```

```js
upstream website {
  server 127.0.0.1:8080;
}

server {
  listen  80;
  server_name www.ykpine.com;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header HOST $http_host;
    proxy_set_header X-Nginx-Proxy true;

    proxy_pass http://website;
    proxy_redirect off;
  }
}
```

HTTPS证书基本配置

```js
upstream app {
  server 127.0.0.1:8081;
}

server {
  listen  80;
  server_name app.ykpine.com;
  # rewrite ^(.*) https://$host$1 permanent;
  return 301 https://app.ykpine.com$request_uri;
}

server {
    listen 443;
    server_name app.ykpine.com;
    ssl on;
    root html;
    index index.html index.htm;
    ssl_certificate   /www/cert/app.ykpine.com.pem;
    ssl_certificate_key  /www/cert/app.ykpine.com.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    if ($ssl_protocol = "") {
      rewrite ^(.*) https://$host$1 permanent;
    }

    location / {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
      proxy_set_header HOST $http_host;
      proxy_set_header X-Nginx-Proxy true;

      proxy_pass http://app;
      proxy_redirect off;
    }
}
```

负载均衡

```js
upstream backend {
  server backend1.example.com weight=5;
  server backend1.example.com:9000;
  server unix:/tmp/backend3;

  server backend1.example.com backup;
  server backend1.example.com backup;
}
```
