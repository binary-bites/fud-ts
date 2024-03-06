import { Router } from 'express'

import { createComment, likeComment, dislikeComment, deleteComment } from '../controllers/commentController.js'
import requireAuth from '../middleware/requireAuth.js'

const router = Router()
router.use(requireAuth)

router.post('/create', createComment)
router.delete('/delete', deleteComment)
router.post('/like', likeComment)
router.post('/dislike', dislikeComment)

export default router