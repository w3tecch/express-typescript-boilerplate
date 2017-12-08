import { FactoryInterface } from './FactoryInterface';
/**
 * Seeds should implement this interface and all its methods.
 */
export interface SeedsInterface {
    /**
     * Seed data into the databas.
     */
    seed(factory: FactoryInterface): Promise<any>;
}
