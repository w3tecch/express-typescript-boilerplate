import { Container } from 'typedi';
import { createConnection, useContainer, Connection } from 'typeorm';

import { Pet } from '../../src/api/models/Pet';
import { PetService } from './../../src/api/services/PetService';
import { createDatabaseConnection, synchronizeDatabase, closeDatabase } from './utils/database';

describe('PetService', () => {

    let connection: Connection;
    beforeAll(async () => connection = await createDatabaseConnection());
    beforeEach(() => synchronizeDatabase(connection));
    afterAll(() => closeDatabase(connection));

    test('should create a new pet in the database', async (done) => {
        const pet = new Pet();
        pet.name = 'test';
        pet.age = 1;
        const service = Container.get<PetService>(PetService);
        const resultCreate = await service.create(pet);
        expect(resultCreate.name).toBe(pet.name);
        expect(resultCreate.age).toBe(pet.age);

        const resultFind = await service.findOne(resultCreate.id);
        expect(resultFind.name).toBe(pet.name);
        expect(resultFind.age).toBe(pet.age);
        done();
    });

});
