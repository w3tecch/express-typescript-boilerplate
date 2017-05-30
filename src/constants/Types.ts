/**
 * constants.Types
 * ------------------------------------------------
 *
 * We extend the TYPE variable of the 'inversify-express-utils'
 * module with our service and repositories.
 */

import { TYPE } from 'inversify-express-utils';


const myType = {
    // UserService: Symbol('UserService'),
    // UserRepository: Symbol('UserRepository'),
    Service: Symbol('Service'),
    Repository: Symbol('Repository')
};

export const Types = Object.assign(TYPE, myType);
