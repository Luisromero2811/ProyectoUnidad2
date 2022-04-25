'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')

Ws.channel('chat', ({ socket }) => {
  console.log('user joined with %s socket id', socket.id)
})
Ws.channel('login:*','LoginController')
/*
const server = use('Server')
const io = use('socket.io')(server.getInstance())
const WSController = use('App/Controllers/Ws/LoginController')
io.on('connection', function (socket) {
 WSController.goMessage(socket, io)
})*/