"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandle = exports.notFound = void 0;
const notFound = (req, res, next) => {
    const error = new Error("Path Not Found: " + req.originalUrl);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
const errorHandle = (err, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode);
    console.log(err);
    res.send({
        statusCode: statusCode,
        error: err === null || err === void 0 ? void 0 : err.message,
    });
};
exports.errorHandle = errorHandle;
