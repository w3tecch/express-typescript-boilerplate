import { Container } from 'typedi';
import { useContainer as ormUseContainer } from 'typeorm';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';


export const iocLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {

    /**
     * Setup routing-controllers to use typedi container.
     */
    routingUseContainer(Container);
    ormUseContainer(Container);

};
