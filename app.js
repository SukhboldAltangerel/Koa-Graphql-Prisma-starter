import Koa from 'koa'
import logger from 'koa-logger'
import cors from '@koa/cors'
import apiRoutes from './routes/api.js'
import graphqlRoutes from './schemas/root.js'
import koaJwt from 'koa-jwt'
import { PrismaClient } from './node_modules/.prisma/client/index.js'
import redis from './redis.js'
import ws from './node_modules/ws/index.js'
import { useServer } from 'graphql-ws/lib/use/ws'
import { PubSub } from 'graphql-subscriptions'
import { execute, subscribe } from 'graphql'
import { subscriptionSchema } from './schemas/sub.schema.js'

const app = new Koa()
app.context.prisma = new PrismaClient()

app.context.redis = redis

const pubSub = new PubSub()
app.context.pubSub = pubSub

app.use(logger())
   .use(cors())
   .use(apiRoutes.routes())
   .use(apiRoutes.allowedMethods())
   .use(koaJwt({ secret: process.env.ACCESS_TOKEN_SECRET, passthrough: true }))
   .use(graphqlRoutes.routes())
   .use(graphqlRoutes.allowedMethods())

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}.`)

   const contextValue = {
      redis: redis,
      pubSub: pubSub
   }

   const wsServer = new ws.Server({
      server,
      path: '/graphql'
   })

   useServer({
      schema: subscriptionSchema,
      execute: args => execute({ ...args, contextValue }),
      subscribe: args => subscribe({ ...args, contextValue })
   }, wsServer
   )
})
