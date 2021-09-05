import redis from 'redis'
import rejson from 'redis-rejson'
import { app } from './app.js'

export default async function initRedis() {
   rejson(redis)
   const client = redis.createClient()
   client.on('error', err => console.log('Redis Client Error', err))
   await client.connect()
   app.context.redis = client
}
