import { IsString, IsNumber } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { Pet } from '../../models/Pet';

export class PetDto {

    @IsString()
    @JSONSchema({
        description: 'Pet id',
    })
    public id: string;

    @IsString()
    @JSONSchema({
        description: 'Pet name',
    })
    public name: string;

    @IsNumber()
    @JSONSchema({
        description: 'Pet age',
    })
    public age: number;

    @IsNumber()
    @JSONSchema({
        description: 'Pet owner id',
    })
    public userId: number;

    public async toEntity(): Promise<Pet> {
        const entity = new Pet();
        entity.id = this.id;
        entity.name = this.name;
        entity.age = this.age;
        entity.userId = this.userId;

        return entity;
    }
}
