/**
 * constants.Types
 * ------------------------------------------------
 *
 * We extend the TYPE variable of the 'inversify-express-utils'
 * module with our service and repositories.
 */

import { TYPE } from 'inversify-express-utils';

export const Types = {
    ...TYPE,
    Lib: Symbol('Lib'),
    Core: Symbol('Core'),
    Model: Symbol('Model'),
    Service: Symbol('Service'),
    Listener: Symbol('Listener'),
    Repository: Symbol('Repository'),
    Middleware: Symbol('Middleware')
};
