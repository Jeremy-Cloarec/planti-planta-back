import express from 'express'
import homeController from '../controllers/home_controller'
import seedingController from '../controllers/seeding_controller'

const router = express.Router()

// homepage
router.get('/', homeController.getHomeController)
router.post('/', homeController.postHomeController)
router.put('/', homeController.putHomeController)
router.delete('/', homeController.deleteHomeController)

// seeding
router.get('/seed', seedingController.seedingDb)

export default router
