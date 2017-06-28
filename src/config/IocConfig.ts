/**
 * IOC - CONTAINER
 * ----------------------------------------
 *
 * Bind every controller and service to the ioc container. All controllers
 * will then be bonded to the express structure with their defined routes.
 */

import { Container, decorate, injectable } from 'inversify';
import { IoC } from '../core/IoC';
import { Types } from '../constants';

import * as request from 'request';


export class IocConfig {
    public configure(ioc: IoC): void {
        /**
         * Here you can bind all your third-party libraries like
         * request, lodash and so on. Those will be bound before
         * everything else.
         */
        ioc.configureLib((container: Container) => {

            decorate(injectable(), request);

            container
                .bind<any>(Types.Lib)
                .toConstantValue(request)
                .whenTargetNamed('request');

            return container;
        });

        /**
         * Bind custom classes here. This will be bound at the end
         */
        ioc.configure((container: Container) => {

            // Add your custom class here

            return container;
        });
    }
}


