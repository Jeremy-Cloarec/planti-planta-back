import { Request, Response } from "express";
import PlantService from "../services/plants.service";

const plantsController = {
    getPlants: async (req: Request, res: Response) => {
        try {
            const plantsService = new PlantService()
            const getPlantsService = await plantsService.getAllPlantsService()
            res.status(200)
            res.json(getPlantsService)

        } catch (error) {
            res.status(500).send("Fail to get plants")
            console.error(`Error: ${error}`);
        }
    },

    getPlant: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const plantsService = new PlantService()
            const getPlantService = await plantsService.getPlantService(id)

            res.status(200).json(getPlantService)

        } catch (error) {
            res.status(500).send("Fail to get plants")
            console.error(`Error: ${error}`);
        }
    },

    putPlant: async (req: Request, res: Response) => {
        const { id } = req.params
        const { title, price, quantity } = req.body

        try {
            const plantsService = new PlantService()
            const putPlantService = await plantsService.putPlantService(title, price, quantity, id)

            res.status(200).json(putPlantService)

        } catch (error) {
            res.status(500).send("Fail to put plants")
            console.error(`Error: ${error}`);
        }
    },

    postPlant: async (req: Request, res: Response) => {
        try {
            const plant = req.body
            console.log("plant controller", plant);
            const plantsService = new PlantService()
            const postPlantService = await plantsService.postPlantService(plant.title, plant.price, plant.quantity)

            res.status(201).json(postPlantService)

        } catch (error) {
            res.status(500).send(`Fail to post plants. Error:  ${error}`)
            console.error(`Error: ${error}`);
        }
    },

    deletePlant: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const plantsService = new PlantService()
            const deletePlantService = await plantsService.deletePlantService(id)

            res.status(201).json(deletePlantService)

        } catch (error) {
            res.status(500).send("Fail to get plants")
            console.error(`Error: ${error}`);
        }
    }
}

export default plantsController