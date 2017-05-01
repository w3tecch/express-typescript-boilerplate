const config = require('../config');


export class Environment {

    static getName(): string {
        return process.env.NODE_ENV || 'development';
    }

    static isTest(): boolean {
        return this.getName() === 'test';
    }

    static isDevelopment(): boolean {
        return this.getName() === 'development';
    }

    static isProduction(): boolean {
        return this.getName() === 'production';
    }

    static getConfig(): config.Configuration {
        return config[this.getName()];
    }

}
