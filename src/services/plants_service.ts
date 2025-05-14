import { Plant } from "../db/definitions"
import pool from "../db/connection"

export default class PlantService {
    async getAllPlantsService() {
        const plants: Plant[] = (await pool.query('SELECT * FROM plants')).rows      
        return plants
    }

    async getPlantService(id: string) {
        const plant: any = (await pool.query('SELECT * FROM plants WHERE id=$1', [id])).rows[0]
        return plant
    }

    async putPlantService(title:string, price:number, quantity:number, id:string) {
        const plant: Plant = ((await pool.query('UPDATE plants SET title=$1, price=$2, quantity=$3 WHERE id=$4', [title, price, quantity, id])).rows[0])
        return plant
    }

    async postPlantService(title:string, price:number, quantity:number) {
        const plant: Plant = ((await pool.query('INSERT INTO plants (title, price, quantity) VALUES($1, $2, $3) RETURNING *', [title, price, quantity])).rows[0])
        console.log("plantService", plant);
        
        return plant
    }

    async deletePlantService(id:string) {
        const plant:Plant = ((await pool.query('DELETE FROM plants WHERE id=$1', [id]))).rows[0]
        return plant
    }
}