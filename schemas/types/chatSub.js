import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat } from 'graphql'

export const chatSubType = new GraphQLObjectType({
   name: 'chatSub',
   fields: () => ({
      userId: { type: GraphQLID },
      name: { type: GraphQLString },
      message: { type: GraphQLString },
      dateTime: { type: GraphQLFloat }
   })
})
