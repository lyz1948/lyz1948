'use strict'

var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')
var db = 'mongodb://localhost/imooc-app'
mongoose.Promise = require('bluebird')
mongoose.connect(db)

var modelsPath = path.join(__dirname, '/app/models')
var walk = function(modelsPath) {
  fs
    .readdirSync(modelsPath)
    .forEach(function(file) {
      var filePath = path.join(modelsPath + '/' + file)
      var stat = fs.statSync(filePath)
      if(stat.isFile()) {
        if(/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if(stat.isDirectory()) {
        walk(filePath)
      }
    })
}

walk(modelsPath)

var koa = require('koa')
var logger = require('koa-logger')
var session = require('koa-session')
var bodyParser = require('koa-bodyparser')
var app = new koa()

app.keys = ['hellolyz']
app.use(logger())
app.use(bodyParser())
app.use(session(app))

var router = require('./config/routes')()
app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen('1234')
console.log('server is running at port 1234')
