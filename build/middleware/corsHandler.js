"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsHandler = corsHandler;
function corsHandler(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.header("origin"));
    res.header("Access-Control-Allow-Headers", 'origin, X-Request-With, Content-Type, Accept, Authorization');
    res.header("Access-Control-Allow-Credentials", 'true');
    if (req.method === 'OPTIONS') {
        res.header('access-control-allow-methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
}
