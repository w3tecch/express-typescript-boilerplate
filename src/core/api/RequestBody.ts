import { validate } from 'class-validator';
import { ValidationException } from '../../api/exceptions/ValidationException';


export class RequestBody {

    constructor(input?: any) {
        if (input) {
            const keys = Object.keys(input);
            keys.forEach((key) => {
                this[key] = input[key];
            });
        }
    }

    public async validate(): Promise<void> {
        let errors = await validate(this);
        if (errors && errors.length > 0) {
            throw new ValidationException('Request body is not valid', errors);
        }
        return;
    }

    public toJSON(): any {
        let json = {};
        const keys = Object.keys(this);
        keys.forEach((key) => {
            if (this[key] !== undefined) {
                json[key] = this[key];
            }
        });
        return json;
    }

    protected set(key: string, value: any): void {
        this[key] = value;
    }

    protected update(key: string, value: any): void {
        if (value !== undefined) {
            this[key] = value;
        }
    }

}
