const Koa = require('koa')
const hostname = '127.0.0.1'
const port = 3001
const app = new Koa()

// const main = ctx => {
// 	ctx.response.body = '<h1>Hello Koa 2.0</h1>'
// }
// app.use(main)

app.use(ctx => {
	ctx.response.body = '<h1>Hello Koa2</h1>'
})

app.listen(port, function() {
	console.log(`server is running at http://${hostname}:${port}`)
})