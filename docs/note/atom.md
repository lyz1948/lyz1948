# 编辑器

## atom

### 插件备份

1. 访问 `https://atom.io/users/yourname/stars`
2. 鼠标右键，审查元素(inspect)
3. 点击 Console
4. 粘贴代码，回车

``` js
var stars = [].slice.call($('.card-name a'), 0),
    res = ''

stars.map(star => {
  res += `apm install ${star.text}\n`
})

console.log(res)
```

然后新建 my_atom.sh 文件，给脚本添加可执行权限 chmod +x my_atom.sh，
最后执行脚本 ./my_atom.sh

``` bash
#!/bin/bash
apm install minimap
apm install atom-beautify
apm install file-icons
apm install git-plus
apm install emmet
apm install highlight-selected
apm install one-dark-ui
apm install dev-live-reload
apm install autocomplete-paths
apm install markdown-preview-plus
apm install atom-jade
```
