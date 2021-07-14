import graphqlHTTP from 'koa-graphql'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import Router from '@koa/router'
import { getUsers, createUser, updatePassword } from './user.js'

const router = new Router()

const rootQuery = new GraphQLObjectType({
   name: 'rootQuery',
   fields: {
      getUsers: getUsers
   }
})

const mutation = new GraphQLObjectType({
   name: 'mutation',
   fields: {
      createUser: createUser,
      updatePassword: updatePassword,
   }
})

const schema = new GraphQLSchema({
   query: rootQuery,
   mutation: mutation
});

router.all('/graphql', graphqlHTTP({
   schema: schema,
   graphiql: true
}))

export default router
