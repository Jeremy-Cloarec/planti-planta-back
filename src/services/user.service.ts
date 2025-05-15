import pool from "../db/connection"
import { User } from "../db/definitions"

const UserService = {
    async getAllUsers() {
        const users: User[] = (await pool.query('SELECT id, is_admin, name, email FROM users')).rows
        return users
    },

    async getUser(id:string) {
        const user:User = (await pool.query(`SELECT id, is_admin, name, email FROM users WHERE id=$1`, [id])).rows[0]
        return user
    } 
}

export default UserService