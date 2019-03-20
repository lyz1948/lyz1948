# ssh免密码登录

1 本地电脑生成密钥

```bash
ssh-keygen -t rsa -b 4096 -C "你的邮箱"
后面可一路回车，

进入.ssh目录，执行下面的2条命令
eval "$(ssh-agent -s)"

ssh-add ~/.ssh/id_rsa
```

后面可一路回车，结束后，进入.ssh 目录，可用看到生成里 id_rsa, id_rsa.pub 这 2 个文件，然后执行下面的 2 条命令

```bash
cd ~/.ssh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

2 服务器生成密钥（重复上面的步骤）
3 进入.ssh 目录下，创建 authorized_keys 文件

```bash
vi authorized_keys
```

4 把本地电脑到 id_rsa.pub 的内容写入 authorized_keys 内
5 修改 authorized_keys 文件的权限

```bash
chmod 600 authorized_keys
```

6 重启 ssh 服务

```bash
sudo service ssh restart

```

7 在本地新开命令行窗口,重新登录远程服务器

```bash
ssh username@ip
```
