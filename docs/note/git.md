# git

**正确的使用Git**
工作中使用Git的正确姿势

::: tip
git支持很多种工作流程，我们采用的一般是这样，远程创建一个主分支，本地每人创建功能分支，日常工作流程如下：
:::

1.去自己的工作分支

```bash
git checkout work
```

2.提交工作分支的修改

```bash
git commit -a
```

3.回到主分支

```bash
git checkout master
```

4.获取远程最新的修改，此时不会产生冲突

```bash
git pull
```

5.回到工作分支

```bash
git checkout work
```

6.用rebase合并主干的修改，如果有冲突在此时解决

```bash
git rebase master
```

7.回到主分支

```bash
git checkout master
```

8.合并工作分支的修改，此时不会产生冲突

```bash
git merge work
```

9.提交到远程主干

```bash
git push
```

::: tip
如果你正在某分支上开发某个功能，该功能还未开发完成，此时需要切换到另外的分组做一些处理，而你又不想提交当前未完成的代码，想保存它但又不想增加一个脏的提交，使用`git stash` 会把所有未提交的修改（包括暂存的和非暂存的）都保存起来，用于后续恢复当前工作目录
:::

**Git stash的使用**
stash缓存当前修改

```bash
git stash
```

需要说明一点，stash是本地的，不会通过git push命令上传到git server上
实际应用中推荐给每个stash加一个message，用于记录版本，使用git stash save取代git stash命令

```bash
git stash save "stash-work"
```

重新应用缓存的stash

```bash
git stash pop
```

这个指令将缓存堆栈中的第一个stash删除，并将对应修改应用到当前的工作目录下
也可以使用`git stash apply` 将缓存堆栈中的stash多次应用到工作目录中，但并不删除stash拷贝

```bash
git stash apply
```

查看`stash`列表

```bash
git stash list
```

移除stash

```bash
git stash drop [stash@{0}]
```

## Git Message用法

**Git Message的规范**
Commit message 包括三个部分：Header，Body 和 Footer。完整格式如下：

```bash
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

**type**
类型主要包括以下几种

- feat: 新功能
- fix: 修复问题
- docs: 修改文档
- style: 修改代码格式，不影响代码逻辑
- refactor: 重构代码，理论上不影响现有功能
- perf: 提升性能
- test: 增加修改测试用例
- chore: 修改工具相关（包括但不限于文档、代码生成等）

**scope**
修改文件的范围，比如：视图层、控制层、docs、config, plugin

**subject**
subject 是 commit 目的的简短描述（用一句话清楚的描述这次提交做了什么），不超过50个字符

**body**
补充 subject 添加详细说明，可以分成多行，适当增加原因、目的等相关因素，也可不写

**foot**
当有非兼容修改(Breaking Change)时必须在这里描述清楚
关闭issue或是链接到相关文档，如 Closes #1, Closes #2, #3

git commit时添加表情

```bash
$ git commit

:emoji1: :emoji2: 主题
提交信息body内容

Ref <###>
```

### 拉取代码

Git 不解决冲突，直接使用最新的代码

```js
git fetch --all
git reset --hard origin/master
git fetch --all // 下载但不合并
git reset --hard // 下载远程仓库最新的代码
```

### 参与开源项目

```js
fork
pull requests
git.oschina.net/progit/
```

下载一个git仓库的项目

```js
git clone [url] 下载项目
```

项目中初始化git仓库

```js
git init -y
```

配置git的name 和 email

```js
git config --global user.name "设置用户名"
git config --global user.email "设置邮箱"
```

查看配置的信息

```js
git config --list
```

创建分支并切换到分支

```js
git checkout -b experiment（ experiment是分支的名字)
```

存入缓存区

```js
git add filename  // 添加单个文件
git add .  // 直接将修改的文件全部提交
git add -A // 添加修改的文件
```

存入版本区

```js
git commit -m "注释"
```

直接从工作区到版本区

```js
git commit -a -m "这里是注释内容"
```

查看状态

```js
git status
```

查看日志

```js
git log
enter 查看没显示完的日志
q 退出查看日志（如果版本太多）
```

查看各个区域文件不同状态
工作区 -- 缓存区（工作区与缓存区对比）

```js
git diff
```

缓存区--版本库(缓存区与版本库对比)

```js
git diff --cached
git diff --staged
```

工作区--版本库

```js
git diff --master
```

从缓存区撤销回工作区

```js
git reset HEAD filename
```

撤销全部

```js
git reset HEAD
```

从版本区还原回工作区

```js
git checkout --filename
```

重新提交(撤销之前提交的，然后重新把暂存区的文件从新与之前提交到暂存区的文件一起提交)

```js
git commit -m "注释" --amend
```

删除文件

```js
git rm filenam //工作区已提交到暂存区的文件，删除后，在通过命令删除暂存区的文件
git rm -f filename //删除缓存区的文件，并且工作区一并删除
git rm --cached filename //只删除缓存区的文件，工作区任然保留
```

删除本地仓库

```js
git remote rm 仓库名
```

恢复

```js
git checkout id(版本id) filename
```

恢复之前版本

```js
git reset --hard id
```

让版本回到倒数第二个

```js
git reset --hard HEAD^
```

回到指定的版本

```js
git reset --hard HEAD~2
```

回到现在,可回到之前删除的版本

```js
git reflog
```

查看远程仓库的名字

```js
git remote
git remote -v
```

删除远程仓库与本地仓库

```js
git remote rm 仓库名
```

删除gihub上的分支
origin: 是分支内容存放的仓库名，1.0是分支名字

```js
git push origin :1.0
```

上传到github

```js
git push 仓库名 分支名
```

强行提交

```js
git push -u nickname master -f
```

下载更新并不合并

```js
git fetch origin master
git merge origin/master
```

下载更新自动合并

```js
git pull
```

查看远程仓库与本地文件冲突的地方

```js
git diff master origin/master
```

合并

```js
git merge origin/master
```

### 分支

查看分支

```js
git branch
```

查看远程分支

```js
git branch -r
```

创建分支

```js
git branch 分支名
```

切换分支

```js
git checkout 分支名
```

快速创建并切换到新创建的分支
```js
git checkout -b [创建分支名]
```

分支合并

```js
git merge origin/分支名
```

查看已合并的分支

```js
git branch --merge
```

查看未合并的分支

```js
git branch --no-merge
```

删除分支

```js
git branch -d 分支名
```

删除远程分支

```js
git push origin :分支名
git branch -r -d origin/分支名
```

强制删除未合并的分支

```js
git branch -D 分支名
```

### tag

查看是否打了标签

```js
git tag
```

打标签

```js
git tag 标签号
```

删除本地tag

```js
git tag -d `tagName`
```

删除远程tag

```js
git push origin --delete `tagName`
```

### 设置别名

```js
git config --global alias.别名 命令
```
