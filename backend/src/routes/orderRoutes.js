import { Router } from 'express'
import { createCodOrder } from '../controllers/orderController.js'

const router = Router()

router.post('/cod', createCodOrder)

export default router
