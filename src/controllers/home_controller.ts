import { NextFunction, Request, Response } from "express"
import HomeService from "../services/home_service"

const homeService = new HomeService()

const homeController = {
    getHomeController: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getHomeService = homeService.getHomeService()
            res.status(200).send(getHomeService)
        } catch (err) {
            res.status(500).send("Oups une erreur est survenue")
            console.error(`Error: ${err}`);
            res.status(500)
        }
    },

    putHomeController: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const putHomeService = homeService.putHomeService()
            res.status(200).send(putHomeService)
        } catch (err) {
            res.status(500).send("Oups une erreur est survenue")
            console.error(`Error: ${err}`);
            res.status(500)
        }
    },

    postHomeController: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postHomeService = homeService.postHomeService()
            res.status(200).send(postHomeService)
        } catch (err) {
            res.status(500).send("Oups une erreur est survenue")
            console.error(`Error: ${err}`);
            res.status(500)
        }
    },

    deleteHomeController: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteHomeService = homeService.deleteHomeService()
            res.status(200).send(deleteHomeService)
        } catch (err) {
            res.status(500).send("Oups une erreur est survenue")
            console.error(`Error: ${err}`);
            res.status(500)
        }
    }
}

export default homeController


