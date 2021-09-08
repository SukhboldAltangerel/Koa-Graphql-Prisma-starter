import { GraphQLList } from 'graphql'
import { userType } from '../types/user.js'

export const getUsers = {
   type: new GraphQLList(userType),
   async resolve(parent, args, ctx) {
      return await ctx.prisma.user.findMany()
   }
}
