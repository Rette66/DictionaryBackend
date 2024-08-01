import { Request, Response, NextFunction } from "express";
import { json } from "stream/consumers";

export function corsHandler(req: Request, res: Response, next: NextFunction){
    res.header("Access-Control-Allow-Origin", req.header("origin"))
    res.header("Access-Control-Allow-Headers", 'origin, X-Request-With, Content-Type, Accept, Authorization')
    res.header("Access-Control-Allow-Credentials", 'true')

    if(req.method === 'OPTIONS'){
        res.header('access-control-allow-methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
        }

    next();
}