import { Router } from 'express'

import { createComment, likeComment, dislikeComment, deleteComment } from '../controllers/commentController.js'

const router = Router()

router.post('/create', createComment)
router.delete('/delete', deleteComment)
router.post('/like', likeComment)
router.post('/dislike', dislikeComment)

export default router