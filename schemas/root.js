import graphqlHTTP from 'koa-graphql'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import Router from '@koa/router'
import Prisma from '@prisma/client'
import { getUsers } from './queries/user.js'
import { createUser, loginUser, updatePassword } from './mutations/user.js'

const router = new Router()

const { PrismaClient } = Prisma
export const prisma = new PrismaClient()

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

router.all(
   '/graphql',
   graphqlHTTP((req, res, ctx) => ({
      schema: schema,
      graphiql: true
   }))
)

export default router
