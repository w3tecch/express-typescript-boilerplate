export const isException = Symbol();

export class Exception extends Error {

    public code = 500;
    public body;

    constructor(code: number, ...args: any[]) {
        super(args[0]);
        this.code = code;
        this.name = this.constructor.name;
        this.message = args[0];
        this.body = args[1];
        this[isException] = true;
        Error.captureStackTrace(this);
    }

    public toString(): string {
        return `${this.code} - ${this.constructor.name}:${this.message}`;
    }
}
