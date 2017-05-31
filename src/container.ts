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
import { Core, Model, Controller, Service, Repository } from './constants/Targets';

/**
 * Core Features
 */
import { events, EventEmitter } from './core/api/events';
import { Log } from './core/log';
import { ioc } from './core/IoC';

/**
 * User Resource
 */
import { UserController } from './api/controllers/UserController';
import { UserService } from './api/services/UsersService';
import { UserRepository } from './api/repositories/UserRepository';
import { User } from './api/models/User';

ioc.configure((container: Container) => {
    console.log('--> CONTAINER should be last');

    /**
     * Core
     */
    container.bind<EventEmitter>(Types.Core).toConstantValue(events).whenTargetNamed(Core.Events);
    container.bind<typeof Log>(Types.Core).toConstantValue(Log).whenTargetNamed(Core.Log);

    /**
     * Model
     */
    container.bind<any>(Types.Model).toConstantValue(User).whenTargetNamed(Model.User);

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
    container.bind<UserRepository>(Types.Repository).to(UserRepository).whenTargetNamed(Repository.UserRepository);

    return container;
});
