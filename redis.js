import Redis from 'ioredis'

const redis = new Redis()
redis.on('connect', () => console.log('Connected to redis.'))
redis.on('error', () => console.log('Could not connect to redis.'))

void async function init() {
   const config = await redis.send_command('JSON.GET', 'config')
   if (!config) {
      await redis.send_command('JSON.SET', 'config', '.', JSON.stringify(configObj))
   }

   const chat = await redis.send_command('JSON.GET', 'chat')
   if (!chat) {
      await redis.send_command('JSON.SET', 'chat', '.', JSON.stringify([]))
   }
}()

const configObj = {
   userId: 1
}

export default redis
