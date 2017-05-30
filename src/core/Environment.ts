/**
 * core.Environment
 * ------------------------------------
 *
 * Helps us to simplify 'process.env' and also provide
 * the content of the package.json.
 */

export class Environment {

    static getNodeEnv(): string {
        return process.env.NODE_ENV || 'development';
    }

    static isTest(): boolean {
        return this.getNodeEnv() === 'test';
    }

    static isDevelopment(): boolean {
        return this.getNodeEnv() === 'development';
    }

    static isProduction(): boolean {
        return this.getNodeEnv() === 'production';
    }

    static get<T>(key: string): T {
        return process.env[key];
    }

    static getPkg(): any {
        return require('../../package.json');
    }

}
