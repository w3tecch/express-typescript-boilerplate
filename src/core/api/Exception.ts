export class Exception extends Error {

    public code = 500;

    constructor(code: number, ...args: any[]) {
        super(args[0]);
        this.code = code;
        this.name = this.constructor.name;
        this.message = args[0];
        Error.captureStackTrace(this);
    }

    public toString(): string {
        return `${this.code} - ${this.constructor.name}:${this.message}`;
    }
}
