import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'

export const authentificateToken = (req: Request, res: Response, next: NextFunction) => {
    const autHeader =  req.headers['authorization']
    const token = autHeader && autHeader.split(' ')[1]

    if(!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    console.log(token)
    console.log(process.env.JWT_SECRET);
    
    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }
        (req as any).user = user;
        next()
    })
}