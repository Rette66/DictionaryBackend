import http from 'http' 
import express from 'express' 
import './config/logging' 
import 'reflect-metadata'
import mongoose from 'mongoose'

import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routNotFound';
import { mongo, server } from './config/config';
import { defineRoutes } from './modules/routes';
import MainController from './controller/maincontroller';
import { declareHandler } from './middleware/declareHandler'
import BooksController from './controller/booksController'

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>

export const Main  = async() => {
    logging.log('--------------------------');
    logging.log('Initializing API')
    logging.log('--------------------------')
    application.use(express.urlencoded({ extended: true}));
    application.use(express.json()); 

    logging.log('--------------------------');
    logging.log('Connect to Mongo')
    logging.log('--------------------------')
    try{
        const connection = await mongoose.connect(mongo.MONGO_CONNECTION, mongo.MONGO_OPTIONS)
        logging.log('--------------------------');
        logging.log('Connected to Mongo: ' , connection.version)
        logging.log('--------------------------')
    } catch (error) {
        logging.log('--------------------------');
        logging.log('Unable to Connect to Mongo')
        logging.error(error)
        logging.log('--------------------------')
    }

    logging.log('--------------------------')
    logging.log('Logging & Configuration')
    logging.log('--------------------------')
    application.use(declareHandler)
    application.use(loggingHandler)
    application.use(corsHandler)

    logging.log('--------------------------')
    logging.log('Define Controller Routing')
    logging.log('--------------------------')
    defineRoutes([MainController, BooksController], application)

    logging.log('--------------------------')
    logging.log('Define Controller Routing')
    logging.log('--------------------------')
    application.use(routeNotFound)


    logging.log('--------------------------')
    logging.log('Start Server')
    logging.log('--------------------------')
    httpServer = http.createServer(application)
    httpServer.listen(server.SERVER_PORT, () => {
        logging.log('--------------------------')
        logging.log('Server Started: ' +  server.SERVER_HOSTNAME + ':' + server.SERVER_PORT)
        logging.log('--------------------------')
    
    })
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();