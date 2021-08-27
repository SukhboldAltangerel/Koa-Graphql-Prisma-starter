import { GraphQLID, GraphQLString } from "graphql"
import { messageType, messageWithTokenType } from "../types/message.js"
import bcrypt from 'bcrypt'
import tokenSign from "../../utilities/jwt.js"

const saltRounds = 10
const unmtachError = (ctx) => ctx.throw('$$$Имэйл эсвэл нууц үг буруу байна.')

export const signUpUser = {
   type: messageWithTokenType,
   args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString }
   },
   async resolve(parent, args, ctx) {
      if (Object.values(args).some(value => !value)) {
         ctx.throw('$$$Талбар хоосон байна.')
      }

      let user = await ctx.prisma.user.findFirst({
         where: {
            email: args.email
         }
      })

      if (user) {
         ctx.throw('$$$Имэйл хаяг бүртгэлтэй байна.')
      }

      const hash = await bcrypt.hash(args.password, saltRounds)
      args.password = hash
      user = await ctx.prisma.user.create({
         data: args
      })

      const token = tokenSign({ user: user.name })

      return {
         message: 'Хэрэглэгч бүртгүүллээ.',
         token: token
      }
   }
}

export const loginUser = {
   type: messageWithTokenType,
   args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
   },
   async resolve(parent, args, ctx) {
      if (!args.email) ctx.throw('$$$Имэйл хаягаараа нэвтэрнэ үү.')
      if (!args.password) ctx.throw('$$$Нууц үгээ оруулна уу.')

      const user = await ctx.prisma.user.findFirst({
         where: {
            email: args.email
         }
      })

      if (!user) {
         unmtachError(ctx)
      }

      const match = await bcrypt.compare(args.password, user.password)
      if (!match) {
         unmtachError(ctx)
      }

      const token = tokenSign({ user: user.name })

      return {
         message: 'Хэрэглэгч нэвтэрлээ.',
         token: token
      }
   }
}

export const changePassword = {
   type: messageType,
   args: {
      id: { type: GraphQLID },
      oldPassword: { type: GraphQLString },
      newPassword: { type: GraphQLString }
   },
   async resolve() {
      return { message: 'Нууц үг солигдлоо.' }
   },
}
