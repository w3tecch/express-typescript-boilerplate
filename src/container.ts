/**
 * IOC - CONTAINER
 * ----------------------------------------
 *
 * Bind every controller and service to the ioc container. All controllers
 * will then be bonded to the express structure with their defined routes.
 */

import { Container } from 'inversify';
import { ioc } from './core/IoC';

ioc.configure((container: Container) => {


    return container;
});
