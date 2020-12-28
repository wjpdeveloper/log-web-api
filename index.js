const express = require('express')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const app = express()

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By',' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

const remotePath = '/home/courthasl/jd/log/'
const fileArr = []

const getDirectories = function (src, callback) {
  glob(src + '/**/*', callback)
}

app.get('/', function (req, res) {
  getDirectories(remotePath, function (err, directories) {
    if (err) throw err
    console.log(directories)
    res.send(directories.map(r => r.replace(remotePath, '')))
  })
})
app.get('/log', function (req, res) {
  const src = req.query.src
  const filePath = path.join(remotePath, src)
  fs.readFile(filePath, 'utf8', function (err, data) {
    console.log(data)
    res.send(data)
  })
})

app.listen(9998)
