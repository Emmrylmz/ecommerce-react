import express from 'express'
import {signup, login, logout} from '../controllers/AuthController.js'
import { checkout } from '../controllers/checkoutController.js'
import cacheMiddleware from '../middlewares/productCacheMiddleware.js'

const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout )
router.post("/checkout", cacheMiddleware, checkout);


export default router