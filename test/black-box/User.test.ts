import { api } from './lib/api';
import { DatabaseResetCommand } from '../../src/console/DatabaseResetCommand';
import { createAdminUser, getToken } from './lib/auth';


describe('/users', () => {

    const userKeys = ['id', 'firstName', 'lastName', 'email', 'picture', 'auth0UserId', 'updatedAt', 'createdAt'];

    const testUser = {
        firstName: 'Hans',
        lastName: 'Muster',
        email: 'hans@muster.ch',
        auth0UserId: '1234'
    };

    const testUserUpdated = {
        firstName: 'Horst',
        lastName: 'Maier',
        email: 'horst@maier.ch'
    };

    let token;
    let auth;
    let createdId;
    beforeAll(async () => {
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
            body: testUser
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
        expect(user.firstName).toBe(testUser.firstName);
        expect(user.lastName).toBe(testUser.lastName);
        expect(user.email).toBe(testUser.email);
    });

    test('GET       /users/:id    Should return one user', async () => {
        const res = await api('GET', `/api/users/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(userKeys);

        const user: any = res.getData();
        expect(user.firstName).toBe(testUser.firstName);
        expect(user.lastName).toBe(testUser.lastName);
        expect(user.email).toBe(testUser.email);
    });

    test('PUT       /users/:id    Should update the user', async () => {
        const res = await api('PUT', `/api/users/${createdId}`, {
            token,
            body: testUserUpdated
        });
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(userKeys);

        const user: any = res.getData();
        expect(user.firstName).toBe(testUserUpdated.firstName);
        expect(user.lastName).toBe(testUserUpdated.lastName);
        expect(user.email).toBe(testUserUpdated.email);
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
        const res = await api('PUT', `/api/users/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

});
