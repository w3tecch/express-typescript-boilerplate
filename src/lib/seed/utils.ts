/**
 * Returns the name of a class
 */
export const getNameOfClass = (c: any): string => new c().constructor.name;

/**
 * Checks if the given argument is a promise
 */
export const isPromiseLike = (o: any): boolean => !!o && (typeof o === 'object' || typeof o === 'function') && typeof o.then === 'function';

/**
 * Times repeats a function n times
 */
export const times = async <TResult>(n: number, iteratee: (index: number) => Promise<TResult>): Promise<TResult[]> => {
    const rs = [] as TResult[];
    for (let i = 0; i < n; i++) {
        const r = await iteratee(i);
        rs.push(r);
    }
    return rs;
};
