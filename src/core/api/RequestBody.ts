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

import 'reflect-metadata';
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
        const errors = await validate(this, { skipMissingProperties });
        if (errors && errors.length > 0) {
            throw new ValidationException('Request body is not valid', errors);
        }
        return;
    }

}
