# https

```js
const https = require('https')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 8090

// const options = {
// 	key: fs.readFileSync('ssh_key.pem'),
// 	cert: fs.readFileSync('ssh_cert.pem')
// }

const options = {
  pfx: fs.readFileSync('test/fixtures/test_cert.pfx'),
  passphrase: 'sample'
}

const server = https.createServer(options, (req, res) => {
  res.writeHead(200)
  res.end('<h1>Hello https server</h1>')
})

server.listen(port, function() {
  console.log(`server is running at https://${hostname}:${port}`)
})
```
