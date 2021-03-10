"use strict";
/*
    this file creates a logger using winston library,
    to handle asynchronous console/file logs
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const logger = winston_1.createLogger({
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
        })
    ]
});
exports.logger = logger;
