import { api } from './lib/api';
import { DatabaseResetCommand } from '../../src/console/DatabaseResetCommand';

let createdId;
const userKeys = ['id', 'firstName', 'lastName', 'email', 'updatedAt', 'createdAt'];

beforeAll(async () => {
    await DatabaseResetCommand.run();
});

test('POST  [/v1/user] - should create a new user', async () => {
    const res = await api('POST', '/api/v1/user', {
        body: {
            firstName: 'Hans',
            lastName: 'Muster',
            email: 'hans@muster.ch'
        }
    });
    res.expectJson();
    res.expectStatusCode(201);
    res.expectData(userKeys);
    createdId = res.getData()['id'];
});

test('GET   [/v1/user] - should return the api info as a json', async () => {
    const res = await api('GET', '/api/v1/user');
    res.expectJson();
    res.expectStatusCode(200);
    res.expectData(userKeys);
});

test('GET   [/v1/user/:id] - should return the api info as a json', async () => {
    const res = await api('GET', `/api/v1/user/${createdId}`);
    res.expectJson();
    res.expectStatusCode(200);
    res.expectData(userKeys);

    const user: any = res.getData();
    expect(user.firstName).toBe('Hans');
    expect(user.lastName).toBe('Muster');
    expect(user.email).toBe('hans@muster.ch');
});


