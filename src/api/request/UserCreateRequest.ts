import { IsEmail, IsNotEmpty } from 'class-validator';
import { RequestBody } from '../../core/api/RequestBody';


export class UserCreateRequest extends RequestBody {

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

}

