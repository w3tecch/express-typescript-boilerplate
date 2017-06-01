/**
 * IOC - CONTAINER
 * ----------------------------------------
 *
 * Bind every controller and service to the ioc container. All controllers
 * will then be bonded to the express structure with their defined routes.
 */

import { Container, decorate, injectable } from 'inversify';
import { ioc } from './core/IoC';
import { Types } from './constants/Types';
import { Lib } from './constants/Targets';

import * as request from 'request';


ioc.configureLib((container: Container) => {

    decorate(injectable(), request);

    container
        .bind<any>(Types.Lib)
        .toConstantValue(request)
        .whenTargetNamed(Lib.Request);

    return container;
});


ioc.configure((container: Container) => {


    return container;
});
