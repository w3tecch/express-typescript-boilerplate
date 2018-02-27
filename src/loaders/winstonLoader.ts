import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import * as winston from 'winston';

import { env } from '../env';

export const winstonLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    winston.configure({
        transports: [
            new winston.transports.Console({
                level: env.log.level,
                handleExceptions: true,
                json: env.log.json,
                timestamp: env.node !== 'development',
                colorize: env.node === 'development',
            }),
        ],
    });
};
