const Koa = require('koa')
const app = new Koa()

const asyncIO = () => {
	return new Promise( resolve => setTimeout(resolve, 500))
}

const midware = () =>  async(ctx, next) => {
	ctx.body = 'hello '
	await next()
	ctx.body += 'koa '
}

app.use(midware())
app.use(async(ctx, next) => {
	await asyncIO()
	ctx.body += 'down '
	await next()
})

app.listen(3000)