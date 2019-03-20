const Koa = require('koa')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 3001
const app = new Koa()

const main = ctx => {
	ctx.response.type = 'html'
	ctx.response.body = fs.createReadStream('./template.html')
}
app.use(main)

app.listen(port, function() {
	console.log(`server is running at http://${hostname}:${port}`)
})