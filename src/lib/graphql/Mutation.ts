import { getMetadataArgsStorage } from './index';

export function Mutation(): any {
    return (object: () => void) => {
        getMetadataArgsStorage().mutations.push({
            name: object.name,
            target: object,
        });
    };
}
