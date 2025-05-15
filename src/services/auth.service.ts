import bcrypt from 'bcrypt'
import pool from '../db/connection'
import jwt from 'jsonwebtoken'
import { User } from '../db/definitions'

const AuthService = {
    register: async (name: string, email: string, password: string) => {
        // If user already exist
        const userEmail = (await pool.query(`SELECT email FROM users WHERE email = $1`, [email])).rows[0]
        if (userEmail) throw new Error('Email already exist')

        const hashedPassword = await bcrypt.hash(password, 10)
        const result = (await pool.query(
            `INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING id, name, email`,
            [name, email, hashedPassword, false]
        )).rows[0]
        return result
    },

    login: async (email: string, password: string) => {
        const user: User = (await pool.query(`SELECT * FROM users WHERE email = $1`, [email])).rows[0]

        if (!user) throw new Error("User not found")

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new Error('Invalid password')

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' })
        return token
    }
}

export default AuthService