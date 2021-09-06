import { GraphQLID, GraphQLString } from 'graphql'
import { messageType } from '../types/message.js'

export const addChatRedis = {
   type: messageType,
   args: {
      userId: { type: GraphQLID },
      message: { type: GraphQLString },
      dateTime: { type: GraphQLString }
   },
   async resolve(parent, args, ctx) {
      const res = await ctx.redis.set('chat', args)
      console.log('👀', res)
      return {
         message: `Msg added: ${args.message}`
      }
   }
}
