const http = require('http')
const app = require('./app')
const debug = require('debug')('express1:server')
const port = (process.env.PORT ||'3001')


app.set('port',port)
const server = http.createServer(app)
server.listen(port)

server.on('error',onerror)
server.on('listening',onListening)

