const Koa = require('koa')
const app = new Koa()

const main = ctx => {
	ctx.throw(500)
}

const handler = async(ctx, next) => {
	try {
		await next()
	}
	catch(err) {
		ctx.response.status = err.statusCode || err.status || 500
		
		ctx.response.body = {
			message: err.message
		}
	}
}

app.on('error', (err, ctx) => {
	console.error('server error', err)
})

// app.use(handler)
app.use(main)


app.listen(3001)
console.log('http://127.0.0.1:3001')