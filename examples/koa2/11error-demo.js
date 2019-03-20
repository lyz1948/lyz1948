const Koa = require('koa')
const app = new Koa()

const main = ctx => {
	ctx.throw(500)
}

const handler = async (ctx, next) => {
	try {
		await next()
	}
	catch(err) {
		ctx.response.status = err.statusCode || err.status || 500
		ctx.response.type = 'html'
		ctx.response.body = '<p>Something wrong, please contact administrator.</p>'
		ctx.app.emit('error', err, ctx)
	}
}

app.on('error', (err, ctx) => {
	console.log('logging error', err.message)
	console.log(err)
})

app.use(handler)
app.use(main)

app.listen(3001)
console.log('http://127.0.0.1:3001')