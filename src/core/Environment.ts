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

}
