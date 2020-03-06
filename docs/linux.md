# Linux常用命令

### netstat

```bash
netstat 查看端口状态
```

查看系统挂载盘

```bash
fdisk -l
```

查看硬盘使用情况

```bash
df -h
```

telnet

```bash
telnet 118.24.18.252
```

查询DNS

```bash
nslookup 网址
```

### tar命令

`-c` 或 `-create` 建立新备份文件
`-C` 或 `-directory=<目录>` 切换目录
`-f` 或 `–file=<备份文件>` 指定备份文件
`-j` 或`–bzip2` 以bz2的算法来压缩或者解压文件
`-k` 或 `–keep-old-files` 解开备份文件时，不覆盖已有的文件
`-m` 或 `–modification-time` 还原文件时，不变更文件的更改时间
`-N` 或 `–newer=<日期时间>` 只将较指定日期更新的文件保存到备份文件里
`-r` 或 `–append` 新增文件到已存在的备份文件的结尾部分
`-t` 或 `–list` 列出备份文件的内容
`-u` 或 `–update` 仅置换较备份文件内的文件更新的文件
`-v` 或 `–verbose` 显示指令执行过程
`-w` 或 `–interactive` 遭遇问题时先询问用户
`-W` 或 `–verify` 写入备份文件后，确认文件正确无误
`-x` 或 `–extract` 或 `–get` 从备份文件中还原文件
`-z` 或 `–gzip` 或 `–ungzip` 通过gzip指令处理备份文件
`-Z` 或 `–compress` 或 `–uncompress` 通过compress指令处理备份文件

### 打包与解包tar

打包一个文件

```bash
tar -cvf filename.tar filenameDIR
```

解包一个tar文件
在当前目录解包

```bash
tar -xvf filename.tar
```

指定目录解包

```bash
tar -xvf filename.tar -C /home
```

### 打包压缩与解包tar.gz

打包压缩

```bash
tar -zcvf filename.tar.gz filenameDIR
```

解压缩
在当前目录解压缩

```bash
tar -zxvf filename.tar.gz
```

指定目录解压缩

```bash
tar -zxvf filename.tar.gz -C /home
```

### 打包压缩与解包tar.bz2

```bash
tar -jcvf filename.tar.bz2 filenameDIR
```

```bash
tar -jxvf filename.tar.bz2 -C /home
```

### 查看命令`ls`

-a  列出包括.a开头的隐藏文件的所有文件
-A  通-a，但不列出"."和".."
-l  列出文件的详细信息
-c  根据ctime排序显示
-t  根据文件修改时间排序
---color[=WHEN] 用色彩辨别文件类型 WHEN 可以是'never'、'always'或'auto'其中之一
   白色：表示普通文件
   蓝色：表示目录
   绿色：表示可执行文件
   红色：表示压缩文件
   浅蓝色：链接文件
   红色闪烁：表示链接的文件有问题
   黄色：表示设备文件
   灰色：表示其它文件

### 移动命令`mv`

```bash
mv [选项] 源文件或目录 目录或多个源文件 | 移动或重命名文件
-b  #覆盖前做备份
-f  如存在不询问而强制覆盖
-i  如存在则询问是否覆盖
-u  较新才覆盖
-t  将多个源文件移动到统一目录下，目录参数在前，文件参数在后

$ mv a /tmp/ #将文件a移动到 /tmp目录下
$ mv a b #将a命名为b
$ mv /home/zenghao test1.txt test2.txt test3.txt
```

### 复制命令`cp`

```bash
- cp [选项] 源文件或目录 目录或多个源文件 | 将源文件复制至目标文件，或将多个源文件复制至目标目录
-r -R 递归复制该目录及其子目录内容
-p  连同档案属性一起复制过去
-f  不询问而强制复制
-s  生成快捷方式
-a  将档案的所有特性都一起复制

```

### 上传与下载命令`scp`

