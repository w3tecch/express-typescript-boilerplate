import { getMetadataArgsStorage } from './index';

export function Query(): any {
    return (object: () => void) => {
        getMetadataArgsStorage().queries.push({
            name: object.name,
            target: object,
        });
    };
}
