import { Request, Response, NextFunction } from "express";

export function routeNotFound(req: Request, res: Response, next: NextFunction){
    
    const error = new Error('route not found')

    logging.error

    return res.status(200).json({error})
    
}