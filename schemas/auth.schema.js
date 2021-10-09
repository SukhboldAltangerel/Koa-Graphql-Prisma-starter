import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { addChatRedis } from './mutations/chatRedis.js'
import { uploadFile } from './mutations/file.js'
import { changePassword } from './mutations/user.js'
import { getChatRedis } from './queries/chatRedis.js'
import { getUser, getUsers } from './queries/user.js'
import { unAuthQueriesFields, unAuthMutationsFields } from './unAuth.schema.js'

const queries = new GraphQLObjectType({
   name: 'queries',
   fields: {
      ...unAuthQueriesFields,
      getUser: getUser,
      getUsers: getUsers,
      getChatRedis: getChatRedis
   }
})

const mutations = new GraphQLObjectType({
   name: 'mutations',
   fields: {
      ...unAuthMutationsFields,
      changePassword: changePassword,
      addChatRedis: addChatRedis,
      uploadFile: uploadFile
   }
})

export const authSchema = new GraphQLSchema({
   query: queries,
   mutation: mutations,
})
