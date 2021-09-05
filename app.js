import Koa from 'koa'
import logger from 'koa-logger'
import cors from '@koa/cors'
import json from 'koa-json'
import apiRoutes from './routes/api.js'
import graphqlRoutes, { subscriptionSchema } from './schemas/root.js'
import koaJwt from 'koa-jwt'
import { PrismaClient } from './node_modules/.prisma/client/index.js'
import ws from './node_modules/ws/index.js'
import { useServer } from 'graphql-ws/lib/use/ws'
import initRedis from './redis.js'

export const app = new Koa()
app.context.prisma = new PrismaClient()

initRedis()

app.use(logger())
   .use(cors())
   .use(json())
   .use(apiRoutes.routes())
   .use(apiRoutes.allowedMethods())
   .use(koaJwt({ secret: process.env.ACCESS_TOKEN_SECRET, passthrough: true }))
   .use(graphqlRoutes.routes())
   .use(graphqlRoutes.allowedMethods())

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))

const server = new ws.Server({
   port: PORT,
   path: '/graphql'
})
useServer(
   { subscriptionSchema },
   server
)
