"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shutdown = exports.Main = exports.httpServer = exports.application = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
require("./config/logging");
const loggingHandler_1 = require("./middleware/loggingHandler");
const corsHandler_1 = require("./middleware/corsHandler");
const routNotFound_1 = require("./middleware/routNotFound");
const config_1 = require("./config/config");
exports.application = (0, express_1.default)();
const Main = () => {
    logging.info('--------------------------');
    logging.info('Initializing API');
    logging.info('--------------------------');
    exports.application.use(express_1.default.urlencoded({ extended: true }));
    exports.application.use(express_1.default.json());
    logging.info('--------------------------');
    logging.info('Logging & Configuration');
    logging.info('--------------------------');
    exports.application.use(loggingHandler_1.loggingHandler);
    exports.application.use(corsHandler_1.corsHandler);
    logging.info('--------------------------');
    logging.info('Define Controller Routing');
    logging.info('--------------------------');
    exports.application.get('/main/healthCheck', (req, res, next) => {
        return res.status(200).json({ hello: 'world' });
    });
    logging.info('--------------------------');
    logging.info('Define Controller Routing');
    logging.info('--------------------------');
    exports.application.use(routNotFound_1.routeNotFound);
    logging.info('--------------------------');
    logging.info('Start Server');
    logging.info('--------------------------');
    exports.httpServer = http_1.default.createServer(exports.application);
    exports.httpServer.listen(config_1.SERVER.SERVER_PORT, () => {
        logging.info('--------------------------');
        logging.info('Server Started: ' + config_1.SERVER_HOSTNAME + ':' + config_1.SERVER_PORT);
        logging.info('--------------------------');
    });
};
exports.Main = Main;
const Shutdown = (callback) => exports.httpServer && exports.httpServer.close(callback);
exports.Shutdown = Shutdown;
(0, exports.Main)();
