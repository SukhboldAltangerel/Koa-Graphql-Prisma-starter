import { GraphQLObjectType, GraphQLString } from "graphql";

export const messageType = new GraphQLObjectType({
   name: 'message',
   fields: () => ({
      message: { type: GraphQLString }
   }),
})

export const messageWithTokenType = new GraphQLObjectType({
   name: 'messageWithToken',
   fields: () => ({
      message: { type: GraphQLString },
      token: { type: GraphQLString }
   }),
})