```bash
-v  详细显示输出的具体情况
-r  递归复制整个目录
(1) 复制文件：
命令格式：
scp local_file remote_username@remote_ip:remote_folder
或者
scp local_file remote_username@remote_ip:remote_file
或者
scp local_file remote_ip:remote_folder
或者
scp local_file remote_ip:remote_file
第1,2个指定了用户名，命令执行后需要输入用户密码，第1个仅指定了远程的目录，文件名字不变，第2个指定了文件名
第3,4个没有指定用户名，命令执行后需要输入用户名和密码，第3个仅指定了远程的目录，文件名字不变，第4个指定了文件名
(2) 复制目录：
命令格式：
scp -r local_folder remote_username@remote_ip:remote_folder
或者
scp -r local_folder remote_ip:remote_folder
第1个指定了用户名，命令执行后需要输入用户密码；
第2个没有指定用户名，命令执行后需要输入用户名和密码；
eg:
   从 本地 复制到 远程
   scp /home/daisy/full.tar.gz root@172.19.2.75:/home/root
   从 远程 复制到 本地
   scp root@/172.19.2.75:/home/root/full.tar.gz /home/daisy/full.tar.gz
```

### 删除命令`rm`

```bash
-r  删除文件夹
-f  删除不提示
-i  删除提示
-v  详细显示进行步骤
```

### 创建命令`touch`

```bash
-a  只修改存取时间
-m  值修改变动时间
-r  eg:touch -r a b ,使b的时间和a相同
-t  指定特定的时间 eg:touch -t 201211142234.50 log.log
   -t time [[CC]YY]MMDDhhmm[.SS],C:年前两位
```

### 改变目录命令`cd`

```bash
.. :返回上层目录
回车  ：返回主目录
/   :根目录
```

### 创建新目录`mkdir`

```bash
-p  递归创建目录，若父目录不存在则依次创建
-m  自定义创建目录的权限
-v  显示创建目录的详细信息
$ mkdir -m 777 hehe

```

### 删除空目录`rmdir`

```bash
-v  显示执行过程
-p  若自父母删除后父目录为空则一并删除
```

`rm`

```bash
-f  忽略不存在的文件，不给出提示
-i  交互式删除
-r  将列出的目录及其子目录递归删除
-v  列出详细信息
```

### 输出命令`echo`

```bash
-n  输出后不换行
-e  遇到转义字符特殊处理

$ echo "he\nhe"   显示he\nhe
$ ehco -e "he\nhe"    显示he(换行了)he

```

### cat

- cat [选项] [文件] 一次显示整个文件或从键盘创建一个文件或将几个文件合并成一个文件

```bash
-n  编号文件内容再输出
-E  在结束行提示$
```

### more

more 按页查看文章内容，从前向后读取文件，因此在启动时就加载整个文件

```bash
+n  从第n行开始显示
-n  每次查看n行数据
+/String    搜寻String字符串位置，从其前两行开始查看
-c  清屏再显示
-p  换页时清屏
```

less

```bash
-m  显示类似于more命令的百分比
-N  显示行号
/   字符串：向下搜索“字符串”的功能
?   字符串：向上搜索“字符串”的功能
n   重复前一个搜索（与 / 或 ? 有关）
N   反向重复前一个搜索（与 / 或 ? 有关）
b   向后翻一页
d   向后翻半页
```

### nl

```bash
-b
-b a 不论是否有空行，都列出行号（类似 cat -n)
-b t 空行则不列行号（默认）
-n 有ln rn rz三个参数，分别为再最左方显示，最右方显示不加0，最右方显示加0
```

### head

head [参数] [文件] 显示档案开头，默认开头10行

```bash
-v  显示文件名
-c number   显示前number个字符,若number为负数,则显示除最后number个字符的所有内容
-number/n (+)number     显示前number行内容，
-n number   若number为负数，则显示除最后number行数据的所有内容
```

### tail

```bash
-v  显示详细的处理信息
-q  不显示处理信息
-num/-n (-)num      显示最后num行内容
-n +num 从第num行开始显示后面的数据
-c  显示最后c个字符
-f  循环读取
```

### whereis

```bash
-b   定位可执行文件。
-m   定位帮助文件。
-s   定位源代码文件。
-u   搜索默认路径下除可执行文件、源代码文件、帮助文件以外的其它文件。
-B   指定搜索可执行文件的路径。
-M   指定搜索帮助文件的路径。
-S   指定搜索源代码文件的路径。
```

### find

