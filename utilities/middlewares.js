export function unAuthMiddleware(ctx, next) {
   return next().catch((err) => {
      if (err.status === 401) {
         ctx.status === 401
         ctx.body === "Нэвтэрч орно уу."
      } else {
         throw err
      }
   })
}
