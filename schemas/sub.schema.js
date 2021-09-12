import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { chatSub } from './subscriptions/chat.js'

const subscriptions = new GraphQLObjectType({
   name: 'subscriptions',
   fields: {
      chatSub: chatSub
   }
})

export const subscriptionSchema = new GraphQLSchema({
   query: new GraphQLObjectType({
      name: 'subscriptionQuery',
      fields: {
         subscriptionQuery: {
            type: GraphQLString,
            resolve: () => 'Root query placeholder.'
         }
      }
   }),
   subscription: subscriptions
})
