import { Factory } from './Factory';
/**
 * Seeds should implement this interface and all its methods.
 */
export interface SeedsInterface {
    /**
     * Seed data into the databas.
     */
    seed(factory: Factory): Promise<any>;
}

export interface SeedsConstructorInterface {
    new(): SeedsInterface;
}
