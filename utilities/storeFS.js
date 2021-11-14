import { createWriteStream, unlinkSync } from 'fs'

export default function storeFS({ stream, directory, filename }) {
   const path = `${directory}/${filename}`
   return new Promise((resolve, reject) =>
      stream.on('error', err => {
         if (stream.truncated) {
            unlinkSync(path)
         }
         reject(err)
      }).pipe(createWriteStream(path))
         .on('error', err => reject(err))
         .on('finish', () => resolve(path))
   )
}
