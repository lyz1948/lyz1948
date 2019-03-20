const Koa = require('koa')
const fs = require('fs.promised')
const router = require('koa-route')
const app = new Koa()

const main = async function(ctx, next) {
	ctx.response.type = 'html'
	ctx.response.body = await fs.readFile('./template.html', 'utf8')
}

app.use(router.get('/', main))

app.listen(3001)
console.log('http://127.0.0.1:3001')