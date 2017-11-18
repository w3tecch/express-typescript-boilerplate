import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';
import * as winston from 'winston';


export const winstonLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    winston.configure({
        transports: [
            new winston.transports.Console({
                level: process.env.LOG_LEVEL,
                timestamp: true,
                handleExceptions: true,
                json: true,
                colorize: true
            })
        ]
    });


    // btw we can retrieve express app instance here to make some winston-specific manipulations on it
    // if (settings) {
    //     const expressApp = settings.getData('express_app');
    // }
};
