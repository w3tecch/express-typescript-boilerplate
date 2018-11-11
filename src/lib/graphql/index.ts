import DataLoader from 'dataloader';
import { ObjectType } from 'typedi';
import { getCustomRepository, getRepository, Repository } from 'typeorm';

// -------------------------------------------------------------------------
// Main exports
// -------------------------------------------------------------------------

export * from './graphql-error-handling';

// -------------------------------------------------------------------------
// Main Functions
// -------------------------------------------------------------------------

export interface CreateDataLoaderOptions {
    method?: string;
    key?: string;
    multiple?: boolean;
}

/**
 * Creates a new dataloader with the typorm repository
 */
export function createDataLoader<T>(obj: ObjectType<T>, options: CreateDataLoaderOptions = {}): DataLoader<any, any> {
    let repository;
    try {
        repository = getCustomRepository<Repository<any>>(obj);
    } catch (errorRepo) {
        try {
            repository = getRepository(obj);
        } catch (errorModel) {
            throw new Error('Could not create a dataloader, because obj is nether model or repository!');
        }
    }

    return new DataLoader(async (ids: number[]) => {
        let items = [];
        if (options.method) {
            items = await repository[options.method](ids);
        } else {
            items = await repository.findByIds(ids);
        }

        const handleBatch = (arr: any[]) => options.multiple === true ? arr : arr[0];
        return ids.map(id => handleBatch(items.filter(item => item[options.key || 'id'] === id)));
    });
}