```bash
1. 与时间有关的选项：共有 -atime, -ctime 与 -mtime 和-amin,-cmin与-mmin，以 -mtime 说明
   -mtime n ：n 为数字，意义为在 n 天之前的『一天之内』被更动过内容的档案；
   -mtime +n ：列出在 n 天之前(不含 n 天本身)被更动过内容的档案档名；
   -mtime -n ：列出在 n 天之内(含 n 天本身)被更动过内容的档案档名。
   -newer file ：file 为一个存在的档案，列出比 file 还要新的档案档名

2. 与使用者或组名有关的参数：
   -uid n ：n 为数字，这个数字是用户的账号 ID，亦即 UID
   -gid n ：n 为数字，这个数字是组名的 ID，亦即 GID
   -user name ：name 为使用者账号名称！例如 dmtsai
   -group name：name 为组名，例如 users ；
   -nouser ：寻找档案的拥有者不存在 /etc/passwd 的人！
   -nogroup ：寻找档案的拥有群组不存在于 /etc/group 的档案！

3. 与档案权限及名称有关的参数：
   -name filename：搜寻文件名为 filename 的档案（可使用通配符）
   -size [+-]SIZE：搜寻比 SIZE 还要大(+)或小(-)的档案。这个 SIZE 的规格有：
       c: 代表 byte
       k: 代表 1024bytes。所以，要找比 50KB还要大的档案，就是『 -size +50k 』
   -type TYPE ：搜寻档案的类型为 TYPE 的，类型主要有：
       一般正规档案 (f)
       装置档案 (b, c)
       目录 (d)
       连结档 (l)
       socket (s)
       FIFO (p)
   -perm mode ：搜寻档案权限『刚好等于』 mode的档案，这个mode为类似chmod的属性值，举例来说，-rwsr-xr-x 的属性为4755！
   -perm -mode ：搜寻档案权限『必须要全部囊括 mode 的权限』的档案，举例来说，
       我们要搜寻-rwxr--r-- 亦即 0744 的档案，使用-perm -0744，当一个档案的权限为 -rwsr-xr-x ，亦即 4755 时，也会被列出来，因为 -rwsr-xr-x 的属性已经囊括了 -rwxr--r-- 的属性了。
   -perm +mode ：搜寻档案权限『包含任一 mode 的权限』的档案，举例来
       说，我们搜寻-rwxr-xr-x ，亦即 -perm +755 时，但一个文件属性为 -rw-------也会被列出来，因为他有 -rw.... 的属性存在！
4. 额外可进行的动作：
   -exec command ：command 为其他指令，-exec 后面可再接额外的指令来处理搜寻到的结果。
   -print ：将结果打印到屏幕上，这个动作是预设动作！
   eg:
       find / -perm +7000 -exec ls -l {} \; ,额外指令以-exec开头，以\;结尾{}代替前面找到的内容
   | xargs
       -i  默认的前面输出用{}代替
       eg:
           find . -name "*.log" | xargs -i mv {} test4
```

### grep `正则表达式`

grep 文件名 用正则表达式搜索文本，并把匹配的行打印出来

```bash
-c  只输出匹配行的计数。
-I  不区分大小写(只适用于单字符)。
-l  只显示文件名
-v  显示不包含匹配文本的所有行。
-n  显示匹配行数据及其行号
```

### useradd

useradd [-u UID] [-g 初始群组] [-G 次要群组] [-c 说明栏] [-d 家目录绝对路径] [-s shell] 使用者账号名  新增用户

```bash
-M  不建立用户家目录！(系统账号默认值)
-m  建立用户家目录！(一般账号默认值)
-r  建立一个系统的账号，这个账号的 UID 会有限制
-e  账号失效日期，格式为『YYYY-MM-DD』
-D  查看useradd的各项默认值
```

### userdel 删除用户

```bash
-r  用户文件一并删除
```

### change

chage [-ldEImMW] 账号名  修改用户密码的相关属性

```bash
-l  列出该账号的详细密码参数；
-d  后面接日期，修改 shadow 第三字段(最近一次更改密码的日期)，格式YYYY-MM-DD
-E  后面接日期，修改 shadow 第八字段(账号失效日)，格式 YYYY-MM-DD
-I  后面接天数，修改 shadow 第七字段(密码失效日期)
-m  后面接天数，修改 shadow 第四字段(密码最短保留天数)
-M  后面接天数，修改 shadow 第五字段(密码多久需要进行变更)
-W  后面接天数，修改 shadow 第六字段(密码过期前警告日期)
```

### usermod

usermod [-cdegGlsuLU] username  修改用户的相关属性

