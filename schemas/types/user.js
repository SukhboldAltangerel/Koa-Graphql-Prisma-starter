import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

export const userType = new GraphQLObjectType({
   name: 'user',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
   })
})
