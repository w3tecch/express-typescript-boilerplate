import { interfaces, TYPE } from 'inversify-express-utils';
import { Container } from 'inversify';
import TYPES from './constants/types';
import TAGS from './constants/tags';
import { HomeController } from './api/controllers/HomeController';
import { UserController } from './api/controllers';
import { UserService } from './api/services';
import { UserRepository } from './api/repositories';


/**
 * IOC - CONTAINER
 * ----------------------------------------
 * Bind every controller and service to the ioc container. All controllers
 * will then be bonded to the express structure with their defined routes.
 */
let container = new Container();

container.bind<interfaces.Controller>(TYPE.Controller).to(HomeController).whenTargetNamed(TAGS.HomeController);
container.bind<interfaces.Controller>(TYPE.Controller).to(UserController).whenTargetNamed(TAGS.UserController);

container.bind<UserService>(TYPES.UserService).to(UserService);

container.bind<UserRepository>(TYPES.UserRepository).toConstantValue(UserRepository).whenTargetNamed(TAGS.UserRepository);


export default container;
