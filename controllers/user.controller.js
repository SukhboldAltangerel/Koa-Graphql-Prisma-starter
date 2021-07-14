export async function getUser(ctx) {
   try {
      ctx.body = 'Hello get user'
   } catch (err) {
      console.error(err)
   }
}
