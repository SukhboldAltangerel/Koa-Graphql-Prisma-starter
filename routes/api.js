import Router from '@koa/router'
import userRoute from './user.route.js'

const router = new Router(
   {prefix: '/api'},
)

router.use(userRoute.routes())

export default router
