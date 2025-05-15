import { Request, Response } from "express";
import UserService from "../services/user.service";

const userController = {
    getUsers: async (req: Request, res: Response) => {
        try {
            const result = await UserService.getAllUsers()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ error: `Failed to get all users: ${error}` })
        }
    },
    getUser: async (req: Request, res: Response) => {
        const {id} = req.params
        try {
            const result = await UserService.getUser(id)
            res.status(200).json(result)

        } catch (error) {
            res.status(500).json({ error: `Failed to get user: ${error}` })
        }
    }
}

export default userController