import express from 'express'
import homeController from '../controllers/home.controller'
import seedingController from '../controllers/seeding.controller'
import plantsController from '../controllers/plants.controller'
import authController from '../controllers/auth.controller'
import userController from '../controllers/user.controller'
import { authentificateToken } from '../middlewares/auth.middlewares'

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
router.put('/plants/:id', plantsController.putPlant)
router.post('/plants', plantsController.postPlant)
router.delete('/plants/:id', plantsController.deletePlant)

// users
router.get('/utilisateurs', authentificateToken, userController.getUsers)
router.get('/utilisateurs/:id', authentificateToken, userController.getUser)

// authentification
router.post('/inscription', authController.register)
router.post('/connexion', authController.login)

export default router
