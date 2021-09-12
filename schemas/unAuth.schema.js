import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { loginUser, signUpUser } from './mutations/user.js'

export const unAuthQueriesFields = {
   unAuthQuery: {
      type: GraphQLString,
      resolve: () => 'Root query placeholder.'
   }
}

export const unAuthMutationsFields = {
   signUpUser: signUpUser,
   loginUser: loginUser
}

const unAuthQueries = new GraphQLObjectType({
   name: 'queries',
   fields: unAuthQueriesFields
})

const unAuthMutations = new GraphQLObjectType({
   name: 'mutations',
   fields: unAuthMutationsFields
})

export const unAuthSchema = new GraphQLSchema({
   query: unAuthQueries,
   mutation: unAuthMutations
})
