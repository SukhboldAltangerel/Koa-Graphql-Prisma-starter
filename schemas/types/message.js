import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

export const messageType = new GraphQLObjectType({
   name: 'message',
   fields: () => ({
      message: { type: GraphQLString }
   }),
})

export const messageWithUserType = new GraphQLObjectType({
   name: 'messageWithUser',
   fields: () => ({
      message: { type: GraphQLString },
      token: { type: GraphQLString },
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
   }),
})
