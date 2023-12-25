import express from 'express'
import {signup, login, logout} from '../controllers/AuthController.js'
import { checkout } from '../controllers/checkoutController.js'
import cacheMiddleware from '../middlewares/productCacheMiddleware.js'
import verifyToken  from '../middlewares/authMiddleware.js'
import { retrievePurchaseHistory } from '../controllers/profileController.js'

const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout )
router.post("/checkout", cacheMiddleware, checkout);
router.post('/profile', retrievePurchaseHistory)


export default router