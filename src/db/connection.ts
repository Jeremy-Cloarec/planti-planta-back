import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT_DB || '0')
})

export default pool