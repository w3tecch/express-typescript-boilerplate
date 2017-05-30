/**
 * IOC - CONTAINER
 * ----------------------------------------
 *
 * Bind every controller and service to the ioc container. All controllers
 * will then be bonded to the express structure with their defined routes.
 */

import { interfaces } from 'inversify-express-utils';
import { Container } from 'inversify';
import { Types } from './constants/Types';
import { Controller, Service, Repository } from './constants/Targets';

/**
 * User Resource
 */
import { UserController } from './api/controllers/UserController';
import { UserService } from './api/services/UsersService';
import { UserRepository } from './api/repositories/UserRepository';

const container = new Container();

/**
 * Controllers
 */
container.bind<interfaces.Controller>(Types.Controller).to(UserController).whenTargetNamed(Controller.UserController);

/**
 * Services
 */
container.bind<UserService>(Types.Service).to(UserService).whenTargetNamed(Service.UserService);

/**
 * Repositories
 */
container.bind<UserRepository>(Types.Repository).toConstantValue(UserRepository).whenTargetNamed(Repository.UserRepository);


export default container;
