import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

export const chatType = new GraphQLObjectType({
   name: 'chat',
   fields: () => ({
      id: { type: GraphQLID },
      userId: { type: GraphQLID },
      message: { type: GraphQLString },
      createdAt: { type: GraphQLString }
   })
})
