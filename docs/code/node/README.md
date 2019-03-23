# NodeJs

## 启动一个服务

启动一个简单的`http`服务

```js
var http = require('http')
var hostname = '127.0.0.1'
var port = 3001
var server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('Hello NodeJs')
})

server.listen(port)
console.log(`server is running at http://${hostname}:${port}`)
```

启动一个简单的`https`服务

```js
const https = require('https')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 8090

const options = {
  key: fs.readFileSync('ssh_key.pem'), // 读取证书文件
  cert: fs.readFileSync('ssh_cert.pem')
}

// const options = {
//   pfx: fs.readFileSync('test/fixtures/test_cert.pfx'),
//   passphrase: 'sample'
// }

const server = https.createServer(options, (req, res) => {
  res.writeHead(200)
  res.end('<h1>Hello https server</h1>')
})

server.listen(port, function() {
  console.log(`server is running at https://${hostname}:${port}`)
})
```