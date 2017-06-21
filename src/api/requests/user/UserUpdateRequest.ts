import { IsEmail, IsNotEmpty } from 'class-validator';
import { RequestBody } from '../../../core/api/RequestBody';

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
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsEmail()
    public email: string;

    @IsNotEmpty()
    public picture: string;

    @IsNotEmpty()
    public auth0UserId: string;

    /**
     * We override the validate method so we can skip the missing
     * properties.
     */
    public validate(): Promise<void> {
        return super.validate(true);
    }

}

