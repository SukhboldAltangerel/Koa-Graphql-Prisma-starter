import { GraphQLList } from "graphql"
import { prisma } from "../root.js"
import { userType } from "../types/user.js"

export const getUsers = {
   type: new GraphQLList(userType),
   async resolve() {
      return await prisma.user.findMany()
   }
}
