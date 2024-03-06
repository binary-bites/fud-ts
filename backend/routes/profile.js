import { Router } from 'express'

import { editProfile } from '../controllers/profileController.js'
import requireAuth from '../middleware/requireAuth.js'

const router = Router()
router.use(requireAuth)

router.post('/edit', editProfile)

export default router