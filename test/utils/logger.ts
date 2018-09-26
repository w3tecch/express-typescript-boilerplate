import { configure, transports } from 'winston';

export const configureLogger = () => {
    configure({
        transports: [
            new transports.Console({
                level: 'none',
                handleExceptions: false,
            }),
        ],
    });
};
