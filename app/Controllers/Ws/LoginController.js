'use strict'

class LoginController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(message){
    this.socket.broadcastToAll('message',message)
    console.log(message)
  }

  onClose () {
    // same as: socket.on('close')
  }

  onData(data){
    this.socket.broadcastToAll('data',data)
    console.log(data)
  }

  onError () {
    socket.on('error',(error)=>console.error(error))
  }

  onOpen () {
    socket.broadcastToAll('message','Hello')
  }
}

module.exports = LoginController
