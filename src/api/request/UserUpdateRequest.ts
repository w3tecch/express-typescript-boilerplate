import { IsEmail, IsNotEmpty } from 'class-validator';
import { RequestBody } from '../../core/api/RequestBody';


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

