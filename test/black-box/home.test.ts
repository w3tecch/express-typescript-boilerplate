import { api } from './lib/api';


test('GET   [/] - should return the api info as a json', async () => {
    const res = await api('GET', '/api');
    res.expectJson();
    res.expectStatusCode(200);

    const body = res.getBody<any>();
    const pkg = require('../../package.json');
    expect(body.name).toBe(pkg.name);
    expect(body.version).toBe(pkg.version);
    expect(body.description).toBe(pkg.description);
});
