import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller";
import { Route } from "../decorators/route";
import { MongoGetAll } from "../decorators/mongoose/getAll";
import { book } from "../models/book";
import { MongoGet } from "../decorators/mongoose/get";
import { MongoCreate } from "../decorators/mongoose/create";
import { MongoQuery } from "../decorators/mongoose/query";
import { MongoUpdate } from "../decorators/mongoose/update";
import { MongoDelete } from "../decorators/mongoose/delete";


@Controller('/books') 
class BooksController {

    @Route('get', '/get/all')
    @MongoGetAll(book)
    getAll(req: Request, res: Response, next: NextFunction){
        return res.status(200).json(req.mongoGetAll)
    }

    @Route('get', '/get/:id')
    @MongoGet(book)
    get(req: Request, res: Response, next: NextFunction){
        return res.status(200).json(req.mongoGet)
    }

    @Route('post', '/create')
    @MongoCreate(book)
    create(req: Request, res: Response, next: NextFunction){
        return res.status(200).json(req.mongoCreate)
    }

    @Route('post', '/query')
    @MongoQuery(book)
    query(req: Request, res: Response, next: NextFunction){
        return res.status(200).json(req.mongoQuery)
    }

    @Route('patch', '/update/:id')
    @MongoUpdate(book)
    update(req: Request, res: Response, next: NextFunction){
        return res.status(201).json(req.mongoUpdate)
    }
    
    @Route('delete', '/delete/:id')
    @MongoDelete(book)
    delete(req: Request, res: Response, next: NextFunction){
        return res.status(200).json({message: 'deleted'})
    }

}

export default BooksController;