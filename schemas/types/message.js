import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";

export const messageType = new GraphQLObjectType({
   name: 'message',
   fields: () => ({
      message: { type: GraphQLString },
   }),
})
