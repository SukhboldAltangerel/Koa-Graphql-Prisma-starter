import graphqlHTTP from 'koa-graphql'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import Router from '@koa/router'
import Prisma from '@prisma/client'
import { getUsers } from './queries/user.js'
import { signUpUser, loginUser, changePassword } from './mutations/user.js'

const router = new Router()

const { PrismaClient } = Prisma
export const prisma = new PrismaClient()

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
      loginUser: loginUser,
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

const unAuthSchema = new GraphQLSchema({
   query: unAuthQueries,
   mutation: unAuthMutations
})

const schema = new GraphQLSchema({
   query: queries,
   mutation: mutations
})

function extensions({ document, variables, operationName, result, context }) {
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

router.all(
   '/graphql',
   graphqlHTTP((req, res, ctx) => ({
      schema: ctx.state.user
         ? schema
         : unAuthSchema,
      graphiql: true,
      extensions
   }))
)

export default router
