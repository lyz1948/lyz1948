# async

第一阶段

```js
const fs = require('fs')

function readFile(cb) {
  fs.readFile('../package.json', (err, data) => {
    if(err) return cb(err)

    cb(null, data)
  })
}

readFile((err, data) => {
  if(!err) {
    data = JSON.parse(data)

    console.log(data.name)
  }
})
```

第二阶段

```js
function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}

readFileAsync('../package.json')
  .then(data => {
    data = JSON.parse(data)
    console.log(data.name)
  })
```

第三阶段

```js
const co = require('co')
const util = require('util')

co(function*() {
  let data = yield util.promisify(fs.readFiel)('../package.json')

  data = JSON.parse(data)
  console.log(data.name)
})
```

第四阶段

```js
const readAsync = util.promisify(fs.readFile)

async function init() {
  let data = await readAsync('../package.json')

  data = JSON.parse(data)
  console.log(data.name)
}
```