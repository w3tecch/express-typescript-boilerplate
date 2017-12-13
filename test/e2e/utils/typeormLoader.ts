import { createDatabaseConnection } from './../../utils/database';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework-w3tec';


export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    const connection = await createDatabaseConnection();
    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
};
