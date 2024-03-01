import { Router } from 'express'
import userController from '../controllers/userController.js'
const { loginUserFirebase, signUpUserFirebase, checkCredentials } = userController

const router = Router()

router.post('/signup', signUpUserFirebase)
router.post('/login', loginUserFirebase)
router.post('/check', checkCredentials)

export default router