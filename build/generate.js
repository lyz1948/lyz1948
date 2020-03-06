// generateComponent.js`
const path = require('path')
const fs = require('fs')

const resolve = (...file) => path.resolve(__dirname, ...file)
const { codeTemplate } = require('./template')
const { menuList } = require('../config')

const generateFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

var modelsPath = path.join(__dirname, '../docs/.vuepress/examples')

var walk = function(modelsPath) {

  fs.readdirSync(modelsPath).forEach(function(file) {
    const name = file.replace('.vue', '')
    const fileName = name + '.md'
    const filePath = resolve('../docs/demo/', fileName)
    
    menuList.forEach(async function(it) {
      if (name == it.path) {
        try {
          await generateFile(filePath, codeTemplate(it))
        } catch (err) {
          errorLog(err.message)
        }
      }
    })
  })
}

walk(modelsPath)
