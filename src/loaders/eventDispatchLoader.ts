import * as path from 'path';
import * as glob from 'glob';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';


/**
 * eventDispatchLoader
 * ------------------------------
 * This loads all the created subscribers into the project, so we do not have to
 * import them manually
 */
export const eventDispatchLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const filePath = path.join(__dirname, '..', 'api/**/*Subscriber{.js,.ts}');
        glob(filePath, (err: any, files: string[]) => {
            for (const file of files) {
                require(file);
            }
        });
    }
};
