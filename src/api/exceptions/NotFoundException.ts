import * as core from '../../core';


export class NotFoundException extends core.Exception {
    constructor(id?: number | string) {
        super(404, `Entity with identifier ${id} does not exist`);
    }
}
