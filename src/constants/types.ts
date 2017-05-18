import { TYPE } from 'inversify-express-utils';


const myType = {
    UserService: Symbol('UserService'),
    UserRepository: Symbol('UserRepository')
};

export const Types = Object.assign(TYPE, myType);
