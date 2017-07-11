export const isWindows = (): boolean => /^win/.test(process.platform);

export const getFolderWrapping = (input: string): string => isWindows() ? `\\${input}\\` : `/${input}/`;
