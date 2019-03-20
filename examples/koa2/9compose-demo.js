const Koa = require('koa')
const compose = require('koa-compose')
const router = require('koa-route')
const fs = require('fs')
const app = new Koa()

const logger = (ctx, next) => {
	console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
	next()
}

const main = ctx => {
	ctx.response.type = 'html'
	ctx.response.body = fs.readFile('./template.html')
}

const middleWare = compose([logger, main])
app.use(middleWare)

app.listen(3001)
console.log('http://127.0.0.1:3001')