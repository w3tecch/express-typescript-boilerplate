export interface Identifiable {
    id?: number | number;
}

export function ensureInputOrder<T extends Identifiable>(ids: number[] | string[], result: T[], key: string): T[] {
    // For the dataloader batching to work, the results must be in the same order and of the
    // same length as the ids. See: https://github.com/facebook/dataloader#batch-function
    const orderedResult: T[] = [];
    for (const id of ids) {
        const item = result.find(t => t[key] === id);
        if (item) {
            orderedResult.push(item);
        } else {
            /* tslint:disable */
            // @ts-ignore
            orderedResult.push(null);
            /* tslint:enable */
        }
    }
    return orderedResult;
}
