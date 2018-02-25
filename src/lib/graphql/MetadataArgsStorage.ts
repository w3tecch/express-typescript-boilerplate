import { MutationMetadataArgs } from './MutationMetadataArgs';
import { QueryMetadataArgs } from './QueryMetadataArgs';

/**
 * Storage all metadatas read from decorators.
 */
export class MetadataArgsStorage {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    /**
     * Registered controller metadata args.
     */
    public queries: QueryMetadataArgs[] = [];

    /**
     * Registered middleware metadata args.
     */
    public mutations: MutationMetadataArgs[] = [];

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Filters registered queries by a given classes.
     */
    public filterQueryMetadatasForClasses(classes: Array<() => void>): MutationMetadataArgs[] {
        return this.queries.filter(ctrl => {
            return classes.filter(cls => ctrl.target === cls).length > 0;
        });
    }
    /**
     * Filters registered mutations by a given classes.
     */
    public filterMutationMetadatasForClasses(classes: Array<() => void>): MutationMetadataArgs[] {
        return this.mutations.filter(ctrl => {
            return classes.filter(cls => ctrl.target === cls).length > 0;
        });
    }

    /**
     * Removes all saved metadata.
     */
    public reset(): void {
        this.queries = [];
        this.mutations = [];
    }

}
