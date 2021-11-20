import { Constructable, Container } from 'typedi';

import { Logger as WinstonLogger } from '../lib/logger';

export function Logger(scope: string): ParameterDecorator {
    return (object, propertyKey, index): any => {
        const logger = new WinstonLogger(scope);
        const propertyName = propertyKey ? propertyKey.toString() : '';
        const castedObject: Constructable<object> = object as any;
        Container.registerHandler({ object: castedObject, propertyName, index, value: () => logger });
    };
}

export { LoggerInterface } from '../lib/logger';
