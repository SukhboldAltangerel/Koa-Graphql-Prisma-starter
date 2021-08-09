import jwt from 'jsonwebtoken'

export async function getUser(ctx) {
   const token = jwt.sign({ user: 'admin' }, process.env.ACCESS_TOKEN_SECRET)
   ctx.body = { token: token }
}
