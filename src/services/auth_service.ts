import bcrypt from 'bcrypt'
import pool from '../db/connection'
import jwt from 'jsonwebtoken'

const AuthService = {
    register: async (email: string, password: string) => {
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = (await pool.query(
            `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email`,
            [email, hashedPassword]
        )).rows[0]
        return result
    },

    login: async (email: string, password: string) => {
        const user = (await pool.query(`SELECT * FROM users WHERE email = $1`, [email])).rows[0]

        if (!user) throw new Error("User not found")

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new Error('Invalid password')
        
        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET!, {expiresIn: '1h'})
        return token
    }
}

export default AuthService