```bash
-c  后面接账号的说明，即 /etc/passwd 第五栏的说明栏，可以加入一些账号的说明。
-d  后面接账号的家目录，即修改 /etc/passwd 的第六栏；
-e  后面接日期，格式是 YYYY-MM-DD 也就是在 /etc/shadow 内的第八个字段数据啦！
-f  后面接天数为 shadow 的第七字段。
-g  后面接初始群组，修改 /etc/passwd 的第四个字段，亦即是GID的字段！
-G  后面接次要群组，修改这个使用者能够支持的群组
-l  后面接账号名称。亦即是修改账号名称， /etc/passwd 的第一栏！
-s  后面接 Shell 的实际档案，例如 /bin/bash 或 /bin/csh 等等。
-u  后面接 UID 数字啦！即 /etc/passwd 第三栏的资料；
-L  冻结密码
-U  解冻密码

```

### gpasswd  群组管理员功能

```bash
root管理员动作：
   -gpasswd groupname 设定密码
   -gpasswd [-A user1,...] [-M user3,...] groupname
       -A  将 groupname 的主控权交由后面的使用者管理(该群组的管理员)
       -M  将某些账号加入这个群组当中
   -gpasswd [-r] groupname
       -r  将 groupname 的密码移除
群组管理员动作：
   - gpasswd [-ad] user groupname
       -a  将某位使用者加入到 groupname 这个群组当中
       -d  将某位使用者移除出 groupname 这个群组当中
```

### password

password abc****xyz

```bash

-l  使密码失效
-u  与-l相对，用户解锁
-S  列出登陆用户passwd文件内的相关参数
-n  后面接天数，shadow 的第 4 字段，多久不可修改密码天数
-x  后面接天数，shadow 的第 5 字段，多久内必须要更动密码
-w  后面接天数，shadow 的第 6 字段，密码过期前的警告天数
-i  后面接『日期』，shadow 的第 7 字段，密码失效日期
使用管道刘设置密码：echo "zeng" | passwd --stdin zenghao
```

### gzip 压缩 gunzip 解压缩

```bash
-d  进行解压缩
-c  将压缩的数据输出到屏幕上
-v  :显示原档案/压缩文件案的压缩比等信息
-#  ：压缩等级，-1最快，但压缩比最差，=9最慢，但压缩比最好
```

### bzip2 压缩  解压缩 bzcat 读取数据而无需解压

```bash
d  :解压
-z  :压缩
-k  :保留源文件
-c ：将压缩的过程产生的数据输出到屏幕上！
-v ：可以显示出原档案/压缩文件案的压缩比等信息；
-# ：与 gzip 同样的，都是在计算压缩比的参数， -9 最佳， -1 最快！
```

### tar

```bash
主选项：
   -c  建立打包档案，可搭配 -v 来察看过程中被打包的档名(filename)
   -t  察看打包档案的内容含有哪些档名，重点在察看『档名』就是了；
   -x  解打包或解压缩的功能，可以搭配 -C (大写) 在特定目录解开
辅选项：
   -j  透过 bzip2 的支持进行压缩/解压缩：此时档名最好为 *.tar.bz2
   -z  透过 gzip 的支持进行压缩/解压缩：此时档名最好为 *.tar.gz
   -v  在压缩/解压缩的过程中，将正在处理的文件名显示出来！
   -f filename -f 后面要立刻接要被处理的档名！
   -C 目录   这个选项用在解压缩，若要在特定目录解压缩，可以使用这个选项。
   --exclude FILE：在压缩打包过程中忽略某文件 eg: tar --exclude /home/zenghao -zcvf myfile.tar.gz /home/* /etc
   -p  保留备份数据的原本权限与属性，常用于备份(-c)重要的配置文件
   -P(大写）  保留绝对路径，亦即允许备份数据中含有根目录存在之意；
eg:
   压 缩：tar -jcvf filename.tar.bz2 要被压缩的档案或目录名称
   查 询：tar -jtvf filename.tar.bz2
   解压缩：tar -jxvf filename.tar.bz2 -C 欲解压缩的目录
```

### w

```bash
-s 　使用简洁格式列表，不显示用户登入时间，终端机阶段作业和程序所耗费的CPU时间。
-h 　不显示各栏位的标题信息列。
```

who 登录在本机的用户与来源

```bash
-H或--heading 　显示各栏位的标题信息列
```

locate 通过搜寻数据库快速搜寻档案

```bash
-r  使用正规运算式做寻找的条件
```

