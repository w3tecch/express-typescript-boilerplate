import { Exception } from '../../core/api/Exception';


export class NotFoundException extends Exception {
    constructor(id?: number | string) {
        super(404, `Entity with identifier ${id} does not exist`);
    }
}
