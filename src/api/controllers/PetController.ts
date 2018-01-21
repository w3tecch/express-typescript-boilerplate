import { JsonController, Get, Post, Put, Param, Delete, Body, OnUndefined, Authorized } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { PetService } from '../services/PetService';
import { PetNotFoundError } from '../errors/PetNotFoundError';
import { PetDto as ReqPetDto } from './requests/PetDto';
import { PetDto as ResPetDto } from './responses/PetDto';


@Authorized()
@JsonController('/pets')
export class PetController {

    constructor(
        private petService: PetService
    ) { }

    @Get()
    @OpenAPI({
        description: 'Find all pets',
    })
    public async find(): Promise<ResPetDto[]> {
        const entities = await this.petService.find();
        const dtos = entities.map((entity) => ResPetDto.fromEntity(entity) as Promise<ResPetDto>);
        return Promise.all(dtos);
    }

    @Get('/:id')
    @OnUndefined(PetNotFoundError)
    @OpenAPI({
        description: 'Find one pet',
        parameters: [{
            name: 'id',
            in: 'path',
            description: 'Pet id to find',
        }],
    })
    public async one( @Param('id') id: string): Promise<ResPetDto | undefined> {
        const entity = await this.petService.findOne(id);
        return ResPetDto.fromEntity(entity);
    }

    @Post()
    @OpenAPI({
        description: 'Create one pet',
    })
    public async create( @Body() dto: ReqPetDto): Promise<ResPetDto | undefined> {
        const entity = await this.petService.create(await dto.toEntity());
        return ResPetDto.fromEntity(entity);
    }

    @Put('/:id')
    @OpenAPI({
        description: 'Update one pet',
        parameters: [{
            name: 'id',
            in: 'path',
            description: 'Pet id to update',
        }],
    })
    public async update( @Param('id') id: string, @Body() dto: ReqPetDto): Promise<ResPetDto | undefined> {
        const entity = await this.petService.update(id, await dto.toEntity());
        return ResPetDto.fromEntity(entity);
    }

    @Delete('/:id')
    @OpenAPI({
        description: 'Delete one pet',
        parameters: [{
            name: 'id',
            in: 'path',
            description: 'Pet id to delete',
        }],
    })
    public async delete( @Param('id') id: string): Promise<void> {
        return this.petService.delete(id);
    }

}
