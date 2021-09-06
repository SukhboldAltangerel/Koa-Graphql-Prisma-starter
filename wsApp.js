import ws from './node_modules/ws/index.js'
import { useServer } from 'graphql-ws/lib/use/ws'
import { unAuthSchema, schema, subscriptionSchema } from './schemas/root.js'

const PORT = process.env.PORT

const server = new ws.Server({
   port: PORT,
   path: '/graphql'
})

useServer(
   { unAuthSchema },
   server
)

console.log(`Server running at http://localhost:${PORT}`)
