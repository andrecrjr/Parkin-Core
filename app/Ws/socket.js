const Ws = use('Ws')

Ws.channel('chat', ({ socket }) => {
  console.log('new socket joined %s', socket.id)
})