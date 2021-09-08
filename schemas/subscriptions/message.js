import { messageType } from '../types/message.js'
import { pubSub } from '../../app.js'

export const messageSubs = {
   type: messageType,
   resolve(source) {

      if (source instanceof Error) {
         throw source
      }
      return source
   },
   subscribe() {
      return pubSub.asyncIterator('message')
   }
}
