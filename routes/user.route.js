import Router from '@koa/router'
import { getUser } from '../controllers/user.controller.js'

const router = new Router()

router.get('/user', getUser)

export default router
