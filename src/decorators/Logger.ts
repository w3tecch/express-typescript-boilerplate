import { Container } from 'typedi';
import { Logger as WinstonLogger } from '../core/Logger';


export function Logger(scope: string): any {
    return (object: any, propertyName: string, index?: number): any => {
        const logger = new WinstonLogger(scope);
        Container.registerHandler({ object, propertyName, index, value: () => logger });
    };
}

export { LoggerInterface } from '../core/LoggerInterface';
