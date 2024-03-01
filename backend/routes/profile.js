import { Router } from 'express'

import { editProfile } from '../controllers/profileController.js'

const router = Router()

router.post('/edit', editProfile)

export default router