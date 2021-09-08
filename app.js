import Koa from 'koa'
import logger from 'koa-logger'
import cors from '@koa/cors'
import json from 'koa-json'
import apiRoutes from './routes/api.js'
import graphqlRoutes, { subscriptionSchema } from './schemas/root.js'
import koaJwt from 'koa-jwt'
import { PrismaClient } from './node_modules/.prisma/client/index.js'
import redis from './redis.js'
// import { Server } from 'socket.io'
// import initSocketIo from './sockerIo.js'
import ws from './node_modules/ws/index.js'
import { useServer } from 'graphql-ws/lib/use/ws'
import { PubSub } from 'graphql-subscriptions'

export const app = new Koa()
app.context.prisma = new PrismaClient()

app.context.redis = redis

export const pubSub = new PubSub()
setInterval(() => {
   pubSub.publish('message', {
      message: 'Hi'
   })
}, 1000)
app.context.pubSub = pubSub

app.use(logger())
   .use(cors())
   .use(json())
   .use(apiRoutes.routes())
   .use(apiRoutes.allowedMethods())
   .use(koaJwt({ secret: process.env.ACCESS_TOKEN_SECRET, passthrough: true }))
   .use(graphqlRoutes.routes())
   .use(graphqlRoutes.allowedMethods())

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`)

   const wsServer = new ws.Server({
      server,
      path: '/graphql'
   })

   useServer({
      schema: subscriptionSchema
   }, wsServer
   )
})

// const io = new Server(server)
// initSocketIo(io)
// app.context.io = io
