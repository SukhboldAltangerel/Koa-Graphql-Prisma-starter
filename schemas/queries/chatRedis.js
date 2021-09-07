import { GraphQLList } from "graphql"
import { chatRedisType } from "../types/chatRedis.js"

export const getChatRedis = {
   type: new GraphQLList(chatRedisType),
   async resolve(parent, args, ctx) {
      return JSON.parse(await ctx.redis.send_command('JSON.GET', 'chat'))
   }
}
