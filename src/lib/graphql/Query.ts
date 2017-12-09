import { getMetadataArgsStorage } from './index';


export function Query(): any {
    return (object: () => void) => {
        getMetadataArgsStorage().queries.push({
            target: object,
        });
    };
}
