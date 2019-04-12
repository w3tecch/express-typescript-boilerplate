import * as nock from 'nock';
import request from 'supertest';
import { runSeed } from 'typeorm-seeding';

import { User } from '../../../src/api/models/User';
import { CreateBruce } from '../../../src/database/seeds/CreateBruce';
import { CreatePets } from '../../../src/database/seeds/CreatePets';
import { closeDatabase } from '../../utils/database';
import { BootstrapSettings } from '../utils/bootstrap';
import { prepareServer } from '../utils/server';
import { Pet } from 'src/api/models/Pet';

describe('/api/pets', () => {

    let bruce: User;
    let bruceAuthorization: string;
    let settings: BootstrapSettings;
    let pets: Pet[];

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    beforeAll(async () => {
        settings = await prepareServer({ migrate: true });
        bruce = await runSeed<User>(CreateBruce);
        bruceAuthorization = Buffer.from(`${bruce.username}:1234`).toString('base64');
        pets = await runSeed<Pet[]>(CreatePets);
    });

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(async () => {
        nock.cleanAll();
        await closeDatabase(settings.connection);
    });

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('GET: / should return a list of pets', async (done) => {
        const response = await request(settings.app)
            .get('/api/pets')
            .set('Authorization', `Basic ${bruceAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.length).toBe(pets.length);
        done();
    });

    test('GET: /:id should return a pet', async (done) => {
        const pet = pets[0];

        const response = await request(settings.app)
            .get(`/api/pets/${pet.id}`)
            .set('Authorization', `Basic ${bruceAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.id).toBe(pet.id);
        expect(response.body.name).toBe(pet.name);
        expect(response.body.age).toBe(pet.age);
        done();
    });

    test('POST: / should create a pet', async (done) => {
        const pet = {
            name: 'Fido',
            age: '2'
        };

        const response = await request(settings.app)
            .post(`/api/pets`)
            .send(pet)
            .set('Authorization', `Basic ${bruceAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe(pet.name);
        expect(response.body.age).toBe(pet.age);
        done();
    });

});
