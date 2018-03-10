// -------------------------------------------------------------------------
// Util functions
// -------------------------------------------------------------------------

export const getNameOfClass = (c: any): string => new c().constructor.name;

export const isPromiseLike = (o: any): boolean => !!o && (typeof o === 'object' || typeof o === 'function') && typeof o.then === 'function';
