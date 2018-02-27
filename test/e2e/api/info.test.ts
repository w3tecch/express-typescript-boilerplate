import * as request from 'supertest';

import { env } from '../../../src/env';
import { bootstrapApp, BootstrapSettings } from '../utils/bootstrap';

describe('/api', () => {

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    let settings: BootstrapSettings;
    beforeAll(async () => settings = await bootstrapApp());

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('GET: / should return the api-version', async (done) => {
        const response = await request(settings.app)
            .get('/api')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.version).toBe(env.app.version);
        done();
    });

});
