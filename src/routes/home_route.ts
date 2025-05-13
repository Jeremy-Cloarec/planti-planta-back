import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Planti Planta Admin HomePage')
})

export default router