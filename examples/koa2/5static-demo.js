const Koa = require('koa')
const router = require('koa-route')
const staticAssets = require('koa-static')
const path = require('path')
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

app.use(staticAssets(path.join(__dirname, 'public')))

app.listen(port, () => {
	console.log(`http://${hostname}:${port}`)
})