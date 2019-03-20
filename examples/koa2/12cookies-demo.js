const Koa = require('koa')
const app = new Koa()

const main = function(ctx) {
  const n = Number(ctx.cookies.get('view') || 0) + 1
  ctx.response.body = n + ' views'
  ctx.cookies.set('view', n)
}

app.use(main)

app.listen(3001)
console.log('http://127.0.0.1:3001')