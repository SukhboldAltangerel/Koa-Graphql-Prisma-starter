import Koa from 'koa'
import logger from 'koa-logger'
import cors from '@koa/cors'
import json from 'koa-json'
import apiRoutes from './routes/api.js'
import graphqlRoutes from './schemas/root.js'
import koaJwt from 'koa-jwt'
import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
import ws from 'ws'
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

const server = app.listen(process.env.PORT, () => {
   console.log(`Server running at http://localhost:${process.env.PORT}`)
   const wsServer = new ws.server()

})
