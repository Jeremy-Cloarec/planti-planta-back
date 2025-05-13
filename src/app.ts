import express from 'express'
import 'dotenv/config'
import homeRoute from './routes/home_route'

const app = express() 
const port = process.env.PORT

app.use('/', homeRoute)

app.listen(port, () => {
    console.log(`App listen on port ${port}`)
})

