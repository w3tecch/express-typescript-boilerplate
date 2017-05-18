import { validate } from 'class-validator';
import { ValidationException } from '../../api/exceptions/ValidationException';

/**
 * RequestBody
 * --------------------------
 * This Class is used to verify a valid payload an prepare
 * it for further actions in the repository
 *
 * @export
 * @class RequestBody
 */
export class RequestBody {

    /**
     * Creates an instance of RequestBody and if a input is given
     * we store the values into the correct property
     */
    constructor(input?: any) {
        if (input) {
            const keys = Object.keys(input);
            keys.forEach((key) => {
                this[key] = input[key];
            });
        }
    }

    /**
     * Validates the body on the basis of the validator-annotations
     */
    public async validate(): Promise<void> {
        let errors = await validate(this);
        if (errors && errors.length > 0) {
            throw new ValidationException('Request body is not valid', errors);
        }
        return;
    }

    /**
     * Returns a new body object
     */
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

    /**
     * Sets the values direct into the body object
     */
    protected set(key: string, value: any): void {
        this[key] = value;
    }

    /**
     * Updates the property only if the the value is given
     */
    protected update(key: string, value: any): void {
        if (value !== undefined) {
            this[key] = value;
        }
    }

}
