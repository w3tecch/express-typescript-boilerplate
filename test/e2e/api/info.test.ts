import { Application } from 'express';
import * as request from 'supertest';
import { bootstrapApp } from '../utils/app';

describe('/api', () => {

    let app: Application;
    beforeAll(async () => app = await bootstrapApp());

    test('GET: / should return the api-version', async (done) => {
        const response = await request(app)
            .get('/api')
            .expect('Content-Type', /json/)
            .expect(200);

        console.log(response);
        done();
    });

});
