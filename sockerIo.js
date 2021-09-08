export default function initSocketIo(io) {
   io.on('connection', socket => {
      console.log('a user connected')
   
      socket.on('userConnect', ({ userId }) => {
         console.log('user connected, userId: ', userId)
      })
   
      socket.on('disconnect', () => {
         console.log('user disconnected')
      })
   })
   
}
