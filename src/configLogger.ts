/*
    this file creates a logger using winston library,
    to handle asynchronous console/file logs
*/

import { createLogger, format, transports } from "winston"

const logger = createLogger({
    format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        })
    ]
});

export { logger };
