import { IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { User } from '../../models/User';

export class UserDto {

    @IsString()
    @JSONSchema({
        description: 'User id',
    })
    public id: string;

    @IsString()
    @JSONSchema({
        description: 'User first name',
    })
    public firstName: string;

    @IsString()
    @JSONSchema({
        description: 'User last name',
    })
    public lastName: string;

    @IsString()
    @JSONSchema({
        description: 'User email',
    })
    public email: string;

    public async toEntity(): Promise<User> {
        const entity = new User();
        entity.id = this.id;
        entity.firstName = this.firstName;
        entity.email = this.email;

        return entity;
    }

}
