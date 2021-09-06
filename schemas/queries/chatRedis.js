import { GraphQLList } from "graphql"
import { chatRedisType } from "../types/chatRedis.js"

export const getChatRedis = {
   type: new GraphQLList(chatRedisType),
   async resolve(parent, args, ctx) {
      return await ctx.redis.get('chat')
   }
}
