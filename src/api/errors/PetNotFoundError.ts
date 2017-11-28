import { HttpError } from 'routing-controllers';

export class PetNotFoundError extends HttpError {
    constructor() {
        super(404, 'Pet not found!');
    }
}
