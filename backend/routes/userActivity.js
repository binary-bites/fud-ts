import { Router } from 'express'

import { getPosts } from '../controllers/userActivityController.js'

const router = Router()

router.get('/getPosts', getPosts)

export default router