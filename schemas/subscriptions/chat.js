import { chatSubType } from '../types/chatSub.js'

export const chatSub = {
   type: chatSubType,
   resolve(parent) {
      if (parent instanceof Error) {
         throw parent
      }
      return parent
   },
   subscribe(parent, args, ctx) {
      return ctx.pubSub.asyncIterator('chatAdded')
   }
}
