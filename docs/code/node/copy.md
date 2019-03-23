# copy

```js
import { createReadStream, createWriteStream, readdirSync, statSync } from 'fs'

function fileCopy(file1, file2, done) {
  var input = createReadStream(file1)
  var output = createWriteStream(file2)

  input.on('data', function(d) {
    output.write(d)
  })
  input.on('error', function(err) {
    throw err
  })
  input.on('end', function() {
    output.end()
    done && done()
  })
}

import fs from 'fs'
import { join } from 'path'

var dir = process.cwd() // 文件目录

var files = readdirSync(dir) // 文件目录下的文件
process.stdout.write('Name\tSize\tDate\n') // 输出头部

files.forEach(function(filename) {
  var fullName = join(dir, filename) // 拼接目录和文件名
  var stats = statSync(fullName) // 获取文件属性
  if (stats.isDirectory()) {
    // 判断是否是文件夹
    filename += '/'
  }
  // 输出文件的名字、大小、时间
  process.stdout.write(filename, +'t' + stats.size + '\t' + stats.mtime + '\n')
})
```
