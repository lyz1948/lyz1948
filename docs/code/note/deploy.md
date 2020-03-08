# Ubuntu服务器部署

## ssh连接到服务器

```bash
ssh -p yourport username@ip
```

## 免密码登录(用新增的用户登录)

参考 这篇[ssh免密码登录](./ssh) 的文章

## 修改登录的配置信息

```bash
sudo vi /etc/ssh/sshd_config
```

1.端口号修改 修改1025～ 63560 之间的端口号
2.添加用户

```bash
AllowUsers [username]
```

3.是否允许空密码登录

```bash
PermitEmptyPasswords no
```

4.是否允许root登录

```bash
PermitRootLogin no
```

5.是否允许未添加key的电脑登录

```bash
PasswordAuthenthication no
```

## 重启ssh

```bash
service ssh restart
```

新开窗口测试修改后的配置是否生效

用22端口登录测试
用root账户登录和修改后的端口测试

## 配置 iptables 和 Fail2Ban 增强安全防护

```bash
sudo apt-get update && sudo apt-get upgrade
sudo iptables -F
sudo vi /etc/iptables.up.rules
```

配置`iptables`规则

```bash
*filter

# allow all connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# allow out traffic
-A OUTPUT -j ACCEPT

# allow http https
-A INPUT -p tcp --dport 443 -j ACCEPT
-A INPUT -p tcp --dport 80 -j ACCEPT

# allow ssh port login
-A INPUT -p tcp -m state --state NEW --dport [端口号] -j ACCEPT

# ping
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

# mongodb connect
-A INPUT -s 127.0.0.1 -p tcp --destination-port [端口号] -m state --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -d 127.0.0.1 -p tcp --source-port [端口号] -m state --state ESTABLISHED -j ACCEPT

# log denied calls
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied:" --log-level 7

# drop incoming sensitive connections
-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --set
-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --update --seconds 60 --hitcount 150 -j DROP

# reject all other inbound
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```

## 重启iptables-restore

```js
sudo iptables-restore < /etc/iptables.up.rules
```

## 安装ufw

```bash
sudo apt-get install ufw
```

查看防火墙是否激活

```bash
sudo ufw status
```

输出显示 Status: active 则激活

开启防火墙

```bash
sudo ufw enable
```

## 设置开机启动

1.创建启动命令文件

```bash
sudo vi /etc/network/if-up.d/iptables
```

2.写入启动命令

``` bash
#!/bin/sh
iptables-restore /etc/iptables.up.rules
```

3.修改配置启动命令文件的权限

$ sudo chmod +x /etc/network/if-up.d/iptables

## 安装fail2ban

```bash
sudo apt-get install fail2ban
```

修改配置文件

```bash
sudo vi /etc/fail2ban/jail.conf
```

``` bash
bantime  = 3600
destemail = [自己的邮箱]
action = %(action_mw)s
```

## 查看fail2ban 是否开启

```bash
sudo service fail2ban status
sudo service fail2ban start
sudo service fail2ban stop
```

## 删除apach

```bash
update-rc.d -f apache2 remove
sudo apt-get remove apache2
```

## 安装服务器中用到的其他程序

```bash
sudo apt-get install vim openssh build-essential libssl-dev wget curl git
```

## 安装nvm

`nvm`的安装[nvm](./nvm)

## 安装nodejs

使用`nvm`安装与管理`nodejs`版本

```bash
nvm install v6.9.5
nvm use v6.9.6
nvm alias default v6.9.5
node -v
```

监控文件数目

```bash
echo fs.inotify.max_user_watches=523288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## 安装nginx

`nginx`的安装与使用[nginx](./nginx)

## 安装mongodb

`nginx`的安装与使用[nginx](./mongodb)