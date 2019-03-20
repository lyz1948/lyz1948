const Koa = require('koa')
const hostname = '127.0.0.1'
const port = 3001
const app = new Koa()

const main = ctx => {
	if(ctx.request.path !== '/') {
		ctx.response.type = 'html'
		ctx.response.body = '<a href="/">to Index Page</a>'
	}
	else {
		ctx.response.body = 'Home Page'
	}
}

app.use(main)

app.listen(port, () => {
	console.log(`http://${hostname}:${port}`)
})