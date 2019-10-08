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

Ws.channel('chat', ({ socket, request }) => {
  console.log(socket.id)
  socket.on('MESSAGE',(payload)=>{
    socket.emit('GIVE_MESSAGE', payload)
  })

  socket.on('ENTER', (payload)=>{
    console.log(payload.id)
    socket.emit('WELCOME_MSG', 'bem vindo usuário: '+payload.id)
  })

})

