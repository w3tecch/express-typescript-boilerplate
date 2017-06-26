/**
 * core.Environment
 * ------------------------------------
 *
 * Helps us to simplify 'process.env' and also provide
 * the content of the package.json.
 */
import * as packageInfo from '../../../package.json';


export class Environment {

    public static getNodeEnv(): string {
        return process.env.NODE_ENV || 'development';
    }

    public static isTest(): boolean {
        return this.getNodeEnv() === 'test';
    }

    public static isDevelopment(): boolean {
        return this.getNodeEnv() === 'development';
    }

    public static isProduction(): boolean {
        return this.getNodeEnv() === 'production';
    }

    public static getPkg(): any {
        return packageInfo;
    }

    public static isTruthy(bool: string): boolean {
        try {
            return bool.toLowerCase() === 'true';
        } catch (e) {
            return false;
        }
    }

}
