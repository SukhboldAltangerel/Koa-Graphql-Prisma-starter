import Koa from 'koa'
import logger from 'koa-logger'
import cors from '@koa/cors'
import json from 'koa-json'
import apiRoutes from './routes/api.js'
import graphqlRoutes, { schema, unAuthSchema, subscriptionSchema } from './schemas/root.js'
import koaJwt from 'koa-jwt'
import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
import ws from './node_modules/ws/index.js'
import { useServer } from 'graphql-ws/lib/use/ws'

const app = new Koa()
app.context.prisma = new PrismaClient()

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
   useServer({ subscriptionSchema }, wsServer)
})
