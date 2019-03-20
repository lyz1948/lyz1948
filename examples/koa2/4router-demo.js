const Koa = require('koa')
const router = require('koa-route')
const hostname = '127.0.0.1'
const port = 3001
const app = new Koa()

const about = ctx => {
	ctx.response.type = 'html'
	ctx.response.body = '<a href="/">to Index Page</a>'
}

const main = ctx => {
	ctx.response.type = 'html'
	ctx.response.body = 'Home Page'
}

app.use(router.get('/', main))
app.use(router.get('/about', about))

app.listen(port, () => {
	console.log(`http://${hostname}:${port}`)
})