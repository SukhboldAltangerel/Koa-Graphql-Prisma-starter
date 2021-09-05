import graphqlHTTP from 'koa-graphql'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import Router from '@koa/router'
import { getUsers } from './queries/user.js'
import { signUpUser, loginUser, changePassword } from './mutations/user.js'
import { liveChat } from './subscriptions/chat.js'
import { getChatRedis } from './queries/chatRedis.js'
import { addChatRedis } from './mutations/chatRedis.js'

const router = new Router()

const unAuthQueries = new GraphQLObjectType({
   name: 'queries',
   fields: {
      getUsers: getUsers,
      getChatRedis: getChatRedis
   }
})

const unAuthMutations = new GraphQLObjectType({
   name: 'mutations',
   fields: {
      signUpUser: signUpUser,
      loginUser: loginUser,
      addChatRedis: addChatRedis
   }
})

const queries = new GraphQLObjectType({
   name: 'queries',
   fields: {
      getUsers: getUsers
   }
})

const mutations = new GraphQLObjectType({
   name: 'mutations',
   fields: {
      changePassword: changePassword
   }
})

const subscriptions = new GraphQLObjectType({
   name: 'subscriptions',
   fields: {
      liveChat: liveChat
   }
})

export const unAuthSchema = new GraphQLSchema({
   query: unAuthQueries,
   mutation: unAuthMutations,
})

export const schema = new GraphQLSchema({
   query: queries,
   mutation: mutations,
})

export const subscriptionSchema = new GraphQLSchema({
   subscription: subscriptions
})

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

const subscriptionEndpoint = `ws://localhost:${process.env.PORT}/graphql`;

router.all(
   '/graphql',
   graphqlHTTP((req, res, ctx) => ({
      schema: ctx.state.user
         ? schema
         : unAuthSchema,
      graphiql: {
         subscriptionEndpoint
      },
      extensions
   }))
)

export default router
