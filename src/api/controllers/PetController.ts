import { JsonController, Get, Post, Put, Param, Delete, Body, OnUndefined, Authorized } from 'routing-controllers';
import { PetService } from '../services/PetService';
import { Pet } from '../models/Pet';
import { PetNotFoundError } from '../errors/PetNotFoundError';


@Authorized()
@JsonController('/pets')
export class PetController {

    constructor(
        private petService: PetService
    ) { }

    @Get()
    public find(): Promise<Pet[]> {
        return this.petService.find();
    }

    @Get('/:id')
    @OnUndefined(PetNotFoundError)
    public one( @Param('id') id: string): Promise<Pet | undefined> {
        return this.petService.findOne(id);
    }

    @Post()
    public create( @Body() pet: Pet): Promise<Pet> {
        return this.petService.create(pet);
    }

    @Put('/:id')
    public update( @Param('id') id: string, @Body() pet: Pet): Promise<Pet> {
        return this.petService.update(id, pet);
    }

    @Delete('/:id')
    public delete( @Param('id') id: string): Promise<void> {
        return this.petService.delete(id);
    }

}
