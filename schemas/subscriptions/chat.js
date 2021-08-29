import { GraphQLList } from 'graphql'
import { chatType } from '../types/chat.js'

export const liveChat = {
   type: new GraphQLList(chatType),
   async resolve(parent, args, ctx) {
      return await ctx.prisma.chat.findFirst({
         orderBy: { createdAt: 'desc' }
      })
   }
}
