import { GraphQLID, GraphQLString } from 'graphql'
import { messageType } from '../types/message.js'

export const addChatRedis = {
   type: messageType,
   args: {
      userId: { type: GraphQLID },
      message: { type: GraphQLString },
   },
   async resolve(parent, args, ctx) {
      args.dateTime = Date.now()
      const res = await ctx.redis.send_command('JSON.ARRAPPEND', 'chat', '.', JSON.stringify(args))

      console.log('👀', res)
      return {
         message: `Msg added: ${args.message}`
      }
   }
}
