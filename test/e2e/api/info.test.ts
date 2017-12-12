import { Application } from 'express';
import * as request from 'supertest';
import { bootstrapApp, BootstrapSettings } from '../utils/bootstrap';
import { env } from '../../../src/core/env';
import { synchronizeDatabase } from '../../integration/utils/database';

describe('/api', () => {

    let settings: BootstrapSettings;
    beforeAll(async () => settings = await bootstrapApp());
    beforeAll(async () => synchronizeDatabase(settings.connection));

    test('GET: / should return the api-version', async (done) => {
        const response = await request(settings.app)
            .get('/api')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.version).toBe(env.app.version);
        done();
    });

});
