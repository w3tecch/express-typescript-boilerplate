/**
 * Times repeats a function n times
 * @param n amount of loops
 * @param iteratee this function gets n-times called
 */
export const times = async <TResult>(n: number, iteratee: (index: number) => Promise<TResult>): Promise<TResult[]> => {
    const rs = [] as TResult[];
    for (let i = 0; i < n; i++) {
        const r = await iteratee(i);
        rs.push(r);
    }
    return rs;
};
