import express from 'express'
import 'dotenv/config'
import routes from './routes/routes'
import pool from './db/connection'

const app = express()
const port = process.env.PORT

try {
    async function startServer() {
        const db = await pool.connect()
        if (db) {
            console.log("Database connected")
        } else {
            console.log("Fail to connect database");
        }
    }
    startServer()

} catch (error) {
    console.error("Error when connectiong to the database: ", error)
}

app.use(express.json())
app.use('/', routes)

app.listen(port, () => {
    console.log(`App listen on port ${port}`)
})

