import Redis from 'ioredis'

const redis = new Redis()
redis.on('connect', () => console.log('Connected to redis.'))
redis.on('error', () => console.log('Could not connect to redis.'))

export default redis
