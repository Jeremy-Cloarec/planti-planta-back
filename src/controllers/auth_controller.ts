import { Request, Response } from "express";
import AuthService from "../services/auth_service";

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { name, email, password } = await req.body
            const result = await AuthService.register(name, email, password)
            res.status(200).json(result)

        } catch (error) {
            res.status(500).json({ error: `registration failed: ${error}` })
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const result = await AuthService.login(email, password)
            res.status(200).send(result)

        } catch (error) {
            res.status(500).json({ error: `Invalid credential: ${error}` })
        }
    }
}

export default authController