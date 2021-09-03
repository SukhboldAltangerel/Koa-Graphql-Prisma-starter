import { createClient } from 'redis'

(async () => {
   const client = createClient()

   client.on('error', err => console.log('Redis Client Error', err))

   await client.connect()

   await client.set('user:3', 'tumur')
   const value = await client.get('user:3')
   console.log(value, '👀')
})()
