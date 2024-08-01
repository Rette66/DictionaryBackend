import http from 'http' 
import express from 'express' 
import './config/logging' 
import { loggingHandler } from './middleware/logginghandler';
import { corsHandler } from './middleware/corsHandler';
import { availableParallelism } from 'os';
import { routeNotFound } from './middleware/routNotFound';
import { SERVER, SERVER_HOSTNAME, SERVER_PORT } from './config/config';
import { callbackify } from 'util';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>

export const Main=()=>{
    logging.info('--------------------------');
    logging.info('Initializing API')
    logging.info('--------------------------')
    application.use(express.urlencoded({ extended : true}));
    application.use(express.json);

    logging.info('--------------------------')
    logging.info('Logging & Configuration')
    logging.info('--------------------------')
    application.use(loggingHandler)
    application.use(corsHandler)

    logging.info('--------------------------')
    logging.info('Define Controller Routing')
    logging.info('--------------------------')
    application.get('/main/healthCheck', (req, res, next) => {
        return res.status(200).json({  hello: 'world'})
    })

    logging.info('--------------------------')
    logging.info('Define Controller Routing')
    logging.info('--------------------------')
    application.use(routeNotFound)


    logging.info('--------------------------')
    logging.info('Start Server')
    logging.info('--------------------------')
    httpServer = http.createServer(application)
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.info('--------------------------')
        logging.info('Server Started: ' +  SERVER_HOSTNAME + ': ' + SERVER_PORT)
        logging.info('--------------------------')
    
    })
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();