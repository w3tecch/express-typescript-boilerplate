import { Exception } from '../../core/api/Exception';


export class ValidationException extends Exception {
    constructor(text: string, errors: any) {
        const info = errors.map((e) => ({
            property: e.property,
            constraints: e.constraints
        }));
        super(400, text, info);
    }
}
