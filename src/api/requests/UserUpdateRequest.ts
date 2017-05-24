import { IsEmail, IsNotEmpty } from 'class-validator';
import { RequestBody } from '../../core/api/RequestBody';

/**
 * This class is used for update request. Create a new instance
 * with the json body and than call .validate() to check if
 * all criteria are given
 *
 * @export
 * @class UserUpdateRequest
 * @extends {RequestBody}
 */
export class UserUpdateRequest extends RequestBody {

    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    picture: string;

    auth0UserId: string;

    setFirstName(value: string): void {
        this.update('firstName', value);
    }

    setLastName(value: string): void {
        this.update('lastName', value);
    }

    setEmail(value: string): void {
        this.update('email', value);
    }

}

