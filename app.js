import Koa from 'koa'
import logger from 'koa-logger'
import cors from '@koa/cors'
import json from 'koa-json'
import apiRoutes from './routes/api.js'
import graphqlRoutes from './schemas/root.js'
import koaJwt from 'koa-jwt'
import { PrismaClient } from './node_modules/.prisma/client/index.js'
import redis from './redis.js'

export const app = new Koa()
app.context.prisma = new PrismaClient()

app.context.redis = redis

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
