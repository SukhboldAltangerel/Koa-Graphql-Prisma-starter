import { GraphQLUpload } from 'graphql-upload'
import { messageType } from '../types/message.js'
import { createWriteStream } from 'fs'
import { GraphQLList } from 'graphql'

export const uploadFile = {
   type: messageType,
   args: {
      files: { type: new GraphQLList(GraphQLUpload) }
   },
   async resolve(parent, { files }, ctx) {
      const { filename, mimetype, createReadStream } = await files
      // const stream = createReadStream()
      // const write = createWriteStream()
      // stream.pipe(write)
      console.log(files)
      return { message: `Uploaded: ${123}` }
   }
}
