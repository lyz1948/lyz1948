var Koa = require('koa')
var app = new Koa()

var asyncIO = function() {
	return new Promise(function(resolve) {
		setTimeout(function() {
			resolve()
		}, 500)
	})
}
var midware = function() {
	return function *(next) {
		this.body = 'mark '
		yield next
		this.body += 'done'
	}
}

app.use(midware())
app.use(function*(next) {
	yield asyncIO()
	this.body += 'save '
	yield next
})

app.listen(3000)