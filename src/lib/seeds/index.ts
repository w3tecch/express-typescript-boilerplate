import 'reflect-metadata';
import { Connection } from 'typeorm';

import { Factory } from './Factory';

// -------------------------------------------------------------------------
// Handy Exports
// -------------------------------------------------------------------------

export * from './FactoryInterface';
export * from './EntityFactoryInterface';
export * from './SeedsInterface';
export * from './Factory';
export * from './utils';

// -------------------------------------------------------------------------
// Facade functions
// -------------------------------------------------------------------------

export const getFactory = (connection: Connection) => {
    const factory = Factory.getInstance();
    factory.setConnection(connection);
    return factory;
};
