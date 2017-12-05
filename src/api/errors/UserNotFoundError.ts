import { HttpError } from 'routing-controllers';

export class UserNotFoundError extends HttpError {
    constructor() {
        super(404, 'User not found!');
    }
}
