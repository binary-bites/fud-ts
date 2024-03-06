import { Router } from 'express'

import { createPost, deletePost, likePost, dislikePost, editPost, getPost } from '../controllers/postController.js'
import requireAuth from '../middleware/requireAuth.js'

const router = Router()
router.use(requireAuth)

router.post('/create', createPost)
router.delete('/delete', deletePost)
router.post('/like', likePost)
router.post('/dislike', dislikePost)
router.post('/edit', editPost)
router.get('/get', getPost)

export default router