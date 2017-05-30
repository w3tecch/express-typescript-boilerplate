/**
 * core.api.RequestBody
 * ------------------------------------------------
 *
 * This class is used to verify a valid payload an prepare
 * it for further actions in the services. To validate we
 * use the module 'class-validator'.
 *
 * If you want to skip missing properties just override the
 * validate method in your extended request class.
 */

import { validate } from 'class-validator';
import { ValidationException } from '../../api/exceptions/ValidationException';


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
    public async validate(skipMissingProperties: boolean = false): Promise<void> {
        const errors = await validate(this, { skipMissingProperties: skipMissingProperties });
        if (errors && errors.length > 0) {
            throw new ValidationException('Request body is not valid', errors);
        }
        return;
    }

    // TODO check if needed
    // /**
    //  * Returns a new body object
    //  */
    // public toJSON(): any {
    //     const json = {};
    //     const keys = Object.keys(this);
    //     keys.forEach((key) => {
    //         if (this[key] !== undefined) {
    //             json[key] = this[key];
    //         }
    //     });
    //     return json;
    // }

    // /**
    //  * Sets the values direct into the body object
    //  */
    // protected set(key: string, value: any): void {
    //     this[key] = value;
    // }

    // /**
    //  * Updates the property only if the the value is given
    //  */
    // protected update(key: string, value: any): void {
    //     if (value !== undefined) {
    //         this[key] = value;
    //     }
    // }

}
