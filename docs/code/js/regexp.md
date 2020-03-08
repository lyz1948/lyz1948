# 正则表达式

`g` 全局匹配 是否全文搜索，默认false

`i` 忽略大小写 是否大小写敏感，默认false

`m` 多行匹配(字符串有换行的时候)，默认false

### 正则的写法

```js
var re = new RegExp('a');
var re = /a/;
```

### 正则方法

`test()`  检索字符串中指定的值。返回 true 或 false

`exec()`  检索字符串中指定的值。返回找到的值，并确定其位置

`search()`  检索与正则表达式相匹配的值

`match()`  找到一个或多个正则表达式的匹配

`replace()`  替换与正则表达式匹配的子串

`split()`  把字符串分割为字符串数组

### 预定义类

`.` 除了回车符和换行符之外的所有字符
`. =  [^\r\n]`

`\d` 数字字符
`\d = [0-9]`

`\D` 非数字字符
`\D = [^0-9]`

`\s` 空白符
`\s = [\t\n\x0B\f\r]`

`\S` 非空白符
`\S = [^\t\n\x0B\f\r]`

`\w` 单词字符（字母、数字下划线）
`\w = [a-zA-Z_0-9]`

`\W` 非单词字符
`\W = [^a-zA-Z_0-9]`

### 边界

`^`  以xxx开头

`$`  以xxx结束

`\b`  单词边界

`\B` 非单词边界

```js
var re = /^@./g
var str = '@123@456@789@'
str.replace(re, 'X') // X23@456@789@

var re = /.@$/g
var str = '@123@456@789@'
str.replace(re, 'X') // @123@456@78X

var re = /\bis\b/g
var str = 'who is this man? This man who?'
str.replace(re, 'X') // who X this man? This man who?

var re = /\Bis\b/g
var str = 'who is this man? This man who?'
str.replace(re, 'X') // who is thX man? ThX man who?
```

### 重复项

`\1`   重复的第一个子项

`\2`   重复的第二个子项

### 或 `|`

```js
var re = /b(e|a|i)d/g
var str = 'bedbadbabybid'
str.replace(re, 'X') // XXbabyX
```

### `[]` 范围选择

- `[abc]`     括号内的任意字符匹配均可以

- `[a-z]`     范围 a-z 的范围内

- `[h-m]`     h - m 范围

- `[A-Z]`     范围 A-Z 的范围内

- `[0-9]`     范围 0-9 的范围内

```js
var re = /[a-z]/g
var str = 'a1b2c3d4x5y6z7'
str.replace(re, 'X')

var re2 = /[a-zA-Z]/g
var str2 = 'a1b2c3d4x5y6z7ABCDE'
str2.replace(re2, '0')

var re3 = /[0-9-]/g
var str3 = '1948-01-21'
str3.replace(re3, 'G')
```

### 量词

`{n}`         正好出现n次

`{n,m}`       最少出现n次，最多m次

`{n,}`        最少出现n次，最多不限

`+`同`{1,}`   最少出现1次，最多不限

`?`同`{0,1}`  最少出现0次就是可以不出现，最多1次

`*`同`{0,}`   最少出现0次，最多不限 (谨慎使用)

### 分组 `()`

```js
var re = /[a-z]\d{3}/g
var str = 'a1b2c3d4'
str.replace(re, 'X') // a1b2c3d4

var re = /([a-z]\d){3}/g
var str = 'a1b2c3d4'
str.replace(re, 'X') // Xd4
```

### 正则匹配实用🌰

- 浮点数float

```js
/^[-\+]?\d+(\.\d+)?$/
```

- 正整数integer

```js
/^[-\+]?\d+$/
```

- 数字0-9 number

```js
/^\d+$/
```

- 中文汉字 chiness string

```js
/^[\u0391-\uFFE5]+?$/
```

- 汉字

```js
/^[\u4e00-\u9fa5]+$/
```

- 中文汉字或者字符

```js
/^[\u0391-\uFFE5]+$/
```

- 英文字符串 English string

```js
/^[a-zA-Z]+$/
```

- 手机号码 phone number

```js
value.length == 11 && /^(13[0-9]{1}|(15[0-9]{1})|(18[0-9]{1})\d{8})$/
```

- 电话号码 telephone

```js
/^(\d{3,4}-?)?(\d{7,9})$/g
```

- qq号码

```js
/^[1-9]\d{4,12})/
```

- 邮编 post code

```js
/^[0-9]{6}/
```

- 6-12位密码 password, only start for letter and length between 6-12

```js
/^[a-zA-Z]\w{6,12}$/
```


- Ip地址

```js
/^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/
```

- 字符验证，只能包含中文、英文、数字、下划线等字符

```js
/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/
```

- 判断是否为合法字符( a-zA-Z0-9-_ )

```js
/^[A-Za-z0-9_-]+$/
```

- 判断是否包含中英文特殊字符，除英文" -_ "字符外

```js
var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
```

- 车牌号校验

```js
function isPlateNo(plateNo){
    var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
    if(re.test(plateNo)){
        return true;
    }
    return false;
}
```

- 身份证号码的验证规则

```js
function isIdCardNo(num){
　   //if (isNaN(num)) {alert("输入的不是数字！"); return false;}
　　 var len = num.length, re;
　　 if (len == 15)
　　 re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
　　 else if (len == 18)
　　 re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
　　 else {
        //alert("输入的数字位数不对。");
        return false;
    }
　　 var a = num.match(re);
　　 if (a != null)
　　 {
　　 if (len==15)
　　 {
　　 var D = new Date("19"+a[3]+"/"+a[4]+"/"+a[5]);
　　 var B = D.getYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
　　 }
　　 else
　　 {
　　 var D = new Date(a[3]+"/"+a[4]+"/"+a[5]);
　　 var B = D.getFullYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
　　 }
　　 if (!B) {
        //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。");
        return false;
    }
　　 }
　　 if(!re.test(num)){
        //alert("身份证最后一位只能是数字和字母。");
        return false;
    }
　　 return true;
}
```
