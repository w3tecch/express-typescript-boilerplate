import { interfaces } from 'inversify-express-utils';
import { Container } from 'inversify';
import { Types } from './constants/Types';
import { Controller, Repository } from './constants/Targets';

// Home
import { HomeController } from './api/controllers/HomeController';

// User Resource
import { UserController } from './api/controllers/UserController';
import { UserService } from './api/services/UsersService';
import { UserRepository } from './api/repositories/UserRepository';


/**
 * IOC - CONTAINER
 * ----------------------------------------
 * Bind every controller and service to the ioc container. All controllers
 * will then be bonded to the express structure with their defined routes.
 */
const container = new Container();

// Controllers
container.bind<interfaces.Controller>(Types.Controller).to(HomeController).whenTargetNamed(Controller.HomeController);
container.bind<interfaces.Controller>(Types.Controller).to(UserController).whenTargetNamed(Controller.UserController);

// Services
container.bind<UserService>(Types.UserService).to(UserService);

// Repositories
container.bind<UserRepository>(Types.UserRepository).toConstantValue(UserRepository).whenTargetNamed(Repository.UserRepository);


export default container;
