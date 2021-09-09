import graphqlHTTP from 'koa-graphql'
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import Router from '@koa/router'
import { getUsers } from './queries/user.js'
import { signUpUser, loginUser, changePassword } from './mutations/user.js'
import { getChatRedis } from './queries/chatRedis.js'
import { addChatRedis } from './mutations/chatRedis.js'
import { chatSub } from './subscriptions/chat.js'

const router = new Router()

const unAuthQueries = new GraphQLObjectType({
   name: 'queries',
   fields: {
      getUsers: getUsers
   }
})

const unAuthMutations = new GraphQLObjectType({
   name: 'mutations',
   fields: {
      signUpUser: signUpUser,
      loginUser: loginUser
   }
})

const queries = new GraphQLObjectType({
   name: 'queries',
   fields: {
      getUsers: getUsers,
      getChatRedis: getChatRedis
   }
})

const mutations = new GraphQLObjectType({
   name: 'mutations',
   fields: {
      changePassword: changePassword,
      addChatRedis: addChatRedis
   }
})

export const subscriptions = new GraphQLObjectType({
   name: 'subscriptions',
   fields: {
      chatSub: chatSub
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
   query: new GraphQLObjectType({
      name: 'subscriptionQuery',
      fields: {
         subscriptionQuery: {
            type: GraphQLString,
            resolve: () => 'Root query placeholder.'
         }
      }
   }),
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

const subscriptionEndpoint = `ws://localhost:${process.env.PORT}/graphql`

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
