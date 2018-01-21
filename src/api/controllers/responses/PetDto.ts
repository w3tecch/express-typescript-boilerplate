import { PetDto as ReqPetDto } from '../requests/PetDto';
import { Pet } from '../../models/Pet';

export class PetDto extends ReqPetDto {

    public static async fromEntity(entity?: Pet): Promise<PetDto | undefined> {
        let dto: PetDto | undefined = undefined;

        if (entity) {
            dto = new PetDto();
            dto.id = entity.id;
            dto.name = entity.name;
            dto.age = entity.age;
            dto.userId = entity.userId;
        }

        return dto;
    }
}
