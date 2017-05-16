import * as winston from 'winston';

import * as core from '../index';
import { ILogAdapter } from './ILogAdapter';


export class WinstonAdapter implements ILogAdapter {

    private logger: winston.LoggerInstance;

    constructor(private scope: string) {
        this.logger = new winston.Logger({
            transports: [
                new winston.transports.Console({
                    level: core.Environment.get<string>('LOG_LEVEL'),
                    timestamp: core.Environment.isProduction(),
                    handleExceptions: core.Environment.isProduction(),
                    json: core.Environment.isProduction(),
                    colorize: !core.Environment.isProduction()
                })
            ],
            exitOnError: false
        });
    }

    public debug(message: string, ...args: any[]): void {
        this.logger.debug(`${this.formatScope()} ${message}`, this.parseArgs(args));
    }

    public info(message: string, ...args: any[]): void {
        this.logger.info(`${this.formatScope()} ${message}`, this.parseArgs(args));
    }

    public warn(message: string, ...args: any[]): void {
        this.logger.warn(`${this.formatScope()} ${message}`, this.parseArgs(args));
    }

    public error(message: string, ...args: any[]): void {
        this.logger.error(`${this.formatScope()} ${message}`, this.parseArgs(args));
    }

    private parseArgs(args: any[]): any {
        return (args && args[0] && args[0].length > 0) ? args : '';
    }

    private formatScope(): string {
        return `[${this.scope}]`;
    }

}
