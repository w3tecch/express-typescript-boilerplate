import { Exception } from '../../core/api/Exception';


export class DatabaseException extends Exception {
    constructor(text: string, error: any) {
        let value: string = error.stack.split('\n')[0];
        super(400, text, [
            value.substring(7)
        ]);
    }
}
