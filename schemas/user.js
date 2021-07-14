import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from 'graphql'
import Prisma from '@prisma/client'
import { messageType } from './message.js'

const { PrismaClient } = Prisma
const prisma = new PrismaClient()

const userType = new GraphQLObjectType({
   name: 'user',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString }
   })
})

export const getUsers = {
   type: new GraphQLList(userType),
   async resolve() {
      return await prisma.user.findMany()
   }
}

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

export const updatePassword = {
   type: messageType,
   args: {
      id: { type: GraphQLID },
      oldPassword: { type: GraphQLString },
      newPassword: { type: GraphQLString }
   },
   async resolve(parent, args) {
      const user = await prisma.user.findUnique({
         where: {
            id: +args.id
         }
      })

      if (!user) throw new Error('User not found.')

      if (args.oldPassword !== user.password) throw new Error('Password is wrong.')

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
         message: 'Password changed.'
      }
   },
}
