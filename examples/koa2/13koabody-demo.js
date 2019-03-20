const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()

const main = async (ctx) => {
	const body = ctx.request.body 

	if(!body.name) ctx.throw(400, '.name required')
		
	ctx.body = {name: body.name}
	
}

app.use(koaBody())
app.use(main)

app.listen(3001)
console.log('http://127.0.0.1:3001')