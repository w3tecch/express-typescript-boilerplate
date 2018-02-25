import { Logger } from '../../../src/lib/logger';

export class LogMock extends Logger {

    public debugMock = jest.fn();
    public infoMock = jest.fn();
    public warnMock = jest.fn();
    public errorMock = jest.fn();

    public debug(message: string, ...args: any[]): void {
        this.debugMock(message, args);
    }

    public info(message: string, ...args: any[]): void {
        this.infoMock(message, args);
    }

    public warn(message: string, ...args: any[]): void {
        this.warnMock(message, args);
    }

    public error(message: string, ...args: any[]): void {
        this.errorMock(message, args);
    }

}
