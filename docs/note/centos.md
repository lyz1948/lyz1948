# Centos系统命令与资源安装

### 修改CentOS系统软件安装源

1. 备份原镜像文件

```bash
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

2. 下载新的`CentOS-Base.repo` 到`/etc/yum.repos.d/`
**阿里云Linux安装软件镜像源**
CentOS 5

```bash
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-5.repo
```

CentOS 6

```bash
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
```

**163安装软件镜像源**
CentOS 5

```bash
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.163.com/.help/CentOS5-Base-163.repo
```

CentOS 6

```bash
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.163.com/.help/CentOS6-Base-163.repo
```

3. 运行yum makecache生成缓存

```bash
yum clean all
$ yum makecache
```

### SCP命令 

本地文件上传到端口号为19999的服务器

```bash
p a.txt -P 19999 root@ip:/home/centos
```

服务器上下载b.txt到本地Downloads目录

```bash
p root@ip:/opt/b.txt /Users/user/Downloads
```

### 安装Nodejs

** 添加 epel 源 **
64位:

```bash
rpm -ivh http://download.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
```

32位:

```bash
rpm -ivh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
```

导入 key:

```bash
rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-6
```

** 添加 remi 源 **

```bash
m -ivh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-remi
```

** 安装完成后,执行 **

```bash
rl --silent --location https://rpm.nodesource.com/setup_5.x | bash -
yum -y install nodejs
```

### 解压rar文件

// 解压 vpsyou.rar 到当前目录

```bash
r x vpsyou.rar
```

压缩 将 vpsyou.com 目录打包为 vpsyou.rar

```bash
rar vpsyou.rar ./vpsyou.com/
```

### ZIP解压操作

把/home目录下面的mydata目录压缩为mydata.zip

```bash
zip -r mydata.zip mydata #压缩mydata目录

```

把/home目录下面的mydata.zip解压到mydatabak目录里面

```bash
unzip mydata.zip -d mydatabak
```

3、把/home目录下面的abc文件夹和123.txt压缩成为abc123.zip
zip -r abc123.zip abc 123.txt
4、把/home目录下面的wwwroot.zip直接解压到/home目录里面

unzip wwwroot.zip
5、把/home目录下面的abc12.zip、abc23.zip、abc34.zip同时解压到/home目录里面

unzip abc\*.zip
6、查看把/home目录下面的wwwroot.zip里面的内容

unzip -v wwwroot.zip
7、验证/home目录下面的wwwroot.zip是否完整

unzip -t wwwroot.zip
8、把/home目录下面wwwroot.zip里面的所有文件解压到第一级目录

unzip -j wwwroot.zip
