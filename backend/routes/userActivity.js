import { Router } from 'express'

import { getPosts } from '../controllers/userActivityController.js'
import requireAuth from '../middleware/requireAuth.js'

const router = Router()
router.use(requireAuth)

router.get('/getPosts', getPosts)

export default router