import graphqlHTTP from 'koa-graphql'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import Router from '@koa/router'
import { getUsers, createUser, updatePassword, loginUser } from './user.js'

const router = new Router()

const queries = new GraphQLObjectType({
   name: 'queries',
   fields: {
      getUsers: getUsers
   }
})

const mutations = new GraphQLObjectType({
   name: 'mutations',
   fields: {
      createUser: createUser,
      loginUser: loginUser,
      updatePassword: updatePassword
   }
})

const schema = new GraphQLSchema({
   query: queries,
   mutation: mutations
})

router.all('/graphql', graphqlHTTP({
   schema: schema,
   graphiql: true
}))

export default router
