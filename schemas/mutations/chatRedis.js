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
      // await ctx.redis.json_arrappend('chat', args)
      ctx.redis.set('name', 'bold')
      console.log('👀')

      return {
         message: `Msg added: ${args.message}`
      }
   }
}
