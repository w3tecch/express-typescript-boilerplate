import { IsArray } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { UserDto as ReqUserDto } from '../requests/UserDto';
import { User } from '../../models/User';

export class UserDto extends ReqUserDto {

    public static async fromEntity(entity?: User): Promise<UserDto | undefined> {
        let dto: UserDto | undefined = undefined;

        if (entity) {
            dto = new UserDto();
            dto.id = entity.id;
            dto.firstName = entity.firstName;
            dto.email = entity.email;
            dto.petsId = (await entity.pets || []).map((pet) => pet.id);
        }

        return dto;
    }

    @IsArray()
    @JSONSchema({
        description: 'User pets id',
    })
    public petsId: string[];
}
