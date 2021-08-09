import jwt from 'jsonwebtoken'

export default function tokenSign(payload) {
   const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
   return token
}
