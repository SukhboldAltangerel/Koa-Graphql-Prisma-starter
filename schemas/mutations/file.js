import { GraphQLUpload } from 'graphql-upload'
import { messageType } from '../types/message.js'
import { GraphQLList } from 'graphql'
import storeFS from '../../utilities/storeFS.js'

export const uploadFile = {
   type: messageType,
   args: {
      files: { type: new GraphQLList(GraphQLUpload) }
   },
   async resolve(parent, { files }, ctx) {
      for (const file of files) {
         const { filename, mimetype, createReadStream } = await file
         const stream = createReadStream()
         const directory = 'uploads/999'
         const path = await storeFS({ stream, directory, filename })
      }
      return { message: `Uploads saved.` }
   }
}