finger [选项] [使用者] [用户@主机] | 查看用户信息

```bash
-s 显示用户的注册名、实际姓名、终端名称、写状态、停滞时间、登录时间等信息
-l 除了用-s选项显示的信息外，还显示用户主目录、登录shell、邮件状态等信息，以及用户主目录下的.plan、.project和.forward文件的内容。
-p 除了不显示.plan文件和.project文件以外，与-l选项相同
```

### mount [-t vfstype] [-o options] device dir umount 取消挂载

```bash
-ro 采用只读方式挂接设备
-rw 采用读写方式挂接设备
$ mount /home/mydisk.iso /tmp/mnt 通过mnt访问mydisk内的内容
```

### cut

```bash
-b ：以字节为单位进行分割。这些字节位置将忽略多字节字符边界，除非也指定了 -n 标志。
-c ：以字符为单位进行分割。
-d ：自定义分隔符，默认为制表符。
-f  ：与-d一起使用，指定显示哪个区域
```

### sort

```bash
-n   依照数值的大小排序。
-o<输出文件>   将排序后的结果存入指定的文件。
-r   以相反的顺序来排序。
-t<分隔字符>   指定排序时所用的栏位分隔字符。
-k  选择以哪个区间进行排序。
```

### wc

```bash
-l filename 报告行数
-c filename 报告字节数
-m filename 报告字符数
-w filename 报告单词数
```

### uniq 去除文件中相邻的重复行

```bash
-c或——count：在每列旁边显示该行重复出现的次数；
-d或--repeated：仅显示重复出现的行列；
-f<栏位>或--skip-fields=<栏位>：忽略比较指定的栏位；
-s<字符位置>或--skip-chars=<字符位置>：忽略比较指定的字符；
-u或——unique：仅显示出一次的行列；
-w<字符位置>或--check-chars=<字符位置>：指定要比较的字符。
```

### read

```bash
-p  接提示字符
-t  接等待的秒数
```

### declare、typeset

```bash
-i 声明为整数
-a 声明为数组
-f 声明为函数
-r 声明为只读
```

### ulimit 限制使用者的某些系统资源

```bash
-f  此 shell 可以建立的最大档案容量 (一般可能设定为 2GB)单位为 Kbytes eg: ulimit -f 1024 限制使用者仅能建立 1MBytes 以下的容量的档案
```

### df [选项] [文件] | 显示指定磁盘文件的可用空间,如果没有文件名被指定，则所有当前被挂载的文件系统的可用空间将被显示

```bash
-a  显示全部文件系统
-h  文件大小友好显示
-l  只显示本地文件系统
-i  显示inode信息
-T  显示文件系统类型
```

### du [选项] [文件] | 显示每个文件和目录的磁盘使用空间

```bash
-h  方便阅读的方式
-s  只显示总和的大小
```

### ln [参数] [源文件或目录] [目标文件或目录]  某一个文件在另外一个位置建立一个同步的链接

```bash
-s  建立软连接
-v  显示详细的处理过程
```

### diff  [参数] [文件1或目录1] [文件2或目录2] | 比较单个文件或者目录内容

```bash
-b 　不检查空格字符的不同。
-B 　不检查空白行。
-i  不检查大小写
-q  仅显示差异而不显示详细信息
eg: diff a b > parch.log 比较两个文件的不同并产生补丁
```

### date [参数]… [+格式] | 显示或设定系统的日期与时间

```bash
%H 小时(以00-23来表示)。
%M 分钟(以00-59来表示)。
%P AM或PM。
%D 日期(含年月日)
%U 该年中的周数。
date -s “2015-10-17 01:01:01″ //时间设定
date +%Y%m%d         //显示前天年月日
date +%Y%m%d --date="+1 day/month/year"  //显示前一天/月/年的日期
date +%Y%m%d --date="-1 day/month/year"  //显示后一天/月/年的日期
date -d '2 weeks' 2周后的日期
```

### cal [参数] 月份] [年份]  查看日历

```bash
-1  显示当月的月历
-3  显示前、当、后一个月的日历
-m  显示星期一为一个星期的第一天
-s  （默认）星期天为第一天
-j  显示当月是一年中的第几天的日历
-y  显示当前年份的日历
```

### ps | 列出当前进程的快照

