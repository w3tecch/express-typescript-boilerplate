import { api } from './lib/api';
import { DatabaseResetCommand } from '../../src/console/DatabaseResetCommand';
import { createAdminUser, getToken } from './lib/auth';
import {LoggerConfig} from '../../src/config/LoggerConfig';

describe('/users', () => {

    const userKeys = ['id', 'firstName', 'lastName', 'email', 'picture', 'auth0UserId', 'updatedAt', 'createdAt'];

    const testData = {
        firstName: 'Hans',
        lastName: 'Muster',
        email: 'hans@gmail.com',
        auth0UserId: '1234'
    };

    const testDataUpdated = {
        firstName: 'Horst',
        lastName: 'Maier',
        email: 'horst@gmail.com'
    };

    let token;
    let auth;
    let createdId;
    beforeAll(async () => {
        new LoggerConfig().configure();
        const command = new DatabaseResetCommand();
        await command.run();
        await createAdminUser();
        token = getToken();
        auth = {
            token
        };
    });

    test('POST      /users        Should create a new user', async () => {
        const res = await api('POST', '/api/users', {
            token,
            body: testData
        });
        res.expectJson();
        res.expectStatusCode(201);
        res.expectData(userKeys);
        createdId = res.getData()['id'];
    });

    test('POST      /users        Should fail because we want to create a empty user', async () => {
        const res = await api('POST', '/api/users', {
            token,
            body: {}
        });
        res.expectJson();
        res.expectStatusCode(400);
    });

    test('GET       /users        Should list of users with our new create one', async () => {
        const res = await api('GET', '/api/users', auth);
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(userKeys);
        const data = res.getData<any[]>();
        expect(data.length).toBe(2);

        const user = data[1];
        expect(user.firstName).toBe(testData.firstName);
        expect(user.lastName).toBe(testData.lastName);
        expect(user.email).toBe(testData.email);
    });

    test('GET       /users/:id    Should return one user', async () => {
        const res = await api('GET', `/api/users/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(userKeys);

        const user: any = res.getData();
        expect(user.firstName).toBe(testData.firstName);
        expect(user.lastName).toBe(testData.lastName);
        expect(user.email).toBe(testData.email);
    });

    test('PUT       /users/:id    Should update the user', async () => {
        const res = await api('PUT', `/api/users/${createdId}`, {
            token,
            body: testDataUpdated
        });
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(userKeys);

        const user: any = res.getData();
        expect(user.firstName).toBe(testDataUpdated.firstName);
        expect(user.lastName).toBe(testDataUpdated.lastName);
        expect(user.email).toBe(testDataUpdated.email);
    });

    test('PUT       /users/:id    Should fail because we want to update the user with a invalid email', async () => {
        const res = await api('PUT', `/api/users/${createdId}`, {
            token,
            body: {
                email: 'abc'
            }
        });
        res.expectJson();
        res.expectStatusCode(400);
    });

    test('DELETE    /users/:id    Should delete the user', async () => {
        const res = await api('DELETE', `/api/users/${createdId}`, auth);
        res.expectStatusCode(200);
    });

    /**
     * 404 - NotFound Testing
     */
    test('GET       /users/:id    Should return with a 404, because we just deleted the user', async () => {
        const res = await api('GET', `/api/users/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

    test('DELETE    /users/:id    Should return with a 404, because we just deleted the user', async () => {
        const res = await api('DELETE', `/api/users/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

    test('PUT       /users/:id    Should return with a 404, because we just deleted the user', async () => {
        const res = await api('PUT', `/api/users/${createdId}`, {
            token,
            body: testData
        });
        res.expectJson();
        res.expectStatusCode(404);
    });

});
