import { GraphQLString } from 'graphql'
import { messageType } from '../types/message.js'

export const addChatRedis = {
   type: messageType,
   args: {
      message: { type: GraphQLString },
   },
   async resolve(parent, args, ctx) {
      const user = ctx.state.user
      args.userId = user.id
      args.name = user.name
      args.dateTime = Date.now()
      await ctx.redis.send_command('JSON.ARRAPPEND', 'chat', '.', JSON.stringify(args))
      ctx.pubSub.publish('chatAdded', args)
      return {
         message: `Msg added: ${args.message}`
      }
   }
}
