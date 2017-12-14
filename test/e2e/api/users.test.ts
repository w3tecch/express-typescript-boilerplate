import * as nock from 'nock';
import * as request from 'supertest';
import { CreateBruce } from './../../../src/database/seeds/CreateBruce';
import { getFactory } from './../../../src/lib/seeds/index';
import { Factory } from './../../../src/lib/seeds/Factory';
import { User } from './../../../src/api/models/User';
import { bootstrapApp, BootstrapSettings } from '../utils/bootstrap';
import { migrateDatabase, closeDatabase } from '../../utils/database';
import { fakeAuthenticationForUser } from '../utils/auth';


describe('/api/users', () => {

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    let settings: BootstrapSettings;
    let factory: Factory;
    let bruce: User;
    let authServer: nock.Scope;
    beforeAll(async () => settings = await bootstrapApp());
    beforeAll(async () => migrateDatabase(settings.connection));
    beforeAll(async () => factory = getFactory(settings.connection));
    beforeAll(async () => bruce = await factory.runSeed<User>(CreateBruce));
    beforeAll(async () => authServer = fakeAuthenticationForUser(bruce, true));

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(() => nock.cleanAll());
    afterAll(async () => closeDatabase(settings.connection));

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('GET: / should return a list of users', async (done) => {
        const response = await request(settings.app)
            .get('/api/users')
            .set('Authorization', `Bearer 1234`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBe(1);
        done();
    });

    test('GET: /:id should return bruce', async (done) => {
        const response = await request(settings.app)
            .get(`/api/users/${bruce.id}`)
            .set('Authorization', `Bearer 1234`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.id).toBe(bruce.id);
        expect(response.body.firstName).toBe(bruce.firstName);
        expect(response.body.lastName).toBe(bruce.lastName);
        expect(response.body.email).toBe(bruce.email);
        done();
    });

});
