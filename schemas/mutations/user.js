import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql"
import { prisma } from "../root.js"
import { messageType } from "../types/message.js"
import { userType } from "../types/user.js"

export const createUser = {
   type: userType,
   args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString }
   },
   async resolve(parent, args) {
      return await prisma.user.create({
         data: args
      })
   }
}

export const loginUser = {
   type: userType,
   args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
   },
   async resolve(parent, args, ctx) {
      if (!args.email) ctx.throw('$$$Имэйл хаягаараа нэвтэрнэ үү.')
      if (!args.password) ctx.throw('$$$Нууц үгээ оруулна уу.')

      const user = await prisma.user.findFirst({
         where: args
      })

      if (!user) {
         ctx.throw('$$$Имэйл эсвэл нууц үг буруу байна.')
      }

      return {
         email: user.email
      }
   }
}

export const updatePassword = {
   type: messageType,
   args: {
      id: { type: GraphQLID },
      oldPassword: { type: GraphQLString },
      newPassword: { type: GraphQLString }
   },
   async resolve(parent, args, ctx) {
      const user = await prisma.user.findUnique({
         where: {
            id: +args.id
         }
      })

      if (!user) ctx.throw('$$$Хэрэглэгч олдсонгүй.')

      if (args.oldPassword !== user.password) ctx.throw('$$$Нууц үг буруу байна.')

      await prisma.user.update({
         where: {
            id: +args.id
         },
         data: {
            password: args.newPassword
         }
      })

      return {
         success: true,
         message: 'Нууц үг солигдлоо.'
      }
   },
}
