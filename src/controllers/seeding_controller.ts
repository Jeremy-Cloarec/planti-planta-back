import { NextFunction, Request, Response } from "express"
import { seeding } from "../db/seeding"

const seedingController = {
    seedingDb: async (req: Request, res: Response) => {
        try {
            console.log("beginning seeding")
            
            await seeding()
            console.log("seeding done")
            
            res.status(200).send("Database seeded successfully")
        } catch (err) {
            res.status(500).send("Error in db creation")
            console.error(`Error: ${err}`);
            res.status(500)
        }
    }
}

export default seedingController