import graphqlHTTP from 'koa-graphql'
import Router from '@koa/router'
import { authSchema } from './auth.schema.js'
import { unAuthSchema } from './unAuth.schema.js'

const router = new Router()

function extensions({ result }) {
   const errors = result.errors
   if (errors) {
      const myError = errors.find(error => error.message.startsWith('$$$'))
      const errorMsg = myError?.message.slice(3)
      if (errorMsg) {
         return {
            errorMsg: errorMsg
         }
      }
   }
}

const subscriptionEndpoint = `ws://localhost:${process.env.PORT}/graphql`

router.all(
   '/graphql',
   graphqlHTTP((req, res, ctx) => ({
      schema: ctx.state.user
         ? authSchema
         : unAuthSchema,
      graphiql: {
         subscriptionEndpoint
      },
      extensions
   }))
)

export default router
