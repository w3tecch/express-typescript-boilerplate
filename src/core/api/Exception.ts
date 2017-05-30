/**
 * core.api.Exception
 * ------------------------------------------------
 *
 * We use this extend error for our custom errors, which we
 * call exceptions. They have a code property for the http-status,
 * global message and a body, which we will return as a json.
 */

export const isException = Symbol();

export class Exception extends Error {

    public code = 500;
    public body;

    constructor(code: number, ...args: any[]) {
        super(args[0]);
        this.code = code;
        this.name = this.constructor.name;
        this.message = args[0] || 'Unknown error';
        this.body = args[1] || null;
        this[isException] = true;
        Error.captureStackTrace(this);
    }

    public toString(): string {
        return `${this.code} - ${this.constructor.name}:${this.message}`;
    }
}
