import pool from "./connection"
import { plants, users } from "./placeholder-data"
import bcrypt from 'bcrypt'

async function seedPlants() {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await pool.query(`
            CREATE TABLE IF NOT EXISTS plants (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                title TEXT NOT NULL,
                price NUMERIC NOT NULL,
                quantity NUMERIC NOT NULL
            )
        `);
    const insertPlants = await Promise.all(
        plants.map((plant) => {
            pool.query(`
                INSERT INTO plants (title, price, quantity) VALUES ($1, $2, $3)`, [plant.title, plant.price, plant.quantity])
        })
    );

    return insertPlants;
}

async function seedUsers() {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            is_admin BOOLEAN NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
        `);

    const insertUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10)
            return pool.query(`
                INSERT INTO users (is_admin, name, email, password) VALUES ($1, $2, $3, $4)`, [user.isAdmin, user.name, user.email, hashedPassword])
        })
    );
    return insertUsers;
}

async function seedBasket() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS basket (
            plant_id UUID REFERENCES plants(id) ON DELETE CASCADE ON UPDATE CASCADE,
            user_id UUID REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY(plant_id, user_id)
        )
    `)

    const uuidUsers = ((await pool.query(`SELECT id FROM users`)).rows).map(uuid => uuid.id)
    const uuidPlants = ((await pool.query(`SELECT id FROM plants`)).rows).map(uuid => uuid.id)

    await pool.query(`INSERT INTO basket (plant_id, user_id) VALUES
        ($1, $2), 
        ($3, $4), 
        ($5, $6)`,
        [
            uuidPlants[0], uuidUsers[1],
            uuidPlants[1], uuidUsers[1],
            uuidPlants[3], uuidUsers[0]
        ]
    )
}

async function deleteTables() {
    await pool.query(`DROP TABLE IF EXISTS  basket, plants, users CASCADE`)
}

export async function seeding() {
    try {
        await deleteTables()
        await seedPlants()
        await seedUsers()
        await seedBasket()
    } catch (error) {
        console.error("Fail to seed: ", error)
    }
}