```bash
a   显示所有的进程
-a  显示同一终端下的所有程序
e   显示环境变量
f   显示进程间的关系
-H  显示树状结构
r   显示当前终端的程序
T   显示当前终端的所有程序
-au 显示更详细的信息
-aux    显示所有包含其他使用者的行程
-u  指定用户的所有进程
```

### watch

```bash
-n  时隔多少秒刷新
-d  高亮显示动态变化
```

### at [参数] [时间]  在一个指定的时间执行一个指定任务，只能执行一次

```bash
HH:MM[am|pm] + number [minutes|hours|days|weeks] 强制在某年某月某日的某时刻进行该项任务
atq 查看系统未执行的任务
atrm n 删除编号为n的任务
at -c n 显示编号为n的任务的内容
```

### wget [参数] [URL地址] | 直接从网络上下载文件

```bash
-o FILE 把记录写到FILE文件中    eg : wget -O a.txt URL
wget --limit-rate=300k URL  限速下载
```

### awk

```bash
-F 分隔符  以分隔符分隔内容
{}  要执行的脚本内容 eg:cat /etc/passwd |awk  -F ':'  '{print $1"\t"$7}'
```

### sed 对数据行进行替换、删除、新增、选取等操作

```bash
a   新增，在新的下一行出现
c   取代，取代 n1,n2 之间的行 eg: sed '1,2c Hi' ab
d   删除
i   插入，在新的上一行出现
```

### paste 合并文件，需确保合并的两文件行数相同

```bash
-d  指定不同于空格或tab键的域分隔符
-s  按行合并，单独一个文件为一行
```

### su [参数] user | 切换登陆

```bash
-l  切换时连同环境变量、工作目录一起改变
-c command  执行command变回原来的使用者
```

### sudo | 以特定用户的权限执行特定命令

```bash
-l  列出当前用户可执行的命令
-u username#uid 以指定用户执行命令
```

### crontab | 定时任务调度

```bash
file    载入crontab
-e  编辑某个用户的crontab文件内容
-l  显示某个用户的crontab文件内容
-r  删除某个用户的crontab文件
```

ifconfig [网络设备] [参数] | 查看和配置网络设备
route | 显示和操作IP路由表
ping [参数] [主机名或IP地址] | 测试与目标主机的连通性 -q  只显示最后的结果
netstat | 显示与IP、TCP、UDP和ICMP协议相关的统计数据
telnet [参数] [主机] | 用于远程登录，采用明文传送报文，安全性不好
rcp [参数] [源文件] [目标文件] | 远程文件拷贝

```bash
-r  递归复制
-p  保留源文件的属性
usage: rcp –r remote_hostname:remote_dir local_dir
```

vmstat  对操作系统的虚拟内存、进程、CPU活动进行监控
free [参数]  显示linux系统中空闲的、已用的物理内存及swap内存,及被内核使用的buffer
kill [参数] [进程号]  杀死进程
top [参数]  显示当前系统正在执行的进程的相关信息，包括进程ID、内存占用率、CPU占用率等
exit 退出当前shell
logout 退出登录shell
shutdown -h now 立即关机
users 显示当前登录系统地用户
hostname 查看主机名
write 给当前联机的用户发消息
wall 给所有登录再本机的用户发消息
file 判断文件类型
last 查看用户的登陆日志
lastlog 查看每个用户最后的登陆时间
tac  反向显示
alias ii = “ls -l” | 添加别名
unalias ii | 清除别名
chfn修改个人信息
set 显示环境变量和普通变量
env 显示环境变量
export 把普通变量变成环境变量
unset 删除一个环境变量
which
-可执行文件名称  查看可执行文件的位置，在PATH变量指定的路径中查看系统命令是否存在及其位置
groups 查看登陆用户支持的群组， 第一个输出的群组为有效群组
newgrp 切换有效群组
groupadd [-g gid] 组名 | 添加组 -g  设定添加组的特定组id
groupmod [-g gid] [-n group_name] 群组名  修改组信息

```bash
-g  修改既有的 GID 数字
-n  修改既有的组名
```

groupdel [groupname] | 删除群组

id [username] | 查看用户相关的id信息，还可以用来判断用户是否存在
iostat [参数] [时间t] [次数n](每隔t时间刷新一次，最多刷新n次）对系统的磁盘操作活动进行监视,汇报磁盘活动统计情况，同时也会汇报出CPU使用情况

```bash
-p[磁盘] 显示磁盘和分区的情况
```
