import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql'

export const chatRedisType = new GraphQLObjectType({
   name: 'chatRedis',
   fields: () => ({
      userId: { type: GraphQLID },
      name: { type: GraphQLString },
      message: { type: GraphQLString },
      dateTime: { type: GraphQLString }
   })
})
