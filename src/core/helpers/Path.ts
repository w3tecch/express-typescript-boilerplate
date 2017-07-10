export const isWindows = (): boolean => /^win/.test(process.platform);
export const getFolderwrapping = (input: string): string => isWindows() ? `\\${input}\\` : `/${input}/`;
