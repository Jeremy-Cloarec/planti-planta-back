import express from 'express'
import homeController from '../controllers/home_controller'

const router = express.Router()

router.get('/', homeController.getHomeController )
router.post('/', homeController.postHomeController )
router.put('/', homeController.putHomeController )
router.delete('/', homeController.deleteHomeController )

export default router
