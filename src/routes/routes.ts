import express from 'express'
import homeController from '../controllers/home_controller'
import seedingController from '../controllers/seeding_controller'
import plantsController from '../controllers/plants_controller'

const router = express.Router()

// homepage
router.get('/', homeController.getHomeController)
router.post('/', homeController.postHomeController)
router.put('/', homeController.putHomeController)
router.delete('/', homeController.deleteHomeController)

// seeding
router.get('/seed', seedingController.seedingDb)

// plant
router.get('/plants', plantsController.getPlants)
router.get('/plants/:id', plantsController.getPlant)
router.put('/plants/:id', plantsController.putPlant )
router.post('/plants', plantsController.postPlant)
router.delete('/plants/:id', plantsController.deletePlant)

export default